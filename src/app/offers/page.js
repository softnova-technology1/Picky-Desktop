'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Filter, ChevronDown, ArrowRight, Mail } from 'lucide-react';
import Image from 'next/image';
import OfferCard from './OfferCard';
import { offersData } from './offersData';
import styles from './Offers.module.css';
import { useCart } from '@/context/CartContext';

export default function OffersPage() {
  const { triggerNotification } = useCart();
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 18 });

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { seconds = 59; minutes--; }
        else if (hours > 0) { seconds = 59; minutes = 59; hours--; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (product) => {
    triggerNotification(product);
  };

  // Split data
  const flashDeals = offersData.slice(0, 4);
  const recommendations = offersData.slice(4);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        {/* 1. Hero Section */}
        <section className={`${styles.hero} ${styles.animateSlideUp}`}>
          <div className={styles.blurCircle + ' ' + styles.circle1}></div>
          <div className={styles.blurCircle + ' ' + styles.circle2}></div>
          
          {/* Animated Bubbles */}
          <div className={`${styles.bubble} ${styles.bubble1}`}></div>
          <div className={`${styles.bubble} ${styles.bubble2}`}></div>
          <div className={`${styles.bubble} ${styles.bubble3}`}></div>
          <div className={`${styles.bubble} ${styles.bubble4}`}></div>
          <div className={`${styles.bubble} ${styles.bubble5}`}></div>
          
          <div className={styles.heroContent}>
            <span className={styles.exclusiveBadge}>Exclusive Season Sale</span>
            <h1 className={styles.heroTitle}>Premium Finds. <br /> Unbeatable Prices.</h1>
            <p className={styles.heroSubtitle}>
              Unlock up to 70% savings on top-tier electronics, fashion, and home essentials. 
              Your premium lifestyle, now more affordable.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.primaryBtn}>Shop The Collection</button>
              <button className={styles.secondaryBtn}>View All Offers</button>
            </div>
          </div>

          <div className={styles.heroImageContainer}>
            <Image 
              src="/images/offers-hero.png" 
              alt="Premium Offers" 
              width={600} 
              height={600}
              className={styles.heroImage}
              priority
            />
          </div>
        </section>

        {/* 2. Flash Deals Section */}
        <section className={styles.animateSlideUp} style={{ animationDelay: '0.2s' }}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleGroup}>
              <h2><Zap size={32} fill="#7d44ef" color="#7d44ef" /> Flash Deals</h2>
              <p className={styles.sectionSubtitle}>Limited quantities. Act fast!</p>
            </div>
            
            <div className={styles.timerWrapper}>
              <div className={styles.timeBlock}>
                <div className={styles.timeValue}>{formatNumber(timeLeft.hours)}</div>
                <span className={styles.timeLabel}>Hrs</span>
              </div>
              <div className={styles.timerDivider}>:</div>
              <div className={styles.timeBlock}>
                <div className={styles.timeValue}>{formatNumber(timeLeft.minutes)}</div>
                <span className={styles.timeLabel}>Min</span>
              </div>
              <div className={styles.timerDivider}>:</div>
              <div className={styles.timeBlock}>
                <div className={styles.timeValue}>{formatNumber(timeLeft.seconds)}</div>
                <span className={styles.timeLabel}>Sec</span>
              </div>
            </div>
          </div>

          <div className={styles.grid}>
            {flashDeals.map((product, index) => (
              <OfferCard 
                key={product.id} 
                product={product} 
                index={index}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        {/* 3. Category Highlights Section */}
        <section className={`${styles.categoryGrid} ${styles.animateSlideUp}`} style={{ animationDelay: '0.4s' }}>
          <div className={`${styles.catCard} ${styles.catFootwear}`}>
            <span className={styles.catLabel}>PREMIUM RANGE</span>
            <h3 className={styles.catTitle}>Footwear Elite</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem', fontWeight: 500 }}>Extra 20% off with code STEPUP</p>
            <div className={styles.catCta}>SHOP NOW <ArrowRight size={18} /></div>
          </div>

          <div className={`${styles.catCard} ${styles.catTech}`}>
            <span className={styles.catLabel}>LATEST GADGETS</span>
            <h3 className={styles.catTitle}>Tech Hub</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem', fontWeight: 500 }}>Best prices on top-tier brands</p>
            <div className={styles.catCta}>SHOP NOW <ArrowRight size={18} /></div>
          </div>

          <div className={`${styles.catCard} ${styles.catBeauty}`}>
            <span className={styles.catLabel}>LUXURIOUS CARE</span>
            <h3 className={styles.catTitle}>Beauty Glow</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem', fontWeight: 500 }}>Luxury skincare for less</p>
            <div className={styles.catCta}>SHOP NOW <ArrowRight size={18} /></div>
          </div>
        </section>

        {/* 4. Recommendations Section */}
        <section className={styles.animateSlideUp} style={{ animationDelay: '0.6s' }}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleGroup}>
              <h2>Today's Recommendations</h2>
            </div>
            
            <div className={styles.controls}>
              <button className={styles.controlBtn}>
                Filters <Filter size={16} />
              </button>
              <button className={styles.controlBtn}>
                Sort by: Popular <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <div className={styles.grid}>
            {recommendations.map((product, index) => (
              <OfferCard 
                key={product.id} 
                product={product} 
                index={index}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        {/* 5. Newsletter Section */}
        <section className={`${styles.newsletter} ${styles.animateSlideUp}`} style={{ animationDelay: '0.8s' }}>
          <div className={styles.newsLeft}>
            <h3>Don't Miss Out</h3>
            <p>Subscribe for early access to the biggest flash deals and members-only coupon codes.</p>
          </div>
          <div className={styles.newsForm}>
            <input type="email" placeholder="Enter your email" className={styles.newsInput} />
            <button className={styles.newsBtn}>Join Now</button>
          </div>
        </section>

      </div>
    </div>
  );
}
