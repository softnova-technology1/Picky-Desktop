'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, ArrowRight } from 'lucide-react';
import NewArrivalsList from './NewArrivalsList';
import styles from './NewArrivals.module.css';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function NewArrivalsPage() {
  const router = useRouter();
  const { triggerNotification } = useCart();

  const handleAddToCart = (product) => {
    triggerNotification(product);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        {/* 1. Hero / Intro Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroImageContainer}>
            <Image 
              src="/images/new-arrivals-hero-purple.png" 
              alt="Premium Purple Collection" 
              fill
              className={styles.heroImage}
              priority
            />
          </div>
          <div className={styles.heroContent}>
            <span className={styles.heroLabel}>PREMIUM SELECTION 2024</span>
            <h1 className={styles.heroTitle}>The Purple Collection</h1>
            <p className={styles.heroDescription}>
              Elevate your lifestyle with our curated selection of products. 
              Modern aesthetics meeting unparalleled craftsmanship.
            </p>
            <button 
              className={styles.heroBtn}
              onClick={() => router.push('/shop')}
            >
              Explore Collection <ArrowRight size={20} />
            </button>
          </div>
        </section>

        {/* 2. Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleGroup}>
            <h2 className={styles.animateSlideUp}>New Arrivals</h2>
            <p className={styles.sectionSubtitle}>Exclusively selected for the Picky Editorial</p>
          </div>
          
          <div className={styles.controls}>
            <button className={styles.controlBtn}>
              Filters <Filter size={16} />
            </button>
            <button className={styles.controlBtn}>
              Sort By <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* 3. Product Grid */}
        <div className={styles.gridSection}>
          <NewArrivalsList onAddToCart={handleAddToCart} />
        </div>

        {/* 4. Editorial Section (Bottom Feature) */}
        

      </div>
    </div>
  );
}
