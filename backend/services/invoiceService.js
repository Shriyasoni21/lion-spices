import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

export const generateInvoiceBuffer = (order) => new Promise((resolve, reject) => {
  try {
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));

    const brandColor = '#b91c1c';
    const lineGap = 20;
    const now = new Date(order.createdAt || Date.now());
    const formattedDate = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.jpg');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, (doc.page.width - 120) / 2, 40, { width: 120 });
      doc.moveDown(4);
    }

    doc.fillColor(brandColor).fontSize(24).text('LION SPICES', { align: 'center' });
    doc.fillColor('#111').fontSize(10).text('Premium Indian spices delivered with love and care', { align: 'center' });
    doc.moveDown(1.2);

    doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke('#eee');
    doc.moveDown();

    doc.fontSize(11).fillColor('#333').text(`Invoice #: ${order.invoiceNumber || order.orderId}`, 40, doc.y);
    doc.text(`Order ID: ${order.orderId}`, 40, doc.y + 16);
    doc.text(`Date: ${formattedDate}`, 40, doc.y + 32);

    const customerStartX = 320;
    const customerStartY = doc.y - 32;
    doc.fontSize(11).fillColor('#333').text('Bill To:', customerStartX, customerStartY);
    doc.fontSize(10).fillColor('#444').text(order.customer?.name || 'Valued Customer', customerStartX, customerStartY + 16);
    doc.text(order.customer?.email || '-', customerStartX, customerStartY + 30);
    doc.text(order.customer?.phone || '-', customerStartX, customerStartY + 44);
    doc.text(`${order.customer?.address || '-'}, ${order.customer?.city || '-'} ${order.customer?.state || ''} ${order.customer?.pin || ''}`.trim(), customerStartX, customerStartY + 58, { width: 195 });
    doc.moveDown(2);

    doc.fontSize(11).fillColor('#333').text('Payment details', 40, doc.y);
    doc.fontSize(10).fillColor('#444').text(`Method: ${order.paymentMethod || 'N/A'}`, 40, doc.y + 16);
    doc.text(`Status: ${order.paymentStatus || 'Pending'}`, 40, doc.y + 30);
    doc.text(`Estimated delivery: ${order.estimatedDelivery || '2-4 business days'}`, 40, doc.y + 44);
    doc.moveDown(2);

    const tableTop = doc.y;
    doc.fontSize(10).fillColor('#111');
    doc.text('Item', 40, tableTop, { bold: true });
    doc.text('Qty', 320, tableTop, { width: 40, align: 'right' });
    doc.text('Price', 380, tableTop, { width: 70, align: 'right' });
    doc.text('Total', 470, tableTop, { width: 70, align: 'right' });
    doc.moveTo(40, tableTop + 16).lineTo(555, tableTop + 16).stroke('#ddd');

    let y = tableTop + 24;
    (order.items || []).forEach((item) => {
      const total = Number(item.price || 0) * Number(item.quantity || 0);
      doc.fontSize(10).fillColor('#333').text(item.title || 'Item', 40, y, { width: 260 });
      doc.text(String(item.quantity || 0), 320, y, { width: 40, align: 'right' });
      doc.text(`₹${Number(item.price || 0).toFixed(2)}`, 380, y, { width: 70, align: 'right' });
      doc.text(`₹${total.toFixed(2)}`, 470, y, { width: 70, align: 'right' });
      y += lineGap;
    });

    y += 10;
    doc.moveTo(40, y - 4).lineTo(555, y - 4).stroke('#eee');
    doc.fontSize(10).fillColor('#333').text('Subtotal', 380, y, { width: 100, align: 'right' });
    doc.text(`₹${Number(order.subtotal || 0).toFixed(2)}`, 470, y, { width: 70, align: 'right' });
    y += 16;
    doc.text('GST', 380, y, { width: 100, align: 'right' });
    doc.text(`₹${Number(order.gst || 0).toFixed(2)}`, 470, y, { width: 70, align: 'right' });
    y += 16;
    doc.text('Delivery', 380, y, { width: 100, align: 'right' });
    doc.text(`₹${Number(order.deliveryCharge || 0).toFixed(2)}`, 470, y, { width: 70, align: 'right' });
    y += 16;
    doc.text('Discount', 380, y, { width: 100, align: 'right' });
    doc.text(`-₹${Number(order.discount || 0).toFixed(2)}`, 470, y, { width: 70, align: 'right' });
    y += 18;
    doc.fontSize(12).fillColor('#111').text('Grand Total', 380, y, { width: 100, align: 'right' });
    doc.text(`₹${Number(order.grandTotal || 0).toFixed(2)}`, 470, y, { width: 70, align: 'right' });

    doc.moveDown(2);
    const supportEmail = process.env.ADMIN_EMAIL || process.env.CONTACT_EMAIL || process.env.MAIL_FROM || 'support@lionspices.com';
    doc.fontSize(9).fillColor('#666').text(`Thank you for choosing Lion Spices. For support, email ${supportEmail}.`, { align: 'center' });
    doc.end();
  } catch (err) {
    reject(err);
  }
});
