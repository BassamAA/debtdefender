import { Metadata } from 'next';
import Hero from '@/components/landing/Hero';
import StatuteChecker from '@/components/landing/StatuteChecker';
import HowItWorks from '@/components/landing/HowItWorks';
import FAQ from '@/components/landing/FAQ';
import Link from 'next/link';
import { Shield, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DebtDispute — Stop Debt Collectors in Their Tracks',
  description:
    'Free statute of limitations checker and professional debt dispute letter generator. Know your rights under the FDCPA. Fight back against debt collectors legally.',
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://debtdispute.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DebtDispute',
  url: BASE_URL,
  logo: `${BASE_URL}/og-image.svg`,
  description:
    'Free statute of limitations checker and professional debt dispute letter generator. Know your rights under the FDCPA.',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: BASE_URL,
  name: 'DebtDispute',
  description: 'Free statute of limitations checker and professional debt dispute letter generator.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is it legal to dispute a debt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Disputing a debt is a federally protected right under the Fair Debt Collection Practices Act (FDCPA), 15 U.S.C. § 1692g. When you send a written dispute, the debt collector must stop all collection activity until they verify the debt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will disputing a debt hurt my credit score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Disputing a debt through a collector does not directly affect your credit score. However, if the debt is already on your credit report, you should also file a dispute directly with the credit bureaus under the Fair Credit Reporting Act (FCRA), 15 U.S.C. § 1681i.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is debt validation? Why should I request it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Debt validation is the process by which a debt collector proves that the debt exists, the amount is correct, and they have the legal right to collect it. Under 15 U.S.C. § 1692g, if you send a written dispute within 30 days of first contact, they must cease all collection activity until they verify the debt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a debt collector sue me after the statute of limitations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Technically yes, but the lawsuit can be dismissed if you raise the statute of limitations as a defense. The CFPB\'s Regulation F requires debt collectors to disclose when a debt is time-barred. Filing suit on a time-barred debt without this disclosure is an FDCPA violation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the FDCPA and does it apply to me?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Fair Debt Collection Practices Act (FDCPA), 15 U.S.C. § 1692 et seq., is a federal law governing third-party debt collectors. It covers personal, family, and household debts including credit cards, medical bills, auto loans, and student loans. If you are in the US and being contacted by a debt collector about a personal debt, the FDCPA almost certainly applies to you.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can debt collectors call my workplace?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Debt collectors are prohibited from contacting you at work if they know or have reason to know your employer prohibits such calls (15 U.S.C. § 1692c(a)(3)). By sending a written notice, you put the collector on notice — any further work calls are a knowing FDCPA violation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a debt collector contact my family or friends?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Only in very limited circumstances. Under 15 U.S.C. § 1692b, a collector may contact third parties only to locate you, and even then cannot tell them you owe a debt. Once they have your contact information, they may not contact any third party about your debt.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
            DebtDispute provides document preparation assistance and is not a law firm. This does
            not constitute legal advice. Consult a licensed attorney for legal counsel. The
            information provided is for general informational purposes only and may not reflect the
            most current legal developments.
          </p>
        </div>
      </section>
    </>
  );
}
