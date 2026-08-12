import React from 'react';
import { Star, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { MenuItem } from '../../types';
import { GlassPanel } from './GlassPanel';
import { VegNonVegDot } from './VegNonVegDot';
import { SpiceLevelIndicator } from './SpiceLevelIndicator';
import { PriceTag } from './PriceTag';
import { QuantityStepper } from './QuantityStepper';
import { useCartStore } from '../../store/useCartStore';

export interface DishCardProps {
  item: MenuItem;
  brandName?: string;
  onOpenDetail?: (item: MenuItem) => void;
  key?: React.Key;
}

export function DishCard({ item, brandName = 'Nimbus Kitchen', onOpenDetail }: DishCardProps) {
  const cartItems = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  // Check if item is in cart (matching base menuItem id)
  const cartEntries = cartItems.filter((ci) => ci.menuItem.id === item.id);
  const totalInCart = cartEntries.reduce((sum, ci) => sum + ci.quantity, 0);

  const handleAddDirect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.customizations && item.customizations.length > 0) {
      // If it has customizations, open modal
      if (onOpenDetail) onOpenDetail(item);
    } else {
      addItem(item, brandName, [], 1);
    }
  };

  return (
    <GlassPanel
      hoverEffect
      onClick={() => onOpenDetail && onOpenDetail(item)}
      className="p-4 cursor-pointer flex flex-col justify-between h-full group"
    >
      <div className="flex gap-3">
        {/* Left Side: Info */}
        <div className="flex-1 space-y-2">
          {/* Top badges: Veg/Non-Veg + Rating + Bestseller */}
          <div className="flex items-center gap-2 flex-wrap">
            <VegNonVegDot isVeg={item.isVeg} size="sm" />

            {item.spiceLevel > 0 && <SpiceLevelIndicator level={item.spiceLevel} />}

            {item.isBestseller && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm">
                BESTSELLER
              </span>
            )}

            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{item.rating.toFixed(1)}</span>
              <span className="text-slate-500 font-normal">({item.ratingCount})</span>
            </div>
          </div>

          {/* Dish Name */}
          <h4 className="font-extrabold text-base text-slate-100 group-hover:text-amber-400 transition-colors">
            {item.name}
          </h4>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Price */}
          <div className="pt-1">
            <PriceTag amount={item.price} className="text-amber-400 text-base" />
          </div>
        </div>

        {/* Right Side: Image + Add Button Overlay */}
        <div className="relative shrink-0 w-28 h-28 rounded-2xl overflow-hidden border border-white/10 bg-black/40">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Add / Stepper Button */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 shrink-0">
            {totalInCart > 0 ? (
              <div onClick={(e) => e.stopPropagation()}>
                <QuantityStepper
                  quantity={totalInCart}
                  size="sm"
                  onIncrement={() => {
                    const firstEntry = cartEntries[0];
                    if (firstEntry) updateQuantity(firstEntry.cartItemId, 1);
                  }}
                  onDecrement={() => {
                    const firstEntry = cartEntries[0];
                    if (firstEntry) updateQuantity(firstEntry.cartItemId, -1);
                  }}
                />
              </div>
            ) : (
              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={handleAddDirect}
                className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <span>ADD</span>
                <Plus className="w-3 h-3" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
