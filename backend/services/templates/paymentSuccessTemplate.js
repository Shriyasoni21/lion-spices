import { buttonHtml, detailRow, htmlWrapper, logoHeader, footerHtml } from './baseTemplate.js';

const formatMoney = (value) => `₹${Number(value || 0).toFixed(2)}`;

export const paymentSuccessTemplate = ({ order, siteUrl, supportEmail, logoUrl }) => {
  const content = `
    ${logoHeader(logoUrl, 'Payment Received', 'Your payment was successful and your order is confirmed.')}
    <div class="section">
      <div class="banner success">Payment received successfully for your Lion Spices order.</div>
      <p>Hi ${order.customer?.name || 'Customer'},</p>
      <p>We have successfully received your payment. Your order is now confirmed and moving to the next stage.</p>
      <div class="detail-card">
        <table class="data-grid">
          ${detailRow('Order number', order.orderId)}
          ${detailRow('Payment ID', order.paymentId || 'N/A')}
          ${detailRow('Payment method', order.paymentMethod || 'N/A')}
          ${detailRow('Order amount', formatMoney(order.grandTotal || 0))}
          ${detailRow('Estimated delivery', order.estimatedDelivery || '2-4 business days')}
        </table>
      </div>
      ${buttonHtml('View your order', `${siteUrl}/orders/${order.orderId}`)}
    </div>
    ${footerHtml(siteUrl, supportEmail)}
  `;

  return htmlWrapper({ preheader: `Payment received for Lion Spices order ${order.orderId}`, content });
};
