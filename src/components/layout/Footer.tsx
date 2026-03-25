import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-800 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Debt<span className="text-orange-500">Dispute</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering consumers to understand their legal rights and respond to debt collectors
              with professional, law-backed documentation.
            </p>
            <p className="mt-4 text-xs text-slate-500 leading-relaxed">
              DebtDispute provides document preparation assistance and is not a law firm. This
              does not constitute legal advice. Consult a licensed attorney for legal counsel
              specific to your situation.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Tools
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/#statute-checker" className="hover:text-orange-400 transition-colors">
                  SOL Checker (Free)
                </Link>
              </li>
              <li>
                <Link href="/wizard" className="hover:text-orange-400 transition-colors">
                  Letter Generator
                </Link>
              </li>
              <li>
                <Link href="/tracker" className="hover:text-orange-400 transition-colors">
                  Interaction Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Letter Types */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Letters
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/letters/debt-validation" className="hover:text-orange-400 transition-colors">
                  Debt Validation
                </Link>
              </li>
              <li>
                <Link href="/letters/cease-and-desist" className="hover:text-orange-400 transition-colors">
                  Cease &amp; Desist
                </Link>
              </li>
              <li>
                <Link href="/letters/statute-of-limitations-defense" className="hover:text-orange-400 transition-colors">
                  SOL Defense
                </Link>
              </li>
              <li>
                <Link href="/letters/not-my-debt" className="hover:text-orange-400 transition-colors">
                  Not My Debt
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-orange-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} DebtDispute. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
