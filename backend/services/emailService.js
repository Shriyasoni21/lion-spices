import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { isCloudinaryUrl, uploadImage } from './cloudinaryService.js';
import { htmlWrapper, logoHeader, footerHtml } from './templates/baseTemplate.js';
import { orderConfirmationTemplate } from './templates/orderConfirmationTemplate.js';
import { invoiceTemplate } from './templates/invoiceTemplate.js';
import { paymentSuccessTemplate } from './templates/paymentSuccessTemplate.js';
import { paymentFailedTemplate } from './templates/paymentFailedTemplate.js';
import { orderShippingTemplate } from './templates/orderShippingTemplate.js';
import { orderDeliveredTemplate } from './templates/orderDeliveredTemplate.js';
import { contactReplyTemplate } from './templates/contactReplyTemplate.js';
import { adminNotificationTemplate } from './templates/adminNotificationTemplate.js';
import { contactAdminNotificationTemplate } from './templates/contactAdminNotificationTemplate.js';

const normalizeEmailPassword = (value = '') => String(value || '').trim().replace(/\s+/g, '');

const getConfiguredEmailDetails = () => {
  const email = process.env.EMAIL_USER || process.env.EMAIL || process.env.SMTP_USER || '';
  const password = normalizeEmailPassword(process.env.EMAIL_PASSWORD || process.env.SMTP_PASS || '');
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || (process.env.SMTP_SECURE === 'true' ? 465 : 587));
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const service = process.env.SMTP_SERVICE || (email.toLowerCase().endsWith('@gmail.com') || host.toLowerCase().includes('gmail') ? 'gmail' : '');

  return { email, password, host, port, secure, service };
};

const SUPPORT_EMAIL = process.env.ADMIN_EMAIL || process.env.CONTACT_EMAIL || process.env.MAIL_FROM || process.env.SMTP_FROM || process.env.EMAIL || 'support@lionspices.com';
const FROM_EMAIL = process.env.MAIL_FROM || process.env.SMTP_FROM || process.env.EMAIL || process.env.SMTP_USER || SUPPORT_EMAIL;
const BUSINESS_EMAIL = process.env.ADMIN_EMAIL || process.env.CONTACT_EMAIL || process.env.EMAIL || 'support@lionspices.com';
const SITE_URL = process.env.FRONTEND_URL || 'https://www.lionspices.com';

const getLocalLogoPath = () => {
  const logoPaths = [
    path.join(process.cwd(), 'public', 'images', 'logo.jpg'),
    path.join(process.cwd(), 'public', 'images', 'logo.png'),
  ];

  return logoPaths.find((logoPath) => fs.existsSync(logoPath));
};

const buildDataUriFromLocalLogo = () => {
  const localLogoPath = getLocalLogoPath();
  if (!localLogoPath) return null;
  const buffer = fs.readFileSync(localLogoPath);
  const ext = path.extname(localLogoPath).toLowerCase().replace('.', '') || 'jpg';
  return `data:image/${ext};base64,${buffer.toString('base64')}`;
};

const getEmailLogoUrl = async () => {
  const envLogo = process.env.LOGO_URL || process.env.EMAIL_LOGO_URL || '';
  const cloudinaryConfigured = Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
  const localLogoPath = getLocalLogoPath();

  if (cloudinaryConfigured) {
    if (envLogo && isCloudinaryUrl(envLogo)) {
      return envLogo;
    }

    if (localLogoPath) {
      try {
        const buffer = fs.readFileSync(localLogoPath);
        const uploadResult = await uploadImage(buffer, path.basename(localLogoPath), 'lion-spices/email-logo');
        if (uploadResult?.secure_url) {
          return uploadResult.secure_url;
        }
      } catch (error) {
        console.warn('Cloudinary logo upload failed, falling back to other logo options:', error.message || error);
      }
    }
  }

  if (envLogo && envLogo.startsWith('https://')) {
    return envLogo;
  }

  const dataUri = buildDataUriFromLocalLogo();
  if (dataUri) {
    return dataUri;
  }

  return `${SITE_URL}/images/logo.jpg`;
};

let LOGO_URL;
const getLogoUrl = async () => {
  if (LOGO_URL) return LOGO_URL;
  LOGO_URL = await getEmailLogoUrl();
  return LOGO_URL;
};

const createTransporter = () => {
  const { email, password, host, port, secure, service } = getConfiguredEmailDetails();

  if (!email || !password) {
    console.warn('[Email] Missing email configuration. Set EMAIL_USER/EMAIL_PASSWORD (or SMTP_USER/SMTP_PASS) to enable SMTP delivery.');
    return null;
  }

  if (service) {
    return nodemailer.createTransport({
      service,
      auth: {
        user: email,
        pass: password,
      },
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: email,
      pass: password,
    },
  });
};

let transporter = createTransporter();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getSmtpTransporter = () => {
  transporter = transporter || createTransporter();
  if (!transporter) {
    throw new Error('Email service is not configured. Provide EMAIL and EMAIL_PASSWORD (or SMTP_USER/SMTP_PASS).');
  }
  return transporter;
};

export const verifySmtpConnection = async () => {
  transporter = createTransporter();
  if (!transporter) {
    throw new Error('Email service is not configured. Provide EMAIL and EMAIL_PASSWORD (or SMTP_USER/SMTP_PASS).');
  }

  try {
    await transporter.verify();
    console.log('[Email] SMTP connection successful.');
    return true;
  } catch (error) {
    const message = String(error.message || error || 'Unknown SMTP error');
    if (message.toLowerCase().includes('auth') || message.toLowerCase().includes('password') || message.toLowerCase().includes('username')) {
      console.warn('[Email] Invalid email credentials. Verify that the Gmail address and Google App Password are correct.');
    } else if (message.toLowerCase().includes('connect') || message.toLowerCase().includes('timed out')) {
      console.warn('[Email] Unable to connect to the SMTP server. Check host, port, and network access.');
    } else {
      console.warn(`[Email] SMTP verification failed: ${message}`);
    }
    throw error;
  }
};

export const waitForSmtpConnection = async ({ delay = 5000, maxAttempts = 3 } = {}) => {
  let attempt = 0;
  let lastError;

  while (attempt < maxAttempts) {
    attempt += 1;
    try {
      await verifySmtpConnection();
      console.log(`SMTP connection verified after ${attempt} attempt(s)`);
      return;
    } catch (error) {
      lastError = error;
      console.warn(`[Email] SMTP attempt ${attempt} failed: ${error.message || error}`);
      if (attempt < maxAttempts) {
        await sleep(delay);
      }
    }
  }

  throw lastError || new Error('SMTP verification failed');
};

export const sendEmail = async (mailOptions) => {
  const transport = getSmtpTransporter();
  if (!transport) {
    console.warn('[Email] SMTP transport is not configured. Skipping message send.');
    return null;
  }

  const sendPromise = Promise.resolve()
    .then(() => transport.sendMail(mailOptions))
    .catch((error) => {
      console.warn('[Email] Message send failed; continuing without email delivery:', error.message || error);
      return null;
    });

  const timeoutPromise = new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), 10000);
    sendPromise.finally(() => clearTimeout(timer));
  });

  return Promise.race([sendPromise, timeoutPromise]);
};

export const sendSmtpTestEmail = async () => {
  const html = htmlWrapper({
    preheader: 'Lion Spices SMTP test email',
    content: `
      ${logoHeader(await getLogoUrl(), 'SMTP Test Email', 'Your Lion Spices email settings are configured correctly.')}
      <div class="section">
        <p>This is a test message to confirm that Lion Spices email delivery is working.</p>
        <p>If you see the Lion Spices logo above, then your SMTP and email logo setup is correct.</p>
      </div>
      ${footerHtml(SITE_URL, SUPPORT_EMAIL)}
    `,
  });

  const mailOptions = {
    from: FROM_EMAIL,
    to: BUSINESS_EMAIL,
    subject: 'Lion Spices SMTP Test',
    text: 'This confirms that SMTP has been configured successfully.',
    html,
  };

  return sendEmail(mailOptions);
};

export const sendContactAdminNotification = async (message) => {
  const html = contactAdminNotificationTemplate({ contact: message, siteUrl: SITE_URL, supportEmail: SUPPORT_EMAIL, logoUrl: await getLogoUrl() });
  const mailOptions = {
    from: FROM_EMAIL,
    to: BUSINESS_EMAIL,
    subject: `New Lion Spices contact inquiry from ${message.name}`,
    text: `Name: ${message.name}\nEmail: ${message.email}\nPhone: ${message.phone || 'N/A'}\n\nMessage:\n${message.message}`,
    html,
  };

  await sendEmail(mailOptions);
};

export const sendContactAutoReply = async (contact) => {
  if (!contact?.email) {
    throw new Error('Contact email is required to send auto-reply');
  }
  const html = contactReplyTemplate({ contact, siteUrl: SITE_URL, supportEmail: SUPPORT_EMAIL, logoUrl: await getLogoUrl() });
  const mailOptions = {
    from: FROM_EMAIL,
    to: contact.email,
    subject: 'We received your message — Lion Spices',
    text: `Hi ${contact.name || 'Customer'},\n\nThank you for contacting Lion Spices. We have received your message and will respond within 24 hours.\n\nRegards,\nLion Spices Support`,
    html,
  };

  await sendEmail(mailOptions);
};

export const sendOtpEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: FROM_EMAIL,
    to: toEmail,
    subject: 'Your Lion Spices verification code',
    text: `Your verification code is ${otp}. It is valid for 15 minutes.`,
    html: `
      <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6;">
        <p>Your verification code is <strong>${otp}</strong>.</p>
        <p>It is valid for 15 minutes.</p>
      </div>
    `,
  };

  await sendEmail(mailOptions);
};

export const sendOrderConfirmationEmail = async (order) => {
  if (!order?.customer?.email) {
    throw new Error('Customer email is required to send order confirmation email');
  }
  const html = orderConfirmationTemplate({ order, siteUrl: SITE_URL, supportEmail: SUPPORT_EMAIL, logoUrl: await getLogoUrl() });
  const mailOptions = {
    from: FROM_EMAIL,
    to: order.customer.email,
    subject: `Lion Spices - Order Confirmation`,
    text: `Hi ${order.customer?.name || 'Customer'},\n\nThank you for ordering from Lion Spices.\n\nYour order ${order.orderId} has been successfully placed.\n\nOrder ID: ${order.orderId}\nOrder Date: ${new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN')}\n\nThank you for choosing Lion Spices.\n\nFreshly Packed.\n100% Authentic.\n\nwww.lionspices.in`,
    html,
  };

  await sendEmail(mailOptions);
};

export const sendInvoiceEmail = async (order, pdfBuffer) => {
  if (!order?.customer?.email) {
    throw new Error('Customer email is required to send invoice email');
  }
  const html = invoiceTemplate({ order, siteUrl: SITE_URL, supportEmail: SUPPORT_EMAIL, logoUrl: await getLogoUrl() });
  const mailOptions = {
    from: FROM_EMAIL,
    to: order.customer.email,
    subject: `Your Lion Spices order ${order.orderId} invoice`,
    text: `Hi ${order.customer?.name || 'Customer'},\n\nYour invoice for order ${order.orderId} is attached. Total: ₹${Number(order.grandTotal || 0).toFixed(2)}.\n\nThank you for choosing Lion Spices.`,
    html,
    attachments: [
      { filename: `${order.orderId}-invoice.pdf`, content: pdfBuffer },
    ],
  };

  await sendEmail(mailOptions);
};

export const sendPaymentSuccessEmail = async (order) => {
  if (!order?.customer?.email) {
    throw new Error('Customer email is required to send payment success email');
  }
  const html = paymentSuccessTemplate({ order, siteUrl: SITE_URL, supportEmail: SUPPORT_EMAIL, logoUrl: await getLogoUrl() });
  const mailOptions = {
    from: FROM_EMAIL,
    to: order.customer.email,
    subject: `Payment received for your Lion Spices order ${order.orderId}`,
    text: `Hi ${order.customer?.name || 'Customer'},\n\nWe have received your payment for order ${order.orderId}. Your order is now confirmed.\n\nThank you for shopping with Lion Spices.`,
    html,
  };

  await sendEmail(mailOptions);
};

export const sendPaymentFailedEmail = async (order, reason = 'Payment failed. Please try again.') => {
  if (!order?.customer?.email) {
    throw new Error('Customer email is required to send payment failure email');
  }
  const html = paymentFailedTemplate({ order, reason, siteUrl: SITE_URL, supportEmail: SUPPORT_EMAIL, logoUrl: await getLogoUrl() });
  const mailOptions = {
    from: FROM_EMAIL,
    to: order.customer.email,
    subject: `Payment failed for Lion Spices order ${order.orderId}`,
    text: `Hi ${order.customer?.name || 'Customer'},\n\nWe were unable to process your payment for order ${order.orderId}. Reason: ${reason}.\n\nPlease retry your payment or contact us for support.`,
    html,
  };

  await sendEmail(mailOptions);
};

export const sendOrderShippedEmail = async (order, courierName) => {
  if (!order?.customer?.email) {
    throw new Error('Customer email is required to send order shipped email');
  }
  const html = orderShippingTemplate({ order, courierName, siteUrl: SITE_URL, supportEmail: SUPPORT_EMAIL, logoUrl: await getLogoUrl() });
  const mailOptions = {
    from: FROM_EMAIL,
    to: order.customer.email,
    subject: `Your Lion Spices order ${order.orderId} has shipped`,
    text: `Hi ${order.customer?.name || 'Customer'},\n\nYour order ${order.orderId} has shipped. Tracking: ${order.tracking || 'N/A'}.\n\nThank you for shopping with Lion Spices.`,
    html,
  };

  await sendEmail(mailOptions);
};

export const sendOrderDeliveredEmail = async (order) => {
  if (!order?.customer?.email) {
    throw new Error('Customer email is required to send order delivered email');
  }
  const html = orderDeliveredTemplate({ order, siteUrl: SITE_URL, supportEmail: SUPPORT_EMAIL, logoUrl: await getLogoUrl() });
  const mailOptions = {
    from: FROM_EMAIL,
    to: order.customer.email,
    subject: `Your Lion Spices order ${order.orderId} has been delivered`,
    text: `Hi ${order.customer?.name || 'Customer'},\n\nYour order ${order.orderId} has been delivered. We hope you enjoy your spices!`,
    html,
  };

  await sendEmail(mailOptions);
};

export const sendNewOrderReceivedNotification = async (order) => {
  const html = adminNotificationTemplate({ order, siteUrl: SITE_URL, supportEmail: SUPPORT_EMAIL, logoUrl: await getLogoUrl(), type: 'order' });
  const mailOptions = {
    from: FROM_EMAIL,
    to: BUSINESS_EMAIL,
    subject: `New Lion Spices order received: ${order.orderId}`,
    text: `New order received\nOrder ID: ${order.orderId}\nCustomer: ${order.customer?.name || 'N/A'}\nEmail: ${order.customer?.email || 'N/A'}\nPhone: ${order.customer?.phone || 'N/A'}\nTotal: ₹${Number(order.grandTotal || 0).toFixed(2)}`,
    html,
  };

  await sendEmail(mailOptions);
};

export const sendBusinessPaymentSuccessNotification = async (order) => {
  const html = adminNotificationTemplate({ order, siteUrl: SITE_URL, supportEmail: SUPPORT_EMAIL, logoUrl: await getLogoUrl(), type: 'payment' });
  const mailOptions = {
    from: FROM_EMAIL,
    to: BUSINESS_EMAIL,
    subject: `Payment received for order ${order.orderId}`,
    text: `Payment for order ${order.orderId} was successful.\nCustomer: ${order.customer?.name || 'N/A'}\nEmail: ${order.customer?.email || 'N/A'}\nAmount: ₹${Number(order.grandTotal || 0).toFixed(2)}`,
    html,
  };

  await sendEmail(mailOptions);
};

export const sendLowStockAlert = async (products) => {
  const lowStockItems = (Array.isArray(products) ? products : [products]).filter(Boolean);
  if (!lowStockItems.length) return;

  const formatted = lowStockItems.map((product) => `- ${product.title || product.name || 'Product'}: ${product.stock} left`).join('\n');
  const htmlRows = lowStockItems.map((product) => `<li>${product.title || product.name || 'Product'}: ${product.stock} left</li>`).join('');

  const mailOptions = {
    from: FROM_EMAIL,
    to: BUSINESS_EMAIL,
    subject: 'Lion Spices low stock alert',
    text: `Low stock alert:\n${formatted}`,
    html: `
      <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6;">
        <h2>Low stock alert</h2>
        <p>The following products are low in stock:</p>
        <ul>${htmlRows}</ul>
      </div>
    `,
  };

  await sendEmail(mailOptions);
};

export const sendContactNotification = sendContactAdminNotification;

export const sendSmtpTestEmailWithRetry = async ({ delay = 5000 } = {}) => {
  while (true) {
    try {
      await sendSmtpTestEmail();
      return;
    } catch (error) {
      console.error(`SMTP test email failed: ${error.message}`);
      await sleep(delay);
    }
  }
};
