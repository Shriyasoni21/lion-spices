import { buttonHtml, detailRow, htmlWrapper, logoHeader, footerHtml } from './baseTemplate.js';

export const orderShippingTemplate = ({ order, courierName, siteUrl, supportEmail, logoUrl }) => {
  const content = `
    ${logoHeader(logoUrl, 'Order Shipped', 'Good news — your Lion Spices order is on its way!')}
    <div class="section">
      <p>Hi ${order.customer?.name || 'Customer'},</p>
      <p>Your order <strong>${order.orderId}</strong> has been shipped and is now in transit.</p>
      <div class="banner success">Tracking number: ${order.tracking || 'N/A'}</div>
      <div class="detail-card">
        <table class="data-grid">
          ${detailRow('Courier', courierName || 'Lion Spices Logistics')}
          ${detailRow('Tracking number', order.tracking || 'N/A')}
          ${detailRow('Estimated delivery', order.estimatedDelivery || '2-4 business days')}
        </table>
      </div>
      ${buttonHtml('Track your order', `${siteUrl}/orders/${order.orderId}`)}
      <p>If you need help, our support team is ready to assist.</p>
    </div>
    ${footerHtml(siteUrl, supportEmail)}
  `;

  return htmlWrapper({ preheader: `Your Lion Spices order ${order.orderId} has shipped`, content });
};
