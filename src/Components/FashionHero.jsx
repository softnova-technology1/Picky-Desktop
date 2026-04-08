import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './FashionHero.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import snacks from "@/images/home/snacks.png";
import electronics from "@/images/home/elec.png";
import fashion from "@/images/home/cloth.png";
import home from "@/images/home/decor.png";
import gifts from "@/images/home/gift.png";

import Link from 'next/link';

const FashionHero = () => {
    const [categories, setCategories] = useState([
        { id: 1, src: electronics, alt: "Electronics", title: "Electronics", label: "Tech", path: "/category/electronics" },
        { id: 2, src: fashion, alt: "Fashion", title: "Fashion" , label: "Style", path: "/category/fashion" },
        { id: 3, src: gifts, alt: "Books", title: "Books", label: "Knowledge", path: "/category/books" },
        { id: 4, src: home, alt: "Home Decor", title: "Home Decor", label: "Living", path: "/category/home-decor" },
        { id: 5, src: gifts, alt: "Gifts", title: "Gifts", label: "Celebration", path: "/category/gifts" },
    ]);

    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCategories((prev) => {
                const next = [...prev];
                const first = next.shift();
                next.push(first);
                return next;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [isPaused]);

    const getCardClass = (index) => {
        if (index === 2) return styles.big;
        if (index === 1 || index === 3) return styles.medium;
        return styles.small;
    };

    return (
        <section className={styles.heroWrapper}>
            <div className={styles.container}>
                {/* Headline Section */}
                <div className={styles.headlineSection}>
                    <motion.div
                        className={styles.avatarGroup}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className={styles.avatars}>
                            <div className={styles.avatar}>A</div>
                            <div className={styles.avatar}>B</div>
                            <div className={styles.avatar}>C</div>
                        </div>
                    </motion.div>

                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Find the perfect pick for <br />
                        <span className={styles.light}>your lifestyle</span>
                    </motion.h1>

                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Experience the modern marketplace with premium curated products and verified <br />
                        vendors delivered to your doorstep.
                    </motion.p>
                </div>

                {/* Image Grid */}
                <div
                    className={styles.grid}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <AnimatePresence mode="popLayout">
                        {categories.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{
                                    layout: { duration: 0.8, ease: "easeInOut" },
                                    duration: 0.4
                                }}
                                className={`${styles.card} ${getCardClass(index)}`}
                            >
                                <div className={styles.mainContent}>
                                    <div className={index === 2 ? styles.imageInnerMain : styles.imageInner}>
                                        <Image src={item.src} alt={item.alt} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    {index === 2 && (
                                        <motion.div
                                            className={styles.focusedContent}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <span className={styles.focusedLabel}>{item.label}</span>
                                            <Link href={item.path} className={styles.cta}>
                                                <span>Explore {item.title}</span>
                                                <div className={styles.ctaArrow}>
                                                    <ArrowRight size={18} />
                                                </div>
                                            </Link>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Footer Section */}
                <div className={styles.heroFooter}>
                    <div className={styles.testimonial}>
                        <p className={styles.quote}>"The most curated fashion house I've experienced. Every piece tells a story of elegance."</p>
                    </div>
                    <div className={styles.indicator}>
                        <span className={styles.number}>01</span>
                        <div className={styles.indicatorText}>
                            <strong>Lifestyle</strong>
                            <p>Discover the art of living.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FashionHero;
