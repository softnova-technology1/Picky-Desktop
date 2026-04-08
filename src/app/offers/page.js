'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import OffersList from './OffersList';
import styles from './Offers.module.css';
import { useCart } from '@/context/CartContext';

export default function OffersPage() {
  const { triggerNotification } = useCart();

  const handleHandleAddToCart = (product) => {
    triggerNotification(product);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Header Section */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className={styles.title}>Special Offers</h1>
          <p className={styles.subtitle}>
            Don't miss out on these exclusive deals. Handpicked premium products at prices you won't find anywhere else. Act fast—stocks are limited!
          </p>
        </motion.div>

        {/* Product Listing */}
        <OffersList onAddToCart={handleHandleAddToCart} />
      </div>
    </div>
  );
}
