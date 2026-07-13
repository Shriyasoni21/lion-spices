import { buttonHtml, detailRow, htmlWrapper, logoHeader, footerHtml } from './baseTemplate.js';

const formatMoney = (value) => `₹${Number(value || 0).toFixed(2)}`;

export const paymentFailedTemplate = ({ order, reason, siteUrl, supportEmail, logoUrl }) => {
  const failedReason = reason || 'Payment failed due to an error. Please try again.';
  const content = `
    ${logoHeader(logoUrl, 'Payment failed', 'We were unable to complete your payment.')}
    <div class="section">
      <div class="banner error">Payment attempt failed for your Lion Spices order.</div>
      <p>Hi ${order.customer?.name || 'Customer'},</p>
      <p>${failedReason}</p>
      <div class="detail-card">
        <table class="data-grid">
          ${detailRow('Order number', order.orderId)}
          ${detailRow('Payment method', order.paymentMethod || 'N/A')}
          ${detailRow('Amount due', formatMoney(order.grandTotal || 0))}
        </table>
      </div>
      ${buttonHtml('Retry payment', `${siteUrl}/orders/${order.orderId}`)}
    </div>
    ${footerHtml(siteUrl, supportEmail)}
  `;

  return htmlWrapper({ preheader: `Payment failure for Lion Spices order ${order.orderId}`, content });
};
