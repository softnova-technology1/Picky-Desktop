"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/utils/mockData';
import { useCart } from '@/context/CartContext';
import styles from './product.module.css';
import { Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === id);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="container" style={{ padding: '100px 0' }}>Product not found</div>;
  }

  const handleAddToCart = () => {
    // Modify addToCart to handle multiple quantities if desired
    // For now, we'll just call it N times or just once with quantity info
    addToCart({ ...product, quantity });
  };

  return (
    <main className={styles.productMain}>
      <div className="container">
        <div className={styles.productLayout}>
          {/* Product Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImageContainer}>
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className={styles.thumbnails}>
               {[...Array(3)].map((_, i) => (
                 <div key={i} className={styles.thumb}>
                    <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain', opacity: 0.5 }} />
                 </div>
               ))}
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.info}>
            <span className={styles.topLabel}>{product.category}</span>
            <h1 className={styles.title}>{product.name}</h1>
            
            <div className={styles.ratingRow}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#FFD700" color="#FFD700" />)}
              </div>
              <span className={styles.reviews}>(124 Verified Reviews)</span>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.price}>${product.price}</span>
              <span className={styles.inStock}>In Stock</span>
            </div>

            <p className={styles.description}>{product.description}</p>

            <div className={styles.purchaseActions}>
              <div className={styles.quantity}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className={styles.addBtn} onClick={handleAddToCart}>
                ADD TO CART — ${(product.price * quantity).toFixed(2)}
              </button>
            </div>

            <div className={styles.perks}>
              <div className={styles.perk}>
                <Truck size={20} />
                <div>
                  <strong>Free Express Delivery</strong>
                  <p>Delivered within 2-3 business days.</p>
                </div>
              </div>
              <div className={styles.perk}>
                <ShieldCheck size={20} />
                <div>
                  <strong>2-Year Warranty</strong>
                  <p>Full protection against manufacturing defects.</p>
                </div>
              </div>
              <div className={styles.perk}>
                <RefreshCw size={20} />
                <div>
                  <strong>30-Day Returns</strong>
                  <p>Hassle-free returns and exchanges.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
