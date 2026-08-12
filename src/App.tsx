import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/shared/Navbar';
import { Footer } from './components/shared/Footer';
import { CartDrawer } from './components/shared/CartDrawer';
import { SearchCommandPalette } from './components/shared/SearchCommandPalette';
import { GradientBlobBackground } from './components/shared/GradientBlobBackground';

// Pages
import { HomePage } from './pages/HomePage';
import { BrandsPage } from './pages/BrandsPage';
import { BrandDetailPage } from './pages/BrandDetailPage';
import { SearchPage } from './pages/SearchPage';
import { OffersPage } from './pages/OffersPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { AccountPage } from './pages/AccountPage';
import { AccountAddressesPage } from './pages/AccountAddressesPage';
import { AccountPaymentMethodsPage } from './pages/AccountPaymentMethodsPage';
import { AccountPreferencesPage } from './pages/AccountPreferencesPage';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Kitchen Ops Pages
import { OpsQueuePage } from './pages/OpsQueuePage';
import { OpsStationsPage } from './pages/OpsStationsPage';
import { OpsInventoryPage } from './pages/OpsInventoryPage';
import { OpsAnalyticsPage } from './pages/OpsAnalyticsPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global ⌘K search shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isOpsRoute = location.pathname.startsWith('/ops');

  return (
    <div className="min-h-screen bg-[#08090D] text-slate-100 flex flex-col relative font-sans selection:bg-amber-500 selection:text-slate-950">
      <ScrollToTop />
      {!isOpsRoute && <GradientBlobBackground />}

      {!isOpsRoute && <Navbar onOpenSearch={() => setIsSearchOpen(true)} />}

      <div className="flex-1">
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/brands/:brandSlug" element={<BrandDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/confirmation" element={<ConfirmationPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailPage />} />

          {/* Account Routes */}
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/addresses" element={<AccountAddressesPage />} />
          <Route path="/account/payment-methods" element={<AccountPaymentMethodsPage />} />
          <Route path="/account/preferences" element={<AccountPreferencesPage />} />

          {/* Info Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Kitchen Ops Hub Portal Routes */}
          <Route path="/ops" element={<OpsQueuePage />} />
          <Route path="/ops/queue" element={<OpsQueuePage />} />
          <Route path="/ops/stations" element={<OpsStationsPage />} />
          <Route path="/ops/inventory" element={<OpsInventoryPage />} />
          <Route path="/ops/analytics" element={<OpsAnalyticsPage />} />

          {/* Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {!isOpsRoute && <Footer />}

      {/* Global Slide-over Cart & Search Palette */}
      <CartDrawer />
      <SearchCommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
