"use client"
import Image from "next/image";
import styles from "@/Stylesheet/Hometwo.module.css";
import { useEffect, useState } from "react";
import { 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Heart, 
  ShoppingBag, 
  Settings,
  Bell
} from "lucide-react";
import watch from "@/images/home/hero-watch.png"
import fashion from "@/images/home/fashion.png"
import lamp from "@/images/home/lamp.png"

export default function Home2() {
  const [userName, setUserName] = useState("Member");

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) setUserName(savedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    window.location.href = '/';
  };

  return (
    <main className={styles.main}>
      {/* Welcome Dashboard */}
      <section className={styles.welcomeSection}>
        <div className="container">
          <div className={styles.welcomeHeader}>
            <div className={styles.welcomeMsg}>
                <div className={styles.userBadge}>
                    <CheckCircle2 size={14} fill="var(--primary)" color="white" />
                    <span>PREMIUM MEMBER STATUS</span>
                </div>
                <h1 className={styles.title}>
                    Welcome back, <br />
                    <span className={styles.italic}>{userName}</span>
                </h1>
                <p className={styles.subtitle}>
                    It's good to see you again. We've curated a new selection of rare exclusive pieces arriving this week just for your taste.
                </p>
            </div>
            <div className={styles.statsBar}>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>12</span>
                    <span className={styles.statLabel}>Watchlist</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>04</span>
                    <span className={styles.statLabel}>In Cart</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>2.4k</span>
                    <span className={styles.statLabel}>Reward Pts</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Just for You */}
      <section className="container">
        <h2 className={styles.sectionTitle}>Curated Just for You</h2>
        <div className={styles.curatedGrid}>
            {[
                { name: "The Aurora Desk", cat: "FURNITURE", img: lamp },
                { name: "Urban Essence", cat: "FRAGRANCE", img: fashion },
                { name: "Nexus Chrono", cat: "ACCESSORIES", img: watch },
                { name: "Silken Drape", cat: "LIFESTYLE", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop" },
                { name: "Onyx Sound", cat: "AUDIO", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop" },
                { name: "Glow Sphere", cat: "LIGHTING", img: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2070&auto=format&fit=crop" },
            ].map((item, i) => (
                <div key={i} className={styles.curatedItem}>
                    <Image src={item.img} alt={item.name} fill style={{ objectFit: "cover"}} className={styles.curatedImg} />
                    <div className={styles.curatedOverlay}>
                        <span className={styles.itemCat}>{item.cat}</span>
                        <h3 className={styles.itemName}>{item.name}</h3>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Member Portal Actions */}
      <section className="container" style={{ paddingBottom: '100px' }}>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center'}}>
            <button 
                onClick={handleLogout}
                style={{
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '16px 40px',
                    borderRadius: '16px',
                    fontWeight: '800',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Secure Sign Out
            </button>
            <button 
                style={{
                    background: 'white',
                    color: 'var(--primary)',
                    padding: '16px 40px',
                    borderRadius: '16px',
                    fontWeight: '800',
                    border: '2px solid var(--primary)',
                    cursor: 'pointer'
                }}
            >
                Account Settings
            </button>
        </div>
      </section>

    </main>
  );
}
