import { Fragment } from 'react';

export function Amp() {
  return <span className='amp'>&amp;</span>;
}

/** "Over &Jonk" -> Over <Amp />Jonk */
export function withAmp(text: string) {
  return text.split('&').map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <Amp />}
      {part}
    </Fragment>
  ));
}
