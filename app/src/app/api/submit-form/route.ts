import { NextResponse } from 'next/server';
import { renderFormMail } from '@/lib/form-mail';
import { fillTemplate } from '@/lib/interface-text';
import { client } from '@/sanity/client';
import { imageSrc } from '@/sanity/image';
import { getInterfaceText } from '@/sanity/interface-text';
import { FORM_QUERY, FORM_SETTINGS_QUERY } from '@/sanity/queries';
import { getSiteInformation } from '@/sanity/site-information';

export const runtime = 'nodejs';

/** Bigger uploads are rejected rather than silently dropped from the mail. */
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

/** Google's siteverify. Returns false on any doubt — this gate fails closed. */
async function verifyRecaptcha(token: string, secret: string) {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch (error) {
    console.error('submit-form: reCAPTCHA verification failed', error);
    return false;
  }
}

/** `message` is shown to the visitor as-is, so it comes from the interface text. */
function fail(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

/** "a@x.com, b@x.com" -> ["a@x.com", "b@x.com"]. Semicolons separate too. */
function splitEmails(value?: string | null) {
  return (value ?? '')
    .split(/[,;]/)
    .map((email) => email.trim())
    .filter(Boolean);
}

/**
 * Sends via Mailjet's HTTP API (v3.1). Throws on a non-2xx response.
 *
 * This is the only provider-specific function in the route: swapping Mailjet
 * for Postmark, Resend or SMTP means rewriting this one and nothing else.
 */
async function sendViaMailjet(
  { apiKey, apiSecret }: { apiKey: string; apiSecret: string },
  message: {
    fromEmail: string;
    fromName: string;
    to: string[];
    replyTo?: string;
    subject: string;
    html: string;
    text: string;
    attachments: { filename: string; content: Buffer }[];
  },
) {
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

  const response = await fetch('https://api.mailjet.com/v3.1/send', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Messages: [
        {
          From: { Email: message.fromEmail, Name: message.fromName },
          To: message.to.map((email) => ({ Email: email })),
          ...(message.replyTo ? { ReplyTo: { Email: message.replyTo } } : {}),
          Subject: message.subject,
          HTMLPart: message.html,
          TextPart: message.text,
          Attachments: message.attachments.map((attachment) => ({
            ContentType: 'application/octet-stream',
            Filename: attachment.filename,
            Base64Content: attachment.content.toString('base64'),
          })),
        },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Mailjet responded ${response.status}: ${body}`);
  }
}

export async function POST(request: Request) {
  const { forms: text } = await getInterfaceText();

  let body: FormData;
  try {
    body = await request.formData();
  } catch {
    return fail(text.invalid, 400);
  }

  const formId = String(body.get('formId') ?? '');
  if (!formId) return fail(text.invalid, 400);

  // The form definition is the allow-list: a key the document does not declare
  // never reaches the mail, whatever the browser posted.
  const [form, settings, site] = await Promise.all([
    client.fetch(FORM_QUERY, { formId }, { cache: 'no-store' }),
    client.fetch(FORM_SETTINGS_QUERY, {}, { cache: 'no-store' }),
    getSiteInformation(),
  ]);
  if (!form) return fail(text.invalid, 404);

  // Spam gate before any real work. The secret belongs in the environment: a
  // Sanity dataset is world-readable, so the studio value is only a fallback.
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || settings?.recaptchaSecretKey;
  if (settings?.recaptchaEnabled) {
    if (!recaptchaSecret) {
      console.error('submit-form: reCAPTCHA is enabled but no secret key is set');
      return fail(text.notConfigured, 500);
    }
    const token = String(body.get('recaptchaToken') ?? '');
    if (!token || !(await verifyRecaptcha(token, recaptchaSecret))) {
      return fail(text.recaptcha, 400);
    }
  }

  const answers: { label: string; value: string }[] = [];
  const attachments: { filename: string; content: Buffer }[] = [];
  /** First answer to an e-mail field — the address the copy mail goes to. */
  let submitterEmail = '';

  for (const field of form.fields ?? []) {
    if (!field?.name) continue;

    const values = body.getAll(field.name);
    const label = field.label || field.name;

    if (field.type === 'file') {
      const file = values.find(
        (value): value is File => value instanceof File && value.size > 0,
      );
      if (file) {
        if (file.size > MAX_ATTACHMENT_BYTES) {
          return fail(fillTemplate(text.fileTooLarge, { file: file.name }), 413);
        }
        attachments.push({
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
        });
        answers.push({ label, value: file.name });
      } else if (field.isRequired) {
        return fail(fillTemplate(text.required, { label }), 400);
      }
      continue;
    }

    const answer = values
      .filter((value): value is string => typeof value === 'string')
      .map((value) => value.trim())
      .filter(Boolean)
      .join(', ');

    if (!answer) {
      if (field.isRequired) return fail(fillTemplate(text.required, { label }), 400);
      continue;
    }
    if (field.type === 'email' && !submitterEmail) submitterEmail = answer;
    answers.push({ label, value: answer });
  }

  if (answers.length === 0) return fail(text.empty, 400);

  // Env wins over the studio settings: a dataset is readable by anyone with the
  // project id, so credentials belong in the environment.
  const mailjetApiKey = process.env.MAILJET_API_KEY || settings?.mailjetApiKey;
  const mailjetApiSecret = process.env.MAILJET_API_SECRET || settings?.mailjetApiSecret;
  const adminEmail = process.env.CONTACT_ADMIN_EMAIL || settings?.adminEmail;
  // Mailjet only accepts a sender it has validated; fall back to the recipient,
  // which is the one address known to belong to this account.
  const fromEmail = process.env.MAILJET_FROM_EMAIL || settings?.fromEmail || adminEmail;
  const fromName = settings?.fromName || site.name;

  // Per-form recipients win over the shared admin address; both are valid.
  const recipients = splitEmails(form.mailRecipients);
  if (recipients.length === 0 && adminEmail) recipients.push(adminEmail);

  if (recipients.length === 0 || !fromEmail || !mailjetApiKey || !mailjetApiSecret) {
    console.error('submit-form: missing mail settings (env or formGeneralSettings)');
    return fail(text.notConfigured, 500);
  }

  // Logo, colours and the small print come from Form settings, so the template
  // itself carries no brand name, colour or copy.
  const branding = {
    logoUrl: imageSrc(settings?.mailLogo, 300),
    logoAlt: fromName,
    primaryColor: settings?.primaryColor,
    textColor: settings?.textColor,
    footer: settings?.mailFooter
      ? fillTemplate(settings.mailFooter, { form: form.title ?? '', site: fromName })
      : undefined,
  };

  const subject = form.mailSubject || settings?.confirmationSubject || form.title || fromName;
  const mail = renderFormMail({
    title: subject,
    intro: form.mailMessage || settings?.confirmationMessage || '',
    answers,
    branding,
  });
  const replyTo = submitterEmail || answers.find(({ label }) => /mail/i.test(label))?.value;

  const credentials = { apiKey: mailjetApiKey, apiSecret: mailjetApiSecret };

  try {
    await sendViaMailjet(credentials, {
      fromEmail,
      fromName,
      to: recipients,
      replyTo,
      subject,
      html: mail.html,
      text: mail.text,
      attachments,
    });
  } catch (error) {
    console.error('submit-form: sending failed', error);
    return fail(text.sendError, 502);
  }

  // The sender's copy is a courtesy: the submission already succeeded above, so
  // a failure here is logged, not reported back as a failed submission.
  if (form.sendCopyToSubmitter && submitterEmail) {
    try {
      await sendViaMailjet(credentials, {
        fromEmail,
        fromName,
        to: [submitterEmail],
        subject: form.copySubject || subject,
        ...renderFormMail({
          title: form.copySubject || subject,
          intro: form.copyMessage || '',
          answers,
          branding,
        }),
        attachments: [],
      });
    } catch (error) {
      console.error('submit-form: copy to submitter failed', error);
    }
  }

  return NextResponse.json({ success: true });
}
