import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, ShieldCheck, Bike, ArrowLeft, RefreshCw, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { getOrderById, updateOrderStatus } from '../lib/api';
import { Order } from '../types';
import { GlassPanel } from '../components/shared/GlassPanel';
import { StatusBadge } from '../components/shared/StatusBadge';
import { StatusStepper } from '../components/shared/StatusStepper';
import { PriceTag } from '../components/shared/PriceTag';
import { ErrorState } from '../components/shared/ErrorState';

export function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchOrder = async () => {
    if (!orderId) return;
    setLoading(true);
    setError(false);
    try {
      const data = await getOrderById(orderId);
      setOrder(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  // Simulated live status progression every 15 seconds if active
  useEffect(() => {
    if (!order || order.currentStatus === 'delivered' || order.currentStatus === 'cancelled') return;

    const flow: Order['currentStatus'][] = [
      'placed',
      'preparing',
      'cooking',
      'packed',
      'out_for_delivery',
      'delivered',
    ];

    const timer = setInterval(() => {
      const idx = flow.indexOf(order.currentStatus);
      if (idx >= 0 && idx < flow.length - 1) {
        const nextStatus = flow[idx + 1];
        updateOrderStatus(order.id, nextStatus).then((updated) => {
          setOrder(updated);
        });
      }
    }, 18000);

    return () => clearInterval(timer);
  }, [order]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-28 text-center text-slate-400">
        <Clock className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-2" />
        <p className="font-bold text-white">Retrieving Live Order Telemetry...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-28">
        <ErrorState onRetry={fetchOrder} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
      {/* Top Navigation */}
      <div>
        <Link
          to="/orders"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-amber-500" />
          <span>Back to All Orders</span>
        </Link>
      </div>

      {/* Header Info */}
      <GlassPanel className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-white font-mono">{order.id}</h1>
              <StatusBadge status={order.currentStatus} />
            </div>
            <p className="text-xs text-amber-500 font-bold mt-1">
              {order.brandName} • Koramangala Hub 01
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Arrival</span>
            <span className="text-2xl font-black text-amber-400 tabular-nums">
              {order.etaMinutes > 0 ? `${order.etaMinutes} mins` : 'Arrived!'}
            </span>
          </div>
        </div>

        {/* Live Stepper */}
        <StatusStepper currentStatus={order.currentStatus} timeline={order.statusTimeline} />
      </GlassPanel>

      {/* Stylized Static Route Map Illustration */}
      <GlassPanel className="p-6 space-y-4 text-center overflow-hidden relative">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-300">
          <span className="flex items-center gap-1 text-amber-400">
            <MapPin className="w-4 h-4" /> Koramangala Hub
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <MapPin className="w-4 h-4" /> {order.deliveryAddress.street}
          </span>
        </div>

        {/* Dashed Route Path with Rider Marker */}
        <div className="relative h-20 bg-white/[0.03] rounded-2xl border border-white/10 overflow-hidden flex items-center px-6">
          <svg className="w-full h-2 stroke-amber-500/40" fill="none">
            <line x1="0" y1="4" x2="100%" y2="4" strokeDasharray="6 6" strokeWidth="2" />
          </svg>

          {/* Animated Rider Icon */}
          <motion.div
            initial={{ left: '10%' }}
            animate={{
              left:
                order.currentStatus === 'delivered'
                  ? '90%'
                  : order.currentStatus === 'out_for_delivery'
                  ? '70%'
                  : order.currentStatus === 'packed'
                  ? '45%'
                  : '20%',
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute top-1/2 -translate-y-1/2 p-2 rounded-xl bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/40 font-bold text-xs flex items-center gap-1"
          >
            <Bike className="w-4 h-4" />
            <span className="text-[10px] font-extrabold hidden sm:inline">Rider Ramesh</span>
          </motion.div>
        </div>
      </GlassPanel>

      {/* Order Bill Summary */}
      <GlassPanel className="p-6 space-y-4">
        <h3 className="font-extrabold text-base text-white border-b border-white/10 pb-2">
          Order Summary & Invoice
        </h3>

        <div className="space-y-2 text-xs text-slate-300">
          {order.items.map((it, idx) => (
            <div key={idx} className="flex justify-between items-center p-2 rounded-xl bg-white/5">
              <div>
                <span className="font-bold text-white">{it.qty}x {it.name}</span>
                {it.customizations && it.customizations.length > 0 && (
                  <p className="text-[10px] text-slate-400">{it.customizations.join(', ')}</p>
                )}
              </div>
              <PriceTag amount={it.lineTotal} className="text-amber-400 font-bold" />
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs text-slate-300">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <PriceTag amount={order.subtotal} />
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-400">
              <span>Discount Coupon</span>
              <span>-₹{order.discount}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>₹{order.deliveryFee}</span>
          </div>
          <div className="flex justify-between">
            <span>GST Tax</span>
            <PriceTag amount={order.tax} />
          </div>
          <div className="pt-2 border-t border-white/10 flex justify-between font-extrabold text-base text-white">
            <span>Total Paid</span>
            <PriceTag amount={order.total} className="text-amber-400 text-lg" />
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
