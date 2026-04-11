"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./categories.module.css";
import { ArrowRight, ChevronRight, Truck, Headphones, RotateCcw, ShieldCheck, Shield, Lock, Lamp, Shirt, Sofa, Cookie, BookOpen, Candy } from "lucide-react";
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
  const timeoutId = useRef(null);

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
    "Chocolates": {
      desc: "Find the perfect gift for every celebration and milestone.",
      image: gifts,
      label: "CELEBRATIONS"
    }
  };

  return (
    <div className={styles.main}>
      {/* SECTION: PREMIUM CATEGORY HERO */}
      <section className={styles.elevateHero}>
        <div className="container">
          <div className={styles.heroTopRow}>
            <div className={styles.videoCircle}>
             
            </div>

            <h1 className={styles.heroTitleMain}>
              Elevate Your Style With<br />
              <span>Bold Fashion</span>
            </h1>
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.gridCol}>
              <div className={`${styles.gridItem} ${styles.itemLarge} ${styles.bgOrange}`}>
                <Image src="https://i.pinimg.com/1200x/50/4d/97/504d9766a2264d4b1d5ebc1069f4f004.jpg" alt="Model" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={`${styles.gridItem} ${styles.itemSmall} ${styles.bgYellow}`}>
                <Image src="https://i.pinimg.com/736x/d5/cd/97/d5cd97580cf45014a2526f138b7f2f47.jpg" alt="Model" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>

            <div className={styles.gridCol}>
              <div className={`${styles.gridItem} ${styles.itemFull} ${styles.bgGreen}`}>
                <Image src="https://i.pinimg.com/736x/e3/c7/ba/e3c7badab8868f4740a2ab42a3546863.jpg" alt="Model" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>

            <div className={styles.gridCol}>
               <div className={styles.centerColDecor}>
                 <svg viewBox="0 0 100 100" className={styles.centerIcon}>
                   <path d="M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40Z" fill="#ff7a00" />
                 </svg>
               </div>
              <div className={`${styles.gridItem} ${styles.itemMedium} ${styles.bgYellowCenter}`}>
                <Image src="https://i.pinimg.com/736x/03/cc/13/03cc13b683399508090b26059f4480cf.jpg" alt="Model" fill style={{ objectFit: 'cover' }} />
              </div>
               <div className={`${styles.gridItem} ${styles.itemMedium} ${styles.bgYellowCenter}`}>
                <Image src="https://i.pinimg.com/1200x/9f/d3/a1/9fd3a1d5d822ba883672ab535ac0af48.jpg" alt="Model" fill style={{ objectFit: 'cover' }} />
              </div>
              <Link href="/shop" className={styles.exploreBtn}>
                Explore Collections <span>↗</span>
              </Link>
            </div>

            <div className={styles.gridCol}>
              <div className={`${styles.gridItem} ${styles.itemFull} ${styles.bgBlue}`}>
                <Image src="https://i.pinimg.com/1200x/68/ee/46/68ee4614b08856e48032757f1b961599.jpg" alt="Model" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>

            <div className={styles.gridCol}>
              <div className={`${styles.gridItem} ${styles.itemLarge} ${styles.bgGreenRight}`}>
                <Image src="https://i.pinimg.com/736x/3f/bd/0d/3fbd0d20660b5fd5a064c7c8f97f3d0c.jpg" alt="Model" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={`${styles.gridItem} ${styles.itemSmall} ${styles.bgDarkGreen}`}>
                <Image src="https://i.pinimg.com/736x/27/7e/78/277e78aecd7f02a83ec6bb53d195295e.jpg" alt="Model" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
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
              { id: "Books", label: "Books", icon: <BookOpen size={22} /> },
              { id: "Chocolates", label: "Chocolates", icon: <Candy size={22} /> }
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
              <Link href="/category/chocolates" className={styles.topColSmall}>
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
            <Link href="/category/chocolates" className={`${styles.spotBanner} ${styles.sbPink}`}>
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
            {/* <div className={styles.recommendGrid}>
              <Link href="/product/fashion-mens-wear-1" className={styles.recCard}>
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
              <Link href="/product/home-decor-furniture-1" className={styles.recCard}>
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
              <Link href="/product/fashion-footwear-1" className={styles.recCard}>
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
              <Link href="/product/electronics-wearables-1" className={styles.recCard}>
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
            </div> */}
            <div className={styles.productGrid}>
              {famousProducts.map((p) => (
                <ProductCard key={p.id} product={p} invert={true} />
              ))}
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

     
    </div>
  );
}
