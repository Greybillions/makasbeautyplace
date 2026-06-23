'use client';

import { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';

interface Props {
  onSuccess: () => void;
}

export default function StripePaymentForm({ onSuccess }: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      <button
        type='submit'
        disabled={loading}
        className='mt-6 w-full rounded-xl bg-black py-4 text-white'
      >
        {loading ? 'Processing...' : 'Pay $25 CAD'}
      </button>
    </form>
  );
}
