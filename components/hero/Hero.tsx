'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { homeAnimation } from './homeAnimation';

export default function Home() {
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const btn1Ref = useRef<HTMLAnchorElement>(null);
  const btn2Ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const anim = homeAnimation({
      badge: badgeRef.current,
      heading: headingRef.current,
      para: paraRef.current,
      buttons: [btn1Ref.current, btn2Ref.current],
    });
    return () => {
      anim.kill();
    };
  }, []);

  return (
    <main className='relative min-h-screen overflow-hidden'>
      {/* Background */}
      <div
        className='absolute inset-0 bg-cover bg-center animate-[pulse_12s_ease-in-out_infinite]'
        style={{ backgroundImage: "url('/hero-bg.webp')" }}
      />
      {/* Overlay */}
      <div className='absolute inset-0 bg-black/65' />

      {/* Content */}
      <div className='relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center'>
        <span
          ref={badgeRef}
          className='mb-4 text-sm uppercase tracking-[0.3em] text-[#FF6B35]'
        >
          Maka&apos;s Beauty Place
        </span>

        <h1
          ref={headingRef}
          className='max-w-4xl text-5xl font-light text-white md:text-7xl'
        >
          Beauty & Travel
          <span className='block text-[#FF6B35]'>Made Simple</span>
        </h1>

        <p ref={paraRef} className='mt-6 max-w-xl text-lg text-zinc-300'>
          Book a professional hair appointment or schedule a travel
          consultation.
        </p>

        <div className='mt-12 flex w-full max-w-2xl flex-col gap-4 sm:flex-row'>
          <Link
            ref={btn1Ref}
            href='/book/hair'
            className='flex-1 rounded-xl bg-[#FF6B35] px-8 py-5 text-lg font-medium text-black transition hover:bg-[#e65c2d]'
          >
            Hair Appointment
          </Link>
          <Link
            ref={btn2Ref}
            href='/book/travel'
            className='flex-1 rounded-xl border border-white/20 bg-white/5 px-8 py-5 text-lg font-medium text-white backdrop-blur-sm transition hover:bg-white/10'
          >
            Travel Consultation
          </Link>
        </div>
      </div>
    </main>
  );
}
