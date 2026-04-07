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
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'contain' }}
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
        <Link href={`/product/${product.id}`}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>
        <span className={styles.price}>${product.price}</span>
      </div>
    </motion.div>
  );
};

export default ProductCard;
