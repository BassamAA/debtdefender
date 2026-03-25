import { DEBT_TYPES } from '@/data/debtTypes';
import type { WizardFormData } from '@/types';

interface Props {
  formData: WizardFormData;
  onChange: (field: keyof WizardFormData, value: string) => void;
}

export default function Step2DebtDetails({ formData, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Tell us about the debt</h2>
      <p className="text-slate-400 text-sm mb-6">
        The more detail you provide, the more specific your letter will be. All fields except
        debt type are optional.
      </p>

      <div className="space-y-5">
        {/* Debt type */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Type of Debt <span className="text-orange-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {DEBT_TYPES.map((dt) => (
              <button
                key={dt.id}
                type="button"
                onClick={() => onChange('debtType', dt.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left ${
                  formData.debtType === dt.id
                    ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                    : 'bg-navy-800 border-navy-600 text-slate-300 hover:border-slate-500'
                }`}
              >
                <span className="text-xl">{dt.icon}</span>
                <span className="text-xs leading-tight">{dt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Approximate Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
            <input
              type="text"
              placeholder="e.g. 4,200"
              value={formData.approximateAmount}
              onChange={(e) => onChange('approximateAmount', e.target.value)}
              className="w-full bg-navy-800 border border-navy-600 text-white rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Debt age */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            How old is this debt?
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="30"
              step="0.5"
              placeholder="e.g. 3.5"
              value={formData.debtAgeYears}
              onChange={(e) => onChange('debtAgeYears', e.target.value)}
              className="w-full bg-navy-800 border border-navy-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">years</span>
          </div>
        </div>

        {/* Original creditor */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Original Creditor Name
          </label>
          <input
            type="text"
            placeholder="e.g. Chase Bank, Blue Cross, Honda Financial"
            value={formData.originalCreditorName}
            onChange={(e) => onChange('originalCreditorName', e.target.value)}
            className="w-full bg-navy-800 border border-navy-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
          />
        </div>

        {/* Collector name */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Collection Agency / Collector Name
          </label>
          <input
            type="text"
            placeholder="e.g. Midland Funding, Portfolio Recovery, etc."
            value={formData.collectorName}
            onChange={(e) => onChange('collectorName', e.target.value)}
            className="w-full bg-navy-800 border border-navy-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
          />
          <p className="text-xs text-slate-500 mt-1">
            Found on the collection notice or caller ID. Leave blank if unknown.
          </p>
        </div>
      </div>
    </div>
  );
}
