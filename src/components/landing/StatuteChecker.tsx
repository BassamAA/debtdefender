'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Shield, AlertTriangle, CheckCircle, Clock, ChevronRight, Info } from 'lucide-react';
import { JURISDICTIONS } from '@/data/jurisdictions';
import { DEBT_TYPES } from '@/data/debtTypes';
import { getStatuteEntry, getStatuteByJurisdiction } from '@/lib/statuteLookup';
import type { Jurisdiction, DebtType } from '@/types';

interface CheckerResult {
  years: number;
  citation: string;
  lawName: string;
  notes: string;
  debtAgeYears: number;
  isTimeBarred: boolean | null;
  jurisdictionName: string;
  debtTypeLabel: string;
  complaints: string;
  regulatoryBody: string;
}

export default function StatuteChecker() {
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction | ''>('');
  const [debtType, setDebtType] = useState<DebtType | ''>('');
  const [debtAge, setDebtAge] = useState('');
  const [result, setResult] = useState<CheckerResult | null>(null);
  const [checked, setChecked] = useState(false);

  const canCheck = jurisdiction && debtType;

  function handleCheck() {
    if (!jurisdiction || !debtType) return;

    const entry = getStatuteEntry(jurisdiction as Jurisdiction, debtType as DebtType);
    const jurisdictionData = getStatuteByJurisdiction(jurisdiction as Jurisdiction);
    if (!entry || !jurisdictionData) return;

    const debtAgeYears = debtAge ? parseFloat(debtAge) : 0;
    const isTimeBarred = debtAge ? debtAgeYears >= entry.years : null;

    const debtTypeLabel = DEBT_TYPES.find((d) => d.id === debtType)?.label ?? debtType;

    setResult({
      years: entry.years,
      citation: entry.citation,
      lawName: entry.lawName,
      notes: entry.notes,
      debtAgeYears,
      isTimeBarred,
      jurisdictionName: jurisdictionData.jurisdictionName,
      debtTypeLabel,
      complaints: jurisdictionData.complaints,
      regulatoryBody: jurisdictionData.regulatoryBody,
    });
    setChecked(true);
  }

  function handleReset() {
    setJurisdiction('');
    setDebtType('');
    setDebtAge('');
    setResult(null);
    setChecked(false);
  }

  const canadianJurisdictions = JURISDICTIONS.filter((j) => j.country === 'CA');
  const usJurisdictions = JURISDICTIONS.filter((j) => j.country === 'US');

  return (
    <section id="statute-checker" className="py-20 bg-gradient-to-b from-navy-950 to-navy-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
            <CheckCircle className="w-3.5 h-3.5" />
            100% Free — No Payment Required
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Statute of Limitations Checker
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-lg mx-auto">
            Find out if your debt is past the legal deadline. If the statute of limitations has
            expired, collectors cannot sue you — even if the debt is real.
          </p>
        </div>

        {/* Checker card */}
        <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 sm:p-8">
          {!checked ? (
            <div className="space-y-5">
              {/* Jurisdiction */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Your Province or State
                </label>
                <select
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value as Jurisdiction | '')}
                  className="w-full bg-navy-800 border border-navy-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                >
                  <option value="">Select your location...</option>
                  <optgroup label="🇨🇦 Canada">
                    {canadianJurisdictions.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🇺🇸 United States">
                    {usJurisdictions.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Debt type */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Type of Debt
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DEBT_TYPES.map((dt) => (
                    <button
                      key={dt.id}
                      type="button"
                      onClick={() => setDebtType(dt.id as DebtType)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left ${
                        debtType === dt.id
                          ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                          : 'bg-navy-800 border-navy-600 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <span>{dt.icon}</span>
                      <span className="leading-tight text-xs">{dt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Debt age (optional) */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  How old is this debt?{' '}
                  <span className="font-normal text-slate-500">(optional — for time-barred check)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="30"
                    step="0.5"
                    placeholder="e.g. 3.5"
                    value={debtAge}
                    onChange={(e) => setDebtAge(e.target.value)}
                    className="w-full bg-navy-800 border border-navy-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors pr-16"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                    years
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Count from the date of your last payment or when you first defaulted.
                </p>
              </div>

              <button
                onClick={handleCheck}
                disabled={!canCheck}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-navy-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Search className="w-4 h-4" />
                Check Statute of Limitations
              </button>
            </div>
          ) : (
            result && (
              <div>
                {/* Time-barred result banner */}
                {result.isTimeBarred === true && (
                  <div className="bg-green-500/10 border border-green-500/40 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-green-300 font-bold text-sm mb-1">
                        This debt may be time-barred!
                      </p>
                      <p className="text-green-400/80 text-xs leading-relaxed">
                        The statute of limitations in {result.jurisdictionName} for {result.debtTypeLabel.toLowerCase()} is{' '}
                        <strong>{result.years} years</strong>. Your debt is approximately{' '}
                        <strong>{result.debtAgeYears} years</strong> old — collectors likely cannot
                        successfully sue you in court. You may have grounds for a strong legal defense.
                      </p>
                    </div>
                  </div>
                )}

                {result.isTimeBarred === false && (
                  <div className="bg-yellow-500/10 border border-yellow-500/40 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-yellow-300 font-bold text-sm mb-1">
                        Statute of limitations has not yet expired
                      </p>
                      <p className="text-yellow-400/80 text-xs leading-relaxed">
                        The SOL in {result.jurisdictionName} for this debt type is{' '}
                        <strong>{result.years} years</strong>. With only{' '}
                        <strong>{result.debtAgeYears} years</strong> elapsed, you cannot use a
                        limitations defense — but you still have all other FDCPA rights.
                      </p>
                    </div>
                  </div>
                )}

                {result.isTimeBarred === null && (
                  <div className="bg-steel-500/10 border border-steel-500/40 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-steel-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-steel-300 font-bold text-sm mb-1">
                        Statute of Limitations: {result.years} years
                      </p>
                      <p className="text-slate-400 text-xs">
                        Add the debt age above to see if your debt is time-barred.
                      </p>
                    </div>
                  </div>
                )}

                {/* Core result */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-navy-800 rounded-xl p-4">
                      <p className="text-slate-400 text-xs mb-1">Jurisdiction</p>
                      <p className="text-white font-bold text-sm">{result.jurisdictionName}</p>
                    </div>
                    <div className="bg-navy-800 rounded-xl p-4">
                      <p className="text-slate-400 text-xs mb-1">Debt Type</p>
                      <p className="text-white font-bold text-sm">{result.debtTypeLabel}</p>
                    </div>
                    <div className="bg-navy-800 rounded-xl p-4">
                      <p className="text-slate-400 text-xs mb-1">Limitation Period</p>
                      <p className="text-orange-400 font-extrabold text-xl">{result.years} years</p>
                    </div>
                    <div className="bg-navy-800 rounded-xl p-4">
                      <p className="text-slate-400 text-xs mb-1">Law Citation</p>
                      <p className="text-slate-300 font-medium text-xs leading-snug">{result.lawName}</p>
                    </div>
                  </div>

                  {/* Citation */}
                  <div className="bg-navy-800/60 rounded-xl p-4 border border-navy-700">
                    <p className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">
                      Legal Citation
                    </p>
                    <p className="text-slate-300 text-xs font-mono leading-relaxed">{result.citation}</p>
                  </div>

                  {/* Notes */}
                  <div className="bg-navy-800/60 rounded-xl p-4 border border-navy-700">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-steel-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">
                          What This Means
                        </p>
                        <p className="text-slate-300 text-xs leading-relaxed">{result.notes}</p>
                      </div>
                    </div>
                  </div>

                  {/* Complaint info */}
                  <div className="bg-navy-800/40 rounded-xl p-4 border border-navy-700/50">
                    <p className="text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">
                      Report Violations To
                    </p>
                    <p className="text-slate-400 text-xs font-semibold mb-1">{result.regulatoryBody}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{result.complaints}</p>
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-3 mb-6">
                  <p className="text-yellow-400/70 text-xs leading-relaxed">
                    <strong className="text-yellow-400">Important:</strong> Making even a small payment or
                    acknowledging a debt in writing can restart the statute of limitations clock. If the debt
                    may be time-barred, do not make any payment or written acknowledgement before consulting
                    an attorney.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/wizard?jurisdiction=${jurisdiction}&debtType=${debtType}`}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Shield className="w-4 h-4" />
                    Generate a Dispute Letter
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-navy-800 hover:bg-navy-700 text-slate-300 font-semibold py-3.5 px-5 rounded-xl border border-navy-600 transition-colors text-sm"
                  >
                    Check Another
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-slate-500 text-xs mt-4 leading-relaxed">
          This tool provides general information based on publicly available law. It is not legal
          advice. Statutes of limitations can be affected by many factors including partial
          payments, written acknowledgements, and state-specific rules. Consult a licensed attorney
          for advice specific to your situation.
        </p>
      </div>
    </section>
  );
}
