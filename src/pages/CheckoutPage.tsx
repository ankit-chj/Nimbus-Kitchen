import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, ShieldCheck, Check, ArrowRight, ArrowLeft, Loader2, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useCartStore } from '../store/useCartStore';
import { useUserStore } from '../store/useUserStore';
import { GlassPanel } from '../components/shared/GlassPanel';
import { PriceTag } from '../components/shared/PriceTag';
import { postOrder } from '../lib/api';
import { Address } from '../types';

export function CheckoutPage() {
  const navigate = useNavigate();

  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const discount = useCartStore((s) => s.getDiscount());
  const deliveryFee = useCartStore((s) => s.getDeliveryFee());
  const tax = useCartStore((s) => s.getTax());
  const total = useCartStore((s) => s.getTotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const addresses = useUserStore((s) => s.addresses);
  const addAddress = useUserStore((s) => s.addAddress);
  const paymentMethods = useUserStore((s) => s.paymentMethods);
  const profile = useUserStore((s) => s.profile);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || ''
  );
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>(
    paymentMethods.find((p) => p.isDefault)?.id || paymentMethods[0]?.id || ''
  );

  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newArea, setNewArea] = useState('Koramangala');
  const [newType, setNewType] = useState<'Home' | 'Work' | 'Other'>('Home');

  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-white font-bold">No items in basket to checkout.</p>
        <button
          type="button"
          onClick={() => navigate('/brands')}
          className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
        >
          Browse Brands
        </button>
      </div>
    );
  }

  const selectedAddr = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
  const selectedPay = paymentMethods.find((p) => p.id === selectedPaymentId) || paymentMethods[0];

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim()) return;

    const created: Address = {
      id: `addr-${Date.now()}`,
      type: newType,
      name: profile.name,
      street: newStreet,
      area: newArea,
      city: 'Bengaluru',
      pincode: '560034',
      isDefault: false,
    };

    addAddress(created);
    setSelectedAddressId(created.id);
    setShowAddAddressForm(false);
    setNewStreet('');
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      const orderPayload = {
        brandId: items[0]?.brandId || 'brand-01',
        brandName: items[0]?.brandName || 'Nimbus Kitchen',
        kitchenId: 'kitchen-blr-01',
        items: items.map((i) => ({
          itemId: i.menuItem.id,
          name: i.menuItem.name,
          qty: i.quantity,
          customizations: i.selectedCustomizations.map((c) => c.optionLabel),
          unitPrice: i.unitPrice,
          lineTotal: i.totalPrice,
        })),
        subtotal,
        deliveryFee,
        discount,
        tax,
        total,
        deliveryAddress: {
          type: selectedAddr?.type || 'Home',
          street: selectedAddr?.street || '5th Cross Rd',
          area: selectedAddr?.area || 'Koramangala',
          city: selectedAddr?.city || 'Bengaluru',
          pincode: selectedAddr?.pincode || '560034',
        },
        paymentMethod: selectedPay?.title || 'Google Pay',
        customerName: profile.name,
        customerPhone: profile.phone,
      };

      const res = await postOrder(orderPayload);
      clearCart();
      navigate(`/checkout/confirmation?orderId=${res.id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
      {/* Step Stepper Header */}
      <div className="flex items-center justify-between max-w-xl mx-auto text-xs font-bold text-slate-400">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-400 font-extrabold' : ''}`}>
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">1</div>
          <span>Delivery Address</span>
        </div>
        <div className="h-0.5 w-12 bg-white/10" />
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-400 font-extrabold' : ''}`}>
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">2</div>
          <span>Payment</span>
        </div>
        <div className="h-0.5 w-12 bg-white/10" />
        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-amber-400 font-extrabold' : ''}`}>
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">3</div>
          <span>Review Order</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Step Form Content */}
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <GlassPanel className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-xl text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-500" />
                  Select Delivery Address
                </h3>

                <button
                  type="button"
                  onClick={() => setShowAddAddressForm(!showAddAddressForm)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Address</span>
                </button>
              </div>

              {/* Saved Addresses List */}
              <div className="space-y-3">
                {addresses.map((addr) => {
                  const isSelected = addr.id === selectedAddressId;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-2xl border flex items-start justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-amber-400'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-white">{addr.type}</span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-slate-400">
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300">{addr.street}, {addr.area}</p>
                        <p className="text-[11px] text-slate-500">{addr.city} - {addr.pincode}</p>
                      </div>

                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-slate-500'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add New Address Form Modal/Inline */}
              {showAddAddressForm && (
                <form onSubmit={handleAddNewAddress} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 pt-4">
                  <h4 className="font-bold text-xs text-amber-400">Add New Delivery Location</h4>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Street address / Flat No."
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      placeholder="Area (e.g. Koramangala, Indiranagar)"
                      value={newArea}
                      onChange={(e) => setNewArea(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                    >
                      Save Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddAddressForm(false)}
                      className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center gap-2 hover:bg-amber-400 cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </GlassPanel>
          )}

          {step === 2 && (
            <GlassPanel className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-xl text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-500" />
                  Select Payment Option
                </h3>
              </div>

              <div className="space-y-3">
                {paymentMethods.map((pm) => {
                  const isSelected = pm.id === selectedPaymentId;
                  return (
                    <div
                      key={pm.id}
                      onClick={() => setSelectedPaymentId(pm.id)}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-amber-400'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div>
                        <span className="font-extrabold text-sm text-white block">{pm.title}</span>
                        <span className="text-xs text-slate-400 block">{pm.details}</span>
                      </div>

                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-slate-500'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 text-slate-300 font-bold text-xs hover:bg-white/10 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Address</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center gap-2 hover:bg-amber-400 cursor-pointer"
                >
                  <span>Review Order Summary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </GlassPanel>
          )}

          {step === 3 && (
            <GlassPanel className="p-6 space-y-6">
              <h3 className="font-extrabold text-xl text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                Final Order Review
              </h3>

              {/* Address & Payment Selected Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-amber-400 font-bold block uppercase text-[10px]">Delivering To:</span>
                  <span className="font-extrabold text-white block">{selectedAddr?.type} Address</span>
                  <p className="text-slate-400">{selectedAddr?.street}, {selectedAddr?.area}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-amber-400 font-bold block uppercase text-[10px]">Payment Method:</span>
                  <span className="font-extrabold text-white block">{selectedPay?.title}</span>
                  <p className="text-slate-400">{selectedPay?.details}</p>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Items ({items.length})</span>
                <div className="space-y-2">
                  {items.map((it) => (
                    <div key={it.cartItemId} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-white/5">
                      <div>
                        <span className="font-bold text-white">{it.quantity}x {it.menuItem.name}</span>
                        <span className="text-[10px] text-amber-400 block">{it.brandName}</span>
                      </div>
                      <PriceTag amount={it.totalPrice} className="text-amber-400" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 text-slate-300 font-bold text-xs hover:bg-white/10 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={handlePlaceOrder}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 text-white font-black text-base shadow-2xl shadow-amber-500/30 hover:brightness-110 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Transmitting to Hub...</span>
                    </>
                  ) : (
                    <>
                      <span>Place Cloud Order</span>
                      <PriceTag amount={total} />
                    </>
                  )}
                </button>
              </div>
            </GlassPanel>
          )}
        </div>

        {/* Right Column: Mini Price Breakdown */}
        <div>
          <GlassPanel className="p-6 space-y-4 sticky top-24">
            <h4 className="font-extrabold text-sm uppercase text-slate-300">Bill Details</h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <PriceTag amount={subtotal} />
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax</span>
                <PriceTag amount={tax} />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between font-extrabold text-base text-white">
                <span>To Pay</span>
                <PriceTag amount={total} className="text-amber-400 text-lg" />
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
