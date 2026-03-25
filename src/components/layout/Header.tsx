'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-950/95 backdrop-blur-sm border-b border-navy-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition-colors">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-white tracking-tight">
            Debt<span className="text-orange-500">Dispute</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/#statute-checker" className="text-slate-300 hover:text-white transition-colors">
            SOL Checker
          </Link>
          <Link href="/#how-it-works" className="text-slate-300 hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="/tracker" className="text-slate-300 hover:text-white transition-colors">
            Tracker
          </Link>
          <Link href="/#faq" className="text-slate-300 hover:text-white transition-colors">
            FAQ
          </Link>
          <Link
            href="/wizard"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Generate Letter
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-navy-900 border-t border-navy-800 px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/#statute-checker" className="text-slate-300 hover:text-white" onClick={() => setOpen(false)}>
            SOL Checker
          </Link>
          <Link href="/#how-it-works" className="text-slate-300 hover:text-white" onClick={() => setOpen(false)}>
            How It Works
          </Link>
          <Link href="/tracker" className="text-slate-300 hover:text-white" onClick={() => setOpen(false)}>
            Tracker
          </Link>
          <Link href="/#faq" className="text-slate-300 hover:text-white" onClick={() => setOpen(false)}>
            FAQ
          </Link>
          <Link
            href="/wizard"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2.5 rounded-lg text-center transition-colors"
            onClick={() => setOpen(false)}
          >
            Generate Letter
          </Link>
        </div>
      )}
    </header>
  );
}
