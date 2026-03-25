import { Metadata } from 'next';
import InteractionTracker from '@/components/tracker/InteractionTracker';

export const metadata: Metadata = {
  title: 'Interaction Tracker — Log Every Collector Contact',
  description:
    'Document every debt collector contact. Log dates, what they said, and any rights violations. Export as PDF evidence for CFPB complaints or legal action.',
  robots: { index: false, follow: false },
};

export default function TrackerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-950 to-navy-900 py-8">
      <InteractionTracker />
    </div>
  );
}
