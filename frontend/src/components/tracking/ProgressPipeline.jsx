import React from 'react';

export default function ProgressPipeline({ status = 'On The Way', etaMinutes = 12 }) {
  const stages = [
    { key: 'Requested', label: 'Request Sent', sub: 'Dispatched to Technicians', icon: 'send' },
    { key: 'Accepted', label: 'Specialist Accepted', sub: 'Getting Gear Ready', icon: 'handshake' },
    { key: 'On The Way', label: 'On The Way', sub: `ETA: ~${etaMinutes} mins`, icon: 'near_me' },
    { key: 'In Progress', label: 'Fixing In Progress', sub: 'Diagnosing & Repairing', icon: 'handyman' },
    { key: 'Completed', label: 'Job Completed', sub: 'Review & Payment', icon: 'task_alt' },
  ];

  const statusOrder = ['Requested', 'Accepted', 'On The Way', 'In Progress', 'Completed'];
  const currentIndex = statusOrder.indexOf(status) !== -1 ? statusOrder.indexOf(status) : 2;
  const progressPercent = (currentIndex / (stages.length - 1)) * 100;

  return (
    <div className="relative py-2">
      {/* Connector Line for Desktop */}
      <div className="hidden md:block absolute top-7 left-12 right-12 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#F5A623] to-amber-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* 5 Stage Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
        {stages.map((stage, idx) => {
          const isPassed = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={stage.key} className="flex md:flex-col items-center gap-3 text-left md:text-center">
              {/* Step Circle */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all duration-300 shadow-lg flex-shrink-0 ${
                  isCurrent
                    ? 'bg-[#F5A623] text-[#0A0D12] ring-4 ring-[#F5A623]/30 scale-110'
                    : isPassed
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isPassed ? 'check' : stage.icon}
                </span>
              </div>

              {/* Text Info */}
              <div>
                <p
                  className={`text-[10px] font-heading font-black uppercase tracking-wider ${
                    isCurrent
                      ? 'text-[#F5A623]'
                      : isPassed
                      ? 'text-emerald-400'
                      : 'text-slate-600'
                  }`}
                >
                  STEP {idx + 1}
                </p>
                <p
                  className={`text-xs font-heading font-black uppercase tracking-wide mt-0.5 ${
                    isCurrent
                      ? 'text-white'
                      : isPassed
                      ? 'text-slate-300'
                      : 'text-slate-600'
                  }`}
                >
                  {stage.label}
                </p>
                <p className={`text-[11px] mt-0.5 font-medium ${isCurrent ? 'text-slate-300' : 'text-slate-600'}`}>
                  {stage.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
