"use client";

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ShoppingBag } from 'lucide-react';
import styles from './CartNotification.module.css';

const CartNotification = ({ show, product, onClose }) => {
  if (!product) return null;

  // Handle both object images (static imports) and string images (URLs)
  const imageSrc = product.image?.src || product.image || product.img?.src || product.img || product.thumb || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=800';

  return (
    <AnimatePresence>
      {show && (
        <div className={styles.popupOverlay}>
          <motion.div
            className={styles.popupCard}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
          >
            <button
              className={styles.popupClose}
              onClick={onClose}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>

            <div className={styles.popupHeader}>
              <div className={styles.successIcon}>
                <Check size={18} strokeWidth={3} />
              </div>
              <div className={styles.headerText}>
                <h4>Added to Cart!</h4>
                <p>Item successfully added to your bag</p>
              </div>
            </div>

            <div className={styles.productSection}>
              <div className={styles.imageContainer}>
                <Image
                  src={imageSrc}
                  alt={product.name}
                  width={64}
                  height={64}
                  className={styles.productImage}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.productDetails}>
                <h5 className={styles.productName}>{product.name}</h5>
                <div className={styles.priceTag}>
                  ${Number(product.price || 0).toFixed(2)}
                </div>
              </div>
            </div>

            <div className={styles.actionSection}>
              <button className={styles.viewCartBtn} onClick={onClose}>
                <ShoppingBag size={16} />
                CONTINUE SHOPPING
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartNotification;

