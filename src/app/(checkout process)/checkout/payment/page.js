'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Check, 
  ChevronLeft, 
  ShieldCheck, 
  Wallet,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './Payment.module.css';
import loaderStyles from './LoadingTruck.module.css';

// Picky Delivery Truck Loading Component
const LoadingTruck = () => {
  const [dots, setDots] = useState('');
  const [loadingText, setLoadingText] = useState('Picky is delivering your order');

  useEffect(() => {
    const texts = [
      'Picky is delivering your order',
      'Processing secure payment',
      'On the way to your doorstep',
      'Almost there'
    ];
    let currentText = 0;
    const textInterval = setInterval(() => {
      currentText = (currentText + 1) % texts.length;
      setLoadingText(texts[currentText]);
    }, 1500);

    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);

    return () => {
      clearInterval(textInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <motion.div 
      className={loaderStyles.loaderOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={loaderStyles.scene}>
        {/* Clouds Parallax */}
        <div className={`${loaderStyles.cloud} ${loaderStyles.cloud1}`} />
        <div className={`${loaderStyles.cloud} ${loaderStyles.cloud2}`} />
        
        {/* Road */}
        <div className={loaderStyles.road} />

        {/* Trees Parallax */}
        <div className={`${loaderStyles.tree} ${loaderStyles.tree1}`}>
          <svg viewBox="0 0 40 60">
            <rect x="18" y="40" width="4" height="20" fill="#78350f" />
            <circle cx="20" cy="30" r="20" fill="#15803d" />
            <circle cx="10" cy="20" r="12" fill="#166534" />
            <circle cx="30" cy="20" r="12" fill="#166534" />
          </svg>
        </div>
        <div className={`${loaderStyles.tree} ${loaderStyles.tree2}`}>
          <svg viewBox="0 0 40 60">
            <rect x="18" y="40" width="4" height="20" fill="#78350f" />
            <circle cx="20" cy="35" r="18" fill="#15803d" />
            <circle cx="20" cy="15" r="15" fill="#16a34a" />
          </svg>
        </div>

        {/* Grass */}
        <div className={loaderStyles.grassContainer}>
          {[...Array(10)].map((_, i) => (
            <div key={i} className={loaderStyles.grass} style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>

        {/* Smoke trail */}
        <div className={loaderStyles.smoke} style={{ animationDelay: '0s' }} />
        <div className={loaderStyles.smoke} style={{ animationDelay: '0.2s' }} />
        <div className={loaderStyles.smoke} style={{ animationDelay: '0.4s' }} />

        {/* Truck Animation */}
        <div className={loaderStyles.truckContainer}>
          <svg width="180" height="140" viewBox="0 0 180 140">
            {/* Shadow under truck */}
            <ellipse cx="90" cy="120" rx="70" ry="8" fill="rgba(0,0,0,0.1)" />
            
            {/* Body Main (Picky Purple) */}
            <rect x="25" y="40" width="115" height="70" rx="15" fill="var(--primary)" />
            <rect x="25" y="40" width="30" height="70" rx="10" fill="rgba(255,255,255,0.1)" />
            
            {/* Cab Section */}
            <path d="M140 45h20a12 12 0 0 1 12 12v53h-32V45z" fill="#4c1d95" />
            
            {/* Window */}
            <path d="M145 50h15a5 5 0 0 1 5 5v25h-20V50z" fill="#a5f3fc" opacity="0.9" />
            
            {/* Picky Branding */}
            <text x="45" y="88" fill="white" fontWeight="950" fontSize="26" letterSpacing="-1.5" fontFamily="var(--font-geist-sans)">
              Picky
            </text>
            <rect x="45" y="95" width="20" height="3" rx="1.5" fill="white" opacity="0.6" />

            {/* Wheels Layer with Alloy Rim Detail */}
            <g className={loaderStyles.wheel}>
              {/* Outer Tyre */}
              <circle cx="55" cy="115" r="16" fill="#111" />
              {/* Alloy Rim */}
              <circle cx="55" cy="115" r="10" fill="#3f3f46" />
              <circle cx="55" cy="115" r="3" fill="#71717a" />
              {/* Spokes */}
              <g stroke="#71717a" strokeWidth="2.5" strokeLinecap="round">
                <line x1="55" y1="107" x2="55" y2="101" />
                <line x1="55" y1="123" x2="55" y2="129" />
                <line x1="47" y1="115" x2="41" y2="115" />
                <line x1="63" y1="115" x2="69" y2="115" />
                <line x1="49" y1="109" x2="45" y2="105" />
                <line x1="61" y1="121" x2="65" y2="125" />
              </g>
            </g>
            <g className={loaderStyles.wheel}>
              {/* Outer Tyre */}
              <circle cx="145" cy="115" r="16" fill="#111" />
              {/* Alloy Rim */}
              <circle cx="145" cy="115" r="10" fill="#3f3f46" />
              <circle cx="145" cy="115" r="3" fill="#71717a" />
              {/* Spokes */}
              <g stroke="#71717a" strokeWidth="2.5" strokeLinecap="round">
                <line x1="145" y1="107" x2="145" y2="101" />
                <line x1="145" y1="123" x2="145" y2="129" />
                <line x1="137" y1="115" x2="131" y2="115" />
                <line x1="153" y1="115" x2="159" y2="115" />
                <line x1="139" y1="109" x2="135" y2="105" />
                <line x1="151" y1="121" x2="155" y2="125" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div className={loaderStyles.loadingText}>
        {loadingText}
        <span className={loaderStyles.dots}>{dots}</span>
      </div>
    </motion.div>
  );
};

export default function PaymentPage() {
  const { checkoutSubtotal } = useCart();
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState('credit-card');
  const [isLoading, setIsLoading] = useState(false);

  const tax = checkoutSubtotal * 0.08;
  const finalTotal = checkoutSubtotal + tax;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handlePayment = (isSuccess = true) => {
    setIsLoading(true);
    
    // Simulate payment processing time
    setTimeout(() => {
      if (isSuccess) {
        router.push('/checkout/payment/success');
      } else {
        router.push('/checkout/payment/failed');
      }
    }, 4000); // 4 seconds of "Picky Truck" animation
  };

  const methods = [
    { id: 'credit-card', name: 'Credit Card', icon: <CreditCard size={24} />, description: 'Visa, Mastercard, AMEX' },
    { id: 'paypal', name: 'PayPal', icon: <Wallet size={24} />, description: 'Fast and secure payment' },
  ];

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingTruck />}
      </AnimatePresence>

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
              <div className={`${styles.step} ${styles.stepCompleted}`}>
                <div className={styles.stepCircle}><Check size={18} /></div>
                <span className={styles.stepLabel}>Cart</span>
              </div>
              <div className={`${styles.stepLine} ${styles.stepLineActive}`}></div>
              <div className={`${styles.step} ${styles.stepCompleted}`}>
                <div className={styles.stepCircle}><Check size={18} /></div>
                <span className={styles.stepLabel}>Address</span>
              </div>
              <div className={`${styles.stepLine} ${styles.stepLineActive}`}></div>
              <div className={`${styles.step} ${styles.stepActive}`}>
                <div className={styles.stepCircle}>3</div>
                <span className={styles.stepLabel}>Payment</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--foreground)' }}>Complete Payment</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '500' }}>Choose your preferred payment method</p>
            </div>
            <Link href="/checkout/address" style={{ color: 'var(--primary)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ChevronLeft size={20} /> Back
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)', gap: '2.5rem' }}>
            
            {/* Payment Details */}
            <div style={{ display: 'grid', gap: '2rem' }}>
              <motion.div className={styles.card} variants={itemVariants}>
                <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '800' }}>Payment Method</h2>
                <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
                  {methods.map((method) => (
                    <motion.div
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`${styles.methodCard} ${selectedPayment === method.id ? styles.methodCardActive : ''}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className={styles.iconBox} style={{ 
                        backgroundColor: selectedPayment === method.id ? 'var(--primary)' : 'rgba(100, 61, 151, 0.05)',
                        color: selectedPayment === method.id ? 'white' : 'var(--primary)'
                      }}>
                        {method.icon}
                      </div>
                      <div style={{ flex: 1, marginLeft: '1.25rem' }}>
                        <p style={{ fontWeight: '700', fontSize: '1.1rem', color: selectedPayment === method.id ? 'var(--primary)' : 'inherit' }}>{method.name}</p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{method.description}</p>
                      </div>
                      {selectedPayment === method.id && (
                        <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '4px', borderRadius: '50%' }}>
                          <Check size={14} />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {selectedPayment === 'credit-card' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ display: 'grid', gap: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                        <div>
                          <label className={styles.label}>Card Number</label>
                          <input type="text" placeholder="0000 0000 0000 0000" className={styles.input} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <div>
                            <label className={styles.label}>Expiry Date</label>
                            <input type="text" placeholder="MM / YY" className={styles.input} />
                          </div>
                          <div>
                            <label className={styles.label}>CVV</label>
                            <input type="text" placeholder="123" className={styles.input} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div className={styles.card} variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#f0fdf4', borderColor: '#dcfce7' }}>
                 <ShieldCheck size={32} style={{ color: '#16a34a' }} />
                 <div>
                    <h4 style={{ fontWeight: '700', color: '#166534' }}>Secure Checkout</h4>
                    <p style={{ fontSize: '0.85rem', color: '#15803d' }}>Your payment information is encrypted and protected.</p>
                 </div>
              </motion.div>
            </div>

            {/* Billing Sidebar */}
            <motion.div variants={itemVariants}>
              <div className={styles.card}>
                <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '800' }}>Billing Summary</h2>
                
                <div className={styles.summaryBox}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                     <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Order Total</span>
                     <span style={{ fontWeight: '800', fontSize: '1.2rem' }}>${checkoutSubtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                     <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Estimated Tax</span>
                     <span style={{ fontWeight: '800', fontSize: '1.2rem' }}>${tax.toFixed(2)}</span>
                  </div>
                  <div style={{ borderTop: '2px dashed var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <span style={{ fontSize: '1.1rem', fontWeight: '900' }}>Total Amount</span>
                     <span style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--primary)' }}>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  <motion.button 
                    onClick={() => handlePayment(true)}
                    className={styles.purchaseBtn}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                  >
                    <Lock size={18} />
                    <span>Pay Securely Now</span>
                  </motion.button>
                  <button 
                    onClick={() => handlePayment(false)}
                    style={{ background: 'none', border: 'none', textAlign: 'center', fontSize: '0.9rem', color: '#ef4444', textDecoration: 'none', fontWeight: '600', cursor: 'pointer' }}
                    disabled={isLoading}
                  >
                     Simulate Payment Failure
                  </button>
                </div>
                
                <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', opacity: 0.5 }}>
                   <CreditCard size={24} />
                   <Wallet size={24} />
                   <ShieldCheck size={24} />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
