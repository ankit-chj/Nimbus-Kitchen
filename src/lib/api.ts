import axios from 'axios';
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

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBrands = async (): Promise<Brand[]> => {
  const res = await api.get<Brand[]>('/brands');
  return res.data;
};

export const getBrandBySlug = async (slug: string): Promise<Brand> => {
  const res = await api.get<Brand>(`/brands/${slug}`);
  return res.data;
};

export const getMenuItems = async (params?: {
  brandId?: string;
  categoryId?: string;
  isVeg?: boolean;
}): Promise<MenuItem[]> => {
  const res = await api.get<MenuItem[]>('/menu-items', { params });
  return res.data;
};

export const getMenuItemById = async (id: string): Promise<MenuItem> => {
  const res = await api.get<MenuItem>(`/menu-items/${id}`);
  return res.data;
};

export const getKitchens = async (): Promise<KitchenHub[]> => {
  const res = await api.get<KitchenHub[]>('/kitchens');
  return res.data;
};

export const getOffers = async (): Promise<Offer[]> => {
  const res = await api.get<Offer[]>('/offers');
  return res.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const res = await api.get<Order[]>('/orders');
  return res.data;
};

export const getOrderById = async (id: string): Promise<Order> => {
  const res = await api.get<Order>(`/orders/${id}`);
  return res.data;
};

export const postOrder = async (orderPayload: Partial<Order>): Promise<Order> => {
  const res = await api.post<Order>('/orders', orderPayload);
  return res.data;
};

export const updateOrderStatus = async (
  orderId: string,
  status: Order['currentStatus']
): Promise<Order> => {
  const res = await api.patch<Order>(`/orders/${orderId}`, { status });
  return res.data;
};

export const getAddresses = async (): Promise<Address[]> => {
  const res = await api.get<Address[]>('/addresses');
  return res.data;
};

export const addAddress = async (address: Omit<Address, 'id'>): Promise<Address> => {
  const res = await api.post<Address>('/addresses', address);
  return res.data;
};

export const deleteAddress = async (id: string): Promise<{ success: boolean }> => {
  const res = await api.delete<{ success: boolean }>(`/addresses/${id}`);
  return res.data;
};

export const setDefaultAddress = async (id: string): Promise<Address[]> => {
  const res = await api.put<Address[]>(`/addresses/${id}/default`);
  return res.data;
};

export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const res = await api.get<PaymentMethod[]>('/payment-methods');
  return res.data;
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const res = await api.get<UserProfile>('/users/me');
  return res.data;
};

export const updateUserProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
  const res = await api.patch<UserProfile>('/users/me', data);
  return res.data;
};

export const getStations = async (): Promise<Station[]> => {
  const res = await api.get<Station[]>('/stations');
  return res.data;
};

export const getStaff = async (): Promise<Staff[]> => {
  const res = await api.get<Staff[]>('/staff');
  return res.data;
};

export const getInventory = async (): Promise<InventoryItem[]> => {
  const res = await api.get<InventoryItem[]>('/inventory');
  return res.data;
};

export const getAnalytics = async (): Promise<AnalyticsSummary> => {
  const res = await api.get<AnalyticsSummary>('/analytics');
  return res.data;
};

export const getAnalyticsData = getAnalytics;

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const res = await api.get<Testimonial[]>('/testimonials');
  return res.data;
};

export const getFaqs = async (): Promise<FAQ[]> => {
  const res = await api.get<FAQ[]>('/faqs');
  return res.data;
};

export const getCareers = async (): Promise<CareerRole[]> => {
  const res = await api.get<CareerRole[]>('/careers');
  return res.data;
};

export default api;
