"use client";

import React, { useState, use } from "react";
import { getProductsBySubcategory } from "@/lib/data";
import ProductCard from "@/Components/ProductCard";
import styles from "./products.module.css";
import Link from "next/link";
import { ChevronRight, Filter } from "lucide-react";

import SmartStyleAssistant from "@/Components/SmartStyleAssistant/SmartStyleAssistant";

export default function SubcategoryPage({ params }) {
  const resolvedParams = use(params);
  const { category: catPath, subcategory: subPath } = resolvedParams;

  // Helper to format path back to display name
  const formatName = (str) => {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const mapping = {
    "electronics": "Electronics",
    "fashion": "Fashion",
    "books": "Books",
    "home-decor": "Home Decor",
    "chocolates": "Chocolates",
    "gifts": "Gifts"
  };

  const categoryName = mapping[catPath.toLowerCase()] || formatName(catPath);
  const subcategoryName = formatName(subPath);

  const filteredProducts = getProductsBySubcategory(categoryName, subcategoryName);

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [assistantFilters, setAssistantFilters] = useState({});

  const handleAssistantFilterChange = (filters) => {
    setAssistantFilters(filters);
  };

  const isFashion = catPath.toLowerCase() === "fashion";

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link href="/">HOME</Link> <ChevronRight size={14} />
            <Link href="/category">CATEGORIES</Link> <ChevronRight size={14} />
            <Link href={`/category/${catPath}`}>{categoryName.toUpperCase()}</Link> <ChevronRight size={14} />
            <span>{subcategoryName.toUpperCase()}</span>
          </div>

          <div className={styles.titleRow}>
            <div>
              <h1 className={styles.title}>{subcategoryName}</h1>
              <p className={styles.count}>{filteredProducts.length} items curated for you</p>
            </div>

          </div>
        </header>

        <div className={styles.shopLayout}>
          <div className={styles.sidebarColumn}>
            <SmartStyleAssistant
              onFilterChange={handleAssistantFilterChange}
              isMobileOpen={isMobileSidebarOpen}
              onClose={() => setIsMobileSidebarOpen(false)}
              category={categoryName}
            />
          </div>

          <main className={styles.mainContent}>
            {filteredProducts.length > 0 ? (
              <div className={styles.grid}>
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <h2>No products found in this section.</h2>
                <Link href={`/category/${catPath}`}>Return to {categoryName}</Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
