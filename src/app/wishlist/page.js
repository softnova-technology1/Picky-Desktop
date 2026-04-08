"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import styles from './wishlist.module.css';

const WishlistPage = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart, triggerNotification } = useCart();

    const handleAddToCart = (item) => {
        addToCart(item);
        triggerNotification(item);
    };


    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {/* Header */}
                <header className={styles.header}>
                    <Link href="/" className={styles.backLink}>
                        <ArrowLeft size={18} />
                        <span>Back to Shopping</span>
                    </Link>
                    <div className={styles.titleWrapper}>
                        <h1 className={styles.title}>My Wishlist</h1>
                        <span className={styles.count}>{wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}</span>
                    </div>
                </header>

                <AnimatePresence mode="popLayout">
                    {wishlistItems.length > 0 ? (
                        <motion.div 
                            className={styles.grid}
                            layout
                        >
                            {wishlistItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                    className={styles.card}
                                >
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className={styles.image}
                                        />
                                        <button 
                                            className={styles.removeBtn}
                                            onClick={() => removeFromWishlist(item.id)}
                                            title="Remove from wishlist"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className={styles.content}>
                                        <h3 className={styles.name}>{item.name}</h3>
                                        <div className={styles.footer}>
                                            <span className={styles.price}>${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</span>
                                            <button 
                                                className={styles.addCartBtn}
                                                onClick={() => handleAddToCart(item)}
                                            >
                                                <ShoppingCart size={16} />
                                                <span>Add to Cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            className={styles.emptyState}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className={styles.emptyIcon}>
                                <Heart size={64} color="#ddd" strokeWidth={1} />
                            </div>
                            <h2>Your wishlist is empty</h2>
                            <p>Save items you love and they will appear here once you're ready to make them yours.</p>
                            <Link href="/" className={styles.shopBtn}>
                                <ShoppingBag size={18} />
                                <span>Start Exploring</span>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
};

export default WishlistPage;
