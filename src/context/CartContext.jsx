import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lion-spices-cart') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('lion-spices-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedWeight = product.weight || '500g', quantity = 1) => {
    const price = product.variantPrices?.[selectedWeight] ?? product.price ?? 0;

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.selectedWeight === selectedWeight
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedWeight === selectedWeight
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          selectedWeight,
          quantity,
          price,
          totalPrice: price * quantity,
        },
      ];
    });
  };

  const updateQuantity = (productId, selectedWeight, amount) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === productId && item.selectedWeight === selectedWeight) {
            const nextQuantity = item.quantity + amount;
            return nextQuantity > 0 ? { ...item, quantity: nextQuantity, totalPrice: item.price * nextQuantity } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId, selectedWeight) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === productId && item.selectedWeight === selectedWeight))
    );
  };

  const clearCart = () => setCartItems([]);

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
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}
