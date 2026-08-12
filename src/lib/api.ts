import {
  Brand,
  MenuItem,
  KitchenHub,
  Offer,
  Order,
  Address,
  PaymentMethod,
  UserProfile,
  Station,
  Staff,
  InventoryItem,
  AnalyticsSummary,
  Testimonial,
  FAQ,
  CareerRole
} from '../types';

// Import static data
import brands from '../../assets/data/brands.json';
import menuItems from '../../assets/data/menu-items.json';
import kitchens from '../../assets/data/kitchens.json';
import offers from '../../assets/data/offers.json';
import orders from '../../assets/data/orders.json';
import addresses from '../../assets/data/addresses.json';
import paymentMethods from '../../assets/data/payment-methods.json';
import users from '../../assets/data/users.json';
import stations from '../../assets/data/stations.json';
import staff from '../../assets/data/staff.json';
import inventory from '../../assets/data/inventory.json';
import analytics from '../../assets/data/analytics.json';
import testimonials from '../../assets/data/testimonials.json';
import faqs from '../../assets/data/faqs.json';
import careers from '../../assets/data/careers.json';

// Helper to simulate async delay
const delay = () => new Promise(resolve => setTimeout(resolve, 50));

export const getBrands = async (): Promise<Brand[]> => {
  await delay();
  return brands as Brand[];
};

export const getBrandBySlug = async (slug: string): Promise<Brand> => {
  await delay();
  const brand = (brands as Brand[]).find((b: Brand) => b.slug === slug);
  if (!brand) throw new Error('Brand not found');
  return brand;
};

export const getMenuItems = async (params?: {
  brandId?: string;
  categoryId?: string;
  isVeg?: boolean;
}): Promise<MenuItem[]> => {
  await delay();
  let filtered = [...(menuItems as MenuItem[])];
  
  if (params?.brandId) {
    filtered = filtered.filter((item: MenuItem) => item.brandId === params.brandId);
  }
  if (params?.categoryId) {
    filtered = filtered.filter((item: MenuItem) => item.categoryId === params.categoryId);
  }
  if (params?.isVeg !== undefined) {
    filtered = filtered.filter((item: MenuItem) => item.isVeg === params.isVeg);
  }
  
  return filtered;
};

export const getMenuItemById = async (id: string): Promise<MenuItem> => {
  await delay();
  const item = (menuItems as MenuItem[]).find((m: MenuItem) => m.id === id);
  if (!item) throw new Error('Menu item not found');
  return item;
};

export const getKitchens = async (): Promise<KitchenHub[]> => {
  await delay();
  return kitchens as KitchenHub[];
};

export const getOffers = async (): Promise<Offer[]> => {
  await delay();
  return offers as Offer[];
};

export const getOrders = async (): Promise<Order[]> => {
  await delay();
  return orders as Order[];
};

export const getOrderById = async (id: string): Promise<Order> => {
  await delay();
  const order = (orders as Order[]).find((o: Order) => o.id === id);
  if (!order) throw new Error('Order not found');
  return order;
};

export const postOrder = async (orderPayload: Partial<Order>): Promise<Order> => {
  await delay();
  const newOrder: Order = {
    id: `ORD-${Date.now()}`,
    ...orderPayload
  } as Order;
  return newOrder;
};

export const updateOrderStatus = async (
  orderId: string,
  status: Order['currentStatus']
): Promise<Order> => {
  await delay();
  const order = (orders as Order[]).find((o: Order) => o.id === orderId);
  if (!order) throw new Error('Order not found');
  return { ...order, currentStatus: status };
};

export const getAddresses = async (): Promise<Address[]> => {
  await delay();
  return addresses as Address[];
};

export const addAddress = async (address: Omit<Address, 'id'>): Promise<Address> => {
  await delay();
  const newAddress: Address = {
    id: `ADDR-${Date.now()}`,
    ...address
  } as Address;
  return newAddress;
};

export const deleteAddress = async (id: string): Promise<{ success: boolean }> => {
  await delay();
  const exists = (addresses as Address[]).find((a: Address) => a.id === id);
  if (!exists) throw new Error('Address not found');
  return { success: true };
};

export const setDefaultAddress = async (id: string): Promise<Address[]> => {
  await delay();
  const exists = (addresses as Address[]).find((a: Address) => a.id === id);
  if (!exists) throw new Error('Address not found');
  return (addresses as Address[]).map((a: Address) => ({
    ...a,
    isDefault: a.id === id
  }));
};

export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  await delay();
  return paymentMethods as PaymentMethod[];
};

export const getUserProfile = async (): Promise<UserProfile> => {
  await delay();
  return (users as UserProfile[])[0];
};

export const updateUserProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
  await delay();
  return { ...(users as UserProfile[])[0], ...data } as UserProfile;
};

export const getStations = async (): Promise<Station[]> => {
  await delay();
  return stations as Station[];
};

export const getStaff = async (): Promise<Staff[]> => {
  await delay();
  return staff as Staff[];
};

export const getInventory = async (): Promise<InventoryItem[]> => {
  await delay();
  return inventory as InventoryItem[];
};

export const getAnalytics = async (): Promise<AnalyticsSummary> => {
  await delay();
  return analytics as AnalyticsSummary;
};

export const getAnalyticsData = getAnalytics;

export const getTestimonials = async (): Promise<Testimonial[]> => {
  await delay();
  return testimonials as Testimonial[];
};

export const getFaqs = async (): Promise<FAQ[]> => {
  await delay();
  return faqs as FAQ[];
};

export const getCareers = async (): Promise<CareerRole[]> => {
  await delay();
  return careers as CareerRole[];
};
