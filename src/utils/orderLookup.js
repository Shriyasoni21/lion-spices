export const validateEmailInput = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return 'Please enter a valid email address.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return 'Please enter a valid email address.';
  return '';
};

export const getOrderLookupErrorMessage = (error) => {
  const message = (error?.message || '').toLowerCase();
  const status = error?.status;

  if (status === 404) return 'No orders found for this email.';
  if (status === 400) return 'Please enter a valid email address.';
  if (status === 500) return 'The server is currently unavailable. Please try again shortly.';
  if (message.includes('failed to fetch') || message.includes('network') || message.includes('load failed')) {
    return 'Unable to connect to the server. Please try again in a moment.';
  }
  if (message.includes('email is required') || message.includes('invalid email')) {
    return 'Please enter a valid email address.';
  }
  if (message.includes('not found')) {
    return 'No orders found for this email.';
  }

  return error?.message || 'Unable to load your orders right now.';
};
