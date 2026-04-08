"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductById, products } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/Components/ProductCard";
import styles from "./product.module.css";
import { Star, Truck, ShieldCheck, RefreshCw, Minus, Plus, Heart, Share2, ChevronRight, Sparkles, Zap, X, Search, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailsPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { addToCart } = useCart();
  const product = getProductById(id);

  const [quantity, setQuantity] = useState(1);
  const [sel1, setSel1] = useState(0);
  const [sel2, setSel2] = useState(0);
  const [bottomTab, setBottomTab] = useState("Reviews");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [popupReview, setPopupReview] = useState(null);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", name: "" });

  // Generate a mock gallery based on the main image
  const mockGallery = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image
  ];

  // Dynamic Options based on Category
  const cat = product?.category || "Fashion";

  const getDynamicSelectors = () => {
    switch(cat) {
      case "Electronics":
        return {
          title1: "Color / Finish", options1: ["#1e293b", "#94a3b8", "#f1f5f9"], isColor1: true,
          title2: "Storage Capacity", options2: ["128GB", "256GB", "512GB"], isColor2: false
        };
      case "Books":
        return {
          title1: "Cover Format", options1: ["Hardcover", "Paperback", "Kindle Edition"], isColor1: false,
          title2: "Language Edition", options2: ["English", "Spanish", "French"], isColor2: false
        };
      case "Home Decor":
        return {
          title1: "Material Finish", options1: ["Matte", "Glossy", "Textured Wood"], isColor1: false,
          title2: "Dimensions", options2: ["Compact", "Standard", "Oversized"], isColor2: false
        };
      case "Gifts":
        return {
          title1: "Ribbon Color", options1: ["#ef4444", "#eab308", "#14b8a6"], isColor1: true,
          title2: "Packaging Type", options2: ["Standard Box", "Premium Wooden Crate"], isColor2: false
        };
      case "Fashion":
      default:
        return {
          title1: "Select Color variant", options1: ["#0f172a", "#ef4444", "#3b82f6", "#22c55e"], isColor1: true,
          title2: "Select Size", options2: ["XS", "S", "M", "L", "XL", "XXL"], isColor2: false
        };
    }
  };

  const dynamicData = getDynamicSelectors();

  const mockReviews = [
    { id: 1, name: "Sarah L.", rating: 5, date: "October 12, 2025", comment: "Absolutely incredible! The quality exceeded my expectations and the delivery was super fast. Highly recommend.", images: [product.image, product.image] },
    { id: 2, name: "Michael R.", rating: 5, date: "September 28, 2025", comment: "A premium product through and through. The detailing is perfect and it feels extremely durable in hand.", images: [product.image] },
    { id: 3, name: "Emma T.", rating: 4, date: "August 15, 2025", comment: "Very good quality, arrived in beautiful packaging. Taking one star off because it took an extra day to arrive, but the item itself is flawless." }
  ];

  const getDynamicDetails = () => {
     switch(cat) {
       case "Electronics": return "Engineered for maximum performance and reliability. Features advanced processors, durable build quality, and an intuitive user interface for everyday efficiency.";
       case "Books": return "An incredibly immersive reading experience. Printed on high-quality recycled paper with crystal-clear typography. Highly reviewed by critics worldwide.";
       case "Home Decor": return "Elevate your living space with this beautiful decor piece. Crafted with premium materials designed to add warmth, character, and elegance to any room.";
       case "Gifts": return "The perfect present for your loved ones. Carefully curated and elegantly packaged to bring joy and create unforgettable moments.";
       case "Fashion":
       default: return "Crafted with premium materials for maximum comfort and durability. This statement piece integrates seamlessly into any modern wardrobe.";
     }
  };

  // Suggested products
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const renderDynamicCategoryInfo = () => {
    switch (cat) {
      case "Electronics":
        return (
          <div className={styles.dynamicSectionWrapper}>
            <div className={styles.dynamicBentoRow}>
              <div className={styles.dynamicBox}>
                <h4 className={styles.boxTitle}>Technical Specifications</h4>
                <table className={styles.specTable}>
                  <tbody>
                    <tr><td>Processor</td><td>Octa-core 3.5GHz</td></tr>
                    <tr><td>Battery</td><td>5000mAh (Fast Charge)</td></tr>
                    <tr><td>Display</td><td>6.7" OLED 120Hz</td></tr>
                    <tr><td>Weight</td><td>185g</td></tr>
                  </tbody>
                </table>
              </div>
              <div className={styles.dynamicBox}>
                <h4 className={styles.boxTitle}>What's in the Box?</h4>
                <ul style={{ paddingLeft: "20px", color: "#475569", lineHeight: "1.8", margin: 0 }}>
                  <li>{product.name} Base Unit</li>
                  <li>USB-C Charging Cable</li>
                  <li>User Manual & Warranty Card</li>
                  <li>Protective Case</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "Fashion":
        return (
          <div className={styles.dynamicSectionWrapper}>
            <div className={styles.dynamicBentoRow}>
              <div className={styles.dynamicBox}>
                <h4 className={styles.boxTitle}>Fabric & Care</h4>
                <div className={styles.fabricGrid}>
                  <div className={styles.fabricItem}>
                    <div className={styles.fabricIcon}>🧶</div>
                    <span style={{fontWeight: 700, color: "#0f172a", fontSize: "0.9rem"}}>Cotton Blend</span>
                    <span style={{color: "#64748b", fontSize: "0.8rem"}}>85% Cotton, 15% Poly</span>
                  </div>
                  <div className={styles.fabricItem}>
                    <div className={styles.fabricIcon}>❄️</div>
                    <span style={{fontWeight: 700, color: "#0f172a", fontSize: "0.9rem"}}>Cold Wash</span>
                    <span style={{color: "#64748b", fontSize: "0.8rem"}}>Machine wash under 30°C</span>
                  </div>
                  <div className={styles.fabricItem}>
                    <div className={styles.fabricIcon}>💨</div>
                    <span style={{fontWeight: 700, color: "#0f172a", fontSize: "0.9rem"}}>Air Dry</span>
                    <span style={{color: "#64748b", fontSize: "0.8rem"}}>Do not tumble dry</span>
                  </div>
                  <div className={styles.fabricItem}>
                    <div className={styles.fabricIcon}>👔</div>
                    <span style={{fontWeight: 700, color: "#0f172a", fontSize: "0.9rem"}}>Iron Safe</span>
                    <span style={{color: "#64748b", fontSize: "0.8rem"}}>Medium heat only</span>
                  </div>
                </div>
              </div>
              <div className={styles.dynamicBox}>
                <h4 className={styles.boxTitle}>Size Guide & Fit</h4>
                <p className={styles.boxText}>
                  This garment runs true to size with a tailored, modern fit. If you prefer a loose fit, we recommend sizing up. Model is 6'1" and wears size Medium.
                </p>
                <button className={styles.cyberCheckoutBtn} style={{ marginTop: "20px", padding: "15px", fontSize: "0.9rem", background: "#f1f5f9", color: "#0f172a", boxShadow: "none" }}>
                  View Detailed Sizing Chart
                </button>
              </div>
            </div>
          </div>
        );
      case "Gifts":
        return (
          <div className={styles.dynamicSectionWrapper}>
            <div className={styles.dynamicBentoRow}>
              <div className={styles.dynamicBox}>
                <h4 className={styles.boxTitle}>Occasions</h4>
                <div className={styles.tagGrid}>
                  <span className={styles.tagPill}>Anniversary</span>
                  <span className={styles.tagPill}>Mother's Day</span>
                  <span className={styles.tagPill}>Birthday</span>
                  <span className={styles.tagPill}>Valentine's Day</span>
                </div>
              </div>
              <div className={styles.dynamicBox}>
                <h4 className={styles.boxTitle}>Inventory Manifest</h4>
                <ul style={{ paddingLeft: "10px", listStyle: "none", color: "#475569", lineHeight: "1.8", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <li style={{ background: "#f8fafc", padding: "10px 15px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.03)" }}>📦 Lavender Soy Candle</li>
                  <li style={{ background: "#f8fafc", padding: "10px 15px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.03)" }}>📦 Himalayan Pink Bath Salts</li>
                  <li style={{ background: "#f8fafc", padding: "10px 15px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.03)" }}>📦 Silk Eye Mask</li>
                  <li style={{ background: "#f8fafc", padding: "10px 15px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.03)" }}>📦 Chamomile Tea Box</li>
                </ul>
              </div>
            </div>
            <div className={styles.dynamicBox}>
              <h4 className={styles.boxTitle}>Engraving / Personalization Preview</h4>
              <p className={styles.boxText} style={{ marginBottom: "15px" }}>Add a custom engraved name onto the wooden keepsake box and a handwritten wax-sealed note inside.</p>
              <input type="text" placeholder="Type name to simulate engraving..." className={styles.inputField} />
            </div>
          </div>
        );
      case "Books":
        return (
          <div className={styles.dynamicSectionWrapper}>
            <div className={styles.dynamicBox}>
              <h4 className={styles.boxTitle}>Author & Publication</h4>
              <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justify: "center", fontSize: "2rem" }}>✍️</div>
                <div>
                  <h5 style={{ margin: "0 0 5px 0", fontSize: "1.2rem", fontWeight: 800, color: "#0f172a" }}>Acclaimed Author</h5>
                  <span style={{ color: "#64748b", fontSize: "0.9rem" }}>New York Times Bestseller</span>
                </div>
              </div>
              <p className={styles.boxText}>
                An immersive journey written by a master storyteller. This edition includes an exclusive forward and beautifully illustrated chapter headings.
              </p>
            </div>
            <div className={styles.dynamicBentoRow}>
               <div className={styles.dynamicBox}>
                 <h4 className={styles.boxTitle}>Metadata</h4>
                 <table className={styles.specTable}>
                    <tbody>
                      <tr><td>Publisher</td><td>Penguin Classics</td></tr>
                      <tr><td>Page Count</td><td>428 Pages</td></tr>
                      <tr><td>ISBN</td><td>978-3-16-148410-0</td></tr>
                    </tbody>
                 </table>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.cinemaWrapper}>
      {/* Abstract Background Elements */}
      <div className={styles.ambientGlowPrimary} style={{ background: dynamicData.isColor1 ? dynamicData.options1[sel1] : 'var(--primary)' }} />
      <div className={styles.ambientGlowSecondary} />

      <motion.div 
        className={styles.bentoContainer}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* BENTO 1: Giant Visual Stage with Gallery */}
        <motion.div className={`${styles.bentoBox} ${styles.heroImageCard}`} variants={itemVariants}>
          <div className={styles.watermarkText}>{product.category.replace("-", "")}</div>
          
          <div className={styles.galleryLayout}>
            {/* Main Big Image Stage */}
            <div className={styles.mainImageWrapper}>
               <motion.div
                 key={galleryIndex}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.5 }}
                 className={styles.heroImgWrapper}
               >
                 <Image src={mockGallery[galleryIndex]} alt={product.name} fill className={styles.bentoHeroImg} priority />
               </motion.div>

               {/* Design Overlay Elements */}
               <div className={styles.zoomActionsWrapper}>
                  <button className={styles.zoomActionBtn}><Search size={18} /></button>
                  <button className={styles.zoomActionBtn}><Maximize2 size={18} /></button>
               </div>

               <div className={styles.imageIndexPill}>
                 {galleryIndex + 1} / {mockGallery.length}
               </div>
            </div>

            {/* Thumbnails Lane */}
            <div className={styles.thumbnailLane}>
              {mockGallery.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.thumbnailItem} ${galleryIndex === idx ? styles.thumbnailItemActive : ""}`}
                  onClick={() => setGalleryIndex(idx)}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className={styles.thumbImgObject} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.heroOverlayActions}>
            <button className={styles.glassIconBtn}><Heart size={20} /></button>
            <button className={styles.glassIconBtn}><Share2 size={20} /></button>
          </div>
          
          <div className={styles.heroTagBottom}>
             <Sparkles size={16} /> Premium Edition
          </div>
        </motion.div>

        {/* BENTO 2: Header & Price */}
        <motion.div className={`${styles.bentoBox} ${styles.titleCard}`} variants={itemVariants}>
          <div className={styles.statusPill}>
             <div className={styles.statusDot}></div> In Stock & Ready to Ship
          </div>
          <h1 className={styles.bentoTitle}>{product.name}</h1>
          <div className={styles.metricRow}>
             <span className={styles.bentoPrice}>${product.price.toFixed(2)}</span>
             <div className={styles.ratingBox}>
               <Star size={16} fill="currentColor" />
               <span>4.9 (2.4k reviews)</span>
             </div>
          </div>
        </motion.div>

        {/* BENTO 3: Dynamic Selectors */}
        <motion.div className={`${styles.bentoBox} ${styles.selectorsCard}`} variants={itemVariants}>
          <div className={styles.selectorGroup}>
            <h4 className={styles.scifiTitle}>{dynamicData.title1}</h4>
            <div className={dynamicData.isColor1 ? styles.bentoColorGrid : styles.bentoPillGrid}>
              {dynamicData.options1.map((opt, i) => (
                dynamicData.isColor1 ? (
                  <button 
                    key={i} 
                    className={`${styles.bentoColorBtn} ${sel1 === i ? styles.bentoColorActive : ""}`}
                    style={{ backgroundColor: opt }}
                    onClick={() => setSel1(i)}
                  />
                ) : (
                  <button 
                    key={i} 
                    className={`${styles.bentoPillBtn} ${sel1 === i ? styles.bentoPillActive : ""}`}
                    onClick={() => setSel1(i)}
                  >
                    {opt}
                  </button>
                )
              ))}
            </div>
          </div>

          <div className={styles.verticalDivider}></div>

          <div className={styles.selectorGroup}>
            <h4 className={styles.scifiTitle}>{dynamicData.title2}</h4>
            <div className={dynamicData.isColor2 ? styles.bentoColorGrid : styles.bentoPillGrid}>
              {dynamicData.options2.map((opt, i) => (
                dynamicData.isColor2 ? (
                  <button 
                    key={i} 
                    className={`${styles.bentoColorBtn} ${sel2 === i ? styles.bentoColorActive : ""}`}
                    style={{ backgroundColor: opt }}
                    onClick={() => setSel2(i)}
                  />
                ) : (
                  <button 
                    key={i} 
                    className={`${styles.bentoPillBtn} ${sel2 === i ? styles.bentoPillActive : ""}`}
                    onClick={() => setSel2(i)}
                  >
                    {opt}
                  </button>
                )
              ))}
            </div>
          </div>
        </motion.div>

        {/* BENTO 4: Checkout Action */}
        <motion.div className={`${styles.bentoBox} ${styles.actionCard}`} variants={itemVariants}>
           <div className={styles.nanoControls}>
             <h4 className={styles.scifiTitle}>Quantity</h4>
             <div className={styles.nanoQty}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16}/></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><Plus size={16}/></button>
             </div>
           </div>
           
           <motion.button 
             className={styles.cyberCheckoutBtn}
             onClick={() => addToCart({ ...product, quantity })}
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
           >
             Add to Vault <span>—</span> ${(product.price * quantity).toFixed(2)}
           </motion.button>
        </motion.div>

        {/* BENTO 5: Features Briefing */}
        <motion.div className={`${styles.bentoBox} ${styles.descCard}`} variants={itemVariants}>
           <h4 className={styles.scifiTitle}>Operation Briefing</h4>
           <p className={styles.scifiDesc}>
             {product.description} {getDynamicDetails()}
           </p>
           
           <div className={styles.perksList}>
             <div className={styles.perkBadge}><Truck size={16}/> Priority Freight</div>
             <div className={styles.perkBadge}><ShieldCheck size={16}/> Authentified</div>
             <div className={styles.perkBadge}><RefreshCw size={16}/> 30-Day Window</div>
           </div>
        </motion.div>

      </motion.div>

      {/* Complete Info Tabs Section */}
      <section className={styles.completeInfoSection}>
        <div className={styles.bottomTabsHeader}>
          {["Description", "Specifications", "Reviews"].map((tab) => (
            <button 
              key={tab}
              className={`${styles.bottomTab} ${bottomTab === tab ? styles.bottomTabActive : ""}`}
              onClick={() => setBottomTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {bottomTab === "Description" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", padding: "20px 0" }}>
            <h3 className={styles.descHeading} style={{ marginBottom: "24px", fontSize: "2.2rem" }}>Unparalleled Design & Quality</h3>
            <p className={styles.descPara} style={{ fontSize: "1.2rem", color: "#475569", lineHeight: "1.8", marginBottom: "40px" }}>
              {product.description} {getDynamicDetails()}
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "row", justifyContent: "center", gap: "40px", flexWrap: "wrap", margin: 0, padding: 0 }}>
              <li style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", textAlign: "center", width: "150px" }}>
                <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "50%", color: "var(--primary)" }}><ShieldCheck size={32} /></div>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>Premium<br/>Authenticity</span>
              </li>
              <li style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", textAlign: "center", width: "150px" }}>
                <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "50%", color: "var(--primary)" }}><RefreshCw size={32} /></div>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>Sustainable<br/>Practices</span>
              </li>
              <li style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", textAlign: "center", width: "150px" }}>
                <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "50%", color: "var(--primary)" }}><Zap size={32} /></div>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>Cutting-edge<br/>Utility</span>
              </li>
              <li style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", textAlign: "center", width: "150px" }}>
                <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "50%", color: "var(--primary)" }}><Truck size={32} /></div>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>Free Global<br/>Shipping</span>
              </li>
            </ul>
          </motion.div>
        )}

        {bottomTab === "Specifications" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div className={styles.specsTableWrapper} style={{ background: "white", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
              <table className={styles.newSpecTable}>
                <thead>
                  <tr>
                    <th style={{ fontSize: "1.3rem" }}>Technical Spec</th>
                    <th style={{ fontSize: "1.3rem" }}>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {cat === "Electronics" ? (
                    <>
                      <tr><td>Connectivity</td><td>Bluetooth 5.2, USB-C</td></tr>
                      <tr><td>Driver Type</td><td>40mm Dynamic Drivers</td></tr>
                      <tr><td>Battery Life</td><td>40 Hours (ANC On)</td></tr>
                      <tr><td>Frequency</td><td>20Hz - 40,000Hz</td></tr>
                      <tr><td>Weight</td><td>260g</td></tr>
                    </>
                  ) : cat === "Fashion" ? (
                    <>
                      <tr><td>Material</td><td>85% Premium Cotton, 15% Poly</td></tr>
                      <tr><td>Fit</td><td>Tailored / Modern Fit</td></tr>
                      <tr><td>Care Intructions</td><td>Machine Wash Cold, Hang Dry</td></tr>
                      <tr><td>Origin</td><td>Imported</td></tr>
                    </>
                  ) : (
                     <>
                      <tr><td>Base Category</td><td>{cat}</td></tr>
                      <tr><td>Release Year</td><td>2025</td></tr>
                      <tr><td>Warranty</td><td>1 Year Global</td></tr>
                      <tr><td>Primary Material</td><td>Mixed Components</td></tr>
                     </>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {bottomTab === "Reviews" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.reviewsSplit}>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "20px" }}>Rating Details</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { num: 5, pct: "82%" },
                  { num: 4, pct: "12%" },
                  { num: 3, pct: "4%" },
                  { num: 2, pct: "1%" },
                  { num: 1, pct: "1%" }
                ].map((row) => (
                  <div key={row.num} className={styles.ratingRow}>
                    <span className={styles.ratingNum}>{row.num}</span>
                    <div className={styles.ratingTrack}>
                      <div className={styles.ratingFillPurple} style={{ width: row.pct }}></div>
                    </div>
                    <span className={styles.ratingPct}>{row.pct}</span>
                  </div>
                ))}
              </div>

              <div className={styles.writeReviewBox}>
                <p style={{ color: "#475569", fontSize: "0.9rem", margin: "0 0 10px 0" }}>Are you a customer? Share your experience with Picky Premium Store.</p>
                <button className={styles.writeReviewBtn} onClick={() => setShowWriteReview(true)}>Write a Review</button>
              </div>
            </div>

            <div>
              <div className={styles.reviewsHeaderRow}>
                <h3>Latest Customer Reviews</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <span style={{ fontSize: "0.9rem", color: "#64748b" }}>Sort by: <strong style={{ color: "#0f172a" }}>Most Recent</strong></span>
                  <Link href={`/product/${id}/reviews`} className={styles.viewAllReviewsLink}>
                    View All →
                  </Link>
                </div>
              </div>

              <div className={styles.reviewList}>
                {mockReviews.slice(0, 2).map((review) => (
                  <div className={styles.reviewCard} key={review.id}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewerInfo}>
                        <div className={styles.reviewerAvatar} style={{ background: "#a7f3d0", color: "#065f46" }}>
                           {/* Using color blocks to mimic the avatar in screenshot */}
                        </div>
                        <div>
                          <span className={styles.reviewerName}>{review.name}</span>
                          <span className={styles.reviewDate}>Verified Buyer • {review.date}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "2px", color: "#f59e0b" }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} color={i < review.rating ? "currentColor" : "#cbd5e1"} />
                        ))}
                      </div>
                    </div>
                    <p className={styles.reviewText}>"{review.comment}"</p>
                    
                    {review.images && review.images.length > 0 && (
                      <div className={styles.reviewThumbLane}>
                        {review.images.map((img, idx) => (
                          <div 
                            key={idx} 
                            className={styles.reviewThumb}
                            onClick={() => setPopupReview({ img, review })}
                          >
                            <Image src={img} alt={`Review photo ${idx}`} fill style={{ objectFit: "cover" }} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Cinematic Related Section */}
      {relatedProducts.length > 0 && (
        <motion.section 
          className={styles.cinemaRelated}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={styles.relatedHeadline}>
            <h2>Expand Your Arsenal</h2>
            <Link href={`/category/${product.category}`} className={styles.cyberLink}>
              Access Database <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className={styles.cinemaScroller}>
            {relatedProducts.map((p) => (
              <div className={styles.cinemaProductItem} key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Review Image Modal Popup */}
      <AnimatePresence>
        {popupReview && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPopupReview(null)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.modalCloseBtn} onClick={() => setPopupReview(null)}>
                <X size={24} />
              </button>
              
              <div className={styles.modalImageWrapper}>
                <Image src={popupReview.img} alt="Customer photo" fill style={{ objectFit: "contain", background: "#f1f5f9" }} />
              </div>
              
              <div className={styles.modalReviewInfo}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                  <div>
                    <strong style={{ fontSize: "1.2rem", display: "block", color: "#0f172a" }}>{popupReview.review.name}</strong>
                    <span style={{ fontSize: "0.9rem", color: "#64748b" }}>Verified Buyer • {popupReview.review.date}</span>
                  </div>
                  <div style={{ display: "flex", gap: "2px", color: "#f59e0b" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < popupReview.review.rating ? "currentColor" : "none"} color={i < popupReview.review.rating ? "currentColor" : "#cbd5e1"} />
                    ))}
                  </div>
                </div>
                <p style={{ color: "#475569", lineHeight: "1.6", fontSize: "1.05rem" }}>"{popupReview.review.comment}"</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Write a Review Modal */}
      <AnimatePresence>
        {showWriteReview && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWriteReview(false)}
          >
            <motion.div 
              className={styles.reviewFormModal}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.modalCloseBtn} onClick={() => setShowWriteReview(false)}>
                <X size={24} />
              </button>
              
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", marginBottom: "10px" }}>Write a Review</h2>
              <p style={{ color: "#64748b", marginBottom: "30px" }}>Share your thoughts on {product.name} with other customers.</p>
              
              <div className={styles.formGroup}>
                <label>Overall Rating</label>
                <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={28} 
                      fill={star <= newReview.rating ? "#f59e0b" : "none"} 
                      color={star <= newReview.rating ? "#f59e0b" : "#cbd5e1"} 
                      style={{ cursor: "pointer" }}
                      onClick={() => setNewReview({...newReview, rating: star})}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Your Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name"
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Your Review</label>
                <textarea 
                  rows="4" 
                  placeholder="What did you like or dislike?"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                ></textarea>
              </div>

              <button className={styles.submitReviewBtn} onClick={() => {
                alert("Thank you for your review! It has been submitted for moderation.");
                setShowWriteReview(false);
                setNewReview({ rating: 5, comment: "", name: "" });
              }}>
                Submit Review
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
