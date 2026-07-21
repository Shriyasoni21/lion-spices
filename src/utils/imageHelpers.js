export const DEFAULT_PRODUCT_IMAGE = '/images/products/chilli-powder-removebg-preview.png';
export const FALLBACK_PRODUCT_IMAGE = '/images/products/chilli-powder-removebg-preview.png';

const trimSlashes = (value) => value?.replace(/\s+/g, '').replace(/\/$/, '') || '';

export const normalizeProductImage = (src) => {
  const trimmed = typeof src === 'string' ? src.trim() : '';
  if (!trimmed) return DEFAULT_PRODUCT_IMAGE;

  if (/^https?:\/\//i.test(trimmed) || /^\/\//.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.startsWith('/')) {
    if (trimmed.startsWith('/images/')) {
      return trimmed;
    }
    const apiUrl = trimSlashes(import.meta.env.VITE_API_URL || '');
    return apiUrl ? `${apiUrl}${trimmed}` : trimmed;
  }

  return trimmed;
};

export const getProductImageSrc = (product) => {
  if (!product) return DEFAULT_PRODUCT_IMAGE;
  if (product.image) return normalizeProductImage(product.image);
  if (Array.isArray(product.images) && product.images.length) return normalizeProductImage(product.images[0]);
  return DEFAULT_PRODUCT_IMAGE;
};
