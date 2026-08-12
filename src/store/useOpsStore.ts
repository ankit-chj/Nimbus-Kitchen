import { create } from 'zustand';
import { Order, Station, InventoryItem, Staff } from '../types';
import { getOrders, getStations, getInventory, getStaff } from '../lib/api';

interface OpsState {
  selectedKitchenId: string;
  setSelectedKitchenId: (id: string) => void;
  
  orders: Order[];
  activeOrders: Order[];
  loading: boolean;
  setOrders: (orders: Order[]) => void;
  advanceOrderStatus: (orderId: string) => void;
  
  stations: Station[];
  setStations: (stations: Station[]) => void;
  
  staff: Staff[];
  setStaff: (staff: Staff[]) => void;

  inventory: InventoryItem[];
  setInventory: (items: InventoryItem[]) => void;
  updateInventoryStock: (id: string, newStock: number) => void;
  restockItem: (id: string, qtyToAdd: number) => void;

  fetchOpsData: () => Promise<void>;
}

const statusFlow: Order['currentStatus'][] = [
  'placed',
  'preparing',
  'cooking',
  'packed',
  'out_for_delivery',
  'delivered',
];

export const useOpsStore = create<OpsState>((set, get) => ({
  selectedKitchenId: 'kitchen-blr-01',
  setSelectedKitchenId: (id) => set({ selectedKitchenId: id }),

  orders: [],
  activeOrders: [],
  loading: false,

  setOrders: (orders) => set({
    orders,
    activeOrders: orders.filter((o) => o.currentStatus !== 'delivered' && o.currentStatus !== 'cancelled'),
  }),

  advanceOrderStatus: (orderId) =>
    set((state) => {
      const updated = state.orders.map((ord) => {
        if (ord.id === orderId) {
          const currentIndex = statusFlow.indexOf(ord.currentStatus);
          if (currentIndex >= 0 && currentIndex < statusFlow.length - 1) {
            const nextStatus = statusFlow[currentIndex + 1];
            return {
              ...ord,
              currentStatus: nextStatus,
              statusTimeline: [
                ...ord.statusTimeline,
                {
                  status: nextStatus,
                  at: new Date().toISOString(),
                  note: `Ops Kitchen advance: Moved to ${nextStatus}`,
                },
              ],
            };
          }
        }
        return ord;
      });

      return {
        orders: updated,
        activeOrders: updated.filter((o) => o.currentStatus !== 'delivered' && o.currentStatus !== 'cancelled'),
      };
    }),

  stations: [],
  setStations: (stations) => set({ stations }),

  staff: [],
  setStaff: (staff) => set({ staff }),

  inventory: [],
  setInventory: (inventory) => set({ inventory }),

  updateInventoryStock: (id, newStock) =>
    set((state) => ({
      inventory: state.inventory.map((item) => {
        if (item.id === id) {
          const status =
            newStock <= item.minThreshold / 2
              ? 'critical'
              : newStock <= item.minThreshold
              ? 'low'
              : 'optimal';
          return {
            ...item,
            currentStock: newStock,
            status,
            lastRestocked: new Date().toISOString(),
          };
        }
        return item;
      }),
    })),

  restockItem: (id, qtyToAdd) => {
    const current = get().inventory.find((i) => i.id === id);
    if (current) {
      get().updateInventoryStock(id, current.currentStock + qtyToAdd);
    }
  },

  fetchOpsData: async () => {
    set({ loading: true });
    try {
      const [ord, st, inv, stf] = await Promise.all([
        getOrders(),
        getStations(),
        getInventory(),
        getStaff(),
      ]);
      set({
        orders: ord,
        activeOrders: ord.filter((o) => o.currentStatus !== 'delivered' && o.currentStatus !== 'cancelled'),
        stations: st,
        inventory: inv,
        staff: stf,
      });
    } catch (err) {
      console.error('Failed to fetch Ops data:', err);
    } finally {
      set({ loading: false });
    }
  },
}));
