"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSubcategories, getProductsByCategory, getSubcategoryImage } from "@/lib/data";
import ProductCard from "@/Components/ProductCard";
import styles from "./category.module.css";
import { ChevronRight, ArrowRight } from "lucide-react";

export default function CategoryPage({ params }) {
  const resolvedParams = use(params);
  const categoryName = resolvedParams.category;

  // Format category name for display (e.g. "home-decor" -> "Home Decor")
  const formattedCategory = categoryName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const subCats = getSubcategories(formattedCategory);
  if (subCats.length === 0) {
    // Try without formatting if exact match not found
    const tryDirect = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    const subDirect = getSubcategories(tryDirect);
    if (subDirect.length > 0) {
        // use those
    } else {
        // Final fallback cases
        const mapping = {
            "electronics": "Electronics",
            "fashion": "Fashion",
            "books": "Books",
            "home-decor": "Home Decor",
            "gifts": "Gifts"
        };
        const finalName = mapping[categoryName.toLowerCase()] || formattedCategory;
        const subFinal = getSubcategories(finalName);
        if (subFinal.length === 0) {
            return (
                <div className={styles.notFound}>
                  <h1>Category not found</h1>
                  <Link href="/category">Back to Categories</Link>
                </div>
            );
        }
    }
  }

  // Get the normalized name again for consistent usage
  const mapping = {
      "electronics": "Electronics",
      "fashion": "Fashion",
      "books": "Books",
      "home-decor": "Home Decor",
      "gifts": "Gifts"
  };
  const normalizedCategory = mapping[categoryName.toLowerCase()] || formattedCategory;
  const actualSubcategories = getSubcategories(normalizedCategory);
  const previewProducts = getProductsByCategory(normalizedCategory).slice(0, 8);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <header className={styles.header}>
           <div className={styles.breadcrumb}>
              <Link href="/">HOME</Link> <ChevronRight size={14} /> 
              <Link href="/category">CATEGORIES</Link> <ChevronRight size={14} /> 
              <span>{normalizedCategory.toUpperCase()}</span>
           </div>
           <h1 className={styles.title}>{normalizedCategory}</h1>
           <p className={styles.subtitle}>Explore our curated sub-collections in {normalizedCategory.toLowerCase()}</p>
        </header>

        {/* Subcategories Grid */}
        <section className={styles.subcategorySection}>
          <h2 className={styles.sectionTitle}>Departments</h2>
          <div className={styles.subcategoryGrid}>
            {actualSubcategories.map((sub) => {
              const subImage = getSubcategoryImage(sub, normalizedCategory);
              return (
                <Link 
                  key={sub} 
                  href={`/category/${categoryName}/${sub.toLowerCase().replace(/\s/g, '-')}`}
                  className={styles.subCard}
                >
                  {subImage && (
                    <div className={styles.subImageWrapper}>
                      <Image src={subImage} alt={sub} fill style={{ objectFit: 'cover' }} />
                    </div>
                  )}
                  <div className={styles.subCardContent}>
                    <h3>{sub}</h3>
                    <div className={styles.subArrow}><ArrowRight size={18} /></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Products Preview */}
        <section className={styles.previewSection}>
          <div className={styles.sectionSubHeader}>
            <h2 className={styles.sectionTitle}>Featured in {normalizedCategory}</h2>
          </div>
          <div className={styles.productGrid}>
            {previewProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
