import { buttonHtml, detailRow, htmlWrapper, logoHeader, footerHtml } from './baseTemplate.js';

export const orderDeliveredTemplate = ({ order, siteUrl, supportEmail, logoUrl }) => {
  const content = `
    ${logoHeader(logoUrl, 'Order Delivered', 'Your Lion Spices order has been delivered successfully.')}
    <div class="section">
      <p>Hi ${order.customer?.name || 'Customer'},</p>
      <p>We’re happy to let you know that your order <strong>${order.orderId}</strong> has been delivered.</p>
      <div class="detail-card">
        <table class="data-grid">
          ${detailRow('Delivery status', 'Delivered')}
          ${detailRow('Delivered to', order.customer?.name || 'Customer')}
          ${detailRow('Order amount', `₹${Number(order.grandTotal || 0).toFixed(2)}`)}
        </table>
      </div>
      <p>Thank you for choosing Lion Spices. We hope you enjoy the flavours.</p>
      ${buttonHtml('Review your products', `${siteUrl}/orders/${order.orderId}`)}
    </div>
    ${footerHtml(siteUrl, supportEmail)}
  `;

  return htmlWrapper({ preheader: `Order ${order.orderId} delivered by Lion Spices`, content });
};
