import Link from 'next/link';
import { Shield, ChevronRight, AlertCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-steel-600/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-orange-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-48 bg-navy-800/50 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Urgency badge */}
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 uppercase tracking-wider">
          <AlertCircle className="w-3.5 h-3.5 urgency-pulse" />
          You Have Legal Rights — Here&apos;s How to Use Them
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
          Stop Debt Collectors{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            in Their Tracks
          </span>
          <br />
          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-200">
            Know Your Rights.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-4 leading-relaxed">
          Debt collectors rely on you not knowing the law. The FDCPA gives you powerful rights —
          and violating them costs them $1,000 per offense.
          <strong className="text-white"> You just found your weapon.</strong>
        </p>

        <p className="text-base text-slate-400 max-w-xl mx-auto mb-10">
          Check if your debt is past the statute of limitations for free. Generate a professional,
          law-citing dispute letter in minutes.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/#statute-checker"
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
          >
            <Shield className="w-5 h-5" />
            Check Statute of Limitations — Free
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href="/wizard"
            className="w-full sm:w-auto bg-navy-800 hover:bg-navy-700 text-white font-semibold px-8 py-4 rounded-xl text-base border border-navy-600 transition-all flex items-center justify-center gap-2"
          >
            Generate a Dispute Letter
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            FDCPA Compliant Language
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            Real Law Citations
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            US &amp; Canada Covered
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            No Account Required
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            SOL Checker Always Free
          </div>
        </div>
      </div>
    </section>
  );
}
