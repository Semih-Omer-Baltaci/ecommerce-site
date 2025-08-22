import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_demo', {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'try', metadata = {} } = await request.json();

    console.log('Payment intent request:', { amount, currency, metadata });

    // Minimum amount validation (Stripe requires minimum 50 kuruş for TRY)
    if (amount < 0.5) {
      console.error('Amount too small:', amount);
      return NextResponse.json(
        { error: 'Minimum ödeme tutarı 0.50 TL olmalıdır' },
        { status: 400 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to kuruş
      currency,
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString(),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('Payment intent created:', paymentIntent.id);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Payment intent creation failed:', error);
    return NextResponse.json(
      { error: 'Ödeme işlemi başlatılamadı' },
      { status: 500 }
    );
  }
}
