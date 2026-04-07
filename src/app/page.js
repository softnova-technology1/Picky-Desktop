"use client";

import Image from "next/image";
import styles from "./page.module.css";
import {
  Star,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Apple
} from "lucide-react";
import appMockup from "@/images/home/app-mockup.png"
import { useRef } from "react";
import ProductCard from "@/Components/ProductCard";
import CategoryCard from "@/Components/CategoryCard";
import { products, categories } from "@/lib/data";
import Link from 'next/link';
import FashionHero from "@/Components/FashionHero";

export default function Home() {
  const containerRef = useRef(null);

  return (
    <main className={styles.main}>
      <FashionHero />

      {/* Categories Section */}
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

      {/* Promo Banners */}
      <section className={styles.promos}>
        <div className="container">
          <div className={styles.promoGrid}>
            <div className={`${styles.promoCard} ${styles.springPromo}`}>
              <div className={styles.promoContent}>
                <h2 className={styles.promoLargeTitle}>Spring Collection <br /> 2024</h2>
                <span className={styles.promoBadge}>UP TO 40% OFF</span>
                <button className={styles.promoBtn}>EXPLORE NOW</button>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=2022&auto=format&fit=crop"
                alt="Spring"
                fill
                style={{ objectFit: "cover", opacity: 0.15 }}
              />
            </div>
            <div className={`${styles.promoCard} ${styles.futurePromo}`}>
              <div className={styles.promoContent}>
                <h2 className={styles.promoLargeTitle}>The Future is Here</h2>
                <span className={styles.promoBadge}>PRE-ORDER NOW</span>
                <button className={`${styles.promoBtn} ${styles.btnOutline}`}>LEARN MORE</button>
              </div>
              <div className={styles.crossGraphics}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Pieces */}
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

      {/* Featured Vendors */}
      <section className={styles.vendors}>
        <div className="container">
          <div className={styles.vendorHeader}>
            <span className={styles.topLabel}>TRUSTED VENDORS</span>
            <h2 className={styles.sectionTitle}>Featured Vendors</h2>
          </div>
          <div className={styles.vendorFlex}>
            {[
              { name: "Lumiera Home", initial: "L", items: "840+ items" },
              { name: "Urban Tech", initial: "U", items: "1.2k items" },
              { name: "Eco Bloom", initial: "E", items: "650+ items" },
            ].map((v, i) => (
              <div key={i} className={styles.vendorCard}>
                <div className={styles.vendorLogo}>{v.initial}</div>
                <div className={styles.vendorInfo}>
                  <div className={styles.vendorNameWrapper}>
                    <span className={styles.vendorName}>{v.name}</span>
                    <CheckCircle2 size={16} fill="#3b82f6" color="white" />
                  </div>
                  <span className={styles.vendorStats}>{v.items}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <div className="container">
          <div className={styles.testimonialGrid}>
            {[
              { name: "Amber Smith", role: "ARCHITECT", quote: "The selection is so curated. Every piece I've purchased feels like it was selected specifically for my home's aesthetic." },
              { name: "Sarah Chen", role: "INTERIOR DESIGNER", quote: "Verified vendors make all the difference. I shop with confidence knowing the quality is guaranteed by Picky." },
              { name: "Marcus Thorne", role: "TECH ENTHUSIAST", quote: "The app is seamless. From discovery to delivery, it's the most premium marketplace experience I've had." },
            ].map((t, idx) => (
              <div key={idx} className={styles.testimonialCard}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--primary)" color="var(--primary)" />)}
                </div>
                <p className={styles.testimonialQuote}>"{t.quote}"</p>
                <div className={styles.testimonialUser}>
                  <div className={styles.userAvatar}>{t.name.charAt(0)}</div>
                  <div className={styles.userInfo}>
                    <div className={styles.userName}>{t.name}</div>
                    <div className={styles.userRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Section */}
      <section className="container" style={{ marginBottom: '100px' }}>
        <div className={styles.appSection}>
          <div className={styles.appContent}>
            <div className={styles.appBadge}>
              <Smartphone size={16} />
              <span>EXPERIENCE THE FREEDOM</span>
            </div>
            <h2 className={styles.appTitle}>
              Shop <span className={styles.whiteItalic}>anywhere</span> <br />
              with the Picky App
            </h2>
            <p className={styles.appSubtitle}>
              Take the world's most curated marketplace with you. Experience seamless browsing, instant notifications, and exclusive in-app drops.
            </p>
            <div className={styles.appStores}>
              <button className={styles.appBtn}>
                <Apple size={20} fill="currentColor" />
                <div className={styles.btnText}>
                  <span className={styles.btnSm}>Download on</span>
                  <span className={styles.btnLg}>App Store</span>
                </div>
              </button>
              <button className={styles.appBtn}>
                <Star size={20} fill="currentColor" />
                <div className={styles.btnText}>
                  <span className={styles.btnSm}>Get it on</span>
                  <span className={styles.btnLg}>Play Store</span>
                </div>
              </button>
            </div>
          </div>
          <div className={styles.appMockup}>
            <div className={styles.mockupContainer}>
              <Image src={appMockup} alt="Picky App" fill style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.mockupBgGlow}></div>
          </div>
        </div>
      </section>

    </main>
  );
}
