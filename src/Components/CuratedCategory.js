"use client";

import React from 'react';
import Link from 'next/link';
import CategoryCard from '@/Components/CategoryCard';
import { getAllCategories } from '@/lib/data';
import styles from '@/Stylesheet/CuratedCategory.module.css';

const CuratedCategory = () => {
    const categories = getAllCategories();

    return (
        <section className={styles.categories}>
            <div className="container">
                <div className={`${styles.categoryHeader} flex-between`}>
                    <div>
                        <span className={styles.topLabel}>DEPARTMENTS</span>
                        <h2 className={styles.sectionTitle}>Curated Categories</h2>
                    </div>
                    <Link href="/category" className={styles.viewAll}>VIEW ALL ({categories.length})</Link>
                </div>
                <div className={styles.categoryGrid}>
                    {categories.slice(0, 4).map((cat) => (
                        <CategoryCard key={cat} category={cat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CuratedCategory;
