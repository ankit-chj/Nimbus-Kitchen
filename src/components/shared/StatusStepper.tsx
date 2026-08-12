import { Check, Clock, Bike, PackageCheck, Flame, ChefHat, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Order } from '../../types';

interface StatusStepperProps {
  currentStatus: Order['currentStatus'];
  timeline: Order['statusTimeline'];
}

export function StatusStepper({ currentStatus, timeline }: StatusStepperProps) {
  const steps: { key: Order['currentStatus']; label: string; icon: any }[] = [
    { key: 'placed', label: 'Order Received', icon: CheckCircle2 },
    { key: 'preparing', label: 'Prep Station', icon: ChefHat },
    { key: 'cooking', label: 'Clay Tandoor & Wok', icon: Flame },
    { key: 'packed', label: 'Thermal Packed', icon: PackageCheck },
    { key: 'out_for_delivery', label: 'Rider Dispatched', icon: Bike },
    { key: 'delivered', label: 'Delivered Hot', icon: Check },
  ];

  const currentIndex = steps.findIndex((s) => s.key === currentStatus);

  return (
    <div className="w-full space-y-6">
      {/* Horizontal Progress Bar */}
      <div className="relative flex items-center justify-between">
        {/* Background track */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 z-0" />

        {/* Active colored line */}
        <motion.div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 -translate-y-1/2 z-0"
          initial={{ width: 0 }}
          animate={{
            width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        {steps.map((step, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const StepIcon = step.icon;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.15 : 1 }}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs border transition-all ${
                  isDone
                    ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                    : isCurrent
                    ? 'bg-gradient-to-r from-amber-500 to-indigo-600 border-white text-white shadow-xl shadow-amber-500/30 ring-4 ring-amber-500/20'
                    : 'bg-white/5 border-white/10 text-slate-500'
                }`}
              >
                <StepIcon className="w-5 h-5" />
              </motion.div>

              <span
                className={`text-[11px] font-bold mt-2 text-center max-w-[80px] hidden sm:block ${
                  isCurrent
                    ? 'text-amber-400 font-extrabold'
                    : isDone
                    ? 'text-slate-200'
                    : 'text-slate-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Notes list */}
      <div className="space-y-2 pt-2">
        {timeline.map((item, i) => (
          <div
            key={i}
            className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 text-xs"
          >
            <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold uppercase text-slate-200">{item.status.replace('_', ' ')}</span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {new Date(item.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {item.note && <p className="text-slate-400 mt-0.5">{item.note}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
