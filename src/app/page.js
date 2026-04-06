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
import watch from "@/images/home/hero-watch.png"
import electronics from "@/images/home/hero.png"
import fashion from "@/images/home/fashion.png"
import lamp from "@/images/home/lamp.png"
import appMockup from "@/images/home/app-mockup.png"
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <main className={styles.main}>
      {/* Ultra Premium Hero Section */}
      <section ref={containerRef} className={styles.heroWrapper}>
        <div className={styles.abstractOrb + " " + styles.orb1}></div>
        <div className={styles.abstractOrb + " " + styles.orb2}></div>
        <div className={styles.glowSphere}></div>

        <div className={styles.heroMain}>
          <div className={styles.contentSide}>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className={styles.badgePremium}>
                <Star size={16} fill="var(--primary)" color="var(--primary)" />
                <span>TRUSTED BY 50,000+ SHOPPERS</span>
              </div>
              <h1 className={styles.titlePremium}>
                Discover the <br />
                <span className={styles.italicAccent}>most exclusive</span> <br />
                picks for you
              </h1>
              <p className={styles.introText}>
                A curated marketplace where quality meets authenticity. Shop the world's finest products from verified premium vendors.
              </p>
              <div className={styles.actionRow}>
                <button className={`${styles.btnModern} ${styles.btnPrimary}`}>Explore Market</button>
                <button className={`${styles.btnModern} ${styles.btnGhost}`}>View Deals</button>
              </div>
            </motion.div>
          </div>

          <div className={styles.visualSide}>
            <div className={styles.stage}>
              {/* Main Card */}
              <motion.div 
                className={`${styles.floatingCard} ${styles.mainDisplay} ${styles.parallaxItem}`}
                style={{ y: y1, "--rot": "-3deg" }}
              >
                <div className={styles.cardImage}>
                  <Image src={watch} alt="Nexus Pro Watch" fill style={{ objectFit: "contain" }} />
                </div>
                <div className={styles.cardDetails}>
                  <div className={styles.itemName}>Nexus Pro Watch</div>
                  <div className={styles.itemPrice}>$399.00</div>
                </div>
              </motion.div>

              {/* Secondary Card */}
              <motion.div 
                className={`${styles.floatingCard} ${styles.secondaryDisplay} ${styles.parallaxItem}`}
                style={{ y: y2, "--rot": "6deg" }}
              >
                <div className={styles.cardImage}>
                  <Image src="/assets/sneaker.png" alt="Cloud X Runners" fill style={{ objectFit: "contain" }} />
                </div>
              </motion.div>

              {/* Tertiary Card */}
              <motion.div 
                className={`${styles.floatingCard} ${styles.tertiaryDisplay} ${styles.parallaxItem}`}
                style={{ y: y3, "--rot": "-10deg" }}
              >
                <div className={styles.cardImage}>
                  <Image src="/assets/headphone.png" alt="Pure Audio Max" fill style={{ objectFit: "contain" }} />
                </div>
              </motion.div>

              {/* Stat Badge */}
              <motion.div 
                className={styles.statBadge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className={styles.statValue}>2.4k+</span>
                <span className={styles.statLabel}>Exclusive Items</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.topLabel}>DEPARTMENTS</span>
              <h2 className={styles.sectionTitle}>Curated Categories</h2>
            </div>
            <a href="#" className={styles.viewAll}>VIEW ALL (120+)</a>
          </div>
          <div className={styles.categoryGrid}>
            {[
              { name: "ELECTRONICS", image: electronics },
              { name: "FASHION", image: fashion },
              { name: "HOME & LIVING", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2070&auto=format&fit=crop" },
              { name: "FITNESS", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" },
              { name: "BEAUTY", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop" },
              { name: "KIDS", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=2075&auto=format&fit=crop" },
            ].map((cat, idx) => (
              <div key={idx} className={styles.categoryCard}>
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className={styles.catImg}
                  sizes="(max-width: 600px) 50vw, 16vw"
                />
                <div className={styles.catOverlay}>
                  <span className={styles.catName}>{cat.name}</span>
                </div>
              </div>
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
            {[
              {
                name: "Nexus Watch Series 5",
                cat: "PREMIUM TECH",
                price: "$199",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop",
              },
              {
                name: "Sonic Headphones Pro",
                cat: "AUDIO DEVICE",
                price: "$129",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop"
              },
              {
                name: "Aura Glow Desk Lamp",
                cat: "HOME LIVING",
                price: "$89",
                image: lamp
              },
              {
                name: "RetroShot 2000",
                cat: "PHOTOGRAPHY",
                price: "$149",
                image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop"
              },
            ].map((prod, idx) => (
              <div key={idx} className={styles.productCard}>
                <div className={styles.productImage}>
                  <Image src={prod.image} alt={prod.name} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productCategory}>{prod.cat}</div>
                  <h3 className={styles.productName}>{prod.name}</h3>
                  <div className={styles.productPrice}>{prod.price}</div>
                </div>
              </div>
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
