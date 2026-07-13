Lion Spices - Backend README

Overview
- Express + Mongoose backend for Lion Spices
- Supports authentication (JWT), products, orders, Razorpay integration, invoice generation (PDF), and email sending (SMTP)

Quick start (local)
1. Copy `.env.example` to `.env` and fill values.
2. Install deps: `npm install` (already includes dependencies in root package.json).
3. Start backend server in development:

```bash
npm run dev:backend
# or
npm run start-backend
```

The backend runtime is located in `backend/server.js` and exposes the API under `/api`.

Deployment
- Use Render, Railway, or Heroku for hosting the backend.
- Set environment variables in the platform dashboard (MONGODB_URI, RAZORPAY_KEY_ID/SECRET, RAZORPAY_WEBHOOK_SECRET, SMTP_*).
- Build and serve frontend separately (Netlify/Vercel) and set `VITE_API_URL` to your backend URL.

API Endpoints (high level)
- POST /api/auth/register
- POST /api/auth/login
- GET /api/products
- GET /api/products/:id
- POST /api/orders/create
- POST /api/orders/verify
- POST /api/orders/complete
- GET /api/orders/guest?email=...
- GET /api/orders/guest/:orderId?email=...
- GET /api/orders/:orderId/invoice?email=...
- GET /api/orders/me (requires Authorization: Bearer <token>)
- POST /api/webhooks/razorpay

Notes
- Razorpay webhooks require a raw request body and `RAZORPAY_WEBHOOK_SECRET`.
- If Razorpay is not configured, the checkout falls back to a UPI payment link.
- Invoice emails attach the generated PDF and use `CONTACT_EMAIL` / `SMTP_FROM` for support contact.
- Admin: POST /api/admin/product (requires admin token)

Notes
- Invoice PDF generation uses `pdfkit` and email uses `nodemailer`.
- Payment uses Razorpay when configured; otherwise the server returns a UPI deep-link fallback.
