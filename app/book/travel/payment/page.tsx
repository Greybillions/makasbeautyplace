'use client';

import { useEffect, useState } from 'react';
import StripeProvider from '@/components/booking/travel/StripeProvider';
import TravelPaymentForm from '@/components/booking/travel/TravelPaymentForm';

export default function TravelPaymentPage() {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  if (!clientSecret) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        Loading payment...
      </div>
    );
  }

  return (
    <StripeProvider clientSecret={clientSecret}>
      <TravelPaymentForm />
    </StripeProvider>
  );
}
