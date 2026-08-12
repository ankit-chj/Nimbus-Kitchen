import { Minus, Plus, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: 'sm' | 'md';
}

export function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  size = 'md',
}: QuantityStepperProps) {
  const isSm = size === 'sm';

  return (
    <div
      className={`inline-flex items-center rounded-xl bg-amber-500/10 border border-amber-500/30 font-medium text-amber-500 ${
        isSm ? 'px-2 py-0.5 gap-1.5 text-xs' : 'px-3 py-1 gap-2.5 text-sm'
      }`}
    >
      <motion.button
        whileTap={{ scale: 0.85 }}
        type="button"
        onClick={onDecrement}
        aria-label="Decrease quantity"
        className="hover:text-amber-400 transition-colors cursor-pointer"
      >
        {quantity === 1 ? (
          <Trash2 className={isSm ? 'w-3 h-3 text-rose-400' : 'w-3.5 h-3.5 text-rose-400'} />
        ) : (
          <Minus className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        )}
      </motion.button>

      <span className="tabular-nums font-bold min-w-[1.2rem] text-center">
        {quantity}
      </span>

      <motion.button
        whileTap={{ scale: 0.85 }}
        type="button"
        onClick={onIncrement}
        aria-label="Increase quantity"
        className="hover:text-amber-400 transition-colors cursor-pointer"
      >
        <Plus className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      </motion.button>
    </div>
  );
}
