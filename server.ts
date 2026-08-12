import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { delay } from './src/lib/delay';

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to load JSON seed data
function loadSeedData<T>(filename: string): T {
  const filePath = path.join(process.cwd(), 'assets', 'data', filename);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data) as T;
}

// In-memory data state
let brands = loadSeedData<any[]>('brands.json');
let kitchens = loadSeedData<any[]>('kitchens.json');
let categories = loadSeedData<any[]>('categories.json');
let menuItems = loadSeedData<any[]>('menu-items.json');
let offers = loadSeedData<any[]>('offers.json');
let testimonials = loadSeedData<any[]>('testimonials.json');
let faqs = loadSeedData<any[]>('faqs.json');
let careers = loadSeedData<any[]>('careers.json');
let addresses = loadSeedData<any[]>('addresses.json');
let paymentMethods = loadSeedData<any[]>('payment-methods.json');
let users = loadSeedData<any[]>('users.json');
let orders = loadSeedData<any[]>('orders.json');
let stations = loadSeedData<any[]>('stations.json');
let staff = loadSeedData<any[]>('staff.json');
let inventory = loadSeedData<any[]>('inventory.json');
let analytics = loadSeedData<any>('analytics.json');

// --- API ROUTES ---

// Brands
app.get('/api/brands', async (req, res) => {
  await delay();
  res.json(brands);
});

app.get('/api/brands/:slug', async (req, res) => {
  await delay();
  const brand = brands.find((b) => b.slug === req.params.slug || b.id === req.params.slug);
  if (!brand) {
    return res.status(404).json({ error: 'Brand not found' });
  }
  res.json(brand);
});

// Menu Items
app.get('/api/menu-items', async (req, res) => {
  await delay();
  let result = [...menuItems];
  const { brandId, categoryId, isVeg } = req.query;

  if (brandId) {
    result = result.filter((item) => item.brandId === brandId);
  }
  if (categoryId) {
    result = result.filter((item) => item.categoryId === categoryId);
  }
  if (isVeg === 'true') {
    result = result.filter((item) => item.isVeg === true);
  }

  res.json(result);
});

app.get('/api/menu-items/:id', async (req, res) => {
  await delay();
  const item = menuItems.find((i) => i.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Menu item not found' });
  }
  res.json(item);
});

// Kitchens
app.get('/api/kitchens', async (req, res) => {
  await delay();
  res.json(kitchens);
});

// Offers
app.get('/api/offers', async (req, res) => {
  await delay();
  res.json(offers);
});

// Orders
app.get('/api/orders', async (req, res) => {
  await delay();
  res.json(orders);
});

app.get('/api/orders/:id', async (req, res) => {
  await delay();
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

app.post('/api/orders', async (req, res) => {
  await delay(400, 800);
  const newOrder = {
    id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    placedAt: new Date().toISOString(),
    currentStatus: 'placed',
    statusTimeline: [
      {
        status: 'placed',
        at: new Date().toISOString(),
        note: 'Order placed successfully and transmitted to kitchen.'
      }
    ],
    etaMinutes: 20,
    ...req.body
  };

  orders.unshift(newOrder);
  res.status(201).json(newOrder);
});

app.patch('/api/orders/:id', async (req, res) => {
  await delay(200, 500);
  const { status, note } = req.body;
  const orderIndex = orders.findIndex((o) => o.id === req.params.id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const order = orders[orderIndex];
  order.currentStatus = status;
  order.statusTimeline.push({
    status,
    at: new Date().toISOString(),
    note: note || `Order status updated to ${status}.`
  });

  if (status === 'delivered') {
    order.etaMinutes = 0;
  }

  orders[orderIndex] = order;
  res.json(order);
});

// Addresses
app.get('/api/addresses', async (req, res) => {
  await delay();
  res.json(addresses);
});

app.post('/api/addresses', async (req, res) => {
  await delay();
  const newAddress = {
    id: `addr-${Date.now()}`,
    isDefault: addresses.length === 0,
    ...req.body
  };
  addresses.push(newAddress);
  res.status(201).json(newAddress);
});

app.delete('/api/addresses/:id', async (req, res) => {
  await delay();
  addresses = addresses.filter((a) => a.id !== req.params.id);
  res.json({ success: true });
});

app.put('/api/addresses/:id/default', async (req, res) => {
  await delay();
  addresses = addresses.map((a) => ({
    ...a,
    isDefault: a.id === req.params.id
  }));
  res.json(addresses);
});

// Payment Methods
app.get('/api/payment-methods', async (req, res) => {
  await delay();
  res.json(paymentMethods);
});

// Users
app.get('/api/users/me', async (req, res) => {
  await delay();
  res.json(users[0] || {});
});

app.patch('/api/users/me', async (req, res) => {
  await delay();
  users[0] = { ...users[0], ...req.body };
  res.json(users[0]);
});

// Kitchen Ops: Stations, Staff, Inventory, Analytics
app.get('/api/stations', async (req, res) => {
  await delay();
  res.json(stations);
});

app.get('/api/staff', async (req, res) => {
  await delay();
  res.json(staff);
});

app.get('/api/inventory', async (req, res) => {
  await delay();
  res.json(inventory);
});

app.get('/api/analytics', async (req, res) => {
  await delay();
  res.json(analytics);
});

// Static / Informational
app.get('/api/testimonials', async (req, res) => {
  await delay();
  res.json(testimonials);
});

app.get('/api/faqs', async (req, res) => {
  await delay();
  res.json(faqs);
});

app.get('/api/careers', async (req, res) => {
  await delay();
  res.json(careers);
});

// --- VITE MIDDLEWARE / STATIC SERVING ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nimbus Kitchens server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
