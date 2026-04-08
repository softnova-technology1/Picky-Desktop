"use client";

import { products } from "@/lib/data";
import ProductCard from "@/Components/ProductCard";
import styles from "./products.module.css";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AllProductsPage() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <header className={styles.header}>
           <div className={styles.breadcrumb}>
              <Link href="/">HOME</Link> <ChevronRight size={14} /> <span>ALL PRODUCTS</span>
           </div>
           <h1 className={styles.title}>All Collections</h1>
           <p className={styles.subtitle}>Explore our entire range of curated quality pieces.</p>
        </header>

        <div className={styles.grid}>
          
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
