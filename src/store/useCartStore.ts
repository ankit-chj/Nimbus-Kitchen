import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MenuItem, SelectedCustomization, Offer } from '../types';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  appliedOffer: Offer | null;
  
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  
  addItem: (menuItem: MenuItem, brandName: string, selectedCustomizations?: SelectedCustomization[], quantity?: number) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  
  applyOffer: (offer: Offer) => void;
  removeOffer: () => void;
  
  getSubtotal: () => number;
  getDiscount: () => number;
  getDeliveryFee: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      appliedOffer: null,

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      addItem: (menuItem, brandName, selectedCustomizations = [], quantity = 1) => {
        const customDelta = selectedCustomizations.reduce((acc, c) => acc + c.priceDelta, 0);
        const unitPrice = menuItem.price + customDelta;
        
        // Custom key based on menuItem ID and selected customization labels sorted
        const customKey = selectedCustomizations
          .map((c) => c.optionLabel)
          .sort()
          .join('|');
        const cartItemId = `${menuItem.id}-${customKey}`;

        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.cartItemId === cartItemId);
          
          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            const existing = updatedItems[existingIndex];
            const newQty = existing.quantity + quantity;
            updatedItems[existingIndex] = {
              ...existing,
              quantity: newQty,
              totalPrice: newQty * unitPrice,
            };
            return { items: updatedItems, isDrawerOpen: true };
          } else {
            const newItem: CartItem = {
              cartItemId,
              menuItem,
              brandId: menuItem.brandId,
              brandName,
              quantity,
              selectedCustomizations,
              unitPrice,
              totalPrice: unitPrice * quantity,
            };
            return { items: [...state.items, newItem], isDrawerOpen: true };
          }
        });
      },

      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        }));
      },

      updateQuantity: (cartItemId, delta) => {
        set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item.cartItemId === cartItemId) {
                const newQty = item.quantity + delta;
                if (newQty <= 0) return null;
                return {
                  ...item,
                  quantity: newQty,
                  totalPrice: newQty * item.unitPrice,
                };
              }
              return item;
            })
            .filter(Boolean) as CartItem[];

          return { items: updatedItems };
        });
      },

      clearCart: () => set({ items: [], appliedOffer: null }),

      applyOffer: (offer) => set({ appliedOffer: offer }),
      removeOffer: () => set({ appliedOffer: null }),

      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.totalPrice, 0);
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const offer = get().appliedOffer;
        if (!offer || subtotal < offer.minOrderValue) return 0;

        if (offer.discountType === 'flat') {
          return offer.discountValue;
        } else if (offer.discountType === 'percentage') {
          const calc = (subtotal * offer.discountValue) / 100;
          if (offer.maxDiscount) {
            return Math.min(calc, offer.maxDiscount);
          }
          return calc;
        }
        return 0;
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal > 500 ? 0 : 29;
      },

      getTax: () => {
        const subtotal = get().getSubtotal();
        return Math.round(subtotal * 0.05); // 5% GST
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const discount = get().getDiscount();
        const deliveryFee = get().getDeliveryFee();
        const tax = get().getTax();
        return Math.max(0, subtotal - discount + deliveryFee + tax);
      },

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'nimbus-cart-storage',
      partialize: (state) => ({ items: state.items, appliedOffer: state.appliedOffer }),
    }
  )
);
