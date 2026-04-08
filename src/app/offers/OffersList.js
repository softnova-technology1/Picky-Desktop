'use client';

import React from 'react';
import OfferCard from './OfferCard';
import { offersData } from './offersData';
import styles from './Offers.module.css';

const OffersList = ({ onAddToCart }) => {
  return (
    <div className={styles.grid}>
      {offersData.map((product, index) => (
        <OfferCard 
          key={product.id} 
          product={product} 
          index={index}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default OffersList;
