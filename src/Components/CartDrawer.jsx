"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { X, ShoppingBag, ShoppingCart, ArrowRight, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CartDrawer.module.css';

const CartDrawer = () => {
    const { 
        isCartOpen, 
        closeCart, 
        cartItems, 
        totalItems, 
        subtotal, 
        removeFromCart, 
        clearCart, 
        prepareCheckout,
        updateQuantity 
    } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
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
                                <h2 className={styles.title}>YOUR BAG</h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span className={styles.itemCount}>{totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'}</span>
                                    {totalItems > 0 && (
                                        <button 
                                            onClick={clearCart}
                                            className={styles.clearBtn}
                                        >
                                            CLEAR ALL
                                        </button>
                                    )}
                                </div>
                            </div>
                            <button className={styles.closeBtn} onClick={closeCart}>
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className={styles.content}>
                            {cartItems.length > 0 ? (
                                <div className={styles.itemsList}>
                                    {cartItems.map((item, idx) => {
                                        const itemImg = item.image?.src || item.image || item.img?.src || item.img || "/images/placeholder.png";
                                        return (
                                            <div key={item.id || idx} className={styles.item}>
                                                <div className={styles.itemImage}>
                                                    <Image src={itemImg} alt={item.name} fill style={{ objectFit: 'contain' }} />
                                                </div>
                                                <div className={styles.itemInfo}>
                                                    <h4 className={styles.itemName}>{item.name}</h4>
                                                    
                                                    <div className={styles.itemMeta}>
                                                        <span className={styles.itemPrice}>${(Number(item.price) || 0).toFixed(2)}</span>
                                                        
                                                        <div className={styles.qtyControl}>
                                                            <button 
                                                                className={styles.qtyBtn}
                                                                onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className={styles.qtyValue}>{item.quantity || 1}</span>
                                                            <button 
                                                                className={styles.qtyBtn}
                                                                onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <button 
                                                        className={styles.removeBtn}
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className={styles.emptyState}>
                                    <div className={styles.emptyIconWrapper}>
                                        <ShoppingBag size={80} strokeWidth={1} />
                                    </div>
                                    <h3 className={styles.emptyTitle}>Your bag is empty</h3>
                                    <p className={styles.emptyText}>Looks like you haven't added anything yet. Discover our latest collection and find something you love.</p>
                                    <Link href="/shop" className={styles.shopNowBtn} onClick={closeCart}>
                                        START SHOPPING
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className={styles.footer}>
                                <div className={styles.subtotalRow}>
                                    <span className={styles.subtotalLabel}>Est. Subtotal</span>
                                    <span className={styles.statusBadge}>ACTIVE BAG</span>
                                    <span className={styles.subtotalValue}>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className={styles.actions}>
                                    <Link 
                                        href="/cart" 
                                        className={styles.secondaryBtn}
                                        onClick={closeCart}
                                    >
                                        VIEW SHOPPING BAG
                                    </Link>
                                    <Link 
                                        href="/checkout" 
                                        className={styles.primaryBtn}
                                        onClick={() => {
                                            prepareCheckout();
                                            closeCart();
                                        }}
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
    );
};

export default CartDrawer;
