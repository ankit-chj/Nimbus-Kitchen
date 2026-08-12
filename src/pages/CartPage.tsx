import { useNavigate } from 'react';
import { ShoppingBag, ArrowRight, Trash2, Tag, Sparkles } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { GlassPanel } from '../components/shared/GlassPanel';
import { CartLineItem } from '../components/shared/CartLineItem';
import { PriceTag } from '../components/shared/PriceTag';
import { EmptyState } from '../components/shared/EmptyState';

export function CartPage() {
  const navigate = useNavigate();

  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const discount = useCartStore((s) => s.getDiscount());
  const deliveryFee = useCartStore((s) => s.getDeliveryFee());
  const tax = useCartStore((s) => s.getTax());
  const total = useCartStore((s) => s.getTotal());

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24">
        <EmptyState
          icon={ShoppingBag}
          title="Your Cart is Empty"
          description="Explore our virtual cloud brands and add your favorite dishes."
          actionText="Explore Brands"
          onAction={() => navigate('/brands')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">Your Cloud Basket</h1>
          <p className="text-xs text-slate-400 mt-1">
            {items.length} {items.length === 1 ? 'item' : 'items'} from Nimbus Koramangala Hub
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold text-xs hover:bg-rose-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center gap-3 text-xs text-indigo-300">
            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
            <p>
              Your items will be cooked concurrently at specialized stations and delivered together in 1 thermal bag!
            </p>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <CartLineItem key={item.cartItemId} item={item} />
            ))}
          </div>
        </div>

        {/* Right: Summary Card */}
        <div>
          <GlassPanel className="p-6 space-y-5 sticky top-24">
            <h3 className="font-extrabold text-lg text-white border-b border-white/10 pb-3">
              Payment Breakdown
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <PriceTag amount={subtotal} className="text-slate-100" />
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Discount Coupon</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>

              <div className="flex justify-between">
                <span>GST Tax & Packaging</span>
                <PriceTag amount={tax} className="text-slate-100" />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between font-extrabold text-base text-white">
                <span>Total Amount</span>
                <PriceTag amount={total} className="text-amber-400 text-lg" />
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 text-white font-black text-sm flex items-center justify-between shadow-xl shadow-amber-500/20 hover:brightness-110 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
