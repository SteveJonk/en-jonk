'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

type ClipProps = { src: string; poster?: string; label?: string; style?: CSSProperties };

/** Muted looping clip: plays only while in view, never with reduced motion (the poster stays). */
export function Clip({ src, poster, label, style }: ClipProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload='none'
      className='absolute inset-0 h-full w-full object-cover'
      style={style}
    />
  );
}
