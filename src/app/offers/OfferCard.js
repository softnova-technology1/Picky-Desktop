import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './Offers.module.css';

const OfferCard = ({ product, index, onAddToCart }) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('picky_favorites') || '[]');
    setIsFavorite(favorites.includes(product.id));
  }, [product.id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    const favorites = JSON.parse(localStorage.getItem('picky_favorites') || '[]');
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter(id => id !== product.id);
    } else {
      newFavorites = [...favorites, product.id];
    }
    localStorage.setItem('picky_favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Use discountPrice for the cart
    const cartProduct = {
      ...product,
      price: product.discountPrice
    };
    addToCart(cartProduct);
    if (onAddToCart) onAddToCart(cartProduct);
  };

  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
    >
      <div className={styles.imageBox}>
        {/* Discount Badge */}
        <motion.div 
          className={styles.badge}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          {product.discountLabel}
        </motion.div>
        
        <div className={styles.imageContainer}>
          <Image 
            src={product.image} 
            alt={product.name} 
            width={400}
            height={400}
            className={styles.image}
            priority={index < 4}
          />
        </div>

        {/* Action Bar - Re-styled for Modern Look */}
        <div className={styles.actionBar}>
          <button 
            className={styles.addBtn} 
            onClick={handleAddToCart}
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>

          <button 
            className={`${styles.viewBtn} ${isFavorite ? styles.favoriteActive : ''}`} 
            onClick={toggleFavorite}
            title="Add to Wishlist"
          >
            <Heart size={20} fill={isFavorite ? "white" : "none"} />
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        
        <div className={styles.priceWrapper}>
          <span className={styles.priceOriginal}>${product.originalPrice.toFixed(2)}</span>
          <span className={styles.priceDiscount}>${product.discountPrice.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default OfferCard;
