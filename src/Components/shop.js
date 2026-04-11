"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/Stylesheet/shop.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import lux from '@/images/shop/luxhead.png';
import shirt from '@/images/shop/shirt.png';

const ACCORDION_DATA = [
    
    {
        id: 1,
        title: "Books",
        bgText: "ART",
        desc: "Curated collection of architectural journals and timeless typography.",
        price: "$45.00",
        img: lux,
        gradient: "linear-gradient(135deg, #ddbef7ff 0%, #f7d8b5 100%)",
        textColor: "#83431bff"
    },{
        id: 2,
        title: "Electronics",
        bgText: "TECH",
        desc: "Experience the pinnacle of minimalist engineering and neural performance.",
        price: "$899.00",
        img: shirt,
        gradient: "linear-gradient(135deg, #f0eaf5ff 0%, #ddbef7ff 100%)",
        textColor: "#0f4f5f7c"
    },
    {
        id: 3,
        title: "Gifts",
        bgText: "JOY",
        desc: "Thoughtfully assembled gift sets for those who appreciate the finer things.",
        price: "$120.00",
        img: lux,
        gradient: "linear-gradient(135deg, #eaf5eb 0%, #ddbef7ff 100%)",
        textColor: "#1e2c20"
    },
    {
        id: 4,
        title: "Home Decor",
        bgText: "FLOW",
        desc: "Transform your space into a sanctuary of organic textures and flow.",
        price: "$350.00",
        img: shirt,
        gradient: "linear-gradient(135deg, #ddbef7ff 0%, #f7d1d1 100%)",
        textColor: "#5e2e2e"
    },
    {
        id: 5,
        title: "Clothing",
        bgText: "STYLE",
        desc: "Modern tailoring meets sustainable luxury for the contemporary silhouette.",
        price: "$210.00",
        img: lux,
        gradient: "linear-gradient(135deg, #eaedfc 0%, #ddbef7ff 100%)",
        textColor: "#2e325e"
    }
];

export default function Shop() {
    const [hoveredId, setHoveredId] = useState(3); // Start with center expanded

    return (
        <main className={styles.container}>
            <div className={styles.sliderWrapper}>
                {ACCORDION_DATA.map((item) => (
                    <motion.div 
                        key={item.id}
                        className={`${styles.panel} ${hoveredId === item.id ? styles.active : ''}`}
                        onMouseEnter={() => setHoveredId(item.id)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: item.id * 0.1 }}
                        style={{
                            background: item.gradient
                        }}
                    >
                        {/* Huge Background Typography */}
                        <div className={styles.bgTextLayer}>
                            {item.bgText}
                        </div>

                        {/* Zentered Vertical Label for Collapsed */}
                        <div className={styles.collapsedLabel} style={{ color: item.textColor }}>
                            {item.bgText}
                        </div>

                        {/* Product Image Focus */}
                        <div className={styles.productStage}>
                            <motion.div 
                                className={styles.imgWrap}
                                initial={false}
                                animate={{
                                    y: hoveredId === item.id ? -100 : 0,
                                    scale: hoveredId === item.id ? 1.2 : 0.8,
                                    filter: hoveredId === item.id ? "drop-shadow(0 40px 60px rgba(0,0,0,0.15))" : "drop-shadow(0 10px 20px rgba(0,0,0,0.05))"
                                }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            >
                                <Image src={item.img} alt={item.title} fill className={styles.mainImg} />
                            </motion.div>
                        </div>

                        {/* Content Reveal Layer */}
                        <AnimatePresence>
                            {hoveredId === item.id && (
                                <motion.div 
                                    className={styles.expandedContent}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    style={{ color: item.textColor }}
                                >
                                    <div className={styles.priceTag}>{item.price}</div>
                                    <h2 className={styles.expandedTitle}>{item.title}</h2>
                                    <p className={styles.expandedDesc}>{item.desc}</p>
                                    <button 
                                        className={styles.buyBtn} 
                                        style={{ backgroundColor: item.textColor, color: '#fff' }}
                                    >
                                        BUY NOW
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Back Home Floating Button */}
            <Link href="/" className={styles.backBtn}>
                <ArrowRight size={20} style={{ transform: 'rotate(180deg)', marginRight: '8px' }} />
                <span>BACK HOME</span>
            </Link>
        </main>
    );
}
