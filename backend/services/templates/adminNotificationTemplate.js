import { htmlWrapper, logoHeader, orderTable, footerHtml } from './baseTemplate.js';

const formatMoney = (value) => `₹${Number(value || 0).toFixed(2)}`;

export const adminNotificationTemplate = ({ order, siteUrl, supportEmail, logoUrl, type }) => {
  const title = type === 'contact' ? 'New contact form submission' : type === 'payment' ? 'Payment successful' : 'New order received';
  const description = type === 'contact' ? 'A customer has submitted a message.' : type === 'payment' ? 'A customer payment was successfully processed.' : 'A new order has been placed and requires your attention.';
  const rows = (order.items || []).map((item) => `
    <tr>
      <td>${item.title}</td>
      <td>${item.quantity || 0}</td>
      <td>₹${Number(item.price || 0).toFixed(2)}</td>
      <td>₹${Number((item.price || 0) * (item.quantity || 0)).toFixed(2)}</td>
    </tr>
  `).join('');

  const content = `
    ${logoHeader(logoUrl, title, description)}
    <div class="section">
      <p><strong>Order:</strong> ${order.orderId || 'N/A'}</p>
      <p><strong>Customer:</strong> ${order.customer?.name || order.name || 'N/A'}</p>
      <p><strong>Email:</strong> ${order.customer?.email || order.email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${order.customer?.phone || 'N/A'}</p>
      <div class="detail-card">
        <table class="data-grid">
          <tr><td class="label">Order amount</td><td class="value">${formatMoney(order.grandTotal || 0)}</td></tr>
          <tr><td class="label">Payment method</td><td class="value">${order.paymentMethod || 'N/A'}</td></tr>
          <tr><td class="label">Payment status</td><td class="value">${order.paymentStatus || 'N/A'}</td></tr>
        </table>
      </div>
      <h2>Products</h2>
      ${orderTable(rows)}
      ${order.orderId ? `<p><a href="${siteUrl}/admin/orders/${order.orderId}" class="button primary">View order</a></p>` : ''}
    </div>
    ${footerHtml(siteUrl, supportEmail)}
  `;

  return htmlWrapper({ preheader: title, content });
};
