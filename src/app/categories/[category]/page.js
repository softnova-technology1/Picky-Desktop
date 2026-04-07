"use client";

import { use } from "react";
import Link from "next/link";
import CategoryCard from "@/Components/CategoryCard";
import { categories } from "@/lib/data";
import styles from "./category.module.css";
import { ChevronRight } from "lucide-react";

export default function CategoryPage({ params }) {
  const resolvedParams = use(params);
  const categoryId = resolvedParams.category;

  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <div className={styles.notFound}>
        <h1>Category not found</h1>
        <Link href="/categories">Back to Categories</Link>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <header className={styles.header}>
           <div className={styles.breadcrumb}>
              <Link href="/">HOME</Link> <ChevronRight size={14} /> 
              <Link href="/categories">CATEGORIES</Link> <ChevronRight size={14} /> 
              <span>{category.name.toUpperCase()}</span>
           </div>
           <h1 className={styles.title}>{category.name}</h1>
           <p className={styles.subtitle}>Browse sub-categories in {category.name.toLowerCase()}</p>
        </header>

        <div className={styles.grid}>
          {category.subcategories.map((sub) => (
            <CategoryCard 
              key={sub} 
              categoryId={categoryId} 
              subcategory={sub} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
