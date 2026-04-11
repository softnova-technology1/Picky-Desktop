"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [notification, setNotification] = useState({ show: false, product: null });

  const triggerNotification = (product) => {
    setNotification({ show: true, product });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems') || localStorage.getItem('picky_cart');
    const savedCheckout = localStorage.getItem('picky_checkout');
    
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart:", e);
      }
    }
    
    if (savedCheckout) {
      try {
        setCheckoutItems(JSON.parse(savedCheckout));
      } catch (e) {
        console.error("Failed to parse checkout items:", e);
      }
    }
    
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change, but only after initial load
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('picky_checkout', JSON.stringify(checkoutItems));
    }
  }, [checkoutItems, isLoaded]);

  const addToCart = (product) => {
    // Normalize product data to ensure consistent field names (image, price, etc.)
    const normalizedProduct = {
      ...product,
      image: product.image || product.img || product.thumb || "/images/placeholder.png",
      price: typeof product.price === 'string' ? parseFloat(product.price.replace(/[^\d.]/g, '')) || 0 : (product.price || 0)
    };

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === normalizedProduct.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === normalizedProduct.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...normalizedProduct, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Dynamic checkout calculation
  const checkoutSubtotal = checkoutItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    // <CartContext.Provider value={{
    //   cartItems,
    //   addToCart,
    //   removeFromCart,
    //   updateQuantity,
    <CartContext.Provider value={{
      cartItems,
      checkoutItems,
      setCheckoutItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      totalItems,
      checkoutSubtotal,
      notification,
      setNotification,
      triggerNotification
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
