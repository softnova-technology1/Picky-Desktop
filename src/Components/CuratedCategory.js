"use client";

import React from 'react';
import Link from 'next/link';
import CategoryCard from '@/Components/CategoryCard';
import { categories } from '@/lib/data';
import styles from '@/stylesheet/CuratedCategory.module.css';

const CuratedCategory = () => {
    return (
        <section className={styles.categories}>
            <div className="container">
                <div className={`${styles.categoryHeader} flex-between`}>
                    <div>
                        <span className={styles.topLabel}>DEPARTMENTS</span>
                        <h2 className={styles.sectionTitle}>Curated Categories</h2>
                    </div>
                    <Link href="/categories" className={styles.viewAll}>VIEW ALL (120+)</Link>
                </div>
                <div className={styles.categoryGrid}>
                    {categories.map((cat) => (
                        <CategoryCard key={cat.id} category={cat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CuratedCategory;
