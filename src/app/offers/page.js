'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import OffersList from './OffersList';
import styles from './Offers.module.css';

export default function OffersPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleHandleAddToCart = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
    // Auto close after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
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

      {/* Cart Popup Notification */}
      <AnimatePresence>
        {showPopup && selectedProduct && (
          <div className={styles.popupOverlay}>
            <motion.div 
              className={styles.popupCard}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button 
                className={styles.popupClose} 
                onClick={() => setShowPopup(false)}
              >
                <X size={18} />
              </button>

              <div className={styles.popupHeader}>
                <div className={styles.successIcon}>
                  <Check size={20} strokeWidth={3} />
                </div>
                <div className={styles.popupTitleBox}>
                  <h4>Added to Cart!</h4>
                  <p>Your item is ready for checkout</p>
                </div>
              </div>

              <div className={styles.popupProduct}>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className={styles.popupImage}
                />
                <div className={styles.productInfo}>
                  <h5 className={styles.productName}>{selectedProduct.name}</h5>
                  <p className={styles.productPrice}>${selectedProduct.discountPrice.toFixed(2)}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
