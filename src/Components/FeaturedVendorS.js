"use client";

import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import styles from '@/Stylesheet/FeaturedVendorS.module.css';

const FeaturedVendorS = () => {
    const vendors = [
        { 
            name: "Lumiera Home", 
            items: "840+ items", 
            logo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=100&auto=format&fit=crop" 
        },
        { 
            name: "Urban Tech", 
            items: "1.2k items", 
            logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=100&auto=format&fit=crop" 
        },
        { 
            name: "Eco Bloom", 
            items: "650+ items", 
            logo: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=100&auto=format&fit=crop" 
        },
    ];

    return (
        <section className={styles.vendorsArea}>
            <div className="container">
                <div className={styles.vendorHeader}>
                    <span className={styles.topLabel}>TRUSTED PARTNERS</span>
                    <h2 className={styles.sectionTitle}>Featured Vendors</h2>
                </div>
                <div className={styles.vendorFlex}>
                    {vendors.map((v, i) => (
                        <div key={i} className={styles.newVendorCard}>
                            <div className={styles.logoWrapper}>
                                <Image src={v.logo} alt={v.name} width={60} height={60} className={styles.vLogo} />
                            </div>
                            <div className={styles.vInfo}>
                                <div className={styles.vNameContainer}>
                                    <span className={styles.vName}>{v.name}</span>
                                    <CheckCircle2 size={16} className={styles.vBadge} />
                                </div>
                                <span className={styles.vItems}>{v.items}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedVendorS;
