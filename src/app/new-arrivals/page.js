'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import NewArrivalsList from './NewArrivalsList';
import styles from './NewArrivals.module.css';
import { useCart } from '@/context/CartContext';

export default function NewArrivalsPage() {
  const { triggerNotification } = useCart();

  const handleAddToCart = (product) => {
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
          <h1 className={styles.title}>New Arrivals</h1>
          <p className={styles.subtitle}>
            Explore the latest treasures curated just for you. From modern tech to artisan home decor, be the first to own our newest additions.
          </p>
        </motion.div>

        {/* Product Listing */}
        <NewArrivalsList onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
}
