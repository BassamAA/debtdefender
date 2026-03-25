import { SCENARIOS } from '@/data/scenarios';
import type { ScenarioType } from '@/types';

interface Props {
  selected: ScenarioType[];
  onChange: (selected: ScenarioType[]) => void;
}

const severityBadge: Record<string, string> = {
  high:   'bg-red-500/20 text-red-400 border-red-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  low:    'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

const severityLabel: Record<string, string> = {
  high:   'Likely violation',
  medium: 'Potential violation',
  low:    'Standard contact',
};

export default function Step3Scenarios({ selected, onChange }: Props) {
  function toggle(id: ScenarioType) {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">What has the collector done?</h2>
      <p className="text-slate-400 text-sm mb-6">
        Select everything that applies. Multiple selections will be reflected in your letter.
        Some behaviors are illegal — we&apos;ll note that.
      </p>

      <div className="space-y-2">
        {SCENARIOS.map((s) => {
          const isSelected = selected.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => toggle(s.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-orange-500/15 border-orange-500 text-white'
                  : 'bg-navy-800 border-navy-600 text-slate-300 hover:border-slate-500'
              }`}
            >
              {/* Checkbox */}
              <div
                className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-orange-500 border-orange-500'
                    : 'bg-transparent border-slate-500'
                }`}
              >
                {isSelected && <span className="text-white text-xs font-bold">✓</span>}
              </div>

              {/* Icon + label */}
              <span className="text-xl">{s.icon}</span>
              <span className="flex-1 text-sm font-medium">{s.label}</span>

              {/* Severity badge */}
              <span
                className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border hidden sm:block ${severityBadge[s.severity]}`}
              >
                {severityLabel[s.severity]}
              </span>
            </button>
          );
        })}
      </div>

      {selected.length === 0 && (
        <p className="text-orange-400 text-xs mt-4">
          ← Select at least one situation that applies to you.
        </p>
      )}

      {selected.some((s) =>
        ['calling-workplace', 'contacting-family', 'threatening-to-sue'].includes(s)
      ) && (
        <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
          <p className="text-red-300 text-xs font-semibold mb-1">
            ⚠️ Potential FDCPA Violations Detected
          </p>
          <p className="text-red-400/80 text-xs leading-relaxed">
            One or more of your selected situations may constitute a direct violation of the
            Fair Debt Collection Practices Act. Your letter will specifically address these
            violations and put the collector on formal notice.
          </p>
        </div>
      )}
    </div>
  );
}
