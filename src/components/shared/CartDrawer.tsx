import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight, Tag, Sparkles, Check, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '../../store/useCartStore';
import { CartLineItem } from './CartLineItem';
import { PriceTag } from './PriceTag';
import { getOffers } from '../../lib/api';
import { Offer } from '../../types';

export function CartDrawer() {
  const navigate = useNavigate();
  const isOpen = useCartStore((s) => s.isDrawerOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);

  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const discount = useCartStore((s) => s.getDiscount());
  const deliveryFee = useCartStore((s) => s.getDeliveryFee());
  const tax = useCartStore((s) => s.getTax());
  const total = useCartStore((s) => s.getTotal());
  const appliedOffer = useCartStore((s) => s.appliedOffer);
  const applyOffer = useCartStore((s) => s.applyOffer);
  const removeOffer = useCartStore((s) => s.removeOffer);

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [availableOffers, setAvailableOffers] = useState<Offer[]>([]);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    getOffers().then(setAvailableOffers).catch(console.error);
  }, []);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCodeInput.trim().toUpperCase();
    const match = availableOffers.find((o) => o.code === code);

    if (!match) {
      setCouponError('Invalid coupon code. Try NIMBUS50 or CRAVE100');
      return;
    }

    if (subtotal < match.minOrderValue) {
      setCouponError(`Minimum order value of ₹${match.minOrderValue} required for this offer.`);
      return;
    }

    applyOffer(match);
    setCouponCodeInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeDrawer}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
        />

        {/* Slide-over panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        >
          <div className="w-screen max-w-md bg-[#0D0E16] border-l border-white/10 text-slate-100 flex flex-col shadow-2xl">
            {/* Drawer Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">Your Order</h3>
                  <p className="text-xs text-slate-400">Nimbus Multi-Brand Cloud Basket</p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close cart"
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Body */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-xl text-white">Your basket is empty</h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Discover curries, gourmet burgers, grain bowls, and desserts across our virtual cloud brands.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    closeDrawer();
                    navigate('/brands');
                  }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-sm shadow-lg shadow-amber-500/20 cursor-pointer hover:brightness-110"
                >
                  Browse Cloud Brands
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* Multi-brand info badge */}
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-start gap-2 text-xs text-indigo-300">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <p>
                    Items from different brands are prepared simultaneously in our Koramangala Hub and packed together in 1 thermal bag!
                  </p>
                </div>

                {/* Line Items List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <CartLineItem key={item.cartItemId} item={item} />
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-slate-200">
                      <Tag className="w-3.5 h-3.5 text-amber-500" />
                      Coupon Offer
                    </span>
                    {appliedOffer && (
                      <button
                        type="button"
                        onClick={removeOffer}
                        className="text-[11px] text-rose-400 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {appliedOffer ? (
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        <span>Code <strong>{appliedOffer.code}</strong> Applied!</span>
                      </div>
                      <span className="tabular-nums">-₹{discount}</span>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon (e.g. NIMBUS50)"
                        value={couponCodeInput}
                        onChange={(e) => setCouponCodeInput(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponError && (
                    <p className="text-[11px] text-rose-400 font-medium">{couponError}</p>
                  )}
                </div>

                {/* Price Summary Breakdown */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Item Subtotal</span>
                    <PriceTag amount={subtotal} className="text-slate-200" />
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Discount Coupon</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-400">
                    <span>Delivery Partner Fee</span>
                    <span>{deliveryFee === 0 ? <strong className="text-emerald-400 uppercase">FREE</strong> : `₹${deliveryFee}`}</span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>GST Taxes & Hub Packaging</span>
                    <PriceTag amount={tax} className="text-slate-200" />
                  </div>

                  <div className="pt-2 border-t border-white/10 flex justify-between font-extrabold text-sm text-white">
                    <span>To Pay</span>
                    <PriceTag amount={total} className="text-amber-400 text-base" />
                  </div>
                </div>
              </div>
            )}

            {/* Footer Checkout CTA */}
            {items.length > 0 && (
              <div className="p-5 border-t border-white/10 bg-[#08090D]">
                <button
                  type="button"
                  onClick={() => {
                    closeDrawer();
                    navigate('/checkout');
                  }}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 text-white font-extrabold text-base flex items-center justify-between shadow-xl shadow-amber-500/20 hover:brightness-110 cursor-pointer"
                >
                  <div className="text-left">
                    <span className="block text-[10px] uppercase font-bold text-amber-200">Proceed to Pay</span>
                    <PriceTag amount={total} className="text-lg" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Checkout</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
