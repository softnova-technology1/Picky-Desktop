"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./categories.module.css";
import { ArrowRight, ChevronRight, Truck, Headphones, RotateCcw, ShieldCheck, Shield, Lock, Lamp, Shirt, Sofa, Cookie } from "lucide-react";
import Link from 'next/link';
import { getAllCategories, products, getSubcategories, getSubcategoryImage } from "@/lib/data";
import ProductCard from "@/Components/ProductCard";

import electronics from "@/images/home/elec.png"
import fashion from "@/images/home/fashion.png"
import books from "@/images/home/book.png"
import homeDecor from "@/images/home/decor.png"
import gifts from "@/images/home/gift.png"
import snacks from "@/images/home/snacks.png";
import watch from "@/images/home/watch.png";
import sneakers from "@/images/home/sneakers.png";
import clothing from "@/images/home/clothing.png";
import chair from "@/images/home/chair.png";

export default function CategoriesPage() {
  const heroRef = useRef(null);
  const timeoutId = useRef(null);
  const { scrollY, scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const [hoveredTab, setHoveredTab] = useState(null);

  const handleMouseEnter = (cat) => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    setHoveredTab(cat);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      setHoveredTab(null);
    }, 150);
  };

  const deckParallax = useTransform(scrollY, [0, 500], [0, 150]);

  const progressArray = [0, 0.15, 0.45, 0.75, 1];

  // Base X for perfect center is -160px (Card width = 320px)
  // Show 3 cards immediately: Opacity 1 at start for center, near-left, near-right
  const nearLeftX = useTransform(scrollYProgress, progressArray, [-220, -220, -420, -420, -160]);
  const nearLeftRotate = useTransform(scrollYProgress, progressArray, [-8, -8, -12, -12, 0]);
  const nearLeftOpacity = useTransform(scrollYProgress, progressArray, [1, 1, 1, 1, 0]);
  const nearLeftScale = useTransform(scrollYProgress, progressArray, [0.96, 0.96, 0.96, 0.96, 0.96]);

  const farLeftX = useTransform(scrollYProgress, progressArray, [-160, -160, -680, -680, -160]);
  const farLeftRotate = useTransform(scrollYProgress, progressArray, [0, 0, -18, -18, 0]);
  const farLeftOpacity = useTransform(scrollYProgress, progressArray, [0, 0, 1, 1, 0]);
  const farLeftScale = useTransform(scrollYProgress, progressArray, [0.92, 0.92, 0.92, 0.92, 0.92]);

  const nearRightX = useTransform(scrollYProgress, progressArray, [-100, -100, 100, 100, -160]);
  const nearRightRotate = useTransform(scrollYProgress, progressArray, [8, 8, 12, 12, 0]);
  const nearRightOpacity = useTransform(scrollYProgress, progressArray, [1, 1, 1, 1, 0]);
  const nearRightScale = useTransform(scrollYProgress, progressArray, [0.96, 0.96, 0.96, 0.96, 0.96]);

  const farRightX = useTransform(scrollYProgress, progressArray, [-160, -160, 360, 360, -160]);
  const farRightRotate = useTransform(scrollYProgress, progressArray, [0, 0, 18, 18, 0]);
  const farRightOpacity = useTransform(scrollYProgress, progressArray, [0, 0, 1, 1, 0]);
  const farRightScale = useTransform(scrollYProgress, progressArray, [0.92, 0.92, 0.92, 0.92, 0.92]);

  const categories = getAllCategories();
  const featuredProducts = products.slice(0, 4);
  const famousProducts = products.slice(4, 8);
  const recentlyAdded = products.slice(8, 12);

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
      <section className={styles.hero} ref={heroRef}>
        <motion.div
          className={styles.heroCardDeck}
          style={{ y: deckParallax }}
        >
          {/* Near Left Card - Fashion */}
          <motion.div
            className={styles.heroCard}
            style={{
              left: "50%", top: "40%",
              x: nearLeftX, y: -230,
              rotate: nearLeftRotate, opacity: nearLeftOpacity,
              scale: nearLeftScale, zIndex: 4
            }}
          >
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }} style={{ width: '100%', height: '100%' }}>
              <Image src={fashion} alt="Fashion" fill style={{ objectFit: 'cover' }} />
            </motion.div>
          </motion.div>

          {/* Center Card - Tech */}
          <motion.div
            className={styles.heroCard}
            style={{
              left: "50%", top: "38%",
              x: -160, y: -230,
              rotate: 0, opacity: 1, scale: 1, zIndex: 5
            }}
          >
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} style={{ width: '100%', height: '100%' }}>
              <Image src={electronics} alt="Tech" fill style={{ objectFit: 'cover' }} />
            </motion.div>
          </motion.div>

          {/* Near Right Card - Home Decor */}
          <motion.div
            className={styles.heroCard}
            style={{
              left: "50%", top: "40%",
              x: nearRightX, y: -230,
              rotate: nearRightRotate, opacity: nearRightOpacity,
              scale: nearRightScale, zIndex: 4
            }}
          >
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.8 }} style={{ width: '100%', height: '100%' }}>
              <Image src={homeDecor} alt="Decor" fill style={{ objectFit: 'cover' }} />
            </motion.div>
          </motion.div>

          {/* Far Left Card (Spread Only) */}
          <motion.div
            className={styles.heroCard}
            style={{
              left: "50%", top: "42%",
              x: farLeftX, y: -230,
              rotate: farLeftRotate, opacity: farLeftOpacity,
              scale: farLeftScale, zIndex: 3
            }}
          >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} style={{ width: '100%', height: '100%' }}>
              <Image src={books} alt="Books" fill style={{ objectFit: 'cover' }} />
            </motion.div>
          </motion.div>

          {/* Far Right Card (Spread Only) */}
          <motion.div
            className={styles.heroCard}
            style={{
              left: "50%", top: "42%",
              x: farRightX, y: -230,
              rotate: farRightRotate, opacity: farRightOpacity,
              scale: farRightScale, zIndex: 3
            }}
          >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.2 }} style={{ width: '100%', height: '100%' }}>
              <Image src={gifts} alt="Gifts" fill style={{ objectFit: 'cover' }} />
            </motion.div>
          </motion.div>
        </motion.div>

        <div className={styles.container} style={{ position: 'relative', zIndex: 20, marginTop: '80px' }}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            OUR  
            <div className={styles.titleWrapper}>
              <div className={styles.titleGlow}></div>
              <span> COLLECTIONS</span>
            </div>
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Explore our curated selection of high-quality products across five primary departments.
          </motion.p>
        </div>
      </section>

      {/* Sticky Department Bar */}
      <div className={styles.departmentBar}>
        <div className={styles.container} onMouseLeave={handleMouseLeave}>
          <div className={styles.navInner}>
            {[
              { id: "Electronics", label: "Electronics", icon: <Lamp size={22} /> },
              { id: "Fashion", label: "Clothes", icon: <Shirt size={22} /> },
              { id: "Home Decor", label: "Home Accessories", icon: <Sofa size={22} /> },
              { id: "Books", label: "Books", icon: <Sofa size={22} /> },
              { id: "Gifts", label: "Chocolates", icon: <Cookie size={22} /> }
            ].map((cat) => (
              <div
                key={cat.id}
                className={styles.navItemWrapper}
                onMouseEnter={() => handleMouseEnter(cat.id)}
              >
                <Link
                  href={`/category/${cat.id.toLowerCase().replace(/\s/g, '-')}`}
                  className={`${styles.navItemPill} ${hoveredTab === cat.id ? styles.navActive : ""}`}
                >
                  <span className={styles.navIcon}>{cat.icon}</span>
                  <span className={styles.navLabel}>{cat.label}</span>
                </Link>
                {hoveredTab === cat.id && (
                  <motion.div
                    layoutId="navUnderline"
                    className={styles.pillsGlow}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Mega Dropdown Panel */}
          <AnimatePresence>
            {hoveredTab && (
              <motion.div
                className={styles.megaDropdownWrapper}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onMouseEnter={() => handleMouseEnter(hoveredTab)}
              >
                <div className={styles.hoverBridge}></div>
                <div className={styles.blurBlob}></div>
                <div className={styles.megaDropdown}>
                  <div className={styles.megaLeft}>
                    {getSubcategories(hoveredTab).map((subcat) => (
                      <Link
                        key={subcat}
                        href={`/category/${hoveredTab.toLowerCase().replace(/\s/g, '-')}/${subcat.toLowerCase().replace(/\s/g, '-')}`}
                        className={styles.megaLink}
                      >
                        <div className={styles.megaThumb}>
                          <Image src={getSubcategoryImage(subcat, hoveredTab)} alt={subcat} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <span className={styles.megaLinkText}>{subcat}</span>
                        <ChevronRight size={14} className={styles.megaArrow} />
                      </Link>
                    ))}
                  </div>
                  <div className={styles.megaRight}>
                    <div className={styles.featuredMiniCard}>
                      <Image src={categoryMetadata[hoveredTab].image} alt="Featured" fill style={{ objectFit: 'cover' }} className={styles.miniCardBg} />
                      <div className={styles.miniCardOverlay}>
                        <h4>Trending in {hoveredTab}</h4>
                        <button className={styles.miniCardBtn}>Explore Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

     



      {/* Top Collection Section */}
      <section className={styles.topCollectionSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitleTop}>Top Collection</h2>
          <div className={styles.topColGrid}>
            <Link href="/category/electronics" className={styles.topColLarge}>
              <div className={styles.topColLabel}>PREMIUM TECH</div>
              <h3 className={styles.topColTitle}>Electronics<br />Deals</h3>
              <div className={styles.topBtn}>Shop Now</div>
              <Image src={electronics} alt="Electronics" width={300} height={300} className={styles.topLargeImg} />
            </Link>
            <div className={styles.topColStack}>
              <Link href="/category/fashion" className={styles.topColSmall}>
                <Image src={fashion} alt="Fashion" fill style={{ objectFit: 'cover' }} className={styles.smallImg} />
                <div className={styles.smallContent}>
                  <div className={styles.smallLabel}>TRENDING STYLES</div>
                  <h3 className={styles.smallTitle}>Fashion Picks</h3>
                </div>
              </Link>
              <Link href="/category/home-decor" className={styles.topColSmall}>
                <Image src={homeDecor} alt="Decor" fill style={{ objectFit: 'cover' }} className={styles.smallImg} />
                <div className={styles.smallContent}>
                  <div className={styles.smallLabel}>MINIMALIST DECOR</div>
                  <h3 className={styles.smallTitle}>Home Essentials</h3>
                </div>
              </Link>
              <Link href="/category/gifts" className={styles.topColSmall}>
                <Image src={snacks} alt="Snacks" fill style={{ objectFit: 'cover' }} className={styles.smallImg} />
                <div className={styles.smallContent}>
                  <div className={styles.smallLabel}>LUXURY TREATS</div>
                  <h3 className={styles.smallTitle}>Chocolate Specials</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Spotlight Section */}
      <section className={styles.spotlightSection}>
        <div className={styles.container}>
          <div className={styles.innovativeHeader}>
            <h2 className={styles.sectionTitleTop} style={{ marginBottom: 0 }}>Category Spotlight</h2>
            <div className={styles.headerLine}></div>
          </div>
          <div className={styles.spotlightGrid}>
            <Link href="/category/electronics" className={`${styles.spotBanner} ${styles.sbBlue}`}>
              <div className={styles.sbContent}>
                <h3 className={styles.spotTitle}>Electronics Deals</h3>
                <div className={styles.spotDiscount}>Up to 40% Off</div>
                <div className={styles.spotBtn}>Shop Now</div>
              </div>
              <Image src={watch} alt="Tech" width={300} height={300} className={styles.sbImg} />
            </Link>
            <Link href="/category/fashion" className={`${styles.spotBanner} ${styles.sbGreen}`}>
              <div className={styles.sbContent}>
                <h3 className={styles.spotTitle}>Fashion Offers</h3>
                <div className={styles.spotDiscount}>Buy 1 Get 1</div>
                <div className={styles.spotBtn}>Shop Now</div>
              </div>
              <Image src={sneakers} alt="Fashion" width={300} height={300} className={styles.sbImg} />
            </Link>
            <Link href="/category/home-decor" className={`${styles.spotBanner} ${styles.sbBeige}`}>
              <div className={styles.sbContent}>
                <h3 className={styles.spotTitle}>Home Decor Picks</h3>
                <div className={styles.spotDiscount}>Flat 30% Discount</div>
                <div className={styles.spotBtn}>Shop Now</div>
              </div>
              <Image src={chair} alt="Home" width={300} height={300} className={styles.sbImg} />
            </Link>
            <Link href="/category/gifts" className={`${styles.spotBanner} ${styles.sbPink}`}>
              <div className={styles.sbContent}>
                <h3 className={styles.spotTitle}>Chocolate Gift Packs</h3>
                <div className={styles.spotDiscount}>Special Offers</div>
                <div className={styles.spotBtn}>Shop Now</div>
              </div>
              <Image src={snacks} alt="Chocolate" width={300} height={300} className={styles.sbImg} />
            </Link>
          </div>
        </div>
      </section>

      {/* Recommended For You Section */}
      <section className={styles.recommendedSection}>
        <div className={styles.container}>
          <div className={styles.recommendBox}>
            <div className={styles.recommendHeader}>
              <h2 className={styles.recommendTitle}>Recommended For You</h2>
              <p className={styles.recommendSub}>Products curated based on your interests</p>
            </div>
            <div className={styles.recommendGrid}>
              <Link href="/category/fashion" className={styles.recCard}>
                <div className={styles.recImgWrap}>
                  <Image src={clothing} alt="Jacket" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.recInfo}>
                  <h3 className={styles.recTitle}>Dark Silk Jacket</h3>
                  <div className={styles.recCat}>CLOTHES</div>
                  <div className={styles.recPrice}>$299</div>
                  <button className={styles.recBtn}>Shop Now</button>
                </div>
              </Link>
              <Link href="/category/home-decor" className={styles.recCard}>
                <div className={styles.recImgWrap}>
                  <Image src={chair} alt="Chair" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.recInfo}>
                  <h3 className={styles.recTitle}>Lounge Home</h3>
                  <div className={styles.recCat}>HOME</div>
                  <div className={styles.recPrice}>$890</div>
                  <button className={styles.recBtn}>Shop Now</button>
                </div>
              </Link>
              <Link href="/category/fashion" className={styles.recCard}>
                <div className={styles.recImgWrap}>
                  <Image src={sneakers} alt="Sneakers" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.recInfo}>
                  <h3 className={styles.recTitle}>Running Shoes</h3>
                  <div className={styles.recCat}>SHOES</div>
                  <div className={styles.recPrice}>$120</div>
                  <button className={styles.recBtn}>Shop Now</button>
                </div>
              </Link>
              <Link href="/category/electronics" className={styles.recCard}>
                <div className={styles.recImgWrap}>
                  <Image src={watch} alt="Watch" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.recInfo}>
                  <h3 className={styles.recTitle}>Smart Watch</h3>
                  <div className={styles.recCat}>TECH</div>
                  <div className={styles.recPrice}>$350</div>
                  <button className={styles.recBtn}>Shop Now</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

     

      {/* Famous Products */}
      <section className={styles.famousProductsSection}>
        <div className={styles.container}>
          <div className={styles.innovativeHeader}>
            <h2 className={styles.sectionTitleTop} style={{ marginBottom: 0 }}>Famous Products</h2>
            <div className={styles.headerLine}></div>
          </div>
          <div className={styles.productGrid}>
            {famousProducts.map((p) => (
              <ProductCard key={p.id} product={p} invert={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className={styles.featuredCollectionsSection}>
        <div className={styles.container}>
          <div className={styles.innovativeHeader}>
            <h2 className={styles.sectionTitleTop}>Featured Collections</h2>
            <div className={styles.headerLine}></div>
          </div>
          <div className={styles.featuredGrid}>
            <Link href="/category/fashion" className={styles.featuredCard}>
              <Image src={fashion} alt="Fashion" fill className={styles.featuredImg} />
              <div className={styles.featuredOverlay} />
              <div className={styles.featuredContent}>
                <div>
                  <h3>The Winter Edit</h3>
                  <p>Discover seasonal trends</p>
                </div>
                <div className={styles.featuredArrowBtn}><ArrowRight size={20} /></div>
              </div>
            </Link>
            <Link href="/category/home-decor" className={styles.featuredCard}>
              <Image src={homeDecor} alt="Decor" fill className={styles.featuredImg} />
              <div className={styles.featuredOverlay} />
              <div className={styles.featuredContent}>
                <div>
                  <h3>Living Spaces</h3>
                  <p>Elevate your home</p>
                </div>
                <div className={styles.featuredArrowBtn}><ArrowRight size={20} /></div>
              </div>
            </Link>
            <Link href="/category/electronics" className={styles.featuredCard}>
              <Image src={electronics} alt="Tech" fill className={styles.featuredImg} />
              <div className={styles.featuredOverlay} />
              <div className={styles.featuredContent}>
                <div>
                  <h3>Smart Home</h3>
                  <p>The latest innovations</p>
                </div>
                <div className={styles.featuredArrowBtn}><ArrowRight size={20} /></div>
              </div>
            </Link>
          </div>
        </div>
      </section>

        {/* Premium Feature Bar (Centered) */}
      <div className={styles.featureBarWrapper}>
        <div className={styles.container}>
          <div className={styles.featureBar}>
            <div className={styles.fbItem}>
              <div className={styles.fbIcon}><Truck size={20} /></div>
              <span>Free Delivery</span>
            </div>
            <div className={styles.fbItem}>
              <div className={styles.fbIcon}><Shield size={20} /></div>
              <span>24/7 Support</span>
            </div>
            <div className={styles.fbItem}>
              <div className={styles.fbIcon}><RotateCcw size={20} /></div>
              <span>Easy Returns</span>
            </div>
            <div className={styles.fbItem}>
              <div className={styles.fbIcon}><ShieldCheck size={20} /></div>
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Added */}
      <section className={styles.recentlyAddedSection}>
        <div className={styles.container}>
          <div className={styles.innovativeHeader}>
            <h2 className={styles.sectionTitleTop} style={{ marginBottom: 0 }}>Recently Added</h2>
            <div className={styles.headerLine}></div>
          </div>
          <div className={styles.productGrid}>
            {recentlyAdded.map((p) => (
              <ProductCard key={p.id} product={p} invert={true} />
            ))}
          </div>
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
