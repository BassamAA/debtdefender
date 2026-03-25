'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import ProgressBar from './ProgressBar';
import Step1Jurisdiction from './Step1Jurisdiction';
import Step2DebtDetails from './Step2DebtDetails';
import Step3Scenarios from './Step3Scenarios';
import Step4Actions from './Step4Actions';
import Step5Preview from './Step5Preview';
import type { WizardFormData, Jurisdiction, DebtType } from '@/types';
import { LETTER_TYPE_LABELS } from '@/lib/templateEngine';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';

const TOTAL_STEPS = 5;
const STEP_LABELS = ['Location', 'Debt Details', 'What Happened', 'Your Goal', 'Preview'];
const STORAGE_KEY = 'debtdispute_wizard_formdata';
const SAVED_DETAILS_KEY = 'debtdispute_saved_details';

const EMPTY_FORM: WizardFormData = {
  jurisdiction: '',
  debtType: '',
  approximateAmount: '',
  debtAgeYears: '',
  originalCreditorName: '',
  collectorName: '',
  scenarios: [],
  actions: [],
  yourName: '',
  yourAddress: '',
};

export default function WizardContainer() {
  const searchParams = useSearchParams();
  const goingToCheckout = useRef(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>(() => {
    const jurisdiction = searchParams.get('jurisdiction') as Jurisdiction | null;
    const debtType = searchParams.get('debtType') as DebtType | null;
    return {
      ...EMPTY_FORM,
      jurisdiction: jurisdiction ?? '',
      debtType: debtType ?? '',
    };
  });
  const [letterBody, setLetterBody] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [letterType, setLetterType] = useState('');
  const [showNameForm, setShowNameForm] = useState(false);
  const [rememberDetails, setRememberDetails] = useState(false);

  // On mount: restore cancelled form data or pre-fill saved details
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('cancelled') === 'true') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const restored: WizardFormData = JSON.parse(saved);
          setFormData(restored);
          setStep(4);
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }

    // Pre-fill name/address from saved details
    const saved = localStorage.getItem(SAVED_DETAILS_KEY);
    if (saved) {
      try {
        const details: { yourName: string; yourAddress: string } = JSON.parse(saved);
        setFormData((prev) => ({
          ...prev,
          yourName: details.yourName ?? '',
          yourAddress: details.yourAddress ?? '',
        }));
        setRememberDetails(true);
      } catch {
        localStorage.removeItem(SAVED_DETAILS_KEY);
      }
    }
  }, []);

  function updateField(field: keyof WizardFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function canAdvance(): boolean {
    switch (step) {
      case 1: return !!formData.jurisdiction;
      case 2: return !!formData.debtType;
      case 3: return formData.scenarios.length > 0;
      case 4: return formData.actions.length > 0;
      default: return true;
    }
  }

  async function generateLetter(data: WizardFormData) {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setLetterBody(json.letterBody);
      setLetterType(json.letterType ? LETTER_TYPE_LABELS[json.letterType as keyof typeof LETTER_TYPE_LABELS] ?? json.letterType : '');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  }

  function handleNext() {
    if (!canAdvance()) return;
    if (step === 4) {
      if (!formData.yourName) {
        setShowNameForm(true);
        return;
      }
      setStep(5);
      generateLetter(formData);
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleNameSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!formData.yourName) return;
    if (rememberDetails) {
      localStorage.setItem(SAVED_DETAILS_KEY, JSON.stringify({
        yourName: formData.yourName,
        yourAddress: formData.yourAddress,
      }));
    } else {
      localStorage.removeItem(SAVED_DETAILS_KEY);
    }
    setShowNameForm(false);
    setStep(5);
    generateLetter(formData);
  }

  function handleBack() {
    if (showNameForm) {
      setShowNameForm(false);
      return;
    }
    if (step > 1) setStep((s) => s - 1);
  }

  // Called just before redirecting to Stripe — saves form so it can be restored on cancel
  function saveBeforeCheckout() {
    goingToCheckout.current = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Dispute Letter Generator</h1>
          <p className="text-slate-400 text-xs">Professionally crafted letters citing real law.</p>
        </div>
      </div>

      <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} stepLabels={STEP_LABELS} />

      {/* Card */}
      <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 sm:p-8 mb-6">
        {showNameForm ? (
          <form onSubmit={handleNameSubmit}>
            <h2 className="text-2xl font-bold text-white mb-2">One last thing</h2>
            <p className="text-slate-400 text-sm mb-6">
              Your name and address will appear on the letter. Use your full legal name.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Your Full Name <span className="text-orange-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Smith"
                  value={formData.yourName}
                  onChange={(e) => updateField('yourName', e.target.value)}
                  className="w-full bg-navy-800 border border-navy-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Your Address
                </label>
                <textarea
                  placeholder="123 Main St, City, Province/State, Postal Code"
                  value={formData.yourAddress}
                  onChange={(e) => updateField('yourAddress', e.target.value)}
                  rows={3}
                  className="w-full bg-navy-800 border border-navy-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none"
                />
              </div>
              {/* Remember my details */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => setRememberDetails((v) => !v)}
                  className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
                    rememberDetails
                      ? 'bg-orange-500 border-orange-500'
                      : 'bg-navy-800 border-navy-500 group-hover:border-orange-500/60'
                  }`}
                >
                  {rememberDetails && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors select-none">
                  Remember my name and address for next time
                </span>
              </label>
            </div>
          </form>
        ) : (
          <>
            {step === 1 && (
              <Step1Jurisdiction
                value={formData.jurisdiction}
                onChange={(v) => updateField('jurisdiction', v)}
              />
            )}
            {step === 2 && (
              <Step2DebtDetails
                formData={formData}
                onChange={updateField}
              />
            )}
            {step === 3 && (
              <Step3Scenarios
                selected={formData.scenarios}
                onChange={(v) => setFormData((prev) => ({ ...prev, scenarios: v }))}
              />
            )}
            {step === 4 && (
              <Step4Actions
                selected={formData.actions}
                onChange={(v) => setFormData((prev) => ({ ...prev, actions: v }))}
              />
            )}
            {step === 5 && (
              <Step5Preview
                formData={formData}
                letterBody={letterBody}
                letterType={letterType}
                isGenerating={isGenerating}
                onBeforeCheckout={saveBeforeCheckout}
              />
            )}
          </>
        )}
      </div>

      {/* Navigation */}
      {step < 5 && (
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1 && !showNameForm}
            className="flex items-center gap-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed font-medium text-sm transition-colors px-4 py-2.5 rounded-xl hover:bg-navy-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {showNameForm ? (
            <button
              onClick={() => handleNameSubmit()}
              disabled={!formData.yourName}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-navy-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
            >
              Generate My Letter
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canAdvance()}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-navy-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
            >
              {step === 4 ? 'Preview Letter' : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
