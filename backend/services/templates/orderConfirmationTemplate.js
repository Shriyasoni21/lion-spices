import { buttonHtml, detailRow, htmlWrapper, logoHeader, orderTable, footerHtml } from './baseTemplate.js';

const formatMoney = (value) => `₹${Number(value || 0).toFixed(2)}`;

export const orderConfirmationTemplate = ({ order, siteUrl, supportEmail, logoUrl }) => {
  const orderDate = new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const rows = (order.items || []).map((item) => `
    <tr>
      <td>${item.title}</td>
      <td>${item.quantity || 0}</td>
      <td>${formatMoney(item.price)}</td>
      <td>${formatMoney((item.price || 0) * (item.quantity || 0))}</td>
    </tr>
  `).join('');

  const content = `
    ${logoHeader(logoUrl, 'Order Confirmed', `Thank you for shopping with Lion Spices, ${order.customer?.name || 'Valued Customer'}!`)}
    <div class="section">
      <p>Hi ${order.customer?.name || 'Customer'},</p>
      <p>Your order has been confirmed and is being prepared for dispatch. Below is the summary of your purchase.</p>
      <div class="detail-card">
        <table class="data-grid">
          ${detailRow('Order number', order.orderId)}
          ${detailRow('Order date', orderDate)}
          ${detailRow('Payment method', order.paymentMethod || 'N/A')}
          ${detailRow('Payment status', order.paymentStatus || 'Pending')}
          ${detailRow('Estimated delivery', order.estimatedDelivery || '2-4 business days')}
        </table>
      </div>
      <h2>Products</h2>
      ${orderTable(rows)}
      <table class="data-grid">
        ${detailRow('GST', formatMoney(order.gst || 0))}
        ${detailRow('Shipping', formatMoney(order.deliveryCharge || 0))}
        ${detailRow('Grand total', formatMoney(order.grandTotal || 0))}
      </table>
      <p>If you have any questions, reach us at <strong>${supportEmail}</strong>.</p>
    </div>
    ${footerHtml(siteUrl, supportEmail)}
  `;

  return htmlWrapper({ preheader: `Lion Spices order ${order.orderId} confirmed`, content });
};
