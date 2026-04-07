'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  XCircle, 
  RefreshCcw, 
  HelpCircle, 
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import styles from './Failed.module.css';

export default function PaymentFailedPage() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={styles.failedPage}>
      <motion.div 
        className={styles.card}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Shaking Icon Wrapper */}
        <motion.div 
          className={`${styles.iconWrapper} ${styles.shake}`}
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <XCircle size={64} strokeWidth={2.5} />
        </motion.div>

        <motion.h1 className={styles.title} variants={itemVariants}>
          Oops! Payment Failed
        </motion.h1>

        <motion.p className={styles.subtitle} variants={itemVariants}>
          Unfortunately, we couldn't process your transaction. This might be due to incorrect details or temporary bank issues.
        </motion.p>

        {/* Potential Issues Box */}
        <motion.div className={styles.errorList} variants={itemVariants}>
           <div className={styles.errorItem}>
              <AlertTriangle size={18} />
              <span>Potential issues identified:</span>
           </div>
           <ul style={{ padding: '0.75rem 1.5rem', margin: 0, color: '#991b1b', fontSize: '0.85rem', fontWeight: '500' }}>
              <li>Insufficient funds in the selected account.</li>
              <li>Incorrect expiration date or CVV code.</li>
              <li>Declined by the bank for security reasons.</li>
           </ul>
        </motion.div>

        <motion.div style={{ display: 'grid', gap: '1.25rem' }} variants={itemVariants}>
          <Link href="/checkout/payment" style={{ textDecoration: 'none' }}>
            <motion.button 
              className={styles.retryBtn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCcw size={20} />
              <span>Retry Payment</span>
            </motion.button>
          </Link>
          
          <Link href="/contact" style={{ textDecoration: 'none' }}>
            <motion.div className={styles.secondaryBtn} whileHover={{ scale: 1.01 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <HelpCircle size={18} />
                <span>Contact Tech Support</span>
              </div>
            </motion.div>
          </Link>
          
          <Link href="/" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '700', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
             <ArrowLeft size={16} /> Back to Market
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
