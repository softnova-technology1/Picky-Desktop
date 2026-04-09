"use client";

import React from 'react';
import Link from 'next/link';
import styles from './CancelOrderPopup.module.css';
import { Check, X, ShoppingBag, Eye } from 'lucide-react';

const CancelOrderPopup = ({ isOpen, onClose, orderId = "#ED-928374" }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={24} strokeWidth={1.5} />
        </button>

        <div className={styles.iconWrapper}>
           <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
             <Check size={24} strokeWidth={3} />
           </div>
        </div>

        <h2 className={styles.title}>Order Cancelled</h2>
        <p className={styles.subtitle}>
          Your order {orderId} has been successfully cancelled. A confirmation email has been sent to your inbox.
        </p>

        <div className={styles.btnGroup}>
           <Link href="/shop" className={styles.primaryBtn} style={{ textDecoration: 'none', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <ShoppingBag size={18} strokeWidth={1.5} />
                Continue Shopping
              </div>
           </Link>
           <Link href="/my-orders" className={styles.secondaryBtn} style={{ textDecoration: 'none', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <Eye size={18} strokeWidth={1.5} />
                View Order History
              </div>
           </Link>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderPopup;
