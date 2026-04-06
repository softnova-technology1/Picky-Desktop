"use client";

import Image from "next/image";
import styles from "./categories.module.css";
import { 
  ChevronLeft,
  ChevronRight,
  Heart,
  Eye,
  Star
} from "lucide-react";
import Link from 'next/link';
import { products, categories as mockCategories } from "@/utils/mockData";
import ProductCard from "@/Components/ProductCard";
import { useCart } from "@/context/CartContext";

import { useRouter } from "next/navigation";

export default function CategoriesPage() {
  const { addToCart, setCheckoutItems } = useCart();
  const router = useRouter();

  const handleBuyNow = (product) => {
    setCheckoutItems([{ ...product, quantity: 1 }]);
    router.push('/checkout');
  };
  
  // Best selling products - pick first 6
  const featuredProducts = products.slice(0, 6);

  return (
    <div className={styles.main}>
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
            {mockCategories.map((cat, idx) => (
              <Link key={idx} href={`/categories/${cat.id}`} className={styles.quickNavItem}>
                <div className={styles.quickNavImage}>
                  <Image src={cat.image} alt={cat.name} fill style={{ objectFit: "cover" }} />
                </div>
                <span className={styles.quickNavName}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Section with Filters */}
      <section className={styles.container} style={{ margin: '80px auto' }}>
        <div className={styles.shopSection}>
          <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "3rem", textAlign: 'center' }}>Best Selling Picks</h2> 
          <div className={styles.productGrid}>
            {featuredProducts.map((prod) => (
              <div key={prod.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <Image src={prod.image} alt={prod.name} fill style={{ objectFit: "cover" }} />
                  <div className={styles.productOverlay}>
                    <button className={styles.addToCartBtn} onClick={() => addToCart(prod)}>Add to Cart</button>
                    <button className={styles.buyNowBtn} onClick={() => handleBuyNow(prod)}>Buy Now</button>
                    <div className={styles.cardActions}>
                      <button className={styles.actionIcon}><Heart size={18} /></button>
                      <button className={styles.actionIcon}><Eye size={18} /></button>
                    </div>
                  </div>
                </div>
                <h4 className={styles.productName}>{prod.name}</h4>
                <div className={styles.productRating}>
                   {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#FFD700" color="#FFD700" />)}
                </div>
                <span className={styles.productPrice}>${prod.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Gallery Banners */}
      <section className={styles.topCategories}>
        <div className={styles.container}>
          <div className="flex-between" style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "700" }}>Curated Departments</h2>
          </div>
          <div className={styles.catGrid}>
            {mockCategories.slice(0, 3).map((cat, index) => (
               <Link 
                key={cat.id} 
                href={`/categories/${cat.id}`} 
                className={index === 0 ? styles.mainCat : styles.sideCat}
                style={{ position: 'relative' }}
               >
                 <Image src={cat.image} alt={cat.name} fill style={{ objectFit: "cover" }} />
                 <div className={styles.catOverlay}>
                    <span className={styles.catTag}>EXPLORE COLLECTION</span>
                    <h3 className={styles.catTitle}>{cat.name}</h3>
                 </div>
               </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Must-Haves */}
      <section className={styles.seasonal}>
        <div className={styles.container}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "2rem" }}>Seasonal Promotions</h2>
          <div className={styles.seasonalFlex}>
            <div className={styles.promoCard}>
              <h2>Save 20% Today</h2>
              <p style={{ marginBottom: "2rem", fontSize: "0.875rem", opacity: "0.9" }}>Join our newsletter to receive an exclusive welcome discount.</p>
              <button style={{ padding: "0.75rem 2.5rem", borderRadius: "99px", background: "white", border: "none", color: "var(--primary)", fontWeight: "700", cursor: "pointer" }}>Join Now</button>
            </div>
            <div className={styles.seasonalCards}>
              <div className={styles.summerVibe} style={{ background: '#f0f9ff' }}>
                <div>
                  <h2 style={{ color: "#0369A1" }}>Summer Launch</h2>
                  <p style={{ color: "#0369A1", fontSize: "0.875rem", opacity: "0.8" }}>Brighten your days with our latest textures.</p>
                </div>
                <button style={{ padding: "0.5rem 1.5rem", borderRadius: "8px", background: "#0369A1", color: "white", border: "none", width: "fit-content", fontSize: "0.875rem", fontWeight: "600", cursor: "pointer" }}>Explore Now</button>
              </div>
              <div className={styles.seasonalRight}>
                <div className={styles.smallSeasonal}>
                  <div style={{ width: "80px", height: "80px", background: "white", borderRadius: "12px", overflow: "hidden", position: "relative" }}>
                     <Image src={products[0].image} fill style={{ objectFit: "cover" }} alt="Product"/>
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.9rem" }}>Optic Frame No. 12</h4>
                    <Link href={`/product/${products[0].id}`} style={{ fontSize: "0.75rem", fontWeight: "700", borderBottom: "1px solid #111827", paddingBottom: "2px", marginTop: "8px", display: "inline-block" }}>Shop Now</Link>
                  </div>
                </div>
                <div className={`${styles.smallSeasonal} ${styles.peach}`}>
                   <div style={{ width: "80px", height: "80px", background: "white", borderRadius: "12px", overflow: "hidden", position: "relative" }}>
                     <Image src={products[1].image} fill style={{ objectFit: "cover" }} alt="Product" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.9rem" }}>Micro Tote</h4>
                    <Link href={`/product/${products[1].id}`} style={{ fontSize: "0.75rem", fontWeight: "700", borderBottom: "1px solid #111827", paddingBottom: "2px", marginTop: "8px", display: "inline-block" }}>Shop Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
