import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { LETTER_TYPE_LABELS } from '@/lib/templateEngine';
import type { LetterType } from '@/types';

const LETTER_SLUGS: Record<string, LetterType> = {
  'debt-validation':             'debt-validation',
  'cease-and-desist':            'cease-and-desist',
  'statute-of-limitations-defense': 'statute-of-limitations',
  'not-my-debt':                 'not-my-debt',
  'cease-workplace-contact':     'cease-workplace-contact',
  'cease-third-party-contact':   'cease-third-party-contact',
  'dispute-amount':              'dispute-amount',
};

const LETTER_CONTENT: Record<LetterType, {
  headline: string;
  subheadline: string;
  legalBasis: string;
  whenToUse: string[];
  whatItDoes: string[];
  keyLaw: string;
  seoDescription: string;
}> = {
  'debt-validation': {
    headline: 'Debt Validation Request Letter',
    subheadline: 'Force the collector to prove the debt is real before you do anything.',
    legalBasis: '15 U.S.C. § 1692g (Section 809) — Fair Debt Collection Practices Act',
    whenToUse: [
      'You received a collection notice from a company you don\'t recognize',
      'The amount doesn\'t match what you expected',
      'You want to verify the collector has the legal right to collect',
      'You haven\'t responded yet and want to buy time while asserting your rights',
    ],
    whatItDoes: [
      'Demands the collector provide proof of the debt in writing',
      'Legally requires them to cease all collection activity until verification is provided',
      'Requires chain-of-title documentation (who sold the debt and when)',
      'Demands proof they are licensed to collect in your state',
      'Puts them on notice of FDCPA civil liability for non-compliance',
    ],
    keyLaw: 'Under 15 U.S.C. § 1692g, you have 30 days from first contact to send a written dispute. The collector must stop all collection activity until they verify the debt.',
    seoDescription: 'A debt validation letter legally requires debt collectors to prove the debt is real. Under FDCPA § 1692g, collectors must cease all activity until they provide verification.',
  },
  'cease-and-desist': {
    headline: 'Cease & Desist — Stop All Collection Contact',
    subheadline: 'Legally require the debt collector to stop all communication with you.',
    legalBasis: '15 U.S.C. § 1692c(c) (Section 805c) — Fair Debt Collection Practices Act',
    whenToUse: [
      'Collector calls are constant and affecting your quality of life',
      'You\'ve verified the debt and decided how to handle it',
      'You want all future communication to be in writing only',
      'You are represented by an attorney and want direct contact to stop',
    ],
    whatItDoes: [
      'Provides written notice under 15 U.S.C. § 1692c(c) to cease all communication',
      'Demands cessation of all phone calls, texts, mail, and in-person contact',
      'Limits any future contact to the three narrow exceptions allowed by law',
      'Documents the date of notice for FDCPA violation tracking',
      'Warns of civil liability ($1,000 per violation) for non-compliance',
    ],
    keyLaw: 'Under 15 U.S.C. § 1692c(c), once you notify a collector in writing to stop contacting you, they must cease — except to notify you of specific legal actions they intend to take.',
    seoDescription: 'A cease and desist letter legally requires debt collectors to stop all contact under FDCPA § 1692c(c). Violations after receipt can result in $1,000 statutory damages.',
  },
  'statute-of-limitations': {
    headline: 'Statute of Limitations Defense Letter',
    subheadline: 'Put collectors on notice: this debt is past the legal deadline.',
    legalBasis: '15 U.S.C. § 1692e, § 1692f — FDCPA; CFPB Regulation F, 12 C.F.R. § 1006.26',
    whenToUse: [
      'Your debt is older than the statute of limitations in your state or province',
      'A collector is threatening to sue on an old debt',
      'You want to put the collector on formal notice of your defense',
      'You want to stop collection activity on a time-barred debt',
    ],
    whatItDoes: [
      'Formally notifies the collector that the debt is past the limitation period',
      'Demands cessation of collection activity on the time-barred debt',
      'Warns that any lawsuit will be defended on SOL grounds',
      'Cites CFPB Regulation F requirements for time-barred debt disclosures',
      'Documents the notice for any future FDCPA claim',
    ],
    keyLaw: 'CFPB Regulation F requires debt collectors to disclose when a debt is time-barred. Suing or threatening to sue on a time-barred debt violates 15 U.S.C. § 1692e (false representations).',
    seoDescription: 'A statute of limitations defense letter puts debt collectors on notice that a debt is time-barred. Under FDCPA and CFPB Regulation F, collectors must disclose time-barred status.',
  },
  'not-my-debt': {
    headline: 'Not My Debt — Identity Theft Dispute Letter',
    subheadline: "Tell the collector this debt doesn't belong to you and demand they prove otherwise.",
    legalBasis: '15 U.S.C. § 1692g (Section 809); 15 U.S.C. § 1681c-2 (FCRA) — Identity Theft',
    whenToUse: [
      "You don't recognize the creditor or debt at all",
      'You believe you may be a victim of identity theft',
      'You already paid this debt and are being pursued again',
      'The debt belongs to someone with a similar name',
    ],
    whatItDoes: [
      'Formally disputes the debt in its entirety under FDCPA § 1692g',
      'Demands the original signed agreement or application proving the debt is yours',
      'Invokes FCRA protections if the debt is on your credit report',
      'Puts the collector on notice of identity theft if applicable',
      'Demands complete chain-of-title documentation',
    ],
    keyLaw: 'Under 15 U.S.C. § 1692g, a written dispute requires the collector to verify the debt before proceeding. If identity theft is involved, FCRA § 1681c-2 requires credit bureaus to block fraudulent account information.',
    seoDescription: 'Dispute a debt you don\'t recognize with this FDCPA letter. Under FDCPA § 1692g and FCRA § 1681c-2, collectors must verify the debt and credit bureaus must block fraudulent accounts.',
  },
  'cease-workplace-contact': {
    headline: 'Cease Workplace Contact Letter',
    subheadline: 'Stop debt collectors from calling your employer.',
    legalBasis: '15 U.S.C. § 1692c(a)(3) (Section 805(a)(3)) — Fair Debt Collection Practices Act',
    whenToUse: [
      "A debt collector has called or contacted you at work",
      'Your employer prohibits personal calls during work hours',
      'Collector calls at work are threatening your employment',
      'You want to formally document workplace contact for an FDCPA claim',
    ],
    whatItDoes: [
      'Provides formal notice that your employer prohibits collection calls',
      'Demands immediate cessation of all workplace contact',
      'Documents the notice, making future workplace calls a knowing FDCPA violation',
      'Warns of actual damage claims (including employment harm) plus statutory damages',
    ],
    keyLaw: 'Under 15 U.S.C. § 1692c(a)(3), once a collector knows your employer prohibits such calls, any further workplace contact is a direct FDCPA violation subject to actual and statutory damages.',
    seoDescription: 'Stop debt collectors from calling your workplace with this FDCPA letter. Under § 1692c(a)(3), collectors who know your employer prohibits such calls must stop immediately.',
  },
  'cease-third-party-contact': {
    headline: 'Cease Third-Party Contact Letter',
    subheadline: 'Stop collectors from contacting your family, friends, or neighbors.',
    legalBasis: '15 U.S.C. § 1692b, § 1692c(b) (Sections 804, 805(b)) — Fair Debt Collection Practices Act',
    whenToUse: [
      'A collector has contacted your family members about your debt',
      'You have received reports that collectors are calling your friends or neighbors',
      'A collector disclosed your debt to a third party',
      'You want to document third-party contact for a civil FDCPA claim',
    ],
    whatItDoes: [
      'Formally demands all third-party contact cease immediately',
      'Cites FDCPA §§ 1692b and 1692c(b) prohibiting disclosure of debts to third parties',
      'Documents the violations for civil litigation',
      'Demands the names of all third parties contacted and content of communications',
      'Warns of substantial actual damage claims for reputation and relationship harm',
    ],
    keyLaw: 'Under 15 U.S.C. § 1692c(b), debt collectors may not communicate with third parties about a consumer\'s debt except in extremely narrow circumstances. Third-party contact is one of the most serious FDCPA violations.',
    seoDescription: 'Stop debt collectors from contacting your family or friends. Under FDCPA §§ 1692b and 1692c(b), collectors are prohibited from disclosing your debt to third parties.',
  },
  'dispute-amount': {
    headline: 'Dispute of Amount Claimed Letter',
    subheadline: 'Challenge inflated or unauthorized fees added to your debt.',
    legalBasis: '15 U.S.C. § 1692f(1) (Section 808(1)); § 1692e(2)(A) (Section 807(2)(A)) — FDCPA',
    whenToUse: [
      'The amount the collector claims is higher than what you believe you owe',
      "Fees, interest, or collection costs have been added that weren't in your original agreement",
      'The balance has grown substantially from the original debt',
      'You want an itemized breakdown of all charges before responding',
    ],
    whatItDoes: [
      'Formally disputes the amount claimed under FDCPA § 1692g',
      'Demands a complete itemized accounting of all charges',
      'Cites § 1692f(1) prohibiting collection of amounts not authorized by the original agreement',
      'Demands the original agreement authorizing all fees and interest charges',
      'Warns of civil liability for collecting unauthorized amounts',
    ],
    keyLaw: 'Under 15 U.S.C. § 1692f(1), debt collectors may only collect amounts expressly authorized by the original agreement or permitted by law. Collecting unauthorized fees is an FDCPA violation regardless of whether the underlying debt is legitimate.',
    seoDescription: 'Dispute inflated debt amounts with this FDCPA letter. Under § 1692f(1), collectors can only collect amounts authorized by the original agreement — unauthorized fees are a violation.',
  },
};

interface Props {
  params: Promise<{ 'letter-type': string }>;
}

export async function generateStaticParams() {
  return Object.keys(LETTER_SLUGS).map((slug) => ({ 'letter-type': slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { 'letter-type': slug } = await params;
  const letterType = LETTER_SLUGS[slug];
  if (!letterType) return { title: 'Not Found' };
  const content = LETTER_CONTENT[letterType];
  return {
    title: content.headline,
    description: content.seoDescription,
    openGraph: { title: content.headline, description: content.seoDescription },
    alternates: { canonical: `/letters/${slug}` },
  };
}

export default async function LetterTypePage({ params }: Props) {
  const { 'letter-type': slug } = await params;
  const letterType = LETTER_SLUGS[slug];
  if (!letterType) notFound();

  const content = LETTER_CONTENT[letterType];
  const label = LETTER_TYPE_LABELS[letterType];

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-navy-900 to-navy-950 border-b border-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
            <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/wizard" className="hover:text-orange-400 transition-colors">Letters</Link>
            <span>/</span>
            <span>{label}</span>
          </div>
          <div className="max-w-3xl">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-orange-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              {content.headline}
            </h1>
            <p className="text-slate-400 text-lg mb-4">{content.subheadline}</p>
            <div className="inline-flex items-center gap-2 bg-navy-800 border border-navy-600 rounded-lg px-3 py-2">
              <span className="text-xs text-slate-400 font-mono">{content.legalBasis}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Key law */}
              <div className="bg-steel-500/10 border border-steel-500/30 rounded-xl p-5">
                <h2 className="text-steel-300 font-bold text-sm mb-2 uppercase tracking-wider">
                  The Law That Protects You
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">{content.keyLaw}</p>
              </div>

              {/* When to use */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">When to Use This Letter</h2>
                <div className="space-y-2">
                  {content.whenToUse.map((item) => (
                    <div key={item} className="flex items-start gap-3 bg-navy-900 border border-navy-700 rounded-xl px-4 py-3">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What it does */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">What This Letter Does</h2>
                <div className="space-y-2">
                  {content.whatItDoes.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <ArrowRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div>
              <div className="bg-gradient-to-br from-orange-500/15 to-orange-600/5 border border-orange-500/40 rounded-2xl p-6 sticky top-20">
                <Shield className="w-8 h-8 text-orange-400 mb-3" />
                <h3 className="text-white font-bold text-base mb-2">
                  Generate This Letter
                </h3>
                <p className="text-slate-400 text-xs mb-5 leading-relaxed">
                  Complete the 5-step wizard and get a professionally formatted PDF citing the
                  exact law for your jurisdiction.
                </p>
                <Link
                  href="/wizard"
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-sm text-center transition-colors mb-3"
                >
                  Generate My Letter — $12.99
                </Link>
                <Link
                  href="/#statute-checker"
                  className="block w-full bg-navy-800 hover:bg-navy-700 text-slate-300 font-medium py-2.5 rounded-xl text-xs text-center border border-navy-600 transition-colors"
                >
                  Check SOL — Free
                </Link>
                <p className="text-slate-600 text-xs mt-3 text-center">
                  Preview is always free. Pay to download PDF.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 border-t border-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-slate-600 text-xs leading-relaxed">
            DebtDefender provides document preparation assistance and is not a law firm. This
            does not constitute legal advice. Consult a licensed attorney for legal counsel.
          </p>
        </div>
      </section>
    </div>
  );
}
