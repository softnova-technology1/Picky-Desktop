"use client";

import React from 'react';
import ProductCard from '@/Components/ProductCard';
import { products } from '@/lib/data';
import styles from '@/stylesheet/trending.module.css';

const Trending = () => {
    return (
        <section className={styles.trending}>
            <div className="container">
                <div className={styles.trendingHeader}>
                    <h2 className={styles.piecesTitle}>TRENDING PIECES</h2>
                </div>
                <div className={styles.productGrid}>
                    {products.slice(0, 4).map((prod) => (
                        <ProductCard key={prod.id} product={prod} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Trending;
