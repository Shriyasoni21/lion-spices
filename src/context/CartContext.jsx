import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../utils/apiClient';
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

const isValidObjectId = (value) => /^[0-9a-fA-F]{24}$/.test(String(value));

export function CartProvider({ children }) {
  const normalizeImage = (src) => {
    try {
      return normalizeProductImage(src);
    } catch {
      return DEFAULT_PRODUCT_IMAGE;
    }
  };

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedItems = JSON.parse(localStorage.getItem('lion-spices-cart') || '[]');
      if (!Array.isArray(savedItems)) return [];

      const normalized = savedItems
        .map((item) => {
          const rawId = item._id ?? item.productId ?? item.id ?? item.legacyId ?? '';
          const normalizedId = rawId ? String(rawId) : '';
          if (!isValidObjectId(normalizedId)) {
            return null;
          }
          return {
            _id: normalizedId,
            id: normalizedId,
            title: item.title || item.name || '',
            slug: item.slug || item.slug || '',
            image: normalizeImage(item.image || item.images?.[0] || ''),
            price: Number(item.price) || 0,
            selectedWeight: item.selectedWeight || item.weight || '500g',
            quantity: Number(item.quantity) || 1,
          };
        })
        .filter(Boolean);

      if (normalized.length !== (savedItems || []).length) {
        localStorage.removeItem('lion-spices-cart');
        return normalized;
      }

      return normalized;
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('lion-spices-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedVariantOrWeight = product.variants?.[0] || product.weight || '500g', quantity = 1) => {
    const productId = product._id ?? product.id ?? product.legacyId;
    if (!productId || !isValidObjectId(productId)) {
      console.warn('Cannot add product to cart without a valid MongoDB _id:', {
        _id: product._id,
        id: product.id,
        legacyId: product.legacyId,
        title: product.title,
      });
      return;
    }

    const productIdString = String(productId);
    const selectedVariant = selectedVariantOrWeight && typeof selectedVariantOrWeight === 'object' && 'weight' in selectedVariantOrWeight
      ? selectedVariantOrWeight
      : (product.variants?.find((variant) => variant.weight === selectedVariantOrWeight) || { weight: selectedVariantOrWeight || product.weight || '500g', price: product.price ?? 0 });
    const price = selectedVariant.price ?? product.price ?? 0;
    const selectedWeight = selectedVariant.weight || product.weight || '500g';

    const newItem = {
      _id: productIdString,
      id: productIdString,
      title: product.title || product.name || '',
      slug: product.slug || product.slug || '',
      image: normalizeImage(product.image || product.images?.[0] || ''),
      price,
      selectedWeight,
      quantity,
    };

    console.log('CartContext addToCart', JSON.stringify({ productId: productIdString, _id: productIdString, item: newItem }, null, 2));

    const existing = cartItems.find(
      (item) => item._id === productIdString && item.selectedWeight === selectedWeight
    );

    if (existing && existing.quantity < 0) {
      console.warn('Detected invalid quantity, resetting to 1');
    }

    const message = existing
      ? `Updated ${newItem.title} quantity in your cart.`
      : `Added ${newItem.title} to your cart.`;

    setCartItems((prev) => {
      if (existing) {
        return prev.map((item) =>
          item._id === productIdString && item.selectedWeight === selectedWeight
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, newItem];
    });

    toast.success(message);
  };

  const updateQuantity = (productId, selectedWeight, amount) => {
    setCartItems((prev) => {
      let actionMessage = 'Updated cart quantity.';
      const next = prev
        .map((item) => {
          if (item._id === productId && item.selectedWeight === selectedWeight) {
            const nextQuantity = Math.max(0, item.quantity + amount);
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
