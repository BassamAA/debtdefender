import Link from 'next/link';
import { Search, FileText, Download, ChevronRight } from 'lucide-react';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Check the Statute of Limitations',
    description:
      "Enter your province or state and debt type. We'll instantly tell you if the debt is past the legal deadline — for free. No signup.",
    color: 'text-steel-500',
    bg: 'bg-steel-500/10',
  },
  {
    icon: FileText,
    step: '02',
    title: 'Complete the 5-Step Wizard',
    description:
      "Tell us what's happening — the debt details, what the collector has done, and what outcome you want. Takes under 3 minutes.",
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
  },
  {
    icon: Download,
    step: '03',
    title: 'Download Your Professional Letter',
    description:
      'Get a PDF letter that cites the exact law that protects you. Mail it certified, keep a copy, and document every response.',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-navy-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Three Steps to Taking Back Control
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Debt collectors are counting on you being scared. Here&apos;s how to flip that.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {steps.map((s) => (
            <div
              key={s.step}
              className="relative bg-navy-900 border border-navy-700 rounded-2xl p-6 card-hover"
            >
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-navy-800 border border-navy-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-slate-400">{s.step}</span>
              </div>
              <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center mb-4`}>
                <s.icon className={`w-6 h-6 ${s.color}`} />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        {/* What the law gives you */}
        <div className="bg-gradient-to-br from-navy-900 to-navy-800 border border-navy-700 rounded-2xl p-8 sm:p-10">
          <h3 className="text-white font-bold text-xl mb-6 text-center">
            What the FDCPA Actually Gives You
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              { right: 'Demand proof the debt is real', law: '§ 809 FDCPA' },
              { right: 'Make them stop calling you', law: '§ 805(c) FDCPA' },
              { right: 'Prohibit calls to your workplace', law: '§ 805(a)(3) FDCPA' },
              { right: 'Stop contact with family or friends', law: '§ 805(b) FDCPA' },
              { right: 'Sue for $1,000 per violation', law: '§ 813 FDCPA' },
              { right: 'Defend against time-barred debts', law: 'State SOL Laws' },
            ].map((item) => (
              <div key={item.right} className="flex items-start gap-3">
                <span className="text-orange-400 font-bold mt-0.5">✓</span>
                <div>
                  <span className="text-white text-sm font-medium">{item.right}</span>
                  <span className="ml-2 text-xs text-steel-500 font-mono">{item.law}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/wizard"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-lg shadow-orange-500/20"
            >
              Generate My Letter Now
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
