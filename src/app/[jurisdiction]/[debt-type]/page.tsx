import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { JURISDICTIONS } from '@/data/jurisdictions';
import { DEBT_TYPES, DEBT_TYPE_URL_SLUGS } from '@/data/debtTypes';
import { getStatuteEntry, getStatuteByJurisdiction } from '@/lib/statuteLookup';
import type { Jurisdiction, DebtType } from '@/types';
import { Shield, Clock, AlertTriangle } from 'lucide-react';

// Reverse URL slug → DebtType id
const SLUG_TO_DEBT_TYPE: Record<string, DebtType> = Object.fromEntries(
  Object.entries(DEBT_TYPE_URL_SLUGS).map(([k, v]) => [v, k as DebtType])
);

interface Props {
  params: Promise<{ jurisdiction: string; 'debt-type': string }>;
}

function resolveJurisdiction(slug: string): Jurisdiction | null {
  const j = JURISDICTIONS.find((j) => j.id === slug);
  return j ? j.id : null;
}

function resolveDebtType(slug: string): DebtType | null {
  return SLUG_TO_DEBT_TYPE[slug] ?? null;
}

export async function generateStaticParams() {
  const params: { jurisdiction: string; 'debt-type': string }[] = [];
  for (const j of JURISDICTIONS) {
    for (const [, slug] of Object.entries(DEBT_TYPE_URL_SLUGS)) {
      params.push({ jurisdiction: j.id, 'debt-type': slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { jurisdiction: jurisdictionSlug, 'debt-type': debtSlug } = await params;
  const jurisdiction = resolveJurisdiction(jurisdictionSlug);
  const debtType = resolveDebtType(debtSlug);
  if (!jurisdiction || !debtType) return { title: 'Not Found' };

  const jInfo = JURISDICTIONS.find((j) => j.id === jurisdiction);
  const dtInfo = DEBT_TYPES.find((d) => d.id === debtType);
  const statute = getStatuteEntry(jurisdiction, debtType);

  const title = `${dtInfo?.label} Statute of Limitations in ${jInfo?.name} — ${statute?.years} Years`;
  const description = `The statute of limitations for ${dtInfo?.label.toLowerCase()} in ${jInfo?.name} is ${statute?.years} years (${statute?.citation}). Find out if your debt is time-barred and generate a dispute letter.`;

  return {
    title,
    description,
    openGraph: { title, description },
    alternates: { canonical: `/${jurisdictionSlug}/${debtSlug}` },
  };
}

export default async function JurisdictionDebtPage({ params }: Props) {
  const { jurisdiction: jurisdictionSlug, 'debt-type': debtSlug } = await params;
  const jurisdictionId = resolveJurisdiction(jurisdictionSlug);
  const debtTypeId = resolveDebtType(debtSlug);

  if (!jurisdictionId || !debtTypeId) notFound();

  const jInfo = JURISDICTIONS.find((j) => j.id === jurisdictionId)!;
  const dtInfo = DEBT_TYPES.find((d) => d.id === debtTypeId)!;
  const statute = getStatuteEntry(jurisdictionId, debtTypeId)!;
  const jurisdictionData = getStatuteByJurisdiction(jurisdictionId)!;

  const isUS = jInfo.country === 'US';
  const law = isUS ? 'the Fair Debt Collection Practices Act (FDCPA)' : 'provincial collection agency legislation';

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-navy-900 to-navy-950 border-b border-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
            <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <span>/</span>
            <span>{jInfo.name}</span>
            <span>/</span>
            <span>{dtInfo.label}</span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">{jInfo.flag}</div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-2">
                {dtInfo.label} Statute of Limitations in {jInfo.name}
              </h1>
              <p className="text-slate-400 text-base">
                How long collectors have to sue you — and what happens when that deadline passes.
              </p>
            </div>
          </div>

          {/* Key stat */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-navy-800 border border-navy-600 rounded-xl p-5 text-center sm:col-span-1">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-orange-400" />
              </div>
              <p className="text-4xl font-extrabold text-orange-400">{statute.years}</p>
              <p className="text-slate-400 text-sm mt-1">Years — Limitation Period</p>
            </div>
            <div className="bg-navy-800 border border-navy-600 rounded-xl p-5 sm:col-span-2">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Legal Citation</p>
              <p className="text-white font-mono text-sm leading-relaxed">{statute.citation}</p>
              <p className="text-slate-500 text-xs mt-2">{statute.lawName}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* What this means */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">
                  What Does This Mean for You?
                </h2>
                <div className="text-slate-300 text-sm leading-relaxed space-y-3">
                  <p>
                    In {jInfo.name}, a debt collector has <strong className="text-white">{statute.years} years</strong> from
                    the date of your last payment or default to file a lawsuit against you for {dtInfo.label.toLowerCase()}.
                    After that deadline passes, the debt becomes <em>legally unenforceable through the courts</em> — even
                    if the underlying obligation still technically exists.
                  </p>
                  <p>
                    This means that if your {dtInfo.label.toLowerCase()} is more than {statute.years} years old and you
                    have made no payments and sent no written acknowledgements, a collector cannot obtain a court judgment
                    against you. Any lawsuit filed after this deadline can be dismissed by raising the statute of
                    limitations as a defense.
                  </p>
                  <p>{statute.notes}</p>
                </div>
              </div>

              {/* What collectors cannot do */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">
                  What Collectors Are Prohibited From Doing
                </h2>
                <div className="text-slate-300 text-sm leading-relaxed space-y-3">
                  <p>
                    Even on a time-barred debt, collectors may still contact you asking for
                    voluntary payment — but they are prohibited from:
                  </p>
                  <ul className="space-y-2">
                    {[
                      `Filing or threatening to file a lawsuit in ${jInfo.name} — this is a violation of ${law}`,
                      isUS ? 'Failing to disclose that the debt is time-barred if they are offering to settle it (CFPB Regulation F, 12 C.F.R. § 1006.26)' : 'Misrepresenting the legal status of the debt under provincial consumer protection law',
                      'Tricking you into making a "small payment" to restart the limitations clock',
                      'Reporting the debt to a credit bureau beyond the 7-year reporting period (US) or applicable period (Canada)',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Warning about restarting clock */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5">
                <h3 className="text-yellow-300 font-bold text-sm mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Critical Warning: Don&apos;t Restart the Clock
                </h3>
                <div className="text-yellow-400/80 text-xs leading-relaxed space-y-2">
                  <p>
                    Making <em>any</em> payment — even $1 — or making a written acknowledgement that
                    you owe the debt can restart the statute of limitations in most jurisdictions.
                    Before making any payment or written response on an old debt, verify whether the
                    debt is time-barred.
                  </p>
                  <p>
                    If a collector is pressuring you to make a &quot;good faith payment&quot; or
                    &quot;settle for a fraction,&quot; they may be attempting to revive a time-barred
                    debt. Do not pay without consulting an attorney first.
                  </p>
                </div>
              </div>

              {/* How to respond */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">
                  How to Respond to a Collector on a Time-Barred Debt
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      title: '1. Do not pay or acknowledge the debt in writing',
                      desc: 'Any payment or written acknowledgement can restart the limitation clock. Stay silent on the question of whether you owe the debt.',
                    },
                    {
                      title: '2. Send a Statute of Limitations Defense Letter',
                      desc: `Put the collector on formal notice that the debt is past the ${statute.years}-year limitation period and that any attempt to sue will be vigorously defended.`,
                    },
                    {
                      title: '3. Request debt validation',
                      desc: isUS
                        ? 'Under 15 U.S.C. § 1692g, you can demand the collector verify the debt, including the original date of default — which establishes whether the SOL has expired.'
                        : 'Under provincial collection agency legislation, you can demand complete information about the debt including the original default date.',
                    },
                    {
                      title: '4. File a complaint if they threaten to sue',
                      desc: `Report to the ${jurisdictionData.regulatoryBody}. ${isUS ? 'Also file with the CFPB at consumerfinance.gov. Threatening to sue on a time-barred debt is an FDCPA violation.' : ''}`,
                    },
                  ].map((step) => (
                    <div key={step.title} className="bg-navy-900 border border-navy-700 rounded-xl p-4">
                      <p className="text-white font-semibold text-sm mb-1">{step.title}</p>
                      <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* CTA */}
              <div className="bg-gradient-to-br from-orange-500/15 to-orange-600/5 border border-orange-500/40 rounded-2xl p-6 sticky top-20">
                <Shield className="w-8 h-8 text-orange-400 mb-3" />
                <h3 className="text-white font-bold text-base mb-2">
                  Generate a {jInfo.name} Dispute Letter
                </h3>
                <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                  Pre-filled with {jInfo.name} law citations. Ready to mail in minutes.
                </p>
                <Link
                  href={`/wizard?jurisdiction=${jurisdictionId}&debtType=${debtTypeId}`}
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-sm text-center transition-colors mb-3"
                >
                  Generate Letter →
                </Link>
                <Link
                  href="/#statute-checker"
                  className="block w-full bg-navy-800 hover:bg-navy-700 text-slate-300 font-medium py-2.5 rounded-xl text-xs text-center border border-navy-600 transition-colors"
                >
                  Check Your SOL — Free
                </Link>
              </div>

              {/* Other debt types in this jurisdiction */}
              <div className="bg-navy-900 border border-navy-700 rounded-xl p-4">
                <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
                  Other Debt Types in {jInfo.name}
                </h4>
                <div className="space-y-1">
                  {DEBT_TYPES.filter((d) => d.id !== debtTypeId).map((d) => {
                    const slug = DEBT_TYPE_URL_SLUGS[d.id];
                    return (
                      <Link
                        key={d.id}
                        href={`/${jurisdictionId}/${slug}`}
                        className="flex items-center justify-between text-xs text-slate-400 hover:text-orange-400 py-1.5 transition-colors"
                      >
                        <span>{d.icon} {d.label}</span>
                        <span className="text-slate-600">→</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 border-t border-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-slate-600 text-xs leading-relaxed text-center">
            This page provides general legal information about the statute of limitations for{' '}
            {dtInfo.label.toLowerCase()} in {jInfo.name}. It is not legal advice. Statutes of
            limitations can be affected by partial payments, written acknowledgements, and other
            factors specific to your case. Consult a licensed attorney for advice on your situation.
          </p>
        </div>
      </section>
    </div>
  );
}
