const STORAGE_KEY = 'lion-spices-orders';

export const createOrderId = () => `LS-${Date.now().toString().slice(-6)}`;
export const createPaymentId = () => `PAY-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export const getStoredOrders = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

export const saveOrder = (order) => {
  const orders = getStoredOrders();
  const nextOrders = [order, ...orders].slice(0, 25);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextOrders));
  return nextOrders;
};

export const buildOrderPayload = ({
  customer,
  items,
  subtotal,
  deliveryCharge,
  discount,
  payableTotal,
  grandTotal,
  gst,
  paymentMethod,
  orderId,
  paymentId,
  estimatedDelivery,
}) => ({
  id: orderId,
  orderId,
  paymentId,
  customer,
  items: (items || [])
    .map((item) => {
      const productId = item._id ? String(item._id) : undefined;
      return {
        productId,
        name: item.name || item.title || '',
        title: item.title || item.name || '',
        selectedWeight: item.selectedWeight || item.weight,
        weight: item.selectedWeight || item.weight,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      };
    })
    .filter((item) => !!item.productId),
  subtotal,
  gst,
  deliveryCharge,
  discount,
  grandTotal: Number(grandTotal ?? payableTotal ?? 0),
  paymentMethod,
  createdAt: new Date().toISOString(),
  status: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Confirmed',
  paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
  tracking: paymentMethod === 'Cash on Delivery' ? 'Preparing for dispatch' : 'Packed and ready for dispatch',
  estimatedDelivery,
});
