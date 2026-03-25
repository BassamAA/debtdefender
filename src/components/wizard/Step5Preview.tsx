import { WizardFormData } from '@/types';
import PaymentGate from '@/components/letter/PaymentGate';

interface Props {
  formData: WizardFormData;
  letterBody: string | null;
  letterType: string;
  isGenerating: boolean;
  onBeforeCheckout?: () => void;
}

export default function Step5Preview({ formData, letterBody, letterType, isGenerating, onBeforeCheckout }: Props) {
  if (isGenerating || !letterBody) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 text-sm">Generating your letter...</p>
      </div>
    );
  }

  // Show first ~30 lines then blur
  const lines = letterBody.split('\n');
  const visibleLines = lines.slice(0, 30).join('\n');
  const hasMore = lines.length > 30;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Your Letter is Ready</h2>
      <p className="text-slate-400 text-sm mb-6">
        Review the preview below. Unlock the full letter to download the professionally
        formatted PDF.
      </p>

      {/* Letter preview card */}
      <div className="relative bg-white rounded-2xl overflow-hidden mb-6 shadow-2xl">
        {/* Letter header bar */}
        <div className="bg-navy-950 px-6 py-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-slate-400 text-xs ml-2 font-mono">
            DebtDispute — {letterType}
          </span>
        </div>

        {/* Letter body */}
        <div className="px-6 py-5">
          <pre className="letter-text text-xs sm:text-sm overflow-hidden" style={{ maxHeight: hasMore ? '420px' : undefined }}>
            {visibleLines}
          </pre>
        </div>

        {/* Blur overlay */}
        {hasMore && (
          <div className="absolute bottom-0 left-0 right-0 h-56 letter-blur-gradient pointer-events-none" />
        )}
      </div>

      {/* Payment gate */}
      <PaymentGate formData={formData} letterBody={letterBody} onBeforeCheckout={onBeforeCheckout} />
    </div>
  );
}
