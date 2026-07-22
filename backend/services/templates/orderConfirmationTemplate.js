import { buttonHtml, detailRow, htmlWrapper, logoHeader, orderTable, footerHtml } from './baseTemplate.js';

const formatMoney = (value) => `₹${Number(value || 0).toFixed(2)}`;

export const orderConfirmationTemplate = ({ order, siteUrl, supportEmail, logoUrl }) => {
  const orderDate = new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const customer = order.customer || {};
  
  const rows = (order.items || []).map((item) => `
    <tr>
      <td>${item.title}</td>
      <td>${item.selectedWeight || item.weight || 'N/A'}</td>
      <td>${item.quantity || 0}</td>
      <td>${formatMoney(item.price)}</td>
      <td>${formatMoney((item.price || 0) * (item.quantity || 0))}</td>
    </tr>
  `).join('');

  const content = `
    ${logoHeader(logoUrl, 'THANK YOU FOR YOUR ORDER', 'Your order has been placed successfully')}
    <div class="section">
      <p style="font-size: 16px; color: #374151;">Hello ${customer.name || 'Valued Customer'},</p>
      <p style="font-size: 16px; color: #374151; line-height: 1.6;">Thank you for choosing Lion Spices. Your order has been placed successfully and we're excited to get your premium spices to you.</p>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 28px 0 16px;">ORDER ID</h3>
      <p style="margin: 0 0 24px; font-size: 16px; font-weight: 600; color: #111;">${order.orderId}</p>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 28px 0 16px;">ORDER DETAILS</h3>
      <div class="detail-card">
        <table class="data-grid">
          ${detailRow('Order Date', orderDate)}
          ${detailRow('Payment Method', order.paymentMethod || 'N/A')}
          ${detailRow('Payment Status', order.paymentStatus || 'Pending')}
        </table>
      </div>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 28px 0 16px;">PRODUCT DETAILS</h3>
      <table class="order-table" cellpadding="0" cellspacing="0" role="presentation">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Selected Size</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 28px 0 16px;">PRICE BREAKDOWN</h3>
      <div class="detail-card">
        <table class="data-grid">
          ${detailRow('Subtotal', formatMoney(order.subtotal || 0))}
          ${detailRow('GST', formatMoney(order.gst || 0))}
          ${detailRow('Delivery Charges', formatMoney(order.deliveryCharge || 0))}
          ${detailRow('Discount', formatMoney(order.discount || 0))}
          ${detailRow('Grand Total', `<span style="font-size: 18px; color: #B91C1C; font-weight: 700;">${formatMoney(order.grandTotal || 0)}</span>`)}
        </table>
      </div>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 28px 0 16px;">DELIVERY ADDRESS</h3>
      <div class="detail-card" style="background: #F3F4F6; border-radius: 8px; padding: 16px;">
        <p style="margin: 0 0 8px; color: #374151; line-height: 1.7;">
          <strong>${customer.name || 'N/A'}</strong><br/>
          ${customer.address || 'N/A'}<br/>
          ${customer.city || 'N/A'}, ${customer.state || 'N/A'} ${customer.pincode || customer.pin || 'N/A'}
        </p>
      </div>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 28px 0 16px;">WHAT HAPPENS NEXT?</h3>
      <div class="detail-card">
        <ul style="margin: 0; padding: 0 0 0 24px; color: #374151; line-height: 1.8;">
          <li>Your spices will be freshly packed with care</li>
          <li>Orders are usually packed within 24 hours</li>
          <li>Dispatch usually happens within 1-2 business days</li>
          <li>Delivery generally takes 2-5 business days</li>
        </ul>
      </div>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 28px 0 16px;">ESTIMATED DELIVERY</h3>
      <div class="detail-card" style="background: #F9FAFB; border-radius: 8px; padding: 16px;">
        <p style="margin: 0 0 12px; color: #374151;"><strong>Hyderabad:</strong> 1-2 Days</p>
        <p style="margin: 0 0 12px; color: #374151;"><strong>Telangana:</strong> 2-3 Days</p>
        <p style="margin: 0; color: #374151;"><strong>Other States:</strong> 3-5 Days</p>
      </div>

      <h3 style="color: #B91C1C; border-bottom: 2px solid #B91C1C; padding-bottom: 8px; margin: 28px 0 16px;">SUPPORT DETAILS</h3>
      <p style="margin: 0 0 8px; color: #374151;"><strong>Email:</strong> <a href="mailto:krishloya789@gmail.com" style="color: #B91C1C; text-decoration: none;">krishloya789@gmail.com</a></p>

      <p style="margin: 28px 0 0 0; text-align: center; font-size: 16px; color: #B91C1C; font-weight: 700;">Thank you for shopping with Lion Spices.</p>
    </div>
    ${footerHtml(siteUrl, supportEmail)}
  `;

  return htmlWrapper({ preheader: `Lion Spices order ${order.orderId} confirmed`, content });
};
