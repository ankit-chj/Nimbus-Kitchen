# Nimbus Kitchens

A modern multi-brand cloud kitchen platform with real-time order tracking, customer ordering interface, and a live Kitchen Operations dashboard.

## 🚀 Features

### Customer Experience
- **Multi-Brand Marketplace** - Browse and order from multiple cloud kitchen brands
- **Advanced Search** - Global search with command palette (⌘K / Ctrl+K)
- **Cart Management** - Persistent shopping cart with quantity controls
- **Real-time Order Tracking** - Visual status stepper showing order progress from prep to delivery
- **Smart Checkout** - Address management, payment methods, and special preferences
- **Order History** - View past orders with detailed information
- **Account Management** - User profiles, saved addresses, payment methods, and preferences

### Kitchen Operations
- **Live Queue Management** - Real-time order queue dashboard
- **Station Management** - Track orders across prep, cooking, and packing stations
- **Inventory Tracking** - Monitor stock levels and availability
- **Analytics Dashboard** - Performance metrics and insights
- **Order Status Updates** - Push status updates with timeline notes

### Additional Features
- **Responsive Design** - Mobile-first, works on all devices
- **Thermal Packing** - Specialized handling for hot food delivery
- **Rider Dispatch** - Real-time delivery tracking
- **Testimonials & Reviews** - Customer feedback system
- **Promotional Offers** - Coupon and discount management
- **Careers & About** - Company information pages

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Client-side routing
- **Zustand** - State management
- **Motion (Framer Motion)** - Animations
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime
- **Express** - Web server
- **TypeScript** - Type safety
- **TSX** - TypeScript execution

### Build & Deployment
- **Vite** - Frontend bundling
- **esbuild** - Backend bundling
- **Tailwind CSS 4** - CSS framework with Vite plugin

## 📁 Project Structure

```
nimbus-kitchens/
├── src/
│   ├── components/
│   │   ├── ops/                 # Kitchen operations components
│   │   │   ├── KanbanCard.tsx
│   │   │   ├── OpsSidebar.tsx
│   │   │   └── StationLoadBar.tsx
│   │   └── shared/              # Reusable components
│   │       ├── CartDrawer.tsx
│   │       ├── DishCard.tsx
│   │       ├── ItemDetailModal.tsx
│   │       ├── Navbar.tsx
│   │       ├── StatusStepper.tsx
│   │       └── ... other components
│   ├── pages/                   # Route pages
│   │   ├── HomePage.tsx
│   │   ├── BrandsPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── OpsQueuePage.tsx    # Kitchen operations pages
│   │   ├── OpsStationsPage.tsx
│   │   ├── OpsInventoryPage.tsx
│   │   ├── OpsAnalyticsPage.tsx
│   │   └── ... other pages
│   ├── store/                   # Zustand state management
│   │   ├── useCartStore.ts
│   │   ├── useOpsStore.ts
│   │   └── useUserStore.ts
│   ├── types/                   # TypeScript types & interfaces
│   ├── lib/                     # Utilities
│   │   ├── api.ts              # API client
│   │   ├── cn.ts               # Class name utilities
│   │   └── delay.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── assets/
│   └── data/                    # Mock data JSON files
│       ├── menu-items.json
│       ├── kitchens.json
│       ├── orders.json
│       └── ... other data
├── server.ts                    # Express backend
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── package.json
└── index.html
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nimbus-kitchens
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (Vite + esbuild)
- `npm start` - Start production server
- `npm run clean` - Clean build artifacts
- `npm run lint` - Run TypeScript type checking

## 📱 Key Pages & Routes

### Customer Pages
- `/` - Home
- `/brands` - All cloud kitchen brands
- `/brands/:id` - Brand detail & menu
- `/search` - Global search results
- `/offers` - Promotional offers
- `/cart` - Shopping cart
- `/checkout` - Order checkout
- `/confirmation` - Order confirmation
- `/orders` - Order history
- `/orders/:id` - Order details & tracking
- `/account` - User profile
- `/account/addresses` - Saved addresses
- `/account/payment-methods` - Saved payment methods
- `/account/preferences` - Account preferences
- `/about` - About page
- `/careers` - Careers page
- `/contact` - Contact page

### Kitchen Operations Pages
- `/ops/queue` - Live order queue
- `/ops/stations` - Station management
- `/ops/inventory` - Inventory tracking
- `/ops/analytics` - Performance analytics

## 🎨 Design Features

- **Glassmorphism UI** - Frosted glass panels with backdrop blur
- **Gradient Backgrounds** - Animated gradient blob backgrounds
- **Status Stepper** - Visual order progress indicator
- **Responsive Cards** - Dynamic dish and brand cards
- **Smooth Animations** - Motion animations for UI transitions
- **Dark Theme** - Modern dark mode interface

## 📊 State Management

### User Store (`useUserStore`)
- User authentication & profile
- User preferences

### Cart Store (`useCartStore`)
- Shopping cart items
- Cart totals
- Checkout state

### Ops Store (`useOpsStore`)
- Kitchen operations state
- Order queue management
- Station status

## 🔌 API Integration

All API calls are handled through `lib/api.ts`:
- Dish & menu data
- Order management
- User accounts
- Payment processing
- Kitchen operations

## 📦 Mock Data

The app includes comprehensive mock data in `assets/data/`:
- Users with authentication
- Multiple cloud kitchen brands
- Menu items with categories & pricing
- Order history with status timelines
- Inventory data
- Analytics data
- Payment methods
- Addresses & staff info

## 🏗️ Building for Production

1. **Build the project**
   ```bash
   npm run build
   ```
   This creates:
   - Frontend bundle in `dist/`
   - Backend bundle in `dist/server.cjs`

2. **Run production server**
   ```bash
   npm start
   ```

## 🤝 Contributing

When contributing to this project:
1. Maintain TypeScript strict mode
2. Follow the existing component structure
3. Use Tailwind CSS for styling
4. Keep components modular and reusable
5. Update types in `src/types/` as needed

## 📝 Notes

- The platform uses Zustand for lightweight state management
- Mock data is JSON-based for easy customization
- Real API integration can be added by updating `lib/api.ts`
- Tailwind CSS v4 with Vite plugin for optimal performance

## 📄 License

This project is proprietary and confidential.

---

Built with ❤️ for modern cloud kitchen operations
