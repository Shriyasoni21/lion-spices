import { buttonHtml, htmlWrapper, logoHeader, footerHtml } from './baseTemplate.js';

export const contactReplyTemplate = ({ contact, siteUrl, supportEmail, logoUrl }) => {
  const content = `
    ${logoHeader(logoUrl, 'Thanks for reaching out', 'We’ve received your message and will reply within 24 hours.')}
    <div class="section">
      <p>Hi ${contact.name || 'there'},</p>
      <p>Thank you for contacting Lion Spices. We appreciate your message and one of our support specialists will respond within 24 hours.</p>
      <div class="detail-card">
        <p style="margin:0;">If you need immediate assistance, please visit our <a href="${siteUrl}/contact">contact page</a> or email <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>
      </div>
      ${buttonHtml('Visit Lion Spices', siteUrl)}
    </div>
    ${footerHtml(siteUrl, supportEmail)}
  `;

  return htmlWrapper({ preheader: 'Lion Spices received your message', content });
};
