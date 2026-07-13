const BRAND_COLOR = '#B91C1C';
const ACCENT_COLOR = '#FBBF24';
const TEXT_COLOR = '#111111';
const BG_COLOR = '#F7F7F7';
const CARD_BG = '#FFFFFF';
const BORDER_COLOR = '#E5E7EB';

export const buttonHtml = (label, url, color = 'primary') => {
  const background = color === 'secondary' ? '#FFFFFF' : BRAND_COLOR;
  const border = color === 'secondary' ? `1px solid ${BORDER_COLOR}` : 'none';
  const textColor = color === 'secondary' ? BRAND_COLOR : '#FFFFFF';
  return `
    <a href="${url}" class="button" style="background:${background};color:${textColor};border:${border};display:inline-block;padding:14px 24px;border-radius:999px;text-decoration:none;font-weight:700;">${label}</a>
  `;
};

export const sectionCard = (title, content) => `
  <div class="card-section">
    <h2>${title}</h2>
    ${content}
  </div>
`;

export const detailRow = (label, value) => `
  <tr>
    <td style="padding:10px 0;font-weight:700;color:${TEXT_COLOR};">${label}</td>
    <td style="padding:10px 0;color:${TEXT_COLOR};text-align:right;">${value}</td>
  </tr>
`;

export const orderTable = (rows) => `
  <table class="order-table" cellpadding="0" cellspacing="0" role="presentation">
    <thead>
      <tr>
        <th>Product</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
`;

export const logoHeader = (logoUrl, heading, preheader) => `
  <div class="hero">
    <img src="${logoUrl}" alt="Lion Spices" width="180" style="display:block;margin:0 auto 20px auto;border:0;outline:none;text-decoration:none;height:auto;" />
    <h1>${heading}</h1>
    <p class="subheading">${preheader}</p>
  </div>
`;

export const footerHtml = (siteUrl, supportEmail) => `
  <div class="footer">
    <p>Need help? Visit our <a href="${siteUrl}" target="_blank">website</a> or email <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>
    <p>Lion Spices · Red, White & Gold quality spices delivered with love.</p>
  </div>
`;

export const htmlWrapper = ({ preheader, content }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lion Spices</title>
  <style>
    body { margin: 0; padding: 0; background: ${BG_COLOR}; font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif; color: ${TEXT_COLOR}; }
    .preheader { display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0; }
    .wrapper { width: 100%; background: ${BG_COLOR}; padding: 24px 16px; }
    .container { width: 100%; max-width: 680px; margin: 0 auto; background: ${CARD_BG}; border-radius: 24px; overflow: hidden; box-shadow: 0 24px 80px rgba(0,0,0,0.08); }
    .hero { text-align: center; background: ${BRAND_COLOR}; padding: 36px 24px 28px; color: #ffffff; }
    .logo { max-width: 120px; height: auto; margin-bottom: 18px; }
    .hero h1 { margin: 0; font-size: 28px; letter-spacing: -0.5px; }
    .subheading { margin: 12px auto 0; max-width: 560px; font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.88); }
    .section { padding: 28px 32px; }
    .section h2 { margin: 0 0 16px; font-size: 20px; color: ${BRAND_COLOR}; }
    .section p { margin: 0 0 16px; font-size: 15px; line-height: 1.7; }
    .detail-card { background: #FAFAFA; border: 1px solid ${BORDER_COLOR}; border-radius: 20px; padding: 20px; margin-bottom: 24px; }
    .summary-grid { width: 100%; border-collapse: collapse; }
    .summary-grid td { padding: 10px 0; border-bottom: 1px solid ${BORDER_COLOR}; }
    .summary-grid td:last-child { text-align: right; }
    .order-table { width: 100%; border-collapse: collapse; margin: 16px 0 24px; }
    .order-table th, .order-table td { padding: 14px 12px; border-bottom: 1px solid ${BORDER_COLOR}; }
    .order-table th { text-align: left; background: #F9FAFB; color: ${BRAND_COLOR}; font-weight: 700; }
    .button { display: inline-block; padding: 14px 24px; border-radius: 999px; text-decoration: none; font-weight: 700; }
    .button.primary { background: ${BRAND_COLOR}; color: #ffffff; }
    .button.secondary { background: #ffffff; color: ${BRAND_COLOR}; border: 1px solid ${BORDER_COLOR}; }
    .banner { border-radius: 20px; padding: 20px; margin-bottom: 24px; color: #ffffff; }
    .banner.success { background: #059669; }
    .banner.error { background: #DC2626; }
    .data-grid { width: 100%; border-collapse: collapse; margin-top: 16px; }
    .data-grid td { padding: 10px 0; }
    .data-grid td.label { color: #6B7280; width: 42%; }
    .data-grid td.value { text-align: right; font-weight: 700; }
    .footer { padding: 24px 32px 32px; font-size: 13px; color: #6B7280; text-align: center; }
    .footer a { color: ${BRAND_COLOR}; text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .container { border-radius: 16px; }
      .section { padding: 24px 20px; }
      .order-table th, .order-table td { padding: 12px 8px; }
      .logo { max-width: 100px; }
      .hero { padding: 28px 18px 22px; }
    }
  </style>
</head>
<body>
  <span class="preheader">${preheader}</span>
  <div class="wrapper">
    <div class="container">
      ${content}
    </div>
  </div>
</body>
</html>
`;
