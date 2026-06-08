"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CancelOrderPopup.module.css';
import { X, Check, ShoppingBag, Eye, ArrowRight } from 'lucide-react';

const REASONS = [
  "Order placed by mistake",
  "Item is no longer needed",
  "Found a better price elsewhere",
  "Standard delivery time is too long",
  "Shipping cost is too high",
  "Other (please specify)"
];

const CancelOrderPopup = ({ isOpen, onClose, orderId = "#PKY-8821" }) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [customReason, setCustomReason] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => {
        setSelectedReason(null);
        setCustomReason("");
        setIsSuccess(false);
      }, 300);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const isOtherSelected = selectedReason === REASONS.length - 1;
  const canConfirm = selectedReason !== null && (!isOtherSelected || customReason.trim().length > 0);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        {!isSuccess ? (
          <>
            <h2 className={styles.title}>Cancel Order</h2>
            <p className={styles.subtitle}>
              We'll process your cancellation immediately. Please tell us why you're cancelling order <strong>{orderId}</strong>.
            </p>

            <div className={styles.reasonGrid}>
              {REASONS.map((reason, index) => (
                <div key={index}>
                  <div 
                    className={`${styles.reasonOption} ${selectedReason === index ? styles.selected : ''}`}
                    onClick={() => setSelectedReason(index)}
                  >
                    <div className={styles.radioCircle}>
                      <div className={styles.radioInner} />
                    </div>
                    <span className={styles.reasonText}>{reason}</span>
                  </div>
                  
                  {index === REASONS.length - 1 && selectedReason === index && (
                    <div className={styles.customInputWrapper}>
                      <textarea
                        className={styles.customInput}
                        placeholder="Please share more details..."
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        autoFocus
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button 
              className={styles.confirmBtn}
              onClick={handleConfirm}
              disabled={!canConfirm || isSubmitting}
            >
              {isSubmitting ? "Processing..." : (
                <>
                  Confirm Cancellation
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </>
        ) : (
          <div className={styles.successBody}>
            <div className={styles.successIconWrapper}>
              <Check size={48} strokeWidth={3} />
            </div>
            <h2 className={styles.successTitle}>Order Cancelled</h2>
            <p className={styles.subtitle}>
              Your order {orderId} has been successfully cancelled. A confirmation email and refund details have been sent to your inbox.
            </p>
            
            <div className={styles.btnGroup}>
               <Link href="/shop" className={styles.confirmBtn} style={{ textDecoration: 'none' }}>
                  <ShoppingBag size={18} /> Continue Shopping
               </Link>
               <Link href="/my-orders" className={styles.confirmBtn} style={{ textDecoration: 'none', background: '#f8f8f8', color: '#1a1a1a' }}>
                  <Eye size={18} /> View Order History
               </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelOrderPopup;
