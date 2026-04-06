"use client";

import Image from "next/image";
import styles from "./categories.module.css";
import { ChevronRight, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { products, categories } from "@/lib/data";
import ProductCard from "@/Components/ProductCard";

export default function CategoriesPage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className={styles.main}>
      {/* Luxury Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>
            CURATED<span>DEPARTMENTS</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A curated narrative of style, technology, and living. Explore our hand-picked departments designed for the modern lifestyle.
          </p>
        </div>
      </section>

      {/* Sticky Department Bar */}
      <div className={styles.departmentBar}>
        <div className={styles.container}>
          <div className={styles.navInner}>
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/categories/${cat.id}`} 
                className={styles.navItem}
              >
                {cat.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Magazine Discovery Grid */}
      <section className={styles.container}>
        <div className={styles.magazineSection}>
          <div className={styles.magGrid}>
            
            {/* 1. Large Feature Card */}
            <Link href={`/categories/${categories[0].id}`} className={`${styles.magCard} ${styles.magCardLarge}`}>
              <Image src={categories[0].image} alt={categories[0].name} fill style={{ objectFit: "cover" }} className={styles.magImage} />
              <div className={styles.magOverlay}>
                <span className={styles.magLabel}>THE FUTURE OF DESIGN</span>
                <h3 className={styles.magTitle}>{categories[0].name}</h3>
                <p className={styles.magDesc}>{categories[0].description}</p>
                <div className={styles.exploreLink}>EXPLORE THE EDIT <ArrowRight size={16} /></div>
              </div>
            </Link>

            {/* 2. Side Feature Card */}
            <Link href={`/categories/${categories[1].id}`} className={`${styles.magCard} ${styles.magCardSmall}`}>
              <Image src={categories[1].image} alt={categories[1].name} fill style={{ objectFit: "cover" }} className={styles.magImage} />
              <div className={styles.magOverlay}>
                <span className={styles.magLabel}>SEASONAL PICKS</span>
                <h3 className={styles.magTitle}>{categories[1].name}</h3>
                <div className={styles.exploreLink}>SHOP THE LOOK</div>
              </div>
            </Link>

            {/* 3. Wide Feature Card */}
            <Link href={`/categories/${categories[2].id}`} className={`${styles.magCard} ${styles.magCardWide}`}>
              <Image src={categories[2].image} alt={categories[2].name} fill style={{ objectFit: "cover" }} className={styles.magImage} />
              <div className={styles.magOverlay}>
                <span className={styles.magLabel}>LIFESTYLE & INTERIORS</span>
                <h3 className={styles.magTitle}>{categories[2].name}</h3>
                <p className={styles.magDesc}>{categories[2].description}</p>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Best Sellers Section - Dark Theme */}
      <section className={styles.collectionSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>The Edit</h2>
              <p style={{ opacity: 0.6 }}>Bestselling items from all departments.</p>
            </div>
            <Link href="/products" style={{ color: "white", fontSize: "0.8rem", fontWeight: "800", letterSpacing: "0.2em" }}>VIEW ALL COLLECTIONS</Link>
          </div>

          <div className={styles.productGrid}>
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} invert={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Promotion Banners */}
      <section className={styles.container}>
        <div className={styles.featureGrid}>
          <div className={styles.promoCard}>
             <span style={{ fontSize: "0.7rem", fontWeight: "900", letterSpacing: "0.4em", marginBottom: "30px", display: "block" }}>DISCOVERY</span>
             <h2 className={styles.promoTitle}>New Season Essentials</h2>
             <p style={{ fontSize: "1.1rem", opacity: 0.6 }}>Thoughtfully selected items for the transition ahead. Discover the latest textures and tones.</p>
             <Link href="/products" className={styles.promoBtn}>DISCOVER MORE</Link>
          </div>
          <div className={`${styles.promoCard} ${styles.magCard}`} style={{ padding: 0 }}>
             <Image src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" fill style={{ objectFit: "cover" }} alt="Lifestyle" />
             <div className={styles.magOverlay} style={{ padding: "60px" }}>
                <h2 className={styles.magTitle}>Artistic <br />Living</h2>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}
