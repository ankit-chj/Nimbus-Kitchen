import { useState } from 'react';
import { X, Star, Sparkles, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem, SelectedCustomization } from '../../types';
import { VegNonVegDot } from './VegNonVegDot';
import { SpiceLevelIndicator } from './SpiceLevelIndicator';
import { PriceTag } from './PriceTag';
import { QuantityStepper } from './QuantityStepper';
import { useCartStore } from '../../store/useCartStore';

interface ItemDetailModalProps {
  item: MenuItem | null;
  brandName?: string;
  onClose: () => void;
}

export function ItemDetailModal({ item, brandName = 'Nimbus Kitchen', onClose }: ItemDetailModalProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<SelectedCustomization[]>([]);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Initialize defaults for single customization groups
  const handleSingleSelect = (groupId: string, groupName: string, label: string, priceDelta: number) => {
    setSelectedCustomizations((prev) => {
      const filtered = prev.filter((c) => c.groupId !== groupId);
      return [...filtered, { groupId, groupName, optionLabel: label, priceDelta }];
    });
  };

  const handleMultiToggle = (groupId: string, groupName: string, label: string, priceDelta: number) => {
    setSelectedCustomizations((prev) => {
      const exists = prev.some((c) => c.groupId === groupId && c.optionLabel === label);
      if (exists) {
        return prev.filter((c) => !(c.groupId === groupId && c.optionLabel === label));
      } else {
        return [...prev, { groupId, groupName, optionLabel: label, priceDelta }];
      }
    });
  };

  const customTotalDelta = selectedCustomizations.reduce((acc, c) => acc + c.priceDelta, 0);
  const unitPrice = (item?.price ?? 0) + customTotalDelta;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    if (!item) return;
    addItem(item, brandName, selectedCustomizations, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#0F111A] border border-white/15 rounded-3xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Dish Image */}
          <div className="relative h-56 shrink-0 overflow-hidden">
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F111A] via-transparent to-black/30" />

            <div className="absolute bottom-3 left-4 flex items-center gap-2">
              <VegNonVegDot isVeg={item.isVeg} size="lg" />
              {item.isBestseller && (
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
                  BESTSELLER
                </span>
              )}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-5 flex-1">
            {/* Header Title & Rating */}
            <div>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-extrabold text-2xl text-white">{item.name}</h3>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-400 font-bold text-sm border border-amber-500/30">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{item.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <PriceTag amount={item.price} className="text-xl text-amber-400" />
                {item.spiceLevel > 0 && <SpiceLevelIndicator level={item.spiceLevel} />}
              </div>

              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Nutrition Facts */}
            {item.nutrition && (
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Nutritional Breakdown
                </h4>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-white/5">
                    <span className="text-[10px] text-slate-400 block">Calories</span>
                    <span className="text-xs font-extrabold text-amber-400">{item.nutrition.calories} kcal</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5">
                    <span className="text-[10px] text-slate-400 block">Protein</span>
                    <span className="text-xs font-extrabold text-slate-200">{item.nutrition.proteinG}g</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5">
                    <span className="text-[10px] text-slate-400 block">Carbs</span>
                    <span className="text-xs font-extrabold text-slate-200">{item.nutrition.carbsG}g</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5">
                    <span className="text-[10px] text-slate-400 block">Fat</span>
                    <span className="text-xs font-extrabold text-slate-200">{item.nutrition.fatG}g</span>
                  </div>
                </div>
              </div>
            )}

            {/* Allergens */}
            {item.allergens && item.allergens.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Contains allergens: <strong className="text-slate-200 capitalize">{item.allergens.join(', ')}</strong></span>
              </div>
            )}

            {/* Customization Groups */}
            {item.customizations && item.customizations.length > 0 && (
              <div className="space-y-4 pt-2 border-t border-white/10">
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-amber-400">
                  Customize Your Dish
                </h4>

                {item.customizations.map((group) => (
                  <div key={group.id} className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span>{group.name}</span>
                      <span className="text-[10px] text-slate-400 uppercase">
                        {group.type === 'single' ? 'Select 1' : 'Multi Select'}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {group.options.map((opt) => {
                        const isSelected = selectedCustomizations.some(
                          (c) => c.groupId === group.id && c.optionLabel === opt.label
                        );

                        return (
                          <button
                            type="button"
                            key={opt.label}
                            onClick={() => {
                              if (group.type === 'single') {
                                handleSingleSelect(group.id, group.name, opt.label, opt.priceDelta);
                              } else {
                                handleMultiToggle(group.id, group.name, opt.label, opt.priceDelta);
                              }
                            }}
                            className={`w-full p-3 rounded-xl border flex items-center justify-between text-xs font-medium transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500/15 border-amber-500/60 text-amber-400'
                                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                            }`}
                          >
                            <span>{opt.label}</span>
                            <span className="tabular-nums">
                              {opt.priceDelta > 0 ? `+₹${opt.priceDelta}` : 'Included'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-4 border-t border-white/10 bg-[#0A0B12] flex items-center justify-between gap-4">
            <QuantityStepper
              quantity={quantity}
              onIncrement={() => setQuantity((q) => q + 1)}
              onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
            />

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 py-3 px-5 rounded-2xl font-extrabold text-sm flex items-center justify-between text-white shadow-xl transition-all cursor-pointer ${
                addedSuccess
                  ? 'bg-emerald-600 shadow-emerald-600/30'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 shadow-amber-500/20'
              }`}
            >
              <span>{addedSuccess ? 'Added to Order!' : 'Add to Order'}</span>
              <PriceTag amount={totalPrice} />
            </motion.button>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
