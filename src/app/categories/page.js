import Image from "next/image";
import styles from "./categories.module.css";
import { 
  Search, 
  ShoppingCart, 
  User, 
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Eye
} from "lucide-react";
import chairImg from "@/images/categories/chair.png";
import lifestyleImg from "@/images/categories/lifestyle.png";
import wearImg from "@/images/categories/wear.png";
import vaseImg from "@/images/categories/vase.png";
import catWatchImg from "@/images/categories/watch.png";
import scarfImg from "@/images/categories/scarf.png";

// New high-quality category img
import electronicsImg from "@/images/categories/electronics.png";
import clothingImg from "@/images/categories/clothing.png";
import beautyImg from "@/images/categories/beauty.png";
import toysImg from "@/images/categories/toys.png";
import foodsImg from "@/images/categories/foods.png";
import giftImg from "@/images/categories/gift.png";
import booksImg from "@/images/categories/books.png";

// Banner img for Top Categories section
import electronicsBannerImg from "@/images/categories/electronics_banner.png";
import beautyBannerImg from "@/images/categories/beauty_banner.png";
import clothingBannerImg from "@/images/categories/clothing.png";




export default function CategoriesPage() {
  return (
    <div className={styles.main}>
      {/* Header */}
      

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Explore Our <span>Curated</span> Collections</h1>
          <p className={styles.heroSubtitle}>
            Thoughtfully selected items that blend timeless quality with modern vibrancy.<br />
            Your journey to a more inspired lifestyle starts here.
          </p>
          <div className={styles.heroSearch}>
            <input type="text" className={styles.heroInput} placeholder="Find exactly what you're looking for..." />
            <button className={styles.heroButton}>Search</button>
          </div>
        </div>
      </section>

      {/* Quick Categories Navigation */}
      <section className={styles.quickNav}>
        <div className={styles.container}>
          <div className={styles.quickNavFlex}>
            {[
              { name: "Electronics", img: electronicsImg },
              { name: "Clothing", img: clothingImg },
              { name: "Beauty Products", img: beautyImg },
              { name: "Toys", img: toysImg },
              { name: "Food & Snacks", img: foodsImg },
              { name: "Gifts", img: giftImg },
              { name: "Books & Stationery", img: booksImg },
            ].map((cat, idx) => (
              <div key={idx} className={styles.quickNavItem}>
                <div className={styles.quickNavImage}>
                  <Image src={cat.img} alt={cat.name} fill style={{ objectFit: "cover" }} />
                </div>
                <span className={styles.quickNavName}>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Top Categories */}
      <section className={styles.topCategories}>
        <div className={styles.container}>
          <div className="flex-between" style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "700" }}>Top Categories</h2>
            <a href="#" style={{ color: "#FD4F23", fontWeight: "600", fontSize: "0.875rem" }}>View all →</a>
          </div>
          <div className={styles.catGrid}>
            <div className={styles.mainCat}>
              <Image src={electronicsBannerImg} alt="Electronics" fill style={{ objectFit: "cover" }} />
              <div className={styles.catOverlay}>
                <span className={styles.catTag}>INNOVATIVE TECH</span>
                <h3 className={styles.catTitle}>Electronics</h3>
              </div>
              <div className={styles.productOverlay}>
                <button className={styles.addToCartBtn}>Add to Cart</button>
                <button className={styles.buyNowBtn}>Buy Now</button>
                <div className={styles.cardActions}>
                  <button className={styles.actionIcon}><Heart size={18} /></button>
                  <button className={styles.actionIcon}><Eye size={18} /></button>
                </div>
              </div>
            </div>

            <div className={styles.sideCats}>
              <div className={styles.sideCat}>
                <Image src={beautyBannerImg} alt="Beauty Products" fill style={{ objectFit: "cover" }} />
                <div className={styles.catOverlay}>
                  <h3 className={styles.catTitle}>Beauty Products</h3>
                </div>
                <div className={styles.productOverlay}>
                  <button className={styles.addToCartBtn}>Add to Cart</button>
                  <button className={styles.buyNowBtn}>Buy Now</button>
                  <div className={styles.cardActions}>
                    <button className={styles.actionIcon}><Heart size={18} /></button>
                    <button className={styles.actionIcon}><Eye size={18} /></button>
                  </div>
                </div>
              </div>

              <div className={styles.sideCat}>
                <Image src={clothingBannerImg} alt="Cloths" fill style={{ objectFit: "cover" }} />
                <div className={styles.catOverlay}>
                  <h3 className={styles.catTitle}>Clothing</h3>
                </div>
                <div className={styles.productOverlay}>
                  <button className={styles.addToCartBtn}>Add to Cart</button>
                  <button className={styles.buyNowBtn}>Buy Now</button>
                  <div className={styles.cardActions}>
                    <button className={styles.actionIcon}><Heart size={18} /></button>
                    <button className={styles.actionIcon}><Eye size={18} /></button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* Product Section with Filters */}
      <section className={styles.container}>
        
        <div className={styles.shopSection}>

            <h2 style={{ fontSize: "2rem", fontWeight: "700",marginBottom:"2rem" }}>Best Selling</h2> 
          <div className={styles.productGrid}>
            {[
              { name: "Farm Vase No. 4", price: "$85.00", image: vaseImg },
              { name: "The Curator's Watch", price: "$240.00", image: catWatchImg },
              { name: "Geometric Silk Scarf", price: "$120.00", image: scarfImg },
              { name: "Azure Mist Candle", price: "$48.00", image: lifestyleImg },
              { name: "Orbit Print No. 3", price: "$110.00", image: wearImg },
              { name: "Luxe Soft Pillow", price: "$65.00", image: chairImg },
            ].map((prod, idx) => (
              <div key={idx} className={styles.productCard}>
                <div className={styles.productImage}>
                  <Image src={prod.image} alt={prod.name} fill style={{ objectFit: "cover" }} />
                  <div className={styles.productOverlay}>
                    <button className={styles.addToCartBtn}>Add to Cart</button>
                    <button className={styles.buyNowBtn}>Buy Now</button>
                    <div className={styles.cardActions}>
                      <button className={styles.actionIcon}><Heart size={18} /></button>
                      <button className={styles.actionIcon}><Eye size={18} /></button>
                    </div>
                  </div>

                </div>
                <h4 className={styles.productName}>{prod.name}</h4>
                <span className={styles.productPrice}>{prod.price}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Seasonal Must-Haves */}
      <section className={styles.seasonal}>
        <div className={styles.container}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "2rem" }}>Seasonal Must-Haves</h2>
          <div className={styles.seasonalFlex}>
            <div className={styles.promoCard}>
              <h2>20% Off</h2>
              <p style={{ marginBottom: "2rem", fontSize: "0.875rem", opacity: "0.9" }}>On your first curated selection when you join the newsletter.</p>
              <button style={{ padding: "0.75rem 2.5rem", borderRadius: "99px", background: "white", border: "none", color: "#FD4F23", fontWeight: "700", cursor: "pointer" }}>Join Now</button>
            </div>
            <div className={styles.seasonalCards}>
              <div className={styles.summerVibe}>
                <div>
                  <h2 style={{ color: "#0369A1" }}>Summer Vibrance</h2>
                  <p style={{ color: "#0369A1", fontSize: "0.875rem", opacity: "0.8" }}>Brighten your days with our latest citrus-inspired textures.</p>
                </div>
                <button style={{ padding: "0.5rem 1.5rem", borderRadius: "8px", background: "#0369A1", color: "white", border: "none", width: "fit-content", fontSize: "0.875rem", fontWeight: "600", cursor: "pointer" }}>Explore Summer</button>
              </div>
              <div className={styles.seasonalRight}>
                <div className={styles.smallSeasonal}>
                  <div style={{ width: "80px", height: "80px", background: "white", borderRadius: "12px", overflow: "hidden", position: "relative" }}>
                    <Image src={scarfImg} fill style={{ objectFit: "cover" }} alt="Sofa" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.9rem" }}>Optic Frame No. 12</h4>
                    <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>UV400 Protection</p>
                    <a href="#" style={{ fontSize: "0.75rem", fontWeight: "700", borderBottom: "1px solid #111827", paddingBottom: "2px", marginTop: "8px", display: "inline-block" }}>Shop Now</a>
                  </div>
                </div>
                <div className={`${styles.smallSeasonal} ${styles.peach}`}>
                   <div style={{ width: "80px", height: "80px", background: "white", borderRadius: "12px", overflow: "hidden", position: "relative" }}>
                    <Image src={chairImg} fill style={{ objectFit: "cover" }} alt="Chair" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.9rem" }}>Micro Tote</h4>
                    <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>Full-Grain Leather</p>
                    <a href="#" style={{ fontSize: "0.75rem", fontWeight: "700", borderBottom: "1px solid #111827", paddingBottom: "2px", marginTop: "8px", display: "inline-block" }}>Shop Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className={styles.container} style={{ paddingBottom: "6rem" }}>
        <div className="flex-between" style={{ marginBottom: "2rem" }}>
           <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>New Arrivals</h2>
           <div style={{ display: "flex", gap: "1rem" }}>
              <button disabled className="btn btn-secondary" style={{ padding: "0.5rem", borderRadius: "50%", width: "40px", height: "40px", border: "1px solid #e5e7eb" }}><ChevronLeft size={20} /></button>
              <button className="btn btn-secondary" style={{ padding: "0.5rem", borderRadius: "50%", width: "40px", height: "40px", border: "1px solid #e5e7eb" }}><ChevronRight size={20} /></button>
            </div>
        </div>
        <div className={styles.newArrivalsGrid}>
            {[
              { name: "Tampa Desk Clock", cat: "Home", image: chairImg },
              { name: "Azure Mist Candle", cat: "Scent", image: lifestyleImg },
              { name: "Orbit Print No. 3", cat: "Art", image: wearImg },
              { name: "Luxe Soft Pillow", cat: "Textile", image: vaseImg },
            ].map((item, idx) => (
              <div key={idx} className={styles.productCard}>
                <div className={styles.productImage}>
                   <Image src={item.image} fill style={{ objectFit: "cover" }} alt={item.name} />
                   <div className={styles.productOverlay}>
                    <button className={styles.addToCartBtn}>Add to Cart</button>
                    <button className={styles.buyNowBtn}>Buy Now</button>
                    <div className={styles.cardActions}>
                      <button className={styles.actionIcon}><Heart size={18} /></button>
                      <button className={styles.actionIcon}><Eye size={18} /></button>
                    </div>
                  </div>

                </div>
                <h5 className={styles.productName}>{item.name}</h5>
              </div>
            ))}
        </div>


      </section>

     
      
    </div>
  );
}
