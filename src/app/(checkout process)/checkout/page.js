'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  MapPin, 
  CreditCard, 
  ArrowRight, 
  ChevronLeft,
  ShoppingBag,
  Tag,
  Truck
} from 'lucide-react';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
  const { checkoutItems, checkoutSubtotal } = useCart();
  
  const shipping = 0; // FREE Standard
  const tax = checkoutSubtotal * 0.08;
  const total = checkoutSubtotal + shipping + tax;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={styles.pageWrapper}>
      <motion.div 
        className={styles.container}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        
        {/* Step Progress UI */}
        <div className={styles.progressContainer}>
          <div className={styles.stepWrapper}>
            <div className={`${styles.step} ${styles.stepActive}`}>
              <div className={styles.stepCircle}>1</div>
              <span className={styles.stepLabel}>Cart</span>
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.step}>
              <div className={styles.stepCircle}>2</div>
              <span className={styles.stepLabel}>Address</span>
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.step}>
              <div className={styles.stepCircle}>3</div>
              <span className={styles.stepLabel}>Payment</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--foreground)' }}>Checkout Summary</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '500' }}>Review your items before proceeding</p>
          </div>
          <Link href="/" style={{ color: 'var(--primary)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ChevronLeft size={20} /> Continue Shopping
          </Link>
        </div>

        <div className={styles.layout}>
          
          {/* Order Details */}
          <div style={{ display: 'grid', gap: '2rem' }}>
            <motion.div className={styles.card} variants={itemVariants}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ backgroundColor: 'rgba(100, 61, 151, 0.08)', padding: '12px', borderRadius: '12px', color: 'var(--primary)' }}>
                  <ShoppingBag size={24} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Your Items</h2>
              </div>
              
              <div className={styles.productList}>
                {checkoutItems.map((item, idx) => (
                  <motion.div 
                    key={item.id} 
                    className={styles.productItem}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                  >
                    <div className={styles.imageBox}>
                      <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.25rem' }}>{item.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Category: {item.category}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                        <span style={{ fontSize: '0.9rem', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>Qty: {item.quantity}</span>
                        <span style={{ color: 'var(--primary)', fontWeight: '800' }}>${item.price.toFixed(2)} ea</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                       <span style={{ fontWeight: '900', fontSize: '1.1rem' }}>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </motion.div>
                ))}
                {checkoutItems.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <ShoppingCart size={48} style={{ opacity: 0.1, marginBottom: '1rem' }} />
                    <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Your checkout list is empty.</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Delivery Info Mock */}
            <motion.div className={styles.card} variants={itemVariants}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ backgroundColor: '#fcf8ff', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid var(--border)', flex: 1 }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <Truck size={18} style={{ color: 'var(--primary)' }} />
                      <span style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--primary)' }}>FREE SHIPPING</span>
                   </div>
                   <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>Standard delivery within 3-5 business days.</p>
                </div>
                <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid var(--border)', flex: 1 }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <Tag size={18} style={{ color: '#059669' }} />
                      <span style={{ fontWeight: '800', fontSize: '0.9rem', color: '#059669' }}>SECURE PAYMENT</span>
                   </div>
                   <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>Encryption protocols for your protection.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Summary */}
          <motion.div variants={itemVariants}>
            <div className={styles.summaryCard}>
              <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '800' }}>Order Summary</h2>
              
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                <div className={styles.summaryRow}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Subtotal ({checkoutItems.length} items)</span>
                  <span style={{ fontWeight: '700' }}>${checkoutSubtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Shipping</span>
                  <span style={{ color: '#059669', fontWeight: '800' }}>FREE</span>
                </div>
                <div className={styles.summaryRow}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Tax (8%)</span>
                  <span style={{ fontWeight: '700' }}>${tax.toFixed(2)}</span>
                </div>
                
                <div className={styles.summaryTotal}>
                  <div>
                    <span style={{ fontSize: '1.25rem', fontWeight: '900' }}>Total</span>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Inclusive of all taxes</p>
                  </div>
                  <span style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)' }}>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link href={checkoutItems.length > 0 ? "/checkout/address" : "#"}>
                <motion.button 
                  className={styles.checkoutBtn}
                  disabled={checkoutItems.length === 0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Continue to Address</span>
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1.5rem', fontWeight: '500' }}>
                By proceeding, you agree to our Terms & Conditions.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
