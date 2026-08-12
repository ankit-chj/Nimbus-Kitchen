export type FoodType = 'veg' | 'nonveg';

export interface CustomizationOption {
  id?: string;
  label: string;
  priceDelta: number;
}

export interface CustomizationGroup {
  id: string;
  name: string;
  type: 'single' | 'multi';
  options: CustomizationOption[];
}

export interface NutritionInfo {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

export interface MenuItem {
  id: string;
  brandId: string;
  categoryId: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  isVeg: boolean;
  spiceLevel: number; // 0: None, 1: Mild, 2: Medium, 3: Hot
  isBestseller?: boolean;
  rating: number;
  ratingCount: number;
  customizations?: CustomizationGroup[];
  nutrition?: NutritionInfo;
  allergens?: string[];
  tags?: string[];
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  cuisines: string[];
  tagline: string;
  logoUrl: string;
  coverImageUrl: string;
  rating: number;
  ratingCount: number;
  avgPrepTimeMins: number;
  priceTier: '₹' | '₹₹' | '₹₹₹';
  kitchenId: string;
  isPureVeg: boolean;
  badges: string[];
  categoryIds: string[];
  story?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName?: string;
}

export interface KitchenHub {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  lat: number;
  lng: number;
  brandIds: string[];
  openedYear: number;
  capacityOrdersPerHour: number;
}

export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  validUntil: string;
  isPopular?: boolean;
}

export interface SelectedCustomization {
  groupId: string;
  groupName: string;
  optionLabel: string;
  priceDelta: number;
}

export interface CartItem {
  cartItemId: string; // unique ID including selected options
  menuItem: MenuItem;
  brandId: string;
  brandName: string;
  quantity: number;
  selectedCustomizations: SelectedCustomization[];
  unitPrice: number;
  totalPrice: number;
}

export interface StatusTimelineStep {
  status: 'placed' | 'preparing' | 'cooking' | 'packed' | 'out_for_delivery' | 'delivered' | 'cancelled';
  at: string;
  note?: string;
}

export interface Order {
  id: string;
  brandId: string;
  brandName: string;
  brandLogoUrl?: string;
  kitchenId: string;
  placedAt: string;
  items: {
    itemId: string;
    name: string;
    qty: number;
    customizations: string[];
    unitPrice: number;
    lineTotal: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  total: number;
  currentStatus: 'placed' | 'preparing' | 'cooking' | 'packed' | 'out_for_delivery' | 'delivered' | 'cancelled';
  statusTimeline: StatusTimelineStep[];
  etaMinutes: number;
  deliveryAddress: {
    type: string;
    street: string;
    area: string;
    city: string;
    pincode: string;
  };
  paymentMethod: string;
  customerName: string;
  customerPhone: string;
}

export interface Station {
  id: string;
  kitchenId: string;
  name: string;
  description: string;
  loadPercent: number;
  activeOrderCount: number;
  assignedStaffIds: string[];
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  stationId: string;
  shift: string;
  activeTasks: number;
}

export interface InventoryItem {
  id: string;
  kitchenId: string;
  name: string;
  category: string;
  currentStock: number;
  unit: string;
  minThreshold: number;
  status: 'optimal' | 'low' | 'critical';
  lastRestocked: string;
}

export interface AnalyticsSummary {
  revenueToday: number;
  revenueGrowthPercent: number;
  ordersToday: number;
  avgOrderValue: number;
  avgPrepTimeMinutes: number;
  hourlyOrders: { hour: string; orders: number; revenue: number }[];
  brandShare: { brandName: string; percent: number; color: string }[];
  topItems: { name: string; brandName: string; count: number; revenue: number }[];
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  street: string;
  area: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'upi' | 'card' | 'cod';
  title: string;
  details: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dietaryPreference: 'all' | 'veg' | 'vegan';
  notificationsEnabled: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  favoriteBrand: string;
  avatarUrl: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CareerRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
}
