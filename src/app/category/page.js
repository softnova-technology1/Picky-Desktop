"use client";

import Image from "next/image";
import styles from "./categories.module.css";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import { getAllCategories, products } from "@/lib/data";
import ProductCard from "@/Components/ProductCard";

import electronics from "@/images/home/elec.png"
import fashion from "@/images/home/fashion.png"
import books from "@/images/home/book.png"
import homeDecor from "@/images/home/decor.png"
import gifts from "@/images/home/gift.png"

export default function CategoriesPage() {
  const categories = getAllCategories();
  const featuredProducts = products.slice(0, 4);

  // Define some descriptions and images for the main categories
  const categoryMetadata = {
    "Electronics": {
      desc: "Innovative technology designed for the modern lifestyle.",
      image: electronics,
      label: "FUTURE TECH"
    },
    "Fashion": {
      desc: "Curated styles and seasonal edits for every occasion.",
      image: fashion,
      label: "STYLE EDIT"
    },
    "Books": {
      desc: "A vast collection of knowledge, fiction, and art.",
      image: books,
      label: "LITERARY WORLD"
    },
    "Home Decor": {
      desc: "Thoughtfully curated pieces to elevate your living spaces.",
      image: homeDecor,
      label: "INTERIOR DESIGN"
    },
    "Gifts": {
      desc: "Find the perfect gift for every celebration and milestone.",
      image: gifts,
      label: "CELEBRATIONS"
    }
  };

  return (
    <div className={styles.main}>
      {/* Luxury Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>
            OUR<span>COLLECTIONS</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Explore our curated selection of high-quality products across five primary departments.
          </p>
        </div>
      </section>

      {/* Sticky Department Bar */}
      <div className={styles.departmentBar}>
        <div className={styles.container}>
          <div className={styles.navInner}>
            {categories.map((cat) => (
              <Link 
                key={cat} 
                href={`/category/${cat.toLowerCase()}`} 
                className={styles.navItem}
              >
                {cat.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Magazine Discovery Grid */}
      <section className={styles.container}>
        <div className={styles.magazineSection}>
          <div className={styles.magGrid}>
            {categories.slice(0, 3).map((cat, idx) => (
              <Link 
                key={cat} 
                href={`/category/${cat.toLowerCase()}`} 
                className={`${styles.magCard} ${idx === 0 ? styles.magCardLarge : idx === 1 ? styles.magCardSmall : styles.magCardWide}`}
              >
                <Image 
                  src={categoryMetadata[cat].image} 
                  alt={cat} 
                  fill 
                  style={{ objectFit: "cover" }} 
                  className={styles.magImage} 
                />
                <div className={styles.magOverlay}>
                  <span className={styles.magLabel}>{categoryMetadata[cat].label}</span>
                  <h3 className={styles.magTitle}>{cat}</h3>
                  <p className={styles.magDesc}>{categoryMetadata[cat].desc}</p>
                  <div className={styles.exploreLink}>EXPLORE DEPARTMENT <ArrowRight size={16} /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Remaining Categories */}
      <section className={styles.container}>
        <div className={styles.featureGrid}>
          {categories.slice(3).map((cat) => (
            <Link key={cat} href={`/category/${cat.toLowerCase()}`} className={`${styles.magCard} ${styles.magCardWide}`} style={{ height: '300px', marginBottom: '20px' }}>
              <Image 
                src={categoryMetadata[cat].image} 
                alt={cat} 
                fill 
                style={{ objectFit: "cover" }} 
                className={styles.magImage} 
              />
              <div className={styles.magOverlay}>
                <span className={styles.magLabel}>{categoryMetadata[cat].label}</span>
                <h3 className={styles.magTitle}>{cat}</h3>
                <p className={styles.magDesc}>{categoryMetadata[cat].desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className={styles.collectionSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>The Edit</h2>
              <p style={{ opacity: 0.6 }}>Trending now across all departments.</p>
            </div>
          </div>

          <div className={styles.productGrid}>
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} invert={true} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
