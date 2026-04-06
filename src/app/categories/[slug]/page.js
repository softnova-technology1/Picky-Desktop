"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { products, categories } from '@/utils/mockData';
import ProductCard from '@/Components/ProductCard';
import styles from './category.module.css';

export default function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find(c => c.id === slug);
  const categoryProducts = products.filter(p => p.category === slug);

  if (!category) {
    return <div className="container" style={{ padding: '100px 0' }}>Category not found</div>;
  }

  return (
    <main className={styles.categoryMain}>
      <header className={styles.header}>
        <div className="container">
          <span className={styles.topLabel}>DEPARTMENT</span>
          <h1 className={styles.title}>{category.name}</h1>
          <p className={styles.description}>{category.description}</p>
        </div>
      </header>

      <section className={styles.productGridSection}>
        <div className="container">
          <div className={styles.grid}>
            {categoryProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {categoryProducts.length === 0 && (
            <div className={styles.empty}>
              No products found in this category.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
