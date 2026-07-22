import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { normalizeProductImage, DEFAULT_PRODUCT_IMAGE } from '../utils/imageHelpers';

const defaultCartContext = {
  cartItems: [],
  cartCount: 0,
  subtotal: 0,
  deliveryCharge: 0,
  finalTotal: 0,
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
};

const CartContext = createContext(defaultCartContext);

const normalizeCartItemId = (product) => {
  const rawId = product?._id ?? product?.id ?? product?.legacyId ?? product?.productId ?? '';
  if (rawId === undefined || rawId === null || rawId === '') {
    const fallbackTitle = product?.title || product?.name || 'product';
    return `fallback-${String(fallbackTitle).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')}`;
  }
  return String(rawId);
};

const normalizeCartItem = (item, fallbackImage) => {
  const rawId = item?._id ?? item?.productId ?? item?.id ?? item?.legacyId ?? '';
  const normalizedId = rawId ? String(rawId) : 'fallback-item';
  const selectedWeight = item?.selectedWeight || item?.weight || '500g';
  const quantity = Number(item?.quantity) || 1;

  return {
    _id: normalizedId,
    id: normalizedId,
    title: item?.title || item?.name || '',
    slug: item?.slug || '',
    image: fallbackImage(item?.image || item?.images?.[0] || ''),
    price: Number(item?.price) || 0,
    selectedWeight,
    quantity: Math.max(1, quantity),
    weight: selectedWeight,
  };
};

export function CartProvider({ children }) {
  const normalizeImage = (src) => {
    try {
      return normalizeProductImage(src);
    } catch {
      return DEFAULT_PRODUCT_IMAGE;
    }
  };

  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === 'undefined') return [];

    try {
      const savedItems = JSON.parse(window.localStorage.getItem('lion-spices-cart') || '[]');
      if (!Array.isArray(savedItems)) return [];

      return savedItems.map((item) => normalizeCartItem(item, normalizeImage));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('lion-spices-cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product, selectedVariantOrWeight = product?.variants?.[0] || product?.weight || '500g', quantity = 1) => {
    const normalizedQuantity = Math.max(1, Number(quantity) || 1);
    const productIdString = normalizeCartItemId(product);
    const selectedVariant = selectedVariantOrWeight && typeof selectedVariantOrWeight === 'object' && 'weight' in selectedVariantOrWeight
      ? selectedVariantOrWeight
      : (product?.variants?.find((variant) => variant.weight === selectedVariantOrWeight) || { weight: selectedVariantOrWeight || product?.weight || '500g', price: product?.price ?? 0 });
    const price = Number(selectedVariant?.price ?? product?.price ?? 0) || 0;
    const selectedWeight = selectedVariant?.weight || product?.weight || '500g';

    const newItem = {
      _id: productIdString,
      id: productIdString,
      title: product?.title || product?.name || '',
      slug: product?.slug || '',
      image: normalizeImage(product?.image || product?.images?.[0] || ''),
      price,
      selectedWeight,
      quantity: normalizedQuantity,
      weight: selectedWeight,
    };

    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === productIdString && item.selectedWeight === selectedWeight);
      if (existing) {
        const next = prev.map((item) =>
          item._id === productIdString && item.selectedWeight === selectedWeight
            ? { ...item, quantity: item.quantity + normalizedQuantity, price: item.price || price }
            : item
        );
        toast.success(`Updated ${newItem.title} quantity in your cart.`);
        return next;
      }

      toast.success(`Added ${newItem.title} to your cart.`);
      return [...prev, newItem];
    });
  };

  const updateQuantity = (productId, selectedWeight, amount) => {
    setCartItems((prev) => {
      let actionMessage = 'Updated cart quantity.';
      const next = prev
        .map((item) => {
          if (item._id === productId && item.selectedWeight === selectedWeight) {
            const nextQuantity = Math.max(0, item.quantity + Number(amount) || 0);
            if (nextQuantity <= 0) {
              actionMessage = `Removed ${item.title} from your cart.`;
              return null;
            }
            actionMessage = `Updated ${item.title} quantity to ${nextQuantity}.`;
            return { ...item, quantity: nextQuantity };
          }
          return item;
        })
        .filter(Boolean);

      toast.success(actionMessage);
      return next;
    });
  };

  const removeFromCart = (productId, selectedWeight) => {
    setCartItems((prev) => {
      const next = prev.filter((item) => !(item._id === productId && item.selectedWeight === selectedWeight));
      toast.success('Removed item from your cart.');
      return next;
    });
  };

  const clearCart = () => {
    toast.success('Cart cleared.');
    setCartItems([]);
  };

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const deliveryCharge = subtotal > 0 ? 49 : 0;
  const finalTotal = subtotal + deliveryCharge;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        deliveryCharge,
        finalTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
