import Image from "next/image";
import styles from "./page.module.css";
import { 
  Laptop, 
  Shirt, 
  Home as HomeIcon, 
  Dumbbell, 
  Sparkles, 
  Baby,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>PREMIUM MARKETPLACE</div>
          <h1 className={styles.heroTitle}>Find the perfect pick for your lifestyle</h1>
          <p className={styles.heroSubtitle}>
            Experience the modern marketplace with premium curated products and verified vendors delivered to your doorstep.
          </p>
          <div className={styles.heroActions}>
            <button className="btn btn-secondary">Shop Collections</button>
            <button className="btn btn-outline">Daily Deals</button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <div className="container">
          <div className="flex-between" style={{ marginBottom: "2rem" }}>
            <h2 className="section-title">Shop by Category</h2>
            <a href="#" style={{ color: "var(--primary)", fontWeight: "600" }}>View All →</a>
          </div>
          <div className={styles.categoryGrid}>
            {[
              { name: "Electronics", icon: <Laptop size={32} /> },
              { name: "Fashion", icon: <Shirt size={32} /> },
              { name: "Home & Living", icon: <HomeIcon size={32} /> },
              { name: "Fitness", icon: <Dumbbell size={32} /> },
              { name: "Beauty", icon: <Sparkles size={32} /> },
              { name: "Kids", icon: <Baby size={32} /> },
            ].map((cat, idx) => (
              <div key={idx} className={styles.categoryCard}>
                <div className={styles.categoryIcon}>{cat.icon}</div>
                <div className={styles.categoryName}>{cat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className={styles.trending}>
        <div className="container">
          <div className="flex-between" style={{ marginBottom: "2rem" }}>
            <h2 className="section-title">Trending Products</h2>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button className="btn btn-secondary" style={{ padding: "0.5rem", borderRadius: "50%", width: "40px", height: "40px" }}><ChevronLeft size={20} /></button>
              <button className="btn btn-secondary" style={{ padding: "0.5rem", borderRadius: "50%", width: "40px", height: "40px" }}><ChevronRight size={20} /></button>
            </div>
          </div>
          <div className={styles.productGrid}>
            {[
              { 
                name: "OmniWatch Series 5", 
                cat: "TECH", 
                price: "$199.00", 
                image: "/images/watch.png",
                badge: "NEW"
              },
              { 
                name: "Sonic Headphones Pro", 
                cat: "AUDIO", 
                price: "$129.00", 
                image: "/images/headphones.png"
              },
              { 
                name: "Aura Glow Desk Lamp", 
                cat: "LIFESTYLE", 
                price: "$89.00", 
                image: "/images/lamp.png"
              },
              { 
                name: "RetroShot 2000", 
                cat: "PHOTOGRAPHY", 
                price: "$149.00", 
                image: "/images/camera.png"
              },
            ].map((prod, idx) => (
              <div key={idx} className={styles.productCard}>
                <div className={styles.productImage}>
                  {prod.badge && <span className={styles.productBadge}>{prod.badge}</span>}
                  <Image src={prod.image} alt={prod.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productCategory}>{prod.cat}</div>
                  <h3 className={styles.productName}>{prod.name}</h3>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < 4 ? "#fbbf24" : "none"} color={i < 4 ? "#fbbf24" : "#d1d5db"} />
                    ))}
                    <span>(45)</span>
                  </div>
                  <div className={styles.productMeta}>
                    <span className={styles.productPrice}>{prod.price}</span>
                    <button className={styles.addToCart}><ShoppingCart size={18} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banners */}
      <section className="container">
        <div className={styles.promos}>
          <div className={`${styles.promoBanner} ${styles.spring}`}>
            <span className={styles.promoSmall}>SPRING COLLECTION 2024</span>
            <h2 className={styles.promoTitle}>Spring Vibes Only</h2>
            <p className={styles.promoDesc}>Get up to 40% off on our limited spring collection.</p>
            <button className="btn btn-secondary" style={{ width: "fit-content" }}>Shop Now</button>
          </div>
          <div className={`${styles.promoBanner} ${styles.future}`}>
            <span className={styles.promoSmall}>TECH FRONTIER</span>
            <h2 className={styles.promoTitle}>The Future is Here</h2>
            <p className={styles.promoDesc}>Pre-order the latest gadgets and accessories.</p>
            <button className="btn btn-secondary" style={{ width: "fit-content" }}>Pre-order Now</button>
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className={styles.vendors}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Vendors</h2>
            <p className="section-subtitle">Discover unique products from hand-picked creators and small businesses worldwide.</p>
          </div>
          <div className={styles.vendorGrid}>
            {[
              { name: "Lumiera Home", desc: "Handcrafted home decor with a modern touch.", initial: "L" },
              { name: "Urban Tech", desc: "Innovative gadgets for the urban lifestyle.", initial: "U" },
              { name: "Eco Bloom", desc: "Sustainable skincare products for natural beauty.", initial: "E" },
            ].map((vendor, idx) => (
              <div key={idx} className={styles.vendorCard}>
                <div className={styles.vendorLogo}>{vendor.initial}</div>
                <h3 className={styles.vendorName}>{vendor.name}</h3>
                <p className={styles.vendorDesc}>{vendor.desc}</p>
                <button className="btn btn-outline" style={{ borderColor: "var(--primary)", color: "var(--primary)" }}>Visit Store</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Community Says</h2>
          </div>
          <div className={styles.testimonialGrid}>
            {[
              { name: "Amber Smith", role: "Verified Buyer", quote: "Picky has completely changed how I shop. The curation is so spot-on that I find things I didn't even know I needed. High-quality products and fast shipping!", initial: "A" },
              { name: "Sarah Chen", role: "Premium Member", quote: "I love supporting small vendors through Picky. Everything feels so personal and authentic. The app is incredibly smooth and well-designed.", initial: "S" },
              { name: "Marcus Thorne", role: "Tech Enthusiast", quote: "Finally a marketplace that values quality over quantity. The customer service is excellent and the review process is really transparent.", initial: "M" },
            ].map((t, idx) => (
              <div key={idx} className={styles.testimonialCard}>
                <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                <p className={styles.quote}>"{t.quote}"</p>
                <div className={styles.user}>
                  <div className={styles.userAvatar}>{t.initial}</div>
                  <div>
                    <div className={styles.userName}>{t.name}</div>
                    <div className={styles.userRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Promo */}
      <section className="container">
        <div className={styles.appPromo}>
          <div className={`container ${styles.appFlex}`}>
            <div className={styles.appContent}>
              <h2 className={styles.appTitle}>Shop anywhere with the Picky App</h2>
              <p className={styles.appSubtitle}>
                Get exclusive early access to drops, personalized recommendations, and instant order tracking with our mobile app.
              </p>
              <div className={styles.appStores}>
                <button className={styles.appStoreBtn}>
                  <span>📱 App Store</span>
                </button>
                <button className={styles.appStoreBtn}>
                  <span>🤖 Google Play</span>
                </button>
              </div>
            </div>
            <div className={styles.appMockup}>
              <div className={styles.phone}>
                <div className={styles.phoneScreen}>
                  <div style={{ padding: "1.5rem", background: "#f3f4f6", height: "100%" }}>
                    <div style={{ height: "40px", background: "white", borderRadius: "8px", marginBottom: "1rem" }}></div>
                    <div style={{ height: "200px", background: "var(--primary)", borderRadius: "20px", marginBottom: "1rem" }}></div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div style={{ height: "100px", background: "white", borderRadius: "12px" }}></div>
                      <div style={{ height: "100px", background: "white", borderRadius: "12px" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: "4rem 0", background: "white", borderTop: "1px solid var(--border)", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "var(--primary)", marginBottom: "1.5rem" }}>Picky</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>© 2024 Picky Marketplace. All rights reserved.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", color: "var(--text-muted)", fontSize: "0.875rem" }}>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
