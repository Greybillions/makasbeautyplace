// app/api/checkout/stripe/route.ts

import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],

    line_items: [
      {
        price_data: {
          currency: 'cad',
          product_data: {
            name: body.service,
          },
          unit_amount: body.amount,
        },
        quantity: 1,
      },
    ],

    mode: 'payment',

    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?service=${body.service}`,

    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/book/hair`,
  });

  return NextResponse.json({
    url: session.url,
  });
}
