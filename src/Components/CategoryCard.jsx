"use client";

import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoryCard.module.css';
import { motion } from 'framer-motion';

const CategoryCard = ({ category, categoryId, subcategory }) => {
  // If subcategory is provided, this is a subcategory card
  // Otherwise, it's a main category card
  const isSubcategory = !!subcategory;
  
  // Construct the correct href based on requirements
  const href = isSubcategory 
    ? `/categories/${categoryId}/${subcategory.toLowerCase().replace(/ /g, "-")}`
    : `/categories/${category.id}`;

  const displayName = isSubcategory ? subcategory : category.name;
  const displayLabel = isSubcategory ? "COLLECTION" : "DEPARTMENT";

  // Fallback images to prevent "empty string" src console errors
  const fallbackImg = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop";
  const displayImage = isSubcategory ? fallbackImg : (category.image || fallbackImg);
  const displayDesc = isSubcategory ? "" : (category.description || "Discover our curated collection.");

  return (
    <Link href={href} className={styles.card}>
      <motion.div
        className={styles.imageContainer}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
      >
        <Image
          src={displayImage}
          alt={displayName}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className={styles.overlay}>
          <div className={styles.content}>
            <span className={styles.label}>{displayLabel}</span>
            <h3 className={styles.name}>{displayName}</h3>
            {!isSubcategory && <p className={styles.description}>{displayDesc}</p>}
            <div className={styles.exploreBtn}>Explore Items</div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
