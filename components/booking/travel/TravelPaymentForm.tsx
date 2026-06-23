'use client';

import { useState } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

export default function TravelPaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/book/travel/confirmed',
      },
    });

    if (result.error) {
      console.error(result.error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#FAF7F2] px-4 py-12'>
      <div className='mx-auto max-w-2xl'>
        <div className='overflow-hidden rounded-3xl border border-[#E8E0D5] bg-white shadow-sm'>
          {/* Header */}

          <div className='border-b border-[#E8E0D5] p-8'>
            <h1 className='text-3xl font-bold text-[#1C1008]'>
              Confirm Booking
            </h1>

            <p className='mt-2 text-[#5E534A]'>
              Complete your payment to secure your consultation.
            </p>
          </div>

          {/* Booking Summary */}

          <div className='border-b border-[#E8E0D5] p-8'>
            <h2 className='mb-5 text-lg font-semibold text-[#1C1008]'>
              Booking Details
            </h2>

            <div className='space-y-3'>
              <div className='flex justify-between rounded-xl bg-[#FAF7F2] p-4'>
                <span>Service</span>
                <span className='font-medium'>Travel Consultation</span>
              </div>

              <div className='flex justify-between rounded-xl bg-[#FAF7F2] p-4'>
                <span>Duration</span>
                <span className='font-medium'>30 Minutes</span>
              </div>

              <div className='flex justify-between rounded-xl bg-[#FAF7F2] p-4'>
                <span>Price</span>
                <span className='font-medium'>$25 CAD</span>
              </div>
            </div>
          </div>

          {/* Stripe Form */}

          <form onSubmit={handleSubmit} className='p-8'>
            <PaymentElement />

            <button
              type='submit'
              disabled={!stripe || loading}
              className='mt-8 w-full rounded-xl bg-[#1C1008] py-4 font-medium text-white transition hover:bg-[#2B170C] disabled:opacity-50'
            >
              {loading ? 'Processing Payment...' : 'Pay $25 CAD'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
