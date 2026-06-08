"use client";

import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoryCard.module.css';
import { motion } from 'framer-motion';

import electronics from "@/images/home/elec.png"
import fashion from "@/images/home/fashion.png"
import books from "@/images/home/book.png"
import homeDecor from "@/images/home/decor.png"
import gifts from "@/images/home/gift.png"

const CategoryCard = ({ category }) => {
  // Main Category Card metadata
  const categoryMetadata = {
    "Electronics": {
      desc: "Innovative technology designed for the modern lifestyle.",
      image: electronics,
      label: "FUTURE TECH"
    },
    "Fashion": {
      desc: "Curated styles and seasonal edits for every occasion.",
      image: fashion,
      label: "STYLE EDIT"
    },
    "Books": {
      desc: "A vast collection of knowledge, fiction, and art.",
      image: books,
      label: "LITERARY WORLD"
    },
    "Home Decor": {
      desc: "Thoughtfully curated pieces to elevate your living spaces.",
      image: homeDecor,
      label: "INTERIOR DESIGN"
    },
    "Gifts": {
      desc: "Find the perfect gift for every celebration and milestone.",
      image: gifts,
      label: "CELEBRATIONS"
    }
  };

  const meta = categoryMetadata[category] || {
    desc: "Discover our curated collection.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    label: "DEPARTMENT"
  };

  const href = `/category/${category.toLowerCase().replace(/\s/g, '-')}`;

  return (
    <Link href={href} className={styles.card}>
      <motion.div
        className={styles.imageContainer}
        whileHover="hover"
        initial="initial"
      >
        <Image
          src={meta.image}
          alt={category}
          fill
          style={{ objectFit: 'cover' }}
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Collections Count Badge */}
        <div className={styles.badge}>
          <span className={styles.count}>10</span>
          <span className={styles.badgeText}>COLLECTIONS</span>
        </div>

        {/* Floating Content Box */}
        <div className={styles.floatingBox}>
          <div className={styles.content}>
            <span className={styles.label}>{meta.label}</span>
            <h3 className={styles.name}>{category}</h3>
            <p className={styles.description}>{meta.desc}</p>
            
            <div className={styles.exploreTrigger}>
              <span>EXPLORE NOW</span>
              <div className={styles.arrowIcon}>→</div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
