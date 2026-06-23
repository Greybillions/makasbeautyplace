'use client';

import { useEffect, useRef, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from '@/components/booking/travel/StripePaymentForm';
import Cal from '@calcom/embed-react';
import {
  Plane,
  Clock3,
  DollarSign,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import gsap from 'gsap';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const perks = [
  'My personal study permit application experience',
  'Step-by-step breakdown of my relocation journey',
  'PSW program insights (school life, expectations, challenges)',
  'Practical tips + mistakes I made so you can avoid them',
  'Honest answers to your specific questions',
];

export default function TravelPage() {
  const [clientSecret, setClientSecret] = useState('');
  const [paid, setPaid] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const expandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/create-payment-intent', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const toggle = () => {
    if (!expanded) {
      setExpanded(true);
      requestAnimationFrame(() => {
        if (expandRef.current) {
          gsap.fromTo(
            expandRef.current,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.45, ease: 'power2.out' },
          );
        }
      });
    } else {
      if (expandRef.current) {
        gsap.to(expandRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => setExpanded(false),
        });
      }
    }
  };

  const IntroPanel = (
    <aside className='rounded-2xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden self-start'>
      <div className='h-1.5 w-full bg-linear-to-r from-[#111827] via-[#374151] to-[#6B7280]' />
      <div className='p-8'>
        {/* Icon */}
        <div className='mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#111827] text-white shadow-md'>
          <Plane size={20} />
        </div>

        {/* Label */}
        <span className='text-[10px] font-bold uppercase tracking-[0.25em] text-[#9CA3AF]'>
          Travel Consultation
        </span>

        {/* Title */}
        <h1 className='mt-3 text-2xl font-bold leading-snug text-[#111827]'>
          Relocation Support Session
        </h1>

        {/* Badges */}
        <div className='mt-5 flex flex-wrap gap-2'>
          <div className='flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1.5 text-xs font-semibold text-[#374151]'>
            <Clock3 size={13} className='text-[#6B7280]' />
            30 Minutes
          </div>
          <div className='flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1.5 text-xs font-semibold text-[#374151]'>
            <DollarSign size={13} className='text-[#6B7280]' />
            $25 CAD
          </div>
        </div>

        <div className='my-6 h-px bg-[#F3F4F6]' />

        {/* Visible intro */}
        <div className='space-y-3 text-sm leading-relaxed text-[#6B7280]'>
          <p>
            <span className='font-semibold text-[#111827]'>
              Hi, I&apos;m Amy
            </span>{' '}
            — I relocated to Canada and documented my journey through studying
            and exploring the PSW pathway.
          </p>
          <p>
            Over time, I started receiving a lot of questions about how I
            applied, my timeline, and what the process was really like.
          </p>
        </div>

        {/* Expandable content */}
        {expanded && (
          <div
            ref={expandRef}
            className='overflow-hidden'
            style={{ height: 0, opacity: 0 }}
          >
            <div className='space-y-3 text-sm leading-relaxed text-[#6B7280] mt-3'>
              <p>
                Instead of replying to each message individually, I now offer
                structured 1-on-1 consultations where I share everything based
                on my personal experience. My goal is to make your journey feel
                clearer, less overwhelming, and more realistic.
              </p>
            </div>

            <div className='my-5 h-px bg-[#F3F4F6]' />

            {/* Perks */}
            <div>
              <h3 className='mb-3 text-sm font-bold uppercase tracking-widest text-[#9CA3AF]'>
                What You&apos;ll Get
              </h3>
              <p className='mb-3 text-xs text-[#6B7280]'>
                In our 1-on-1 call, I can help you with:
              </p>
              <ul className='space-y-2.5'>
                {perks.map((perk) => (
                  <li
                    key={perk}
                    className='flex items-start gap-3 text-sm text-[#374151]'
                  >
                    <CheckCircle2
                      size={15}
                      className='shrink-0 text-[#111827] mt-0.5'
                    />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div className='mt-5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] p-4'>
              <p className='text-xs text-[#9CA3AF] leading-relaxed'>
                <span className='font-semibold text-[#6B7280]'>
                  Please note:
                </span>{' '}
                This is based on personal experience and is not legal or
                immigration advice.
              </p>
            </div>
          </div>
        )}

        {/* Toggle btn */}
        <button
          onClick={toggle}
          className='mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#111827] hover:text-[#374151] transition-colors'
        >
          {expanded ? (
            <>
              <ChevronUp size={14} /> Show less
            </>
          ) : (
            <>
              <ChevronDown size={14} /> Read more
            </>
          )}
        </button>

        <div className='my-6 h-px bg-[#F3F4F6]' />

        <p className='text-xs text-[#9CA3AF] leading-relaxed'>
          🔒 Payment is securely processed via Stripe.
        </p>
      </div>
    </aside>
  );

  return (
    <main className='min-h-screen bg-[#F9FAFB] px-4 py-10 md:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid gap-6 lg:grid-cols-[380px_1fr]'>
          {/* LEFT */}
          {!paid ? (
            IntroPanel
          ) : (
            <div className='lg:col-span-2 rounded-2xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden'>
              <div className='h-1.5 w-full bg-linear-to-r from-[#111827] via-[#374151] to-[#6B7280]' />
              <div className='p-6 border-b border-[#E5E7EB] flex items-center gap-3'>
                <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[#111827] text-white'>
                  <Plane size={16} />
                </div>
                <div>
                  <p className='text-sm font-semibold text-[#111827]'>
                    Payment confirmed — pick your slot
                  </p>
                  <p className='text-xs text-[#6B7280]'>
                    Choose a date and time for your relocation session
                  </p>
                </div>
                <span className='ml-auto flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-semibold text-green-700'>
                  <CheckCircle2 size={12} />
                  Paid
                </span>
              </div>
              <Cal
                calLink='grey1511/30min'
                style={{ width: '100%', height: '700px' }}
                config={{ layout: 'month_view' }}
              />
            </div>
          )}

          {/* RIGHT — Payment */}
          {!paid && (
            <div className='rounded-2xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden self-start'>
              <div className='h-1.5 w-full bg-linear-to-r from-[#111827] via-[#374151] to-[#6B7280]' />
              <div className='p-8'>
                <h2 className='text-xl font-bold text-[#111827]'>
                  Complete Payment
                </h2>
                <p className='mt-2 text-sm text-[#6B7280]'>
                  Pay $25 CAD to confirm your consultation session.
                </p>

                <div className='my-6 h-px bg-[#F3F4F6]' />

                {/* Order summary */}
                <div className='mb-6 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] p-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-semibold text-[#111827]'>
                        Relocation Support Session
                      </p>
                      <p className='text-xs text-[#9CA3AF] mt-0.5'>
                        30 min · 1-on-1 call
                      </p>
                    </div>
                    <span className='text-sm font-bold text-[#111827]'>
                      $25 CAD
                    </span>
                  </div>
                  <div className='mt-3 pt-3 border-t border-[#E5E7EB] flex items-center justify-between'>
                    <span className='text-xs font-semibold text-[#6B7280]'>
                      Total
                    </span>
                    <span className='text-base font-black text-[#111827]'>
                      $25 CAD
                    </span>
                  </div>
                </div>

                {clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <StripePaymentForm onSuccess={() => setPaid(true)} />
                  </Elements>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='mt-8 text-center space-y-1.5'>
        <p className='text-sm text-[#646971]'>
          Maka&apos;s Beauty Place {new Date().getFullYear()} ©
        </p>
        <p className='text-lg text-[#7c8391]'>
          Designed & Built by{' '}
          <a
            href='https://madebygrey.vercel.app'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold text-[#111827] underline underline-offset-2 hover:text-[#374151] transition-colors'
          >
            Grey
          </a>
        </p>
      </div>
    </main>
  );
}
