import { buttonHtml, detailRow, htmlWrapper, logoHeader, orderTable, footerHtml } from './baseTemplate.js';

const formatMoney = (value) => `₹${Number(value || 0).toFixed(2)}`;

const formatAddress = (customer) => {
  const lines = [];
  if (customer?.address) lines.push(customer.address);
  const cityLine = [customer?.city, customer?.state, customer?.pin].filter(Boolean).join(', ');
  if (cityLine) lines.push(cityLine);
  if (customer?.country) lines.push(customer.country);
  return lines.join('<br/>') || 'Billing address not available';
};

export const invoiceTemplate = ({ order, siteUrl, supportEmail, logoUrl }) => {
  const invoiceDate = new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const rows = (order.items || []).map((item) => `
    <tr>
      <td>${item.title}</td>
      <td>${item.quantity || 0}</td>
      <td>${formatMoney(item.price)}</td>
      <td>${formatMoney((item.price || 0) * (item.quantity || 0))}</td>
    </tr>
  `).join('');

  const content = `
    ${logoHeader(logoUrl, 'Invoice Ready', 'Your invoice is attached and ready to download.')}
    <div class="section">
      <p>Hi ${order.customer?.name || 'Customer'},</p>
      <p>Thank you for your Lion Spices order. Your invoice is attached for your records.</p>
      <div class="detail-card">
        <table class="data-grid">
          ${detailRow('Invoice number', order.invoiceNumber || order.orderId)}
          ${detailRow('Order number', order.orderId)}
          ${detailRow('Invoice date', invoiceDate)}
          ${detailRow('Payment ID', order.paymentId || 'Pending')}
          ${detailRow('Razorpay Order ID', order.providerOrderId || 'N/A')}
        </table>
      </div>
      <div class="detail-card">
        <h2>Billing address</h2>
        <p style="margin:0;line-height:1.7;color:#374151;">${formatAddress(order.customer)}</p>
      </div>
      <h2>Order summary</h2>
      ${orderTable(rows)}
      <table class="data-grid">
        ${detailRow('GST', formatMoney(order.gst || 0))}
        ${detailRow('Shipping', formatMoney(order.deliveryCharge || 0))}
        ${detailRow('Grand total', formatMoney(order.grandTotal || 0))}
      </table>
      <p>Your invoice is attached as a PDF. If you have any questions, email <strong>${supportEmail}</strong>.</p>
    </div>
    ${footerHtml(siteUrl, supportEmail)}
  `;

  return htmlWrapper({ preheader: `Invoice for Lion Spices order ${order.orderId}`, content });
};
