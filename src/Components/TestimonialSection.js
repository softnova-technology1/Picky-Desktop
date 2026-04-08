"use client";

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import styles from '@/Stylesheet/TestimonialSection.module.css';

const TestimonialSection = () => {
    const testimonials = [
        { 
            name: "Amber Smith", 
            role: "Architect", 
            quote: "The selection is so curated. Every piece I've purchased feels like it was selected specifically for my home's aesthetic.",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" 
        },
        { 
            name: "Sarah Chen", 
            role: "Interior Designer", 
            quote: "Verified vendors make all the difference. I shop with confidence knowing the quality is guaranteed by Picky.",
            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150" 
        },
        { 
            name: "Marcus Thorne", 
            role: "Tech Enthusiast", 
            quote: "The app is seamless. From discovery to delivery, it's the most premium marketplace experience I've had.",
            img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" 
        },
    ];

    return (
        <section className={styles.testimonialArea}>
            <div className="container">
                <div className={styles.tHeader}>
                    <h2 className={styles.tTitle}>What Our <span className={styles.tAccent}>Community</span> Says</h2>
                </div>
                <div className={styles.tGrid}>
                    {testimonials.map((t, idx) => (
                        <div key={idx} className={styles.testiCard}>
                            <div className={styles.quoteIcon}>“</div>
                            <p className={styles.testiQuote}>{t.quote}</p>
                            <div className={styles.testiUser}>
                                <div className={styles.avatarWrapper}>
                                    <Image src={t.img} alt={t.name} width={50} height={50} className={styles.avatarImg} />
                                </div>
                                <div className={styles.testiMeta}>
                                    <span className={styles.testiName}>{t.name}</span>
                                    <span className={styles.testiRole}>{t.role}</span>
                                </div>
                            </div>
                            <div className={styles.testiStars}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} fill="var(--primary)" color="var(--primary)" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
