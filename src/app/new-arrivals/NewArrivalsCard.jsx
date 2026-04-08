import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './NewArrivals.module.css';

const NewArrivalsCard = ({ product, index, onAddToCart }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorite = isInWishlist(product.id);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    if (onAddToCart) onAddToCart(product);
  };

  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <div className={styles.imageBox}>
        <motion.div 
          className={styles.badge}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          {product.tag || 'New'}
        </motion.div>
        
        <div className={styles.imageContainer}>
          <Image 
            src={product.image} 
            alt={product.name} 
            width={400}
            height={480}
            className={styles.image}
            priority={index < 4}
          />
        </div>

        {/* Action Bar - Restored to Original Design */}
        <div className={styles.actionBar}>
          <button 
            className={styles.addBtn} 
            onClick={handleAddToCart}
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>

          <motion.button 
            className={`${styles.viewBtn} ${isFavorite ? styles.favoriteActive : ''}`} 
            onClick={handleToggleFavorite}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart size={20} fill={isFavorite ? "#ff0404ff" : "none"} color={isFavorite ? "#f10000ff" : "currentColor"} />
          </motion.button>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <span className={styles.price}>${product.price ? product.price.toFixed(2) : '0.00'}</span>
      </div>
    </motion.div>
  );
};

export default NewArrivalsCard;
