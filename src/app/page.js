import Image from "next/image";
import styles from "./page.module.css";
import {
  Star,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Apple
} from "lucide-react";
import watch from "@/images/hero-watch.png"
import electronics from "@/images/hero.png"
import fashion from "@/images/fashion.png"
import lamp from "@/images/lamp.png"
import appMockup from "@/images/app-mockup.png"

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroFlex}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <Star size={14} fill="var(--primary)" />
                <span>TRUSTED BY 50,000+ SHOPPERS</span>
              </div>
              <h1 className={styles.heroTitle}>
                Discover the <br />
                <span className={styles.italicText}>most exclusive</span> <br />
                picks for you
              </h1>
              <p className={styles.heroSubtitle}>
                A curated marketplace where quality meets authenticity. Shop the world's finest products from verified premium vendors.
              </p>
              <div className={styles.heroActions}>
                <button className={styles.primaryBtn}>Explore Market</button>
                <button className={styles.secondaryBtn}>View Deals</button>
              </div>
            </div>
            
            <div className={styles.heroVisual}>
              <div className={styles.collageGrid}>
                 <div className={`${styles.collageItem} ${styles.mainImg}`}>
                    <Image 
                      src={watch} 
                      alt="Product 1" fill style={{ objectFit: "cover" }} 
                    />
                 </div>
                 <div className={`${styles.collageItem} ${styles.topRight}`}>
                    <Image 
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop" 
                      alt="Product 2" fill style={{ objectFit: "cover" }} 
                    />
                 </div>
                 <div className={`${styles.collageItem} ${styles.bottomRight}`}>
                    <Image 
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop" 
                      alt="Product 3" fill style={{ objectFit: "cover" }} 
                    />
                 </div>
              </div>
              <div className={styles.floatingStats}>
                 <div className={styles.statLine}>
                    <strong>2.4k+</strong>
                    <span>Exclusive Items</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.heroBgPattern}></div>
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
                <h2 className={styles.promoLargeTitle}>Spring Collection <br/> 2024</h2>
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

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
             <div className={styles.footerBrandCol}>
                <div className={styles.footerLogo}>
                  <div className={styles.logoIconFooter}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </div>
                  <span>Picky</span>
                </div>
                <p className={styles.footerDesc}>
                  The modern marketplace for premium curated products and verified worldwide vendors. Quality in every pick.
                </p>
                <div className={styles.footerSocials}>
                  <div className={styles.socialIcon}><Star size={18} /></div>
                  <div className={styles.socialIcon}><CheckCircle2 size={18} /></div>
                  <div className={styles.socialIcon}><ArrowRight size={18} /></div>
                </div>
             </div>

             <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Shop</h4>
                <ul className={styles.footerLinksList}>
                  <li><a href="#">Trending Now</a></li>
                  <li><a href="#">New Arrivals</a></li>
                  <li><a href="#">Gift Cards</a></li>
                  <li><a href="#">Sustainability</a></li>
                </ul>
             </div>

             <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Company</h4>
                <ul className={styles.footerLinksList}>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Vendors</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
             </div>

             <div className={styles.footerNewsletterCol}>
                <h4 className={styles.footerColTitle}>Newsletter</h4>
                <p className={styles.newsletterDesc}>Join our newsletter to receive updates on new products and special offers.</p>
                <div className={styles.newsletterBox}>
                   <input type="email" placeholder="Your email" className={styles.newsletterInput} />
                   <button className={styles.newsletterBtn}>
                      <ArrowRight size={20} />
                   </button>
                </div>
             </div>
          </div>

          <div className={styles.footerBottom}>
             <div className={styles.footerBottomContent}>
                <span className={styles.copyrightText}>© 2024 Picky Marketplace Inc. All rights reserved.</span>
                <div className={styles.footerBottomLinks}>
                   <a href="#">Terms of Service</a>
                   <a href="#">Cookies</a>
                </div>
             </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
