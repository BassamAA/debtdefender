import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const PRICES = {
  ONE_TIME: {
    amount: 1299,
    currency: 'usd',
    label: '$12.99',
    description: 'Single Letter — One-time download',
  },
  SUBSCRIPTION: {
    amount: 2499,
    currency: 'usd',
    label: '$24.99/mo',
    description: 'Unlimited Letters + Interaction Tracker',
    interval: 'month' as const,
  },
};
