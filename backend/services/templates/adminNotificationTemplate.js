import { htmlWrapper, logoHeader, ownerOrderTable, footerHtml, detailRow } from './baseTemplate.js';

const formatMoney = (value) => `₹${Number(value || 0).toFixed(2)}`;
const formatDateTime = (date) => {
  const d = new Date(date || Date.now());
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ' at ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
};

export const adminNotificationTemplate = ({ order, siteUrl, supportEmail, logoUrl, type }) => {
  if (type === 'contact') {
    return createContactNotificationHtml({ order, siteUrl, supportEmail, logoUrl });
  }
  if (type === 'payment') {
    return createPaymentNotificationHtml({ order, siteUrl, supportEmail, logoUrl });
  }
  return createOrderNotificationHtml({ order, siteUrl, supportEmail, logoUrl });
};

const createOrderNotificationHtml = ({ order, siteUrl, supportEmail, logoUrl }) => {
  const d = new Date(order.createdAt || Date.now());
  const orderDate = d.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const orderTime = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  const customer = order.customer || {};
  
  // Build product rows with size/weight variant
  const productRows = (order.items || []).map((item) => `
    <tr>
      <td>${item.title || 'Product'}</td>
      <td>${item.selectedWeight || item.weight || 'N/A'}</td>
      <td>${item.quantity || 0}</td>
      <td>${formatMoney(item.price || 0)}</td>
      <td>${formatMoney((item.price || 0) * (item.quantity || 0))}</td>
    </tr>
  `).join('');

  const content = `
    ${logoHeader(logoUrl, 'NEW ORDER RECEIVED', 'LION SPICES')}
    <div class="section">
      <div class="banner success" style="background: #B91C1C; border-radius: 12px; padding: 20px; margin-bottom: 28px; color: white;">
        <p style="margin: 0; font-weight: 700; font-size: 18px;">✓ NEW ORDER RECEIVED</p>
      </div>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 0 0 16px;">ORDER ID</h3>
      <p style="margin: 0 0 24px; font-size: 16px; font-weight: 600; color: #111;">${order.orderId || 'N/A'}</p>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 0 0 16px;">ORDER DATE & TIME</h3>
      <p style="margin: 0 0 8px; color: #374151;"><strong>Date:</strong> ${orderDate}</p>
      <p style="margin: 0 0 24px; color: #374151;"><strong>Time:</strong> ${orderTime}</p>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 0 0 16px;">CUSTOMER DETAILS</h3>
      <p style="margin: 0 0 8px; color: #374151;"><strong>Name:</strong> ${customer.name || 'N/A'}</p>
      <p style="margin: 0 0 8px; color: #374151;"><strong>Phone Number:</strong> <a href="tel:${customer.phone}" style="color: #B91C1C; text-decoration: none;">${customer.phone || 'N/A'}</a></p>
      <p style="margin: 0 0 24px; color: #374151;"><strong>Email Address:</strong> <a href="mailto:${customer.email}" style="color: #B91C1C; text-decoration: none;">${customer.email || 'N/A'}</a></p>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 0 0 16px;">DELIVERY ADDRESS</h3>
      <p style="margin: 0 0 8px; color: #374151;"><strong>House/Street:</strong> ${customer.address || 'N/A'}</p>
      <p style="margin: 0 0 8px; color: #374151;"><strong>City:</strong> ${customer.city || 'N/A'}</p>
      <p style="margin: 0 0 8px; color: #374151;"><strong>State:</strong> ${customer.state || 'N/A'}</p>
      <p style="margin: 0 0 8px; color: #374151;"><strong>PIN Code:</strong> ${customer.pincode || customer.pin || 'N/A'}</p>
      <p style="margin: 0 0 24px; padding: 12px; background: #F3F4F6; border-radius: 8px; color: #374151;"><strong>Complete Address:</strong><br/>${customer.address || 'N/A'}, ${customer.city || 'N/A'}, ${customer.state || 'N/A'} ${customer.pincode || customer.pin || 'N/A'}</p>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 0 0 16px;">PRODUCT DETAILS</h3>
      ${ownerOrderTable(productRows)}

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 28px 0 16px;">PAYMENT DETAILS</h3>
      <div class="detail-card">
        <table class="data-grid">
          ${detailRow('Subtotal', formatMoney(order.subtotal || 0))}
          ${detailRow('GST', formatMoney(order.gst || 0))}
          ${detailRow('Delivery Charges', formatMoney(order.deliveryCharge || 0))}
          ${detailRow('Discount', formatMoney(order.discount || 0))}
          ${detailRow('Grand Total', formatMoney(order.grandTotal || 0))}
        </table>
      </div>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 28px 0 16px;">PAYMENT INFORMATION</h3>
      <p style="margin: 0 0 8px; color: #374151;"><strong>Payment Method:</strong> ${order.paymentMethod || 'N/A'}</p>
      <p style="margin: 0 0 24px; color: #374151;"><strong>Payment Status:</strong> ${order.paymentStatus || 'Pending'}</p>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 28px 0 16px;">ORDER STATUS</h3>
      <p style="margin: 0 0 24px; font-weight: 600; color: #374151;">${order.status || 'Pending'}</p>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 28px 0 16px;">ACTION REQUIRED</h3>
      <div class="detail-card" style="background: #FEF2F2; border: 2px solid #B91C1C; padding: 16px; border-radius: 8px;">
        <p style="margin: 0 0 12px; color: #374151;"><strong style="color: #B91C1C; font-size: 16px;">☐ Pack Order</strong></p>
        <p style="margin: 0 0 12px; color: #374151;"><strong style="color: #B91C1C; font-size: 16px;">☐ Verify Payment</strong></p>
        <p style="margin: 0 0 12px; color: #374151;"><strong style="color: #B91C1C; font-size: 16px;">☐ Dispatch Order</strong></p>
        <p style="margin: 0; color: #374151;"><strong style="color: #B91C1C; font-size: 16px;">☐ Delivered</strong></p>
      </div>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 28px 0 16px;">CUSTOMER CONTACT DETAILS</h3>
      <p style="margin: 0 0 8px; color: #374151;"><strong>Email:</strong> <a href="mailto:${customer.email}" style="color: #B91C1C; text-decoration: none;">${customer.email || 'N/A'}</a></p>
      <p style="margin: 0 0 24px; color: #374151;"><strong>Phone Number:</strong> <a href="tel:${customer.phone}" style="color: #B91C1C; text-decoration: none;">${customer.phone || 'N/A'}</a></p>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 28px 0 16px;">NOTES</h3>
      <p style="margin: 0; color: #374151; padding: 12px; background: #F3F4F6; border-radius: 8px;"><strong>Please freshly pack the spices before dispatch.</strong></p>
    </div>
    ${footerHtml(siteUrl, supportEmail)}
  `;

  return htmlWrapper({ preheader: `New order ${order.orderId} received - Action required`, content });
};

const createPaymentNotificationHtml = ({ order, siteUrl, supportEmail, logoUrl }) => {
  const orderDate = formatDateTime(order.createdAt);
  const customer = order.customer || {};

  const productRows = (order.items || []).map((item) => `
    <tr>
      <td>${item.title || 'Product'}</td>
      <td>${item.quantity || 0}</td>
      <td>${formatMoney(item.price || 0)}</td>
      <td>${formatMoney((item.price || 0) * (item.quantity || 0))}</td>
    </tr>
  `).join('');

  const content = `
    ${logoHeader(logoUrl, 'Payment Received', `Order ${order.orderId} payment confirmed`)}
    <div class="section">
      <div class="banner success" style="background: #059669; border-radius: 12px; padding: 16px; margin-bottom: 24px; color: white;">
        <p style="margin: 0; font-weight: 700; font-size: 16px;">✓ Payment Received Successfully</p>
      </div>

      <p>Payment for order <strong>${order.orderId}</strong> has been successfully received.</p>

      <div class="detail-card">
        <table class="data-grid">
          ${detailRow('Order ID', order.orderId)}
          ${detailRow('Amount Paid', formatMoney(order.grandTotal || 0))}
          ${detailRow('Payment Method', order.paymentMethod || 'N/A')}
          ${detailRow('Date & Time', orderDate)}
        </table>
      </div>
    </div>
    ${footerHtml(siteUrl, supportEmail)}
  `;

  return htmlWrapper({ preheader: `Payment received for order ${order.orderId}`, content });
};

const createContactNotificationHtml = ({ order, siteUrl, supportEmail, logoUrl }) => {
  const content = `
    ${logoHeader(logoUrl, 'New Contact Inquiry', 'A customer has reached out to you')}
    <div class="section">
      <p><strong>Name:</strong> ${order.name || 'N/A'}</p>
      <p><strong>Email:</strong> ${order.email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${order.phone || 'N/A'}</p>
      <div class="detail-card">
        <p style="margin:0;line-height:1.7;color:#374151;">${order.message?.replace(/\n/g, '<br/>') || 'No message provided.'}</p>
      </div>
      <p>Respond within 24 hours to ensure a great customer experience.</p>
    </div>
    ${footerHtml(siteUrl, supportEmail)}
  `;

  return htmlWrapper({ preheader: 'New Lion Spices contact inquiry', content });
};
