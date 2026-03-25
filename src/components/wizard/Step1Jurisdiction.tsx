import { JURISDICTIONS } from '@/data/jurisdictions';
import type { Jurisdiction } from '@/types';

interface Props {
  value: Jurisdiction | '';
  onChange: (v: Jurisdiction) => void;
}

const canadianJurisdictions = JURISDICTIONS.filter((j) => j.country === 'CA');
const usJurisdictions = JURISDICTIONS.filter((j) => j.country === 'US');

export default function Step1Jurisdiction({ value, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Where are you located?</h2>
      <p className="text-slate-400 text-sm mb-6">
        Your rights vary by jurisdiction. Select your province or state so we can cite the
        correct law in your letter.
      </p>

      <div className="space-y-5">
        {/* Canada */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            🇨🇦 Canada — Provincial Law
          </p>
          <div className="grid grid-cols-2 gap-2">
            {canadianJurisdictions.map((j) => (
              <button
                key={j.id}
                type="button"
                onClick={() => onChange(j.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left ${
                  value === j.id
                    ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                    : 'bg-navy-800 border-navy-600 text-slate-300 hover:border-slate-500'
                }`}
              >
                <span className="text-lg">{j.flag}</span>
                <div>
                  <div className="font-semibold">{j.name}</div>
                  <div className="text-xs text-slate-500">{j.abbreviation}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* USA */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            🇺🇸 United States — Federal FDCPA + State Law
          </p>
          <div className="grid grid-cols-2 gap-2">
            {usJurisdictions.map((j) => (
              <button
                key={j.id}
                type="button"
                onClick={() => onChange(j.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left ${
                  value === j.id
                    ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                    : 'bg-navy-800 border-navy-600 text-slate-300 hover:border-slate-500'
                }`}
              >
                <span className="text-lg">{j.flag}</span>
                <div>
                  <div className="font-semibold">{j.name}</div>
                  <div className="text-xs text-slate-500">{j.abbreviation}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {!value && (
          <p className="text-orange-400 text-xs">
            ← Select your province or state to continue.
          </p>
        )}
      </div>
    </div>
  );
}
