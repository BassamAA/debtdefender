import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('[webhook] signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('[webhook] checkout.session.completed:', session.id, session.payment_status);
      // PDF delivery is handled client-side via /success?session_id=
      // In a production app with email delivery, you'd trigger PDF generation + email here
      break;
    }
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription;
      console.log('[webhook] subscription event:', event.type, sub.id, sub.status);
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      console.log('[webhook] subscription cancelled:', sub.id);
      break;
    }
    default:
      console.log('[webhook] unhandled event:', event.type);
  }

  return NextResponse.json({ received: true });
}
