'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import styles from './Success.module.css';

const ConfettiParticle = ({ color, duration, delay, x, leftPos, size, width }) => (
  <motion.div
    initial={{ y: -20, x: 0, opacity: 1, scale: 1, rotate: 0, rotateX: 0, rotateY: 0 }}
    animate={{ 
      y: 1200, 
      x: x,
      opacity: [1, 1, 0],
      rotate: Math.random() * 360,
      rotateX: [0, 45, 180, 270, 360, 720],
      rotateY: [0, 90, 180, 360, 720, 1440],
    }}
    transition={{ 
      duration, 
      delay, 
      ease: [0.1, 0.2, 0.45, 1], // Custom fluttering ease
      times: [0, 0.8, 1] 
    }}
    style={{
      position: 'absolute',
      left: `${leftPos}%`,
      top: `-40px`,
      width: `${width}px`,
      height: `${size}px`,
      backgroundColor: color,
      borderRadius: '1px',
      zIndex: 0,
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      transformStyle: 'preserve-3d'
    }}
  />
);

export default function PaymentSuccessPage() {
  const { checkoutItems, checkoutSubtotal, clearCart } = useCart();
  const [orderId, setOrderId] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setOrderId('PICKY-' + Math.floor(Math.random() * 90000 + 10000));
    setShowConfetti(true);
    // clearCart(); 
  }, []);

  const particles = Array.from({ length: 70 }).map((_, i) => ({
    id: i,
    color: ['#FF1E1E', '#643d97', '#FFD700', '#00FFAB', '#FF00A8', '#E4B1F0', '#0090FF'][i % 7],
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 1.5,
    x: Math.random() * 500 - 250,
    leftPos: Math.random() * 100,
    size: 8 + Math.random() * 10,
    width: 6 + Math.random() * 14
  }));

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={styles.successPage}>
      {/* Decorative Glows */}
      <div className={styles.glow} style={{ top: '10%', left: '5%' }} />
      <div className={styles.glow} style={{ bottom: '10%', right: '5%' }} />

      {/* Celebration Elements */}
      <div className={styles.confetti}>
        {showConfetti && particles.map(p => (
          <ConfettiParticle key={p.id} {...p} />
        ))}
      </div>

      <motion.div 
        className={styles.card}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Checkmark */}
        <motion.div 
          className={styles.iconWrapper}
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20, 
            delay: 0.2 
          }}
        >
          <CheckCircle2 size={56} strokeWidth={2.5} />
        </motion.div>

        <motion.h1 className={styles.title} variants={itemVariants}>
          Payment Successful
        </motion.h1>

        <motion.p 
          style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '1rem' }}
          variants={itemVariants}
        >
          Thank you for choosing <span style={{ fontWeight: '800', color: 'var(--primary)' }}>Picky</span>. 
          Your order <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{orderId}</span> is now confirmed!
        </motion.p>

        {/* Order Summary Snapshot */}
        <motion.div className={styles.summary} variants={itemVariants}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '1.0rem', color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            ORDER SNAPSHOT
          </h3>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {checkoutItems.map((item, idx) => (
              <motion.div 
                key={item.id} 
                style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (idx * 0.1) }}
              >
                <div style={{ position: 'relative', width: '60px', height: '60px', background: 'white', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border)', padding: '6px' }}>
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '700', fontSize: '1rem' }}>{item.name}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</p>
                </div>
                <span style={{ fontWeight: '750', fontSize: '1.1rem' }}>${(item.price * item.quantity).toFixed(2)}</span>
              </motion.div>
            ))}
            
            <div style={{ borderTop: '2px dashed var(--border)', marginTop: '0.5rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Amount Paid</p>
                <span style={{ fontWeight: '800', fontSize: '1.3rem' }}>Total</span>
              </div>
              <span style={{ fontWeight: '900', fontSize: '1.8rem', color: 'var(--primary)' }}>
                ${(checkoutSubtotal * 1.08).toFixed(2)}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div style={{ display: 'grid', gap: '1.2rem' }} variants={itemVariants}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <motion.button 
              className={styles.ctaButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <ShoppingBag size={20} />
                <span>Continue Shopping</span>
              </div>
            </motion.button>
          </Link>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '500' }}>
            A detailed receipt has been sent to your email.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
