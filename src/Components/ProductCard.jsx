"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';

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
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'contain' }}
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        {/* Quick Action Overlay */}
        <div className={styles.overlay}>
          <div className={styles.actionGroup}>
            <Link href={`/product/${product.id}`} className={styles.circleBtn}>
              <Eye size={20} />
            </Link>
            <button
              className={styles.circleBtn}
              onClick={() => addToCart(product)}
            >
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{product.category ? product.category.toUpperCase() : 'EXCLUSIVE'}</span>
          <span className={styles.price}>${product.price}</span>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
