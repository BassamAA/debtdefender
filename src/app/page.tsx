import { Metadata } from 'next';
import Hero from '@/components/landing/Hero';
import StatuteChecker from '@/components/landing/StatuteChecker';
import HowItWorks from '@/components/landing/HowItWorks';
import FAQ from '@/components/landing/FAQ';
import Link from 'next/link';
import { Shield, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DebtDefender — Stop Debt Collectors in Their Tracks',
  description:
    'Free statute of limitations checker and professional debt dispute letter generator. Know your rights under the FDCPA. Fight back against debt collectors legally.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatuteChecker />
      <HowItWorks />

      {/* Urgency CTA section */}
      <section className="py-16 bg-gradient-to-r from-navy-900 to-navy-800 border-y border-navy-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider mb-4">
            Don&apos;t Wait — Every Day You Don&apos;t Respond Is an Opportunity They&apos;re Using Against You
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Generate Your Dispute Letter in 3 Minutes
          </h2>
          <p className="text-slate-400 text-base mb-8 max-w-xl mx-auto">
            Debt collectors are trained professionals. Your letter should cite the exact law that
            protects you. Make it clear you know your rights.
          </p>
          <Link
            href="/wizard"
            className="inline-flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-xl text-base transition-all shadow-xl shadow-orange-500/20"
          >
            <Shield className="w-5 h-5" />
            Start the Wizard — Free Preview
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-slate-500 text-xs mt-4">
            Preview is free. Pay $12.99 to download your PDF letter.
          </p>
        </div>
      </section>

      <FAQ />

      {/* Final disclaimer */}
      <section className="py-8 bg-navy-950 border-t border-navy-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-slate-600 text-xs leading-relaxed">
            DebtDefender provides document preparation assistance and is not a law firm. This does
            not constitute legal advice. Consult a licensed attorney for legal counsel. The
            information provided is for general informational purposes only and may not reflect the
            most current legal developments.
          </p>
        </div>
      </section>
    </>
  );
}
