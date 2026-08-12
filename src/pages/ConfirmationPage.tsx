import { useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Sparkles, Clock, ArrowRight, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { GlassPanel } from '../components/shared/GlassPanel';

export function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('orderId') || 'ORD-88213';

  useEffect(() => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B35', '#7C6CF2', '#10B981', '#F59E0B'],
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-28 text-center space-y-8">
      <GlassPanel className="p-10 space-y-6">
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-500 text-white flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30"
        >
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </motion.div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            ORDER CONFIRMED
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Your Order is Cooking!</h1>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Order <strong className="text-amber-400 font-mono">{orderId}</strong> has been transmitted to Koramangala Hub stations.
          </p>
        </div>

        {/* ETA Highlight */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-sm mx-auto flex items-center justify-center gap-3">
          <Clock className="w-6 h-6 text-indigo-400 shrink-0" />
          <div className="text-left">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Delivery</span>
            <span className="text-xl font-extrabold text-white tabular-nums">20-22 Minutes</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => navigate(`/orders/${orderId}`)}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 text-white font-black text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 flex items-center gap-2 cursor-pointer"
          >
            <span>Live Track Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            to="/orders"
            className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 font-bold text-sm hover:bg-white/10"
          >
            View All Past Orders
          </Link>
        </div>
      </GlassPanel>
    </div>
  );
}
