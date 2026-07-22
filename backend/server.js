import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });
import morgan from 'morgan';
import mongoose from 'mongoose';
import net from 'net';
import { v2 as cloudinary } from 'cloudinary';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import contactRoutes from './routes/contact.js';
import categoryRoutes from './routes/categories.js';
import reviewRoutes from './routes/reviews.js';
import cartRoutes from './routes/cart.js';
import webhookRoutes from './routes/webhooks.js';
import errorHandler from './middleware/errorHandler.js';
import rateLimiter from './middleware/rateLimiter.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import { products as seedProducts, categories as seedCategories } from '../src/data/productData.js';
import { testimonials } from '../src/data/testimonialData.js';
import { waitForSmtpConnection } from './services/emailService.js';

const PORT = process.env.PORT || 4000;
const app = express();

const defaultAllowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
  'https://lion-spices.netlify.app',
  'https://lionspices.netlify.app',
  'https://lion-spices.onrender.com',
  'https://lionspices.onrender.com',
].filter(Boolean);

const extraAllowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedFrontendUrls = [...new Set([...defaultAllowedOrigins, ...extraAllowedOrigins])];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedFrontendUrls.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`CORS origin denied: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({
  limit: '10mb',
  verify: (req, res, buf) => {
    if (req.headers['x-razorpay-signature']) {
      req.rawBody = buf;
    }
  },
}));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`API request: ${req.method} ${req.originalUrl}`);
  console.log('Request query:', JSON.stringify(req.query || {}));
  console.log('Request body:', JSON.stringify(req.body || {}));

  const originalJson = res.json.bind(res);
  res.json = (data) => {
    console.log(`API response: ${req.method} ${req.originalUrl} status=${res.statusCode}`);
    console.log('Response body:', JSON.stringify(data));
    return originalJson(data);
  };

  res.on('finish', () => {
    console.log(`API finished: ${req.method} ${req.originalUrl} status=${res.statusCode}`);
  });

  next();
});

const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildProductMatchQuery = (product) => {
  if (Number.isFinite(Number(product.id))) {
    return { legacyId: Number(product.id) };
  }

  if (product.title) {
    return { title: { $regex: new RegExp(`^${escapeRegExp(product.title)}$`, 'i') } };
  }

  return {};
};

const seedInitialData = async () => {
  try {
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.insertMany(seedCategories.map((category) => ({
        name: category.name,
        slug: category.slug,
        description: category.description,
      })));
      console.log(`Seeded ${seedCategories.length} categories`);
    }

    const productsToSeed = seedProducts.map((product) => ({
      legacyId: product.id,
      title: product.title,
      description: product.description,
      longDescription: product.longDescription || product.description,
      images: product.image ? [{ secure_url: product.image, public_id: '' }] : [],
      price: product.price,
      variants: product.variants || [],
      sku: product.sku || '',
      category: product.category,
      bestSeller: Boolean(product.bestSeller),
      rating: Number(product.rating) || 0,
      reviewCount: Number(product.reviews) || 0,
      tags: product.category ? [product.category] : [],
      isActive: true,
    }));

    const retainedProductIds = [];
    for (const productPayload of productsToSeed) {
      const matchQuery = buildProductMatchQuery({ id: productPayload.legacyId, title: productPayload.title });
      const product = await Product.findOneAndUpdate(
        matchQuery,
        productPayload,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      const duplicateQuery = {
        _id: { $ne: product._id },
        $or: [
          ...(Number.isFinite(Number(productPayload.legacyId)) ? [{ legacyId: Number(productPayload.legacyId) }] : []),
          { title: { $regex: new RegExp(`^${escapeRegExp(productPayload.title)}$`, 'i') } },
        ],
      };

      const duplicateResult = await Product.deleteMany(duplicateQuery);
      if (duplicateResult.deletedCount) {
        console.log(`[Seed] Removed ${duplicateResult.deletedCount} duplicate product record(s) for ${productPayload.title}`);
      }
      retainedProductIds.push(product._id);
    }

    console.log(`Seeded/updated ${productsToSeed.length} products`);
  } catch (error) {
    console.error('Error seeding initial data:', error);
  }
};

app.get('/', (req, res) => res.json({ status: 'ok', message: 'Lion Spices backend is running' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.get('/api/health/db', (req, res) => {
  const stateNames = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  res.json({ success: true, dbState: stateNames[mongoose.connection.readyState] || mongoose.connection.readyState });
});
app.get('/api/health/cloudinary', async (req, res) => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(500).json({ success: false, error: 'Cloudinary credentials are not configured' });
    }
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    await cloudinary.api.ping();
    return res.json({ success: true, cloudinary: 'Connected' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || 'Cloudinary connection failed' });
  }
});
app.get('/api/health/email', async (req, res) => {
  try {
    await waitForSmtpConnection({ delay: 2000 });
    return res.json({ success: true, smtp: 'Connected' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || 'SMTP connection failed' });
  }
});
app.get('/api/testimonials', (req, res) => res.json(testimonials));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/webhooks', webhookRoutes);

const printRegisteredRoutes = () => {
  console.log('Registered Express routes:');
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods).join(', ').toUpperCase();
      console.log(`  ${methods} ${middleware.route.path}`);
    } else if (middleware.name === 'router' && middleware.handle.stack) {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods).join(', ').toUpperCase();
          console.log(`  ${methods} ${handler.route.path}`);
        }
      });
    }
  });
};

const projectRoot = path.resolve(__dirname, '..');
app.use('/images', express.static(path.join(projectRoot, 'public', 'images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(projectRoot, 'dist')));
  app.get('*', (req, res) => res.sendFile(path.join(projectRoot, 'dist', 'index.html')));
}

app.use(errorHandler);

const businessEmail = process.env.ADMIN_EMAIL || process.env.CONTACT_EMAIL || process.env.MAIL_FROM || process.env.EMAIL || process.env.SMTP_USER || 'business@lionspices.com';
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];

const validateEnvironment = () => {
  const missing = requiredEnvVars.filter((name) => !process.env[name]);
  if (missing.length) {
    console.error('Missing required environment variables:', missing.join(', '));
    return false;
  }

  if (!process.env.EMAIL_USER && !process.env.EMAIL && !process.env.SMTP_USER && !process.env.EMAIL_PASSWORD && !process.env.SMTP_PASS) {
    console.warn('[Email] EMAIL_USER/EMAIL_PASSWORD or SMTP_USER/SMTP_PASS are not set. Email delivery will remain disabled until they are configured.');
  } else {
    console.log('[Email] Email service configuration detected.');
  }

  if (!process.env.PORT) {
    console.log('[Server] PORT not set; using default 4000.');
  }

  console.log('Environment loaded. Core runtime variables are present.');
  return true;
};

const startServer = async () => {
  if (!validateEnvironment()) {
    process.exit(1);
  }

  await connectDB(process.env.MONGODB_URI);
  await seedInitialData();

  try {
    await waitForSmtpConnection({ delay: 2000 });
    console.log(`[Email] SMTP startup check passed. Delivery will be enabled for ${businessEmail}.`);
  } catch (error) {
    console.warn('[Email] SMTP startup check failed; the API server will continue running without email delivery.', error.message || error);
  }

  const configuredPort = Number(process.env.PORT || PORT);
  const actualPort = await new Promise((resolve, reject) => {
    const serverInstance = app.listen(configuredPort, () => {
      serverInstance.removeAllListeners('error');
      resolve(configuredPort);
    });

    serverInstance.on('error', async (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`Configured port ${configuredPort} is in use. Retrying with an available port...`);
        const fallbackServer = app.listen(0, () => resolve(fallbackServer.address().port));
        fallbackServer.on('error', (fallbackErr) => reject(fallbackErr));
      } else {
        reject(err);
      }
    });
  });

  printRegisteredRoutes();
  console.log('MongoDB Connected');
  console.log(`Lion Spices backend running on http://localhost:${actualPort}`);
  console.log(`Port Number: ${actualPort}`);
};

startServer().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
