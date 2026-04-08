'use client';

import React from 'react';
import NewArrivalsCard from './NewArrivalsCard';
import styles from './NewArrivals.module.css';

const newArrivalsData = [
  {
    id: "na1",
    name: "Limited Edition Ceramic Vase",
    price: 129.00,
    tag: "Just In",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1915&auto=format&fit=crop"
  },
  {
    id: "na2",
    name: "Minimalist Leather Backpack",
    price: 249.00,
    tag: "Trending",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: "na3",
    name: "Signature Scent Candle Set",
    price: 59.00,
    tag: "New",
    image: "https://images.unsplash.com/photo-1603006905393-c35f297926cc?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "na4",
    name: "Heritage Cotton Tote Bag",
    price: 85.00,
    tag: "Eco-Friendly",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "na5",
    name: "Premium Linen Throw Pillow",
    price: 45.00,
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1579656335342-5ef351e77df5?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "na6",
    name: "Modern Brass Desk Lamp",
    price: 189.00,
    tag: "New",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "na7",
    name: "Handcrafted Oak Planter",
    price: 75.00,
    tag: "Sustainable",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2072&auto=format&fit=crop"
  },
  {
    id: "na8",
    name: "Artisanal Drip Coffee Kit",
    price: 145.00,
    tag: "Trending",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
  }
];

const NewArrivalsList = ({ onAddToCart }) => {
  return (
    <div className={styles.grid}>
      {newArrivalsData.map((product, index) => (
        <NewArrivalsCard 
          key={product.id} 
          product={product} 
          index={index}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default NewArrivalsList;
