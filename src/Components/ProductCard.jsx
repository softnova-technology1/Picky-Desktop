"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

import { useRouter } from 'next/navigation';

const ProductCard = ({ product }) => {
  const { addToCart, setCheckoutItems } = useCart();
  const router = useRouter();

  const handleBuyNow = () => {
    setCheckoutItems([{ ...product, quantity: 1 }]);
    router.push('/checkout');
  };

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
    >
      <div className={styles.imageWrapper}>
        <Link href={`/product/${product.id}`} className={styles.imageContainer}>
          <Image
            src={product.image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=800'}
            alt={product.name}
            fill
            style={{ objectFit: 'contain' }}
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=800'
            }}
          />
        </Link>

        {/* Action Bar at bottom of image area */}
        <div className={styles.actionBar}>
          <button
            className={styles.cartBtn}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
          
          <button
            className={styles.wishlistBtn}
            onClick={(e) => {
              e.preventDefault();
              // Wishlist logic would go here
            }}
            title="Add to Wishlist"
          >
            <Heart size={20} />
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <Link href={`/product/${product.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>
        <div className={styles.priceContainer}>
          <span className={styles.price}>${product.price}</span>
        </div>
        
        <Link href={`/product/${product.id}`} className={styles.shopNowBtn}>
          SHOP NOW
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
