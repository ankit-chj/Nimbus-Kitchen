import { motion } from 'motion/react';

export function GradientBlobBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Dark mode mesh base */}
      <div className="absolute inset-0 bg-[#08090D] text-slate-100" />

      {/* Blob 1: Orange/Amber Accent */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px] opacity-25 bg-[#FF6B35]"
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob 2: Violet/Indigo Accent */}
      <motion.div
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 bg-[#7C6CF2]"
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 60, -50, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob 3: Cyan/Emerald Accent */}
      <motion.div
        className="absolute -bottom-40 left-1/4 w-[550px] h-[550px] rounded-full blur-[130px] opacity-15 bg-[#10B981]"
        animate={{
          x: [0, 50, -60, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
