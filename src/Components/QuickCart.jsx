"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './QuickCart.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const QuickCart = () => {
    const { totalItems, toggleCart } = useCart();

    return (
        <div className={styles.quickCartWrapper}>
            {/* Floating Button */}
            <motion.button 
                className={styles.floatingButton}
                onClick={toggleCart}
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
        </div>
    );
};

export default QuickCart;
