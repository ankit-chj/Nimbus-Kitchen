import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem } from '../../types';
import { VegNonVegDot } from './VegNonVegDot';
import { PriceTag } from './PriceTag';
import { QuantityStepper } from './QuantityStepper';
import { useCartStore } from '../../store/useCartStore';

export interface CartLineItemProps {
  item: CartItem;
  key?: React.Key;
}

export function CartLineItem({ item }: CartLineItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black/40">
        <img
          src={item.menuItem.imageUrl}
          alt={item.menuItem.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 space-y-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <VegNonVegDot isVeg={item.menuItem.isVeg} size="sm" />
            <span className="font-extrabold text-sm text-slate-100 truncate">
              {item.menuItem.name}
            </span>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.cartItemId)}
            aria-label="Remove item"
            className="p-1 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-[11px] text-amber-500 font-medium">
          {item.brandName}
        </p>

        {/* Selected customizations */}
        {item.selectedCustomizations.length > 0 && (
          <p className="text-[10px] text-slate-400 line-clamp-1">
            {item.selectedCustomizations.map((c) => c.optionLabel).join(', ')}
          </p>
        )}

        <div className="pt-2 flex items-center justify-between gap-2">
          <PriceTag amount={item.totalPrice} className="text-amber-400 text-sm" />

          <QuantityStepper
            quantity={item.quantity}
            size="sm"
            onIncrement={() => updateQuantity(item.cartItemId, 1)}
            onDecrement={() => updateQuantity(item.cartItemId, -1)}
          />
        </div>
      </div>
    </div>
  );
}
