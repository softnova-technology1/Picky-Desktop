"use client";

import React, { useState, useEffect } from 'react';
import styles from './ReturnItemPopup.module.css';
import { X, Check, ArrowRight, RotateCcw } from 'lucide-react';

const REASONS = [
  "Product is damaged or defective",
  "Incorrect item received",
  "Item does not fit (Size issues)",
  "Product quality not as expected",
  "Changed my mind / No longer needed",
  "Better price found elsewhere",
  "Delivered late or slow shipping",
  "Other (please specify)"
];

const ReturnItemPopup = ({ isOpen, onClose, orderId }) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [customReason, setCustomReason] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state when closing/opening and handle scroll lock
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
    // Simulate API call
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
            <h2 className={styles.title}>Return Item</h2>
            <p className={styles.subtitle}>
              We're sorry your purchase didn't work out. Please select a reason for your return for order <strong>{orderId}</strong>.
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
                        placeholder="Please tell us more about your return..."
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
              {isSubmitting ? (
                 <span>Processing...</span>
              ) : (
                <>
                  Confirm Return
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </>
        ) : (
          <div className={styles.successBody}>
            <div className={styles.successIconWrapper}>
              <Check size={40} className={styles.checkmark} strokeWidth={3} />
            </div>
            <h2 className={styles.successTitle}>Return Requested</h2>
            <p className={styles.subtitle}>
              Your return request for order {orderId} has been successfully submitted. We'll send you an email with shipping instructions within 24 hours.
            </p>
            <button 
              className={styles.confirmBtn}
              onClick={onClose}
            >
              Back to My Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnItemPopup;
