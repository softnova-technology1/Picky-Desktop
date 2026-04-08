"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from '@/stylesheet/Seasonal.module.css';

const Seasonal = () => {
    return (    
        <section className={styles.editorialPromos}>
            <div className="container">
                <div className={styles.editorialGrid}>
                    {/* Promo 1: The Modernist */}
                    <div className={styles.eCardMain}>
                        <div className={styles.eContent}>
                            <div className={styles.eVerticalText}>SEASON 2024</div>
                            <div className={styles.eMainText}>
                                <span className={styles.eLabel}>CURATED</span>
                                <h2 className={styles.eTitle}>Modernist <br/> <span className={styles.eSerif}>Spring</span></h2>
                                <p className={styles.eDesc}>Discover the intersection of minimalism and organic textures.</p>
                                <button className={styles.eBtn}>VIEW LOOKBOOK</button>
                            </div>
                        </div>
                        <div className={styles.eImageFrame}>
                            <Image 
                                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000" 
                                alt="Modernist" 
                                fill 
                                className={styles.eImg}
                            />
                        </div>
                    </div>

                    {/* Promo 2: The Future Tech */}
                    <div className={styles.eCardSide}>
                        <div className={styles.eSideImage}>
                            <Image 
                                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800" 
                                alt="Future" 
                                fill 
                                className={styles.eImg}
                            />
                        </div>
                        <div className={styles.eSideOverlay}>
                            <div className={styles.eGlassBox}>
                                <span className={styles.eSmallLabel}>FUTURE TECH</span>
                                <h3 className={styles.eSideTitle}>Neural <br/> Vision</h3>
                                <div className={styles.eArrowLink}>
                                    <span>PRE-ORDER</span>
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Seasonal;
