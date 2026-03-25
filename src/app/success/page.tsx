'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Download, Shield, ArrowRight, Loader2 } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  async function downloadPDF() {
    if (!sessionId) return;
    setDownloading(true);
    setError('');
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Failed to generate PDF');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'DebtDefender-Letter.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success icon */}
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500/40">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">Payment Confirmed</h1>
        <p className="text-slate-400 text-base mb-8 leading-relaxed">
          Your letter is ready. Click below to download your professionally formatted PDF —
          ready to mail certified to the debt collector.
        </p>

        {/* Download button */}
        <button
          onClick={downloadPDF}
          disabled={downloading || !sessionId}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-navy-700 disabled:text-slate-500 text-white font-bold py-4 rounded-xl text-base transition-all flex items-center justify-center gap-3 mb-4 shadow-lg shadow-orange-500/20"
        >
          {downloading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Download Your Letter (PDF)
            </>
          )}
        </button>

        {error && (
          <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
            {error}
          </p>
        )}

        {/* Tips */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-5 mb-6 text-left">
          <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-400" />
            What to do with your letter
          </h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">1.</span>
              <span>Print and sign the letter.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">2.</span>
              <span>Make a photocopy for your records.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">3.</span>
              <span>
                <strong className="text-white">Mail it certified mail, return receipt
                requested.</strong> The return receipt is your proof they received it.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">4.</span>
              <span>Log the interaction in the DebtDefender Tracker.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">5.</span>
              <span>If they violate the law after receiving your letter, consult a consumer rights attorney — FDCPA violations can be worth $1,000+ each.</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/tracker"
            className="flex-1 bg-navy-800 hover:bg-navy-700 text-white font-semibold py-3 rounded-xl border border-navy-600 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            Log This Interaction
          </Link>
          <Link
            href="/wizard"
            className="flex-1 bg-navy-800 hover:bg-navy-700 text-white font-semibold py-3 rounded-xl border border-navy-600 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            Generate Another Letter
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy-950 flex items-center justify-center text-slate-400">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
