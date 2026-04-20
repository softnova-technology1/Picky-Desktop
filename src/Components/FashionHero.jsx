'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './FashionHero.module.css';

const CARDS_DATA = [
  {
    id: 1,
    subtitle: 'Classic Fashion',
    title: 'LUXURY CLOTHING',
    description: 'Explore our curated collection of high-end designer apparel. From timeless classics to modern silhouettes, experience the pinnacle of sartorial excellence and premium fabrics. Our collection features hand-stitched details, ethically sourced Italian silks, and a legacy of craftsmanship that spans three generations of master tailors.',
    image: '/images/cloth.jpg',
    link: '/category/fashion'
  },
  {
    id: 2,
    subtitle: 'Sweet Gastronomy',
    title: 'GOURMET TREATS',
    description: 'A symphony of flavors crafted by world-class pâtissiers. Discover organic ingredients, artisanal preparation, and a dining experience that transcends the ordinary. Every creation is a masterpiece of texture and taste, using rare Criollo cocoa beans and fresh mountain dairy to create moments of pure indulgence.',
    image: '/images/choco.jpg',
    link: '/category/chocolates'
  },
  {
    id: 3,
    subtitle: 'Future Tech',
    title: 'SMART DEVICES',
    description: 'Pushing the boundaries of innovation with cutting-edge technology. Experience seamless connectivity, powerful performance, and sleek designs that define the future. Our latest ecosystem integrates artificial intelligence with neural processing to anticipate your needs before you even think of them.',
    image: '/images/elct.jpg',
    link: '/category/electronics'
  },
  {
    id: 4,
    subtitle: 'Timeless Stories',
    title: 'CLASSIC READS',
    description: 'Dive into worlds of imagination and wisdom. Our selection of premium editions and rare finds offers a tactile journey through history, philosophy, and great literature. Each volume is bound in genuine goatskin leather with 24-karat gold gilding, preserving the world\'s greatest thoughts for centuries to come.',
    image: '/images/book.jpg',
    link: '/category/books'
  },
  {
    id: 5,
    subtitle: 'High-End Style',
    title: 'DESIGNER EDIT',
    description: 'Experience the art of fashion with our collection of master-crafted pieces. Luxury engineering meets timeless elegance in every intricate detail. This limited edition selection is available only to our private members, featuring avant-garde designs that challenge the conventions of modern haute couture.',
    image: '/images/clothing.png',
    link: '/category/fashion'
  },
  {
    id: 6,
    subtitle: 'Interior Design',
    title: 'MODERN HOME',
    description: 'Transform your living space into a sanctuary of style. Our curated collection of modern furniture and minimalist decor combines functionality with aesthetic perfection to create a home that truly reflects your personality.',
    image: '/images/gifts.jpg',
    link: '/category/home-decor'
  }
];

export default function CardSlider() {
  const router = useRouter();
  const [items, setItems] = useState(CARDS_DATA);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('');
  const [progress, setProgress] = useState(0);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setDirection('next');
    setIsAnimating(true);
    
    setItems((prev) => {
      const newItems = [...prev];
      const first = newItems.shift();
      newItems.push(first);
      return newItems;
    });

    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setDirection('prev');
    setIsAnimating(true);
    
    setItems((prev) => {
      const newItems = [...prev];
      const last = newItems.pop();
      newItems.unshift(last);
      return newItems;
    });

    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  const handleCardClick = (index) => {
    if (isAnimating || index < 2) return; // Only thumbnails are clickable to change
    
    setDirection('next');
    setIsAnimating(true);
    
    setItems((prev) => {
      const newItems = [...prev];
      // We want the clicked thumbnail (index k) to become the active item (index 1)
      // This requires shifting the array k-1 times.
      for (let i = 0; i < index - 1; i++) {
        const first = newItems.shift();
        newItems.push(first);
      }
      return newItems;
    });

    setTimeout(() => setIsAnimating(false), 800);
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 4000); // Slowed down slightly for interactivity
    return () => clearInterval(timer);
  }, [handleNext]);

  useEffect(() => {
    let startTime = Date.now();
    let animationFrame;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = (elapsed / 4000) * 100;
      setProgress(Math.min(currentProgress, 100));

      if (currentProgress < 100) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [items]);

  return (
    <div className={`${styles.container} ${direction ? styles[direction] : ''}`}>
      <div className={styles.slider}>
        {items.map((item, index) => (
          <div 
            key={item.id}
            className={styles.item}
            style={{ backgroundImage: `url(${item.image})` }}
            onClick={() => handleCardClick(index)}
          >
            <div className={styles.content}>
              <div className={styles.subtitle}>{item.subtitle}</div>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.description}>{item.description}</div>
              <div className={styles.buttonWrapper}>
                <div className={styles.bookmark}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                  </svg>
                </div>
                <button 
                  className={styles.discoverBtn}
                  onClick={() => router.push(item.link || '/category')}
                >
                  EXPLORE MORE
                </button>
              </div>
            </div>
            
            {index > 0 && (
              <div className={styles.thumbnailContent}>
                <div className={styles.thumbLine}></div>
                <div className={styles.thumbSubtitle}>{item.subtitle}</div>
                <div className={styles.thumbTitle}>{item.title}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <div className={styles.progressSection}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className={styles.arrows}>
          <button className={styles.arrowBtn} onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button className={styles.arrowBtn} onClick={(e) => { e.stopPropagation(); handleNext(); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
