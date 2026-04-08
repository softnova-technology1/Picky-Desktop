"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductById, products } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/Components/ProductCard";
import styles from "./product.module.css";
import { Star, Truck, ShieldCheck, RefreshCw, Minus, Plus, Heart, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailsPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { addToCart } = useCart();
  const product = getProductById(id);

  const [quantity, setQuantity] = useState(1);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  // Suggested products from same category
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <Link href="/">Return to Catalog</Link>
      </div>
    );
  }

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Product Stage */}
      <div className={styles.container}>
        <div className={styles.productLayout}>

          {/* Left: Media Gallery */}
          <div className={styles.galleryWrapper}>
            <div
              className={styles.mainImageContainer}
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{
                  objectFit: 'contain',
                  transform: showZoom ? `scale(1.5)` : `scale(1)`,
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                }}
                className={styles.mainImg}
                priority
              />
              <div className={styles.zoomIndication}>Hover to Zoom</div>
            </div>

            <div className={styles.thumbnails}>
              <div className={`${styles.thumb} ${styles.activeThumb}`}>
                <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain' }} />
              </div>
              {/* Placeholders for variations */}
              {[...Array(2)].map((_, i) => (
                <div key={i} className={styles.thumb}>
                  <div className={styles.thumbOverlay}>+</div>
                  <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain', opacity: 0.3 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content Details */}
          <div className={styles.detailsWrapper}>
            <div className={styles.stickyContent}>
              <div className={styles.metaHeader}>
                <span className={styles.categoryLabel}>{product.category.toUpperCase()}</span>
                <div className={styles.actions}>
                  <button className={styles.iconBtn}><Heart size={20} /></button>
                  <button className={styles.iconBtn}><Share2 size={20} /></button>
                </div>
              </div>

              <h1 className={styles.productTitle}>{product.name}</h1>

              <div className={styles.trustBar}>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#FFD700" color="#FFD700" />)}
                  <span>(248 reviews)</span>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.status}>IN STOCK</div>
              </div>

              <div className={styles.priceSection}>
                <span className={styles.mainPrice}>${product.price.toFixed(2)}</span>
                <span className={styles.taxInfo}>Including VAT and Duties</span>
              </div>

              <p className={styles.description}>{product.description}</p>

              <div className={styles.purchaseControls}>
                <div className={styles.qtyBox}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className={styles.qtyBtn}><Minus size={16} /></button>
                  <span className={styles.qtyValue}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className={styles.qtyBtn}><Plus size={16} /></button>
                </div>

                <button
                  className={styles.addToCartBtn}
                  onClick={() => addToCart({ ...product, quantity })}
                >
                  ADD TO BAG — ${(product.price * quantity).toFixed(2)}
                </button>
              </div>

              <div className={styles.featureGrid}>
                <div className={styles.featureItem}>
                  <Truck size={20} />
                  <span>Free Global Shipping</span>
                </div>
                <div className={styles.featureItem}>
                  <ShieldCheck size={20} />
                  <span>Secure Payments</span>
                </div>
                <div className={styles.featureItem}>
                  <RefreshCw size={20} />
                  <span>30-Day Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className={styles.relatedSection}>
            <div className={styles.sectionHeader}>
              <h2>You May Also Like</h2>
              <div className={styles.sectionDivider}></div>
            </div>

            <div className={styles.relatedGrid}>
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
