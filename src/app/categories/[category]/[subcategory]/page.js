"use client";

import { use } from "react";
import { products, categories } from "@/lib/data";
import ProductCard from "@/Components/ProductCard";
import styles from "./products.module.css";
import Link from "next/link";
import { ChevronRight, Filter } from "lucide-react";

export default function SubcategoryPage({ params }) {
  const resolvedParams = use(params);
  const { category: catId, subcategory: subId } = resolvedParams;

  const category = categories.find((c) => c.id === catId);
  const subName = subId.replace(/-/g, " ");

  const filteredProducts = products.filter(
    (p) => 
      p.category.toLowerCase() === catId.toLowerCase() && 
      p.subcategory.toLowerCase() === subName.toLowerCase()
  );

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <header className={styles.header}>
           <div className={styles.breadcrumb}>
              <Link href="/">HOME</Link> <ChevronRight size={14} /> 
              <Link href="/categories">CATEGORIES</Link> <ChevronRight size={14} /> 
              <Link href={`/categories/${catId}`}>{catId.toUpperCase()}</Link> <ChevronRight size={14} /> 
              <span>{subName.toUpperCase()}</span>
           </div>
           
           <div className={styles.titleRow}>
              <div>
                 <h1 className={styles.title}>{subName}</h1>
                 <p className={styles.count}>{filteredProducts.length} items found</p>
              </div>
              <button className={styles.filterBtn}>
                 <Filter size={18} /> <span>SORT & FILTER</span>
              </button>
           </div>
        </header>

        {filteredProducts.length > 0 ? (
          <div className={styles.grid}>
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h2>No products in this collection yet.</h2>
            <Link href={`/categories/${catId}`}>Continue Browsing {category?.name}</Link>
          </div>
        )}
      </div>
    </div>
  );
}
