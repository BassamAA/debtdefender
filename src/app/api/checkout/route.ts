import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import type { WizardFormData } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

export async function POST(req: NextRequest) {
  try {
    const { type, formData }: { type: 'one-time' | 'subscription'; formData: WizardFormData; letterBody: string } =
      await req.json();

    // Encode letter data as metadata (Stripe limits: 500 chars per value, 50 keys)
    // We store the key form fields; PDF is generated server-side after payment
    const metadata: Record<string, string> = {
      jurisdiction:         String(formData.jurisdiction).slice(0, 100),
      debtType:             String(formData.debtType).slice(0, 100),
      collectorName:        String(formData.collectorName || '').slice(0, 200),
      originalCreditorName: String(formData.originalCreditorName || '').slice(0, 200),
      approximateAmount:    String(formData.approximateAmount || '').slice(0, 50),
      debtAgeYears:         String(formData.debtAgeYears || '').slice(0, 20),
      yourName:             String(formData.yourName || '').slice(0, 200),
      yourAddress:          String(formData.yourAddress || '').slice(0, 400),
      scenarios:            JSON.stringify(formData.scenarios).slice(0, 400),
      actions:              JSON.stringify(formData.actions).slice(0, 400),
    };

    let session;

    if (type === 'one-time') {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'DebtDispute — Single Dispute Letter',
                description: 'Professional PDF dispute letter with legal citations. One-time download.',
                images: [`${BASE_URL}/og-image.svg`],
              },
              unit_amount: 1299,
            },
            quantity: 1,
          },
        ],
        metadata,
        success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${BASE_URL}/wizard`,
        allow_promotion_codes: true,
      });
    } else {
      // Subscription — create a price on the fly or use a pre-defined price ID
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'DebtDispute — Unlimited Monthly Plan',
                description: 'Unlimited letters + Interaction Tracker export. Cancel anytime.',
                images: [`${BASE_URL}/og-image.svg`],
              },
              unit_amount: 2499,
              recurring: { interval: 'month' },
            },
            quantity: 1,
          },
        ],
        metadata,
        subscription_data: { metadata },
        success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${BASE_URL}/wizard`,
        allow_promotion_codes: true,
      });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[checkout]', err);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
