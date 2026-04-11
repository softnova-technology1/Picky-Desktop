"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './ProductCard.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';

import { useRouter } from 'next/navigation';

const ProductCard = ({ product }) => {
  const { addToCart, setCheckoutItems, triggerNotification } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const router = useRouter();

  const isFavorite = isInWishlist(product.id);

  const rating = product.rating || 4.8;
  const reviewCount = product.reviewCount || 124;
  const discountAmount = product.discountAmount || (parseFloat(product.price) * 0.25).toFixed(2);
  const originalPrice = product.originalPrice || (parseFloat(product.price) + parseFloat(discountAmount)).toFixed(2);
  const activeOffer = product.offer || `SAVE $${discountAmount}`;

  // Robust image field selection
  const productImgSrc = product.image || product.img || product.thumb || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=800';
  const encodedImg = encodeURIComponent(typeof productImgSrc === 'string' ? productImgSrc : (productImgSrc?.src || productImgSrc));

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
      <div className={styles.offerBadge}>
        {activeOffer}
      </div>
      
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <Link href={`/product/${product.id}?img=${encodedImg}`} className={styles.titleLink}>
            <Image
              src={productImgSrc}
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
        </div>

        {/* Action Bar at bottom of image area */}
        <div className={styles.actionBar}>
          <button
            className={styles.cartBtn}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
              triggerNotification(product);
            }}
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>

          <motion.button
            className={`${styles.wishlistBtn} ${isFavorite ? styles.wishlistActive : ''}`}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart size={20} fill={isFavorite ? "#ff4d4d" : "none"} color={isFavorite ? "#ff4d4d" : "currentColor"} />
          </motion.button>
        </div>
      </div>

      <div className={styles.content}>
        <Link href={`/product/${product.id}?img=${encodedImg}`} className={styles.titleLink}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>
        <div className={styles.priceContainer}>
          <span className={styles.price}>${product.price}</span>
          <span className={styles.originalPrice}>${originalPrice}</span>
        </div>
        <div className={styles.ratingContainer}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < Math.floor(rating) ? "#FFC107" : "none"} color={i < Math.floor(rating) ? "#FFC107" : "#E0E0E0"} />
            ))}
          </div>
          <span className={styles.reviewCount}>({reviewCount})</span>
        </div>

        <Link href={`/product/${product.id}?img=${encodedImg}`} className={styles.shopNowBtn}>
          SHOP NOW
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
