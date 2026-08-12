import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, Address, PaymentMethod } from '../types';

interface UserState {
  profile: UserProfile;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  
  updateProfile: (data: Partial<UserProfile>) => void;
  
  setAddresses: (addresses: Address[]) => void;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  
  setPaymentMethods: (methods: PaymentMethod[]) => void;
  addPaymentMethod: (method: PaymentMethod) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
}

const defaultProfile: UserProfile = {
  id: 'usr-01',
  name: 'Ankit Sharma',
  email: 'ankitdoha111@gmail.com',
  phone: '+91 98765 43210',
  dietaryPreference: 'all',
  notificationsEnabled: true,
};

const defaultAddresses: Address[] = [
  {
    id: 'addr-01',
    type: 'Home',
    name: 'Ankit Sharma',
    street: 'Flat 402, Sunshine Heights, 5th Cross Road',
    area: 'Koramangala 4th Block',
    city: 'Bengaluru',
    pincode: '560034',
    isDefault: true,
  },
  {
    id: 'addr-02',
    type: 'Work',
    name: 'Ankit Sharma (Nimbus HQ)',
    street: '3rd Floor, Tech Park One, 80 Feet Main Rd',
    area: 'Koramangala 1st Block',
    city: 'Bengaluru',
    pincode: '560034',
    isDefault: false,
  },
];

const defaultPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm-01',
    type: 'upi',
    title: 'Google Pay / BHIM UPI',
    details: 'ankit@okicici',
    isDefault: true,
  },
  {
    id: 'pm-02',
    type: 'card',
    title: 'HDFC Bank Credit Card',
    details: '•••• •••• •••• 8812',
    isDefault: false,
  },
  {
    id: 'pm-03',
    type: 'cod',
    title: 'Cash on Delivery',
    details: 'Pay cash/UPI to delivery rider at door',
    isDefault: false,
  },
];

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      addresses: defaultAddresses,
      paymentMethods: defaultPaymentMethods,

      updateProfile: (data) =>
        set((state) => ({
          profile: { ...state.profile, ...data },
        })),

      setAddresses: (addresses) => set({ addresses }),
      addAddress: (address) =>
        set((state) => ({
          addresses: [...state.addresses, address],
        })),
      removeAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        })),
      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        })),

      setPaymentMethods: (paymentMethods) => set({ paymentMethods }),
      addPaymentMethod: (method) =>
        set((state) => ({
          paymentMethods: [...state.paymentMethods, method],
        })),
      removePaymentMethod: (id) =>
        set((state) => ({
          paymentMethods: state.paymentMethods.filter((p) => p.id !== id),
        })),
      setDefaultPaymentMethod: (id) =>
        set((state) => ({
          paymentMethods: state.paymentMethods.map((p) => ({
            ...p,
            isDefault: p.id === id,
          })),
        })),
    }),
    {
      name: 'nimbus-user-storage',
    }
  )
);
