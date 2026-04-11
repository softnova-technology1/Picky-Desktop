"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './QuickCart.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const QuickCart = () => {
    const { totalItems, cartItems, subtotal } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    // Don't show floating button if we are on cart or checkout pages
    // However, the user said "floating button appears at bottom-right corner" consistently.
    // I'll keep it visible, but if user is on cart page, it might be redundant.
    // Let's just keep it simple as requested.

    return (
        <div className={styles.quickCartWrapper}>
            {/* Floating Button */}
            <motion.button 
                className={styles.floatingButton}
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <ShoppingCart size={28} strokeWidth={1.5} />
                {totalItems > 0 && (
                    <motion.span 
                        className={styles.badge}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        key={totalItems} // Re-animate on count change
                    >
                        {totalItems}
                    </motion.span>
                )}
            </motion.button>

            {/* Side Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div 
                            className={styles.backdrop}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Drawer Panel */}
                        <motion.div 
                            className={styles.drawer}
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
                        >
                            {/* Header */}
                            <div className={styles.header}>
                                <div className={styles.titleGroup}>
                                    <h2 className={styles.title}>Quick Cart</h2>
                                    <span style={{ fontSize: '11px', fontWeight: 700, opacity: 0.5, letterSpacing: '1px' }}>
                                        {totalItems} ITEMS ADDED
                                    </span>
                                </div>
                                <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Cart Items List */}
                            <div className={styles.content}>
                                {cartItems.length > 0 ? (
                                    <div className={styles.itemList}>
                                        {cartItems.map((item) => (
                                            <div key={item.id} className={styles.item}>
                                                <div className={styles.itemImage}>
                                                    <img src={item.image?.src || item.image || item.img?.src || item.img || "/images/placeholder.png"} alt={item.name} />
                                                </div>
                                                <div className={styles.itemInfo}>
                                                    <h3 className={styles.itemName}>{item.name}</h3>
                                                    <div className={styles.itemPriceQty}>
                                                        <span className={styles.itemPrice}>${item.price}</span>
                                                        <span className={styles.itemQty}>QTY: {item.quantity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={styles.emptyState}>
                                        <ShoppingBag size={80} strokeWidth={1} style={{ opacity: 0.2, marginBottom: '20px' }} />
                                        <h3 style={{ fontWeight: 900, fontSize: '1.2rem', color: '#000' }}>Your Quick Cart is empty</h3>
                                        <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>Discover our latest collection and start adding items.</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer Actions */}
                            {cartItems.length > 0 && (
                                <div className={styles.footer}>
                                    <div className={styles.subtotalRow}>
                                        <span className={styles.subtotalLabel}>Est. Subtotal</span>
                                        <span className={styles.subtotalValue}>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className={styles.actions}>
                                        <Link 
                                            href="/cart" 
                                            className={styles.viewCartBtn}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            VIEW BAG
                                        </Link>
                                        <Link 
                                            href="/checkout" 
                                            className={styles.checkoutBtn}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            CHECKOUT NOW
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuickCart;
