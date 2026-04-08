"use client";

import React from 'react';
import Image from 'next/image';
import { Smartphone, Apple, Star } from 'lucide-react';
import appMockup from "@/images/home/app-mockup.png";
import styles from '@/stylesheet/AppSection.module.css';

const AppSection = () => {
    return (
        <section className="container" style={{ marginBottom: '100px' }}>
            <div className={styles.appSection}>
                <div className={styles.appContent}>
                    <div className={styles.appBadge}>
                        <Smartphone size={16} />
                        <span>EXPERIENCE THE FREEDOM</span>
                    </div>
                    <h2 className={styles.appTitle}>
                        Shop <span className={styles.whiteItalic}>anywhere</span> <br />
                        with the Picky App
                    </h2>
                    <p className={styles.appSubtitle}>
                        Take the world's most curated marketplace with you. Experience seamless browsing, instant notifications, and exclusive in-app drops.
                    </p>
                    <div className={styles.appStores}>
                        <button className={styles.appBtn}>
                            <Apple size={20} fill="currentColor" />
                            <div className={styles.btnText}>
                                <span className={styles.btnSm}>Download on</span>
                                <span className={styles.btnLg}>App Store</span>
                            </div>
                        </button>
                        <button className={styles.appBtn}>
                            <Star size={20} fill="currentColor" />
                            <div className={styles.btnText}>
                                <span className={styles.btnSm}>Get it on</span>
                                <span className={styles.btnLg}>Play Store</span>
                            </div>
                        </button>
                    </div>
                </div>
                <div className={styles.appMockup}>
                    <div className={styles.mockupContainer}>
                        <Image src={appMockup} alt="Picky App" fill style={{ objectFit: "cover" }} />
                    </div>
                    <div className={styles.mockupBgGlow}></div>
                </div>
            </div>
        </section>
    );
};

export default AppSection;
