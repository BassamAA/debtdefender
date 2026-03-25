interface Props {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function ProgressBar({ currentStep, totalSteps, stepLabels }: Props) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      {/* Step counter */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
          Step {currentStep} of {totalSteps}
        </p>
        <p className="text-orange-400 text-xs font-semibold">{stepLabels[currentStep - 1]}</p>
      </div>

      {/* Bar */}
      <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Dots */}
      <div className="flex items-center justify-between mt-3">
        {stepLabels.map((label, i) => {
          const stepNum = i + 1;
          const isComplete = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isComplete
                    ? 'bg-orange-500 text-white'
                    : isCurrent
                    ? 'bg-orange-500/20 border-2 border-orange-500 text-orange-400'
                    : 'bg-navy-700 text-slate-500'
                }`}
              >
                {isComplete ? '✓' : stepNum}
              </div>
              <span className={`text-xs hidden sm:block ${isCurrent ? 'text-orange-400' : 'text-slate-500'}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
