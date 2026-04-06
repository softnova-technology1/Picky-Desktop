"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

import { useRouter } from 'next/navigation';

const ProductCard = ({ product }) => {
  const { addToCart, setCheckoutItems } = useCart();
  const router = useRouter();

  const handleBuyNow = () => {
    setCheckoutItems([{ ...product, quantity: 1 }]);
    router.push('/checkout');
  };

  return (
    <div className={styles.card}>
      <Link href={`/product/${product.id}`} className={styles.imageLink}>
        <div className={styles.imageContainer}>
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <Link href={`/product/${product.id}`}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>
        <div className={styles.productMeta}>
          <span className={styles.price}>${product.price}</span>
        </div>
        <div className={styles.footer}>
          <button 
            className={styles.addBtn} 
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <button 
            className={styles.buyBtn} 
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
