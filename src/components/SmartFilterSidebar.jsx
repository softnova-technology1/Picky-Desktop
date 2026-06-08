"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Layers, 
  Palette, 
  DollarSign, 
  Maximize2, 
  Zap, 
  Diamond, 
  X, 
  Check, 
  Cpu, 
  User 
} from "lucide-react";
import styles from "./SmartFilterSidebar.module.css";

const SmartFilterSidebar = () => {
  const [activeStyle, setActiveStyle] = useState(null);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [price, setPrice] = useState(500);
  const [activeSize, setActiveSize] = useState("M");
  const [toggles, setToggles] = useState({
    trending: true,
    new: false,
    premium: false
  });

  const styles_data = [
    { id: 'min', name: 'Minimal', desc: 'Clean, neutral, timeless', img: '/images/styles/minimalist.png' },
    { id: 'street', name: 'Streetwear', desc: 'Urban, edgy, vibrant', img: '/images/styles/streetwear.png' },
    { id: 'luxury', name: 'Luxury', desc: 'Elegant evening wear', img: '/images/styles/luxury.png' },
    { id: 'casual', name: 'Casual', desc: 'Soft knitwear & denim', img: '/images/styles/casual.png' }
  ];

  const colors = [
    { name: 'Midnight', hex: '#0f172a' },
    { name: 'Rose', hex: '#fb7185' },
    { name: 'Sky', hex: '#38bdf8' },
    { name: 'Mint', hex: '#34d399' },
    { name: 'Lavender', hex: '#a78bfa' },
    { name: 'Sand', hex: '#fde68a' }
  ];

  const occasions = ["Office", "Party", "Wedding", "Daily", "Vacation"];

  const toggleOccasion = (occ) => {
    setSelectedOccasions(prev => 
      prev.includes(occ) ? prev.filter(o => o !== occ) : [...prev, occ]
    );
  };

  const toggleColor = (hex) => {
    setSelectedColors(prev => 
      prev.includes(hex) ? prev.filter(c => c !== hex) : [...prev, hex]
    );
  };

  const activeFilters = [
    ...(activeStyle ? [styles_data.find(s => s.id === activeStyle).name] : []),
    ...selectedOccasions,
    ...selectedColors.map(c => colors.find(col => col.hex === c).name),
    `Under $${price}`
  ];

  return (
    <aside className={styles.sidebar}>
      {/* 1. AI STYLE SELECTOR */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.aiHeader}>
            <Cpu size={14} /> AI STYLE ASSISTANT
          </span>
        </div>
        <div className={styles.styleGrid}>
          {styles_data.map((s) => (
            <motion.div 
              key={s.id}
              className={`${styles.styleCard} ${activeStyle === s.id ? styles.styleCardActive : ""}`}
              onClick={() => setActiveStyle(s.id)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image src={s.img} alt={s.name} fill className={styles.styleImage} />
              <div className={styles.styleOverlay}>
                <h4 className={styles.styleName}>{s.name}</h4>
                <p className={styles.styleDesc}>{s.desc}</p>
                {activeStyle === s.id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ position: 'absolute', top: 10, right: 10, background: '#7024eb', borderRadius: '50%', padding: 4 }}
                  >
                    <Check size={12} color="white" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. OCCASION SELECTOR */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <Sparkles size={14} /> BEST FOR
        </div>
        <div className={styles.chipGrid}>
          {occasions.map(occ => (
            <motion.button 
              key={occ}
              className={`${styles.chip} ${selectedOccasions.includes(occ) ? styles.chipActive : ""}`}
              onClick={() => toggleOccasion(occ)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {occ}
            </motion.button>
          ))}
        </div>
      </section>

      {/* 3. COLOR PICKER */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <Palette size={14} /> COLOR PALETTE
        </div>
        <div className={styles.colorGrid}>
          {colors.map(c => (
            <div 
              key={c.hex} 
              className={styles.colorSwatchWrapper}
              onClick={() => toggleColor(c.hex)}
            >
              <motion.div 
                className={`${styles.colorSwatch} ${selectedColors.includes(c.hex) ? styles.colorSwatchActive : ""}`}
                style={{ backgroundColor: c.hex }}
                whileHover={{ scale: 1.2 }}
              />
              {selectedColors.includes(c.hex) && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
                >
                   <Check size={14} color="white" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRICE RANGE */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <DollarSign size={14} /> INVESTMENT RANGE
        </div>
        <div className={styles.priceSlider}>
          <div className={styles.track}>
            <div className={styles.trackActive} style={{ width: `${(price/1000) * 100}%` }} />
          </div>
          <input 
            type="range" 
            min="0" 
            max="1000" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.sliderInput}
          />
          <div className={styles.priceDisplay}>
             <span>$0</span>
             <span style={{ color: '#7024eb' }}>Up to ${price}</span>
          </div>
        </div>
      </section>

      {/* 5. SIZE + FIT */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <Maximize2 size={14} /> TAILORING & FIT
        </div>
        <div className={styles.sizeGrid}>
          {["XS", "S", "M", "L", "XL"].map(s => (
            <button 
              key={s} 
              className={`${styles.sizeBtn} ${activeSize === s ? styles.sizeBtnActive : ""}`}
              onClick={() => setActiveSize(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* 6. TREND SWITCHES */}
      <section className={styles.section}>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <Zap size={16} color="#f59e0b" /> <span style={{fontSize: '0.8rem'}}>TRENDING NOW</span>
          </div>
          <div 
            className={`${styles.toggleSwitch} ${toggles.trending ? styles.toggleSwitchActive : ""}`}
            onClick={() => setToggles({...toggles, trending: !toggles.trending})}
          >
            <div className={styles.toggleThumb} />
          </div>
        </div>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <Diamond size={16} color="#7024eb" /> <span style={{fontSize: '0.8rem'}}>PREMIUM HANDPICKED</span>
          </div>
          <div 
            className={`${styles.toggleSwitch} ${toggles.premium ? styles.toggleSwitchActive : ""}`}
            onClick={() => setToggles({...toggles, premium: !toggles.premium})}
          >
            <div className={styles.toggleThumb} />
          </div>
        </div>
      </section>

      {/* 7. EXCLUSIVE BLOCK */}
      <motion.div 
        className={styles.exclusiveCard}
        whileHover={{ scale: 1.02 }}
      >
        <div className={styles.exclusiveTitle}>
          <Diamond size={20} color="#fbbf24" /> DESIGNER PICKS
        </div>
        <p className={styles.exclusiveDesc}>Exclusive collections curated by global fashionistas.</p>
      </motion.div>

      {/* 9. RECOMMENDATION BLOCK */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <User size={14} /> FOR YOU
        </div>
        <div className={styles.recItem}>
           <div className={styles.recImg}>
             <Image src="/images/styles/minimalist.png" alt="Rec" width={60} height={60} style={{borderRadius: 12, objectFit: 'cover'}} />
           </div>
           <div className={styles.recDetails}>
             <span className={styles.recName}>Silk Satin Slip Dress</span>
             <span className={styles.recPrice}>$249.00</span>
           </div>
        </div>
      </section>

      <div style={{ height: 100 }}></div>

      {/* 8. SUMMARY PANEL */}
      <AnimatePresence>
        {activeFilters.length > 0 && (
          <motion.div 
            className={styles.summaryPanel}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
          >
            <div className={styles.activeTags}>
              {activeFilters.map(f => (
                <div key={f} className={styles.tag}>
                  {f} <X size={12} className={styles.tagClose} />
                </div>
              ))}
            </div>
            <button 
              className={styles.clearAllBtn}
              onClick={() => {
                setActiveStyle(null);
                setSelectedOccasions([]);
                setSelectedColors([]);
                setPrice(500);
              }}
            >
              RESET ASSISTANT
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default SmartFilterSidebar;
