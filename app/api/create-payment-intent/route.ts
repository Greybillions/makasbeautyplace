import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST() {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2500, // $25.00 CAD
      currency: 'cad',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        service: 'Travel Consultation',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Stripe PaymentIntent Error:', error);

    return NextResponse.json(
      {
        error: 'Failed to create payment intent',
      },
      {
        status: 500,
      },
    );
  }
}
