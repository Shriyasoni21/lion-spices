import { jsPDF } from 'jspdf';

export const generateInvoicePdf = (order, fileName = `${order?.orderId || 'lion-spices'}-invoice.pdf`) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const centerText = (text, y, size = 12, weight = 'bold') => {
    doc.setFont('helvetica', weight);
    doc.setFontSize(size);
    const textWidth = doc.getTextWidth(text);
    doc.text(text, (pageWidth - textWidth) / 2, y);
  };

  centerText('LION SPICES', 18, 20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Premium Indian Spices', margin, 26);
  doc.text('14-4-274, Joshiwadi, Begum Bazaar, Hyderabad', margin, 32);

  doc.setLineWidth(0.5);
  doc.line(margin, 38, pageWidth - margin, 38);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Invoice', margin, 46);
  doc.setFont('helvetica', 'normal');
  doc.text(`Invoice No: ${order?.invoiceNumber || order?.orderId || 'INV-001'}`, margin, 52);
  doc.text(`Order ID: ${order?.orderId || 'LS-000000'}`, margin, 58);
  doc.text(`Date: ${order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}`, margin, 64);

  doc.text(`Customer: ${order?.customer?.name || 'Guest Customer'}`, margin, 76);
  doc.text(`Phone: ${order?.customer?.phone || '-'}`, margin, 82);
  doc.text(`Email: ${order?.customer?.email || '-'}`, margin, 88);
  doc.text(`Address: ${order?.customer?.address || '-'}`, margin, 94);

  const paymentLabel = order?.provider === 'cod'
    ? 'Cash on Delivery (pay on delivery)'
    : order?.paymentMethod || 'UPI';
  doc.text(`Payment: ${paymentLabel}`, margin, 108);
  doc.text('Items', margin, 118);

  let y = 126;
  const items = order?.items || [];
  items.forEach((item) => {
    const line = `${item.title} (${item.selectedWeight}) x ${item.quantity} - ₹${item.price * item.quantity}`;
    doc.text(line, margin + 4, y);
    y += 8;
  });

  y += 6;
  doc.text(`Subtotal: ₹${order?.subtotal || 0}`, margin, y);
  y += 8;
  doc.text(`GST: ₹${order?.gst || 0}`, margin, y);
  y += 8;
  doc.text(`Delivery: ₹${order?.deliveryCharge || 0}`, margin, y);
  y += 8;
  doc.text(`Discount: -₹${order?.discount || 0}`, margin, y);
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.text(`Grand Total: ₹${order?.grandTotal || order?.payableTotal || 0}`, margin, y);

  y += 16;
  doc.setFont('helvetica', 'normal');
  doc.text('Thank you for shopping with Lion Spices.', margin, y);
  doc.text('For support, reach out to support@lionspices.com', margin, y + 8);

  doc.save(fileName);
  return fileName;
};
