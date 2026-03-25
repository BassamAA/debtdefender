'use client';

import { useState } from 'react';
import { Shield, Download, Zap, Lock, CheckCircle } from 'lucide-react';
import type { WizardFormData } from '@/types';

interface Props {
  formData: WizardFormData;
  letterBody: string;
}

export default function PaymentGate({ formData, letterBody }: Props) {
  const [loading, setLoading] = useState<'one-time' | 'subscription' | null>(null);

  async function handleCheckout(type: 'one-time' | 'subscription') {
    setLoading(type);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          formData,
          letterBody,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      setLoading(null);
    }
  }

  return (
    <div className="bg-navy-900 border border-navy-700 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-900 px-6 py-4 border-b border-navy-700">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-orange-400" />
          <h3 className="text-white font-bold text-base">Unlock Your Full Letter</h3>
        </div>
        <p className="text-slate-400 text-xs mt-1">
          Download the professionally formatted PDF, ready to mail certified.
        </p>
      </div>

      {/* Options */}
      <div className="p-5 grid sm:grid-cols-2 gap-4">
        {/* One-time */}
        <div className="bg-navy-800 border border-navy-600 rounded-xl p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Download className="w-4 h-4 text-steel-400" />
            <span className="text-white font-bold text-sm">Single Letter</span>
          </div>
          <div className="flex items-end gap-1 mb-3">
            <span className="text-3xl font-extrabold text-white">$12.99</span>
            <span className="text-slate-400 text-sm mb-1">one-time</span>
          </div>
          <ul className="space-y-1.5 mb-5 flex-1">
            {[
              'This letter as PDF',
              'Professional formatting',
              'Proper law citations',
              'Instant download',
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleCheckout('one-time')}
            disabled={loading !== null}
            className="w-full bg-navy-700 hover:bg-navy-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm border border-navy-500 transition-colors"
          >
            {loading === 'one-time' ? 'Redirecting...' : 'Buy This Letter'}
          </button>
        </div>

        {/* Subscription */}
        <div className="bg-gradient-to-br from-orange-500/15 to-orange-600/5 border border-orange-500/50 rounded-xl p-5 flex flex-col relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              BEST VALUE
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2 mt-2">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-white font-bold text-sm">Unlimited Access</span>
          </div>
          <div className="flex items-end gap-1 mb-3">
            <span className="text-3xl font-extrabold text-white">$24.99</span>
            <span className="text-slate-400 text-sm mb-1">/month</span>
          </div>
          <ul className="space-y-1.5 mb-5 flex-1">
            {[
              'Unlimited letters',
              'All letter types',
              'Interaction Tracker',
              'Export tracker as PDF',
              'Cancel anytime',
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleCheckout('subscription')}
            disabled={loading !== null}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-lg shadow-orange-500/20"
          >
            {loading === 'subscription' ? 'Redirecting...' : 'Subscribe & Download'}
          </button>
        </div>
      </div>

      {/* Trust */}
      <div className="px-5 pb-4 flex flex-wrap items-center justify-center gap-4 border-t border-navy-700 pt-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Shield className="w-3.5 h-3.5 text-green-400" />
          Secured by Stripe
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Lock className="w-3.5 h-3.5 text-green-400" />
          256-bit SSL
        </div>
        <div className="text-xs text-slate-400">
          No subscription trap — cancel anytime
        </div>
      </div>

      <p className="text-center text-slate-600 text-xs pb-3 px-5">
        DebtDispute is not a law firm and this is not legal advice. Consult an attorney for
        legal counsel specific to your situation.
      </p>
    </div>
  );
}
