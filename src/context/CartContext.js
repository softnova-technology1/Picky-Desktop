"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [notification, setNotification] = useState({ show: false, product: null });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [closeTimer, setCloseTimer] = useState(null);

  const openCart = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      setCloseTimer(null);
    }
    setIsCartOpen(true);
  };

  const closeCart = (delay = 0) => {
    if (delay === 0) {
      setIsCartOpen(false);
      return;
    }
    
    if (closeTimer) clearTimeout(closeTimer);
    
    const timer = setTimeout(() => {
      setIsCartOpen(false);
      setCloseTimer(null);
    }, delay);
    setCloseTimer(timer);
  };

  const triggerNotification = (product) => {
    setNotification({ show: true, product });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const STORAGE_KEY = 'picky_cart_v1';
  const CHECKOUT_KEY = 'picky_checkout_v1';

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('cartItems') || localStorage.getItem('picky_cart');
      const savedCheckout = localStorage.getItem(CHECKOUT_KEY) || localStorage.getItem('picky_checkout');
      
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed)) setCartItems(parsed);
        } catch (e) {
          console.error("Failed to parse cart:", e);
        }
      }
      
      if (savedCheckout) {
        try {
          const parsed = JSON.parse(savedCheckout);
          if (Array.isArray(parsed)) setCheckoutItems(parsed);
        } catch (e) {
          console.error("Failed to parse checkout items:", e);
        }
      }
      
      setIsLoaded(true);
    }
  }, []);

  // Persistence: Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CHECKOUT_KEY, JSON.stringify(checkoutItems));
    }
  }, [checkoutItems, isLoaded]);

  // Auto-sync Checkout with Cart if stale/empty
  useEffect(() => {
    if (isLoaded && checkoutItems.length === 0 && cartItems.length > 0) {
      setCheckoutItems([...cartItems]);
    }
  }, [isLoaded, cartItems.length, checkoutItems.length]);

  const addToCart = (product) => {
    // Normalize product data
    const normalizedProduct = {
      ...product,
      image: product.image || product.img || product.thumb || "/images/placeholder.png",
      price: typeof product.price === 'string' ? parseFloat(product.price.replace(/[^\d.]/g, '')) || 0 : (Number(product.price) || 0)
    };

    const requestedQuantity = Number(product.quantity) || 1;

    setCartItems(prevItems => {
      const copy = [...prevItems];
      const existingIndex = copy.findIndex(item => item.id === normalizedProduct.id);
      
      if (existingIndex > -1) {
        copy[existingIndex] = { 
          ...copy[existingIndex], 
          quantity: copy[existingIndex].quantity + requestedQuantity 
        };
        return copy;
      }
      return [...copy, { ...normalizedProduct, quantity: requestedQuantity }];
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

  const clearCart = () => {
    setCartItems([]);
    setCheckoutItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(CHECKOUT_KEY);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const p = Number(item.price) || 0;
    const q = Number(item.quantity) || 0;
    return acc + (p * q);
  }, 0);

  const totalItems = cartItems.length;

  // Dynamic checkout calculation
  const checkoutSubtotal = checkoutItems.reduce((acc, item) => {
    const p = Number(item.price) || 0;
    const q = Number(item.quantity) || 0;
    return acc + (p * q);
  }, 0);

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
      triggerNotification,
      prepareCheckout: () => setCheckoutItems([...cartItems]),
      isCartOpen,
      setIsCartOpen,
      openCart,
      closeCart,
      toggleCart: () => setIsCartOpen(prev => !prev),
      isLoaded
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
