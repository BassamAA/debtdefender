import { ACTIONS } from '@/data/actions';
import type { ActionType } from '@/types';

interface Props {
  selected: ActionType[];
  onChange: (selected: ActionType[]) => void;
}

export default function Step4Actions({ selected, onChange }: Props) {
  function toggle(id: ActionType) {
    if (selected.includes(id)) {
      onChange(selected.filter((a) => a !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">What do you want to do?</h2>
      <p className="text-slate-400 text-sm mb-6">
        Select your goal. We&apos;ll generate the strongest letter for your situation.
        You can choose multiple actions — we&apos;ll combine them.
      </p>

      <div className="space-y-3">
        {ACTIONS.map((a) => {
          const isSelected = selected.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => toggle(a.id)}
              className={`w-full flex items-start gap-4 px-5 py-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-orange-500/15 border-orange-500'
                  : 'bg-navy-800 border-navy-600 hover:border-slate-500'
              }`}
            >
              {/* Checkbox */}
              <div
                className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
                  isSelected
                    ? 'bg-orange-500 border-orange-500'
                    : 'bg-transparent border-slate-500'
                }`}
              >
                {isSelected && <span className="text-white text-xs font-bold">✓</span>}
              </div>

              <span className="text-2xl mt-0.5">{a.icon}</span>

              <div className="flex-1">
                <p className={`font-semibold text-sm ${isSelected ? 'text-orange-300' : 'text-white'}`}>
                  {a.label}
                </p>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">{a.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {selected.length === 0 && (
        <p className="text-orange-400 text-xs mt-4">
          ← Select at least one action to include in your letter.
        </p>
      )}

      {selected.length > 0 && (
        <div className="mt-4 bg-steel-500/10 border border-steel-500/30 rounded-xl p-3">
          <p className="text-steel-300 text-xs leading-relaxed">
            <strong>Your letter will:</strong>{' '}
            {selected.map((id) => ACTIONS.find((a) => a.id === id)?.label).join(' + ')}
          </p>
        </div>
      )}
    </div>
  );
}
