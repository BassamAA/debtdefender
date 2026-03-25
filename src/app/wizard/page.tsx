import { Suspense } from 'react';
import { Metadata } from 'next';
import WizardContainer from '@/components/wizard/WizardContainer';

export const metadata: Metadata = {
  title: 'Generate a Dispute Letter',
  description:
    'Generate a professional, law-citing debt dispute letter in minutes. Choose your situation, select your goals, and download a PDF ready to mail.',
};

export default function WizardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-950 to-navy-900 py-8">
      <Suspense fallback={<div className="text-center text-slate-400 py-20">Loading wizard...</div>}>
        <WizardContainer />
      </Suspense>
    </div>
  );
}
