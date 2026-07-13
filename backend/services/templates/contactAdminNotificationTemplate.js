import { htmlWrapper, logoHeader, footerHtml } from './baseTemplate.js';

export const contactAdminNotificationTemplate = ({ contact, siteUrl, supportEmail, logoUrl }) => {
  const content = `
    ${logoHeader(logoUrl, 'New contact inquiry', 'A customer has submitted a message through Lion Spices.')}
    <div class="section">
      <p><strong>Name:</strong> ${contact.name || 'N/A'}</p>
      <p><strong>Email:</strong> ${contact.email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
      <div class="detail-card">
        <p style="margin:0;line-height:1.7;color:#374151;">${contact.message?.replace(/\n/g, '<br/>') || 'No message provided.'}</p>
      </div>
      <p>Respond within 24 hours to ensure a great customer experience.</p>
      <p><a href="${siteUrl}/admin/contact" class="button primary">View inquiry</a></p>
    </div>
    ${footerHtml(siteUrl, supportEmail)}
  `;

  return htmlWrapper({ preheader: 'New Lion Spices contact inquiry', content });
};
