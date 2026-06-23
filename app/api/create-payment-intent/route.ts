import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2500,
    currency: 'cad',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
