"use client";

import React, { useState, useMemo } from "react";
import { products, categories } from "@/lib/data";
import ProductCard from "@/Components/ProductCard";
import styles from "./products.module.css";
import Link from "next/link";
import { 
  ChevronRight, 
  X, 
  Search, 
  Smartphone, 
  Shirt, 
  Book, 
  Home, 
  Gift, 
  Layers
} from "lucide-react";

export default function AllProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState(24);

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + 24);
  };

  const categoryIcons = {
    "Electronics": <Smartphone size={16} />,
    "Fashion": <Shirt size={16} />,
    "Books": <Book size={16} />,
    "Home Decor": <Home size={16} />,
    "Gifts": <Gift size={16} />
  };

  const categoryCounts = useMemo(() => {
    const counts = { "All": products.length };
    categories.forEach(cat => {
      counts[cat] = products.filter(p => p.category === cat).length;
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Original category filtering
    if (selectedCategory !== "All") {
      const categoryMapping = {
        "Popular": () => true,
        "Kurti, Saree & Lehenga": (p) => p.category === "Fashion" && (p.subcategory.includes("Women") || p.subcategory.includes("Jewellery")),
        "Women Western": (p) => p.category === "Fashion" && p.subcategory.includes("Women"),
        "Lingerie": (p) => p.category === "Fashion" && p.subcategory.includes("Women"),
        "Men": (p) => p.category === "Fashion" && p.subcategory.includes("Men"),
        "Kids & Toys": (p) => p.category === "Fashion" && p.subcategory.includes("Kids") || p.category === "Gifts",
        "Home & Kitchen": (p) => p.category === "Home Decor",
        "Beauty & Health": (p) => p.category === "Fashion" && (p.subcategory.includes("Accessories") || p.subcategory.includes("Jewellery")),
        "Jewelry & Accessories": (p) => p.category === "Fashion" && (p.subcategory.includes("Jewellery") || p.subcategory.includes("Watches")),
        "Bags & Footwear": (p) => p.category === "Fashion" && (p.subcategory.includes("Handbags") || p.subcategory.includes("Footwear")),
      };

      if (categoryMapping[selectedCategory]) {
        result = result.filter(categoryMapping[selectedCategory]);
      } else {
        result = result.filter(p => p.category === selectedCategory);
      }
    }

    // Price filtering
    result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Sort logic
    if (sortBy === "Price: Low to High") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "Newest") {
      result = [...result].reverse();
    } else if (sortBy === "Recommended" && selectedCategory === "All" && !searchQuery) {
      const grouped = {};
      categories.forEach(cat => grouped[cat] = products.filter(p => p.category === cat));
      const mingled = [];
      for (let i = 0; i < 300; i++) {
        categories.forEach(cat => {
          if (grouped[cat][i]) mingled.push(grouped[cat][i]);
        });
      }
      result = mingled;
    }
    return result;
  }, [selectedCategory, sortBy, priceRange, searchQuery]);

  const displayProducts = filteredProducts.slice(0, visibleItems);

  return (
    <div className={styles.wrapper}>
      {/* SECTION 0.5: MARKETPLACE CATEGORY NAVBAR */}
      <nav className={styles.categoryNavbar}>
        <div className={styles.navItems}>
          {[
            "Popular", 
            "Kurti, Saree & Lehenga", 
            "Women Western", 
            "Lingerie", 
            "Men", 
            "Kids & Toys", 
            "Home & Kitchen", 
            "Beauty & Health", 
            "Jewelry & Accessories", 
            "Bags & Footwear"
          ].map((cat) => (
            <div 
              key={cat} 
              className={`${styles.navItem} ${selectedCategory === cat ? styles.navItemActive : ""}`}
              onClick={() => setSelectedCategory(prev => prev === cat ? "All" : cat)}
            >
              {cat}
            </div>
          ))}
        </div>
      </nav>

      <div className="container">

        {/* SECTION 1: HERO HEADER - FULL WIDTH */}
        <header className={styles.heroSection}>
           <div className={styles.breadcrumb}>
              <Link href="/">HOME</Link> <ChevronRight size={14} /> <span>ALL PRODUCTS</span>
           </div>
           <h1 className={styles.title}>All Collections</h1>
           <p className={styles.subtitle} style={{ color: 'rgba(0,0,0,0.5)', marginBottom: '40px' }}>
              Showing {filteredProducts.length} unique pieces curated for your lifestyle.
           </p>
           
           <div className={styles.discoveryBanner}>
              <div className={styles.bannerContent}>
                <span className={styles.bannerBadge}>LIMITED EDITION</span>
                <h2 className={styles.bannerTitle}>Curated Minimalism</h2>
                <p className={styles.bannerText}>Discover our latest arrivals designed for the discerning individual.</p>
                <button className={styles.bannerBtn}>SHOP THE EDIT</button>
              </div>
              <div className={styles.bannerDecor} />
           </div>
        </header>

        {/* SECTION 2: SHOP CONTENT - SPLIT LAYOUT */}
        <div className={styles.shopLayout}>
          
          <aside className={styles.sidebar}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Departments</h3>
              <div className={styles.categoryList}>
                <div 
                  className={`${styles.filterItem} ${selectedCategory === "All" ? styles.filterItemActive : ""}`}
                  onClick={() => setSelectedCategory("All")}
                >
                  <div className={styles.itemLeft}>
                    <Layers size={16} />
                    <span>All Collections</span>
                  </div>
                  <span className={styles.count}>{categoryCounts["All"]}</span>
                </div>
                {categories.map(cat => (
                  <div 
                    key={cat}
                    className={`${styles.filterItem} ${selectedCategory === cat ? styles.filterItemActive : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <div className={styles.itemLeft}>
                      {categoryIcons[cat]}
                      <span>{cat}</span>
                    </div>
                    <span className={styles.count}>{categoryCounts[cat]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Price Range</h3>
              <div className={styles.priceInputs}>
                <input 
                  type="number" 
                  placeholder="Min" 
                  className={styles.priceBox}
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                />
                <span>-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className={styles.priceBox}
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                />
              </div>
            </div>
            
            <div className={styles.filterSection}>
              <p className={styles.tipText}>
                Tip: Use keywords like "Mobile" or "Aura" for faster discovery.
              </p>
            </div>
          </aside>


          <main className={styles.mainContent}>
            <div className={styles.toolbar}>
              <div className={styles.resultCount}>
                Showing <span>{displayProducts.length}</span> of {filteredProducts.length} items
              </div>

              <div className={styles.sortWrapper}>
                <button 
                  className={styles.mobileFilterBtn}
                  onClick={() => setIsMobileSidebarOpen(true)}
                >
                  <Layers size={16} /> FILTERS
                </button>
                <span className={styles.sortLabel}>SORT BY:</span>
                <select 
                  className={styles.sortSelect}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Recommended</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className={styles.filterSearchRow}>
              <div className={styles.activeFilters}>
                {selectedCategory !== "All" && (
                  <div className={styles.filterTag} onClick={() => setSelectedCategory("All")}>
                    {selectedCategory} <X size={14} />
                  </div>
                )}
                {searchQuery && (
                  <div className={styles.filterTag} onClick={() => setSearchQuery("")}>
                    "{searchQuery}" <X size={14} />
                  </div>
                )}
              </div>
              
              <div className={styles.searchContainer}>
                <Search size={16} className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search in collections..." 
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {displayProducts.length > 0 ? (
              <div className={styles.grid}>
                {displayProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search criteria.</p>
                <button 
                  onClick={() => {setSelectedCategory("All"); setSearchQuery(""); setPriceRange({min:0, max:2000})}}
                  className={styles.clearBtn}
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {filteredProducts.length > displayProducts.length && (
              <div className={styles.loadMoreWrapper}>
                <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
                  LOAD MORE COLLECTIONS
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
