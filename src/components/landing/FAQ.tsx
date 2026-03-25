'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Is it legal to dispute a debt?',
    a: "Absolutely. Disputing a debt is a federally protected right under the Fair Debt Collection Practices Act (FDCPA), 15 U.S.C. § 1692g. When you send a written dispute, the debt collector must stop all collection activity until they verify the debt. This is not a loophole — it's exactly what the law was designed for. Congress passed the FDCPA specifically because debt collectors had a long history of collecting debts from the wrong people, in the wrong amounts, or past legal deadlines.",
  },
  {
    q: "Will disputing a debt hurt my credit score?",
    a: "Disputing a debt through a collector does not directly affect your credit score. However, if the debt is already on your credit report, you should also file a dispute directly with the credit bureaus (Equifax, Experian, TransUnion) under the Fair Credit Reporting Act (FCRA), 15 U.S.C. § 1681i. The credit bureau must investigate and remove or correct inaccurate information. Note: if a debt collector reports a debt to a credit bureau after you've disputed it in writing without noting it as 'disputed,' that itself is an FDCPA violation.",
  },
  {
    q: "What if the debt collector ignores my letter?",
    a: "If a debt collector violates the FDCPA after receiving your written dispute or cease-and-desist letter, you have the right to sue them in federal court. Under 15 U.S.C. § 1692k, you can recover: (1) actual damages (money you lost), (2) statutory damages up to $1,000 per case, and (3) attorney's fees and court costs. Many consumer rights attorneys take FDCPA cases on contingency — meaning no upfront cost to you. You should also file complaints with the CFPB (consumerfinance.gov) and your state attorney general. These complaints create a regulatory record that can lead to enforcement action.",
  },
  {
    q: 'What is debt validation? Why should I request it?',
    a: "Debt validation is the process by which a debt collector proves that: (1) the debt actually exists, (2) the amount is correct, (3) they have the legal right to collect it, and (4) the debt belongs to you. Under 15 U.S.C. § 1692g, a collector must send you a validation notice within 5 days of first contact. If you send a written dispute within 30 days, they must cease all collection activity until they verify the debt. Many debts sold to collection agencies have incomplete records. Collectors sometimes pursue the wrong person, inflate amounts with unauthorized fees, or collect on debts they don't legally own. Requesting validation forces them to prove their case before you do anything.",
  },
  {
    q: 'Can a debt collector sue me after the statute of limitations?',
    a: "Technically, a debt collector can file a lawsuit at any time — courts don't automatically check the statute of limitations. But if you raise the SOL as a defense in court, the case will be dismissed. The problem is that if you don't show up to court or don't raise the defense, the collector can get a default judgment against you even on a time-barred debt. The CFPB's Regulation F requires debt collectors to disclose when a debt is time-barred before suing. Filing suit on a time-barred debt without this disclosure is an FDCPA violation. If you receive a lawsuit for a debt you believe is past the SOL, do not ignore it — show up and raise the defense, or consult an attorney immediately.",
  },
  {
    q: 'Can debt collectors call my workplace?',
    a: "Debt collectors are prohibited from contacting you at work if they know or have reason to know your employer prohibits such calls (15 U.S.C. § 1692c(a)(3)). By sending a written notice that your employer prohibits collection calls, you put the collector on notice — any further work calls are a knowing FDCPA violation. If calls at work could jeopardize your job, document everything and consult a consumer rights attorney about recovering actual damages, which can be substantial if workplace contact causes real employment harm.",
  },
  {
    q: 'Can a debt collector contact my family or friends?',
    a: "Only in very limited circumstances. Under 15 U.S.C. § 1692b, a collector may contact third parties only to locate you (location information), and even then cannot tell them you owe a debt, cannot contact the same person more than once, and cannot behave in a way that could embarrass you. Once they have your contact information, they may not contact any third party about your debt. Contacting family members, neighbors, or coworkers and discussing your debt is a serious FDCPA violation — courts have awarded significant actual damages for the emotional distress and damaged relationships this causes.",
  },
  {
    q: 'What is the FDCPA and does it apply to me?',
    a: "The Fair Debt Collection Practices Act (FDCPA), 15 U.S.C. § 1692 et seq., is a federal law that governs third-party debt collectors — companies that collect debts on behalf of others or that purchased the debt. It covers personal, family, and household debts (credit cards, medical bills, auto loans, mortgages, student loans). It does not cover business debts or the original creditor collecting their own debt (though many states have laws extending similar protections to original creditors). In Canada, equivalent protections exist under provincial collection agency legislation. If you're in the US and being contacted by a debt collector about a personal debt, the FDCPA almost certainly applies to you.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-navy-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-base">
            Real answers to the questions people are afraid to ask.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-navy-900 border border-navy-700 rounded-xl overflow-hidden"
            >
              <button
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-white font-semibold text-sm leading-relaxed group-hover:text-orange-300 transition-colors">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5 transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 border-t border-navy-800">
                  <p className="text-slate-400 text-sm leading-relaxed pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
