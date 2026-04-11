"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Palette, 
  DollarSign, 
  Maximize2, 
  Zap, 
  Diamond, 
  X, 
  Check, 
  Cpu, 
  User,
  Flame,
  Star,
  Clock,
  LayoutGrid
} from "lucide-react";
import styles from "./SmartStyleAssistant.module.css";

const SmartStyleAssistant = ({ onFilterChange, isMobileOpen, onClose, category }) => {
  const [activeStyle, setActiveStyle] = useState(null);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [price, setPrice] = useState(500);
  const [activeSize, setActiveSize] = useState("M");
  const [activeFit, setActiveFit] = useState("Regular");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [toggles, setToggles] = useState({
    trending: true,
    new: false,
    premium: false
  });

  const isFashion = category?.toLowerCase().includes("fashion") || 
                    category?.toLowerCase().includes("wear") || 
                    category?.toLowerCase().includes("clothing") ||
                    category?.toLowerCase() === "popular";

  const isElectronics = category?.toLowerCase().includes("electronics") || 
                        category?.toLowerCase().includes("mobile") ||
                        category?.toLowerCase().includes("smart");

  const styles_data = [
    { id: 'min', name: 'Minimal', desc: 'Clean, neutral, timeless', img: '/images/styles/minimalist.png' },
    { id: 'street', name: 'Streetwear', desc: 'Urban, edgy, vibrant', img: '/images/styles/streetwear.png' },
    { id: 'luxury', name: 'Luxury', desc: 'Elegant evening wear', img: '/images/styles/luxury.png' },
    { id: 'casual', name: 'Casual', desc: 'Soft knitwear & denim', img: '/images/styles/casual.png' }
  ];

  const brands = isElectronics ? 
    ["Picky Pro", "Aura Tech", "Nova", "Elite", "Horizon"] :
    ["Picky Premium", "Aura Designs", "Elite Collections", "Urban Wear"];

  const colors = [
    { name: 'Midnight', hex: '#0f172a' },
    { name: 'Rose', hex: '#fb7185' },
    { name: 'Sky', hex: '#38bdf8' },
    { name: 'Mint', hex: '#34d399' },
    { name: 'Lavender', hex: '#a78bfa' },
    { name: 'Sand', hex: '#fde68a' },
    { name: 'Slate', hex: '#64748b' },
    { name: 'Emerald', hex: '#10b981' }
  ];

  const occasions = ["Office", "Party", "Wedding", "Daily", "Vacation"];

  const toggleOccasion = (occ) => {
    setSelectedOccasions(prev => 
      prev.includes(occ) ? prev.filter(o => o !== occ) : [...prev, occ]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleColor = (hex) => {
    setSelectedColors(prev => 
      prev.includes(hex) ? prev.filter(c => c !== hex) : [...prev, hex]
    );
  };

  const activeFilters = [
    ...(activeStyle ? [styles_data.find(s => s.id === activeStyle).name] : []),
    ...(isFashion ? selectedOccasions : []),
    ...selectedBrands,
    ...selectedColors.map(c => colors.find(col => col.hex === c)?.name).filter(Boolean),
    `Under $${price}`,
    ...(isFashion ? [activeSize, activeFit] : [])
  ];

  const clearAll = () => {
    setActiveStyle(null);
    setSelectedOccasions([]);
    setSelectedColors([]);
    setSelectedBrands([]);
    setPrice(500);
    setActiveSize("M");
    setActiveFit("Regular");
    setToggles({ trending: false, new: false, premium: false });
  };

  // Sync with parent
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        style: activeStyle,
        occasions: selectedOccasions,
        colors: selectedColors,
        brands: selectedBrands,
        price,
        size: activeSize,
        fit: activeFit,
        toggles,
        isFashion,
        isElectronics
      });
    }
  }, [activeStyle, selectedOccasions, selectedColors, selectedBrands, price, activeSize, activeFit, toggles]);

  return (
    <aside className={`${styles.sidebar} ${isMobileOpen ? styles.sidebarActive : ""}`}>
      {/* Mobile Header */}


      {/* 1. AI STYLE SELECTOR (Fashion Only) */}
      {isFashion && (
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
                onClick={() => setActiveStyle(s.id === activeStyle ? null : s.id)}
                whileHover={{ scale: 1.02 }}
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
                      style={{ position: 'absolute', top: 10, right: 10, background: '#7024eb', borderRadius: '50%', padding: 4, boxShadow: '0 0 10px rgba(112,36,235,0.5)' }}
                    >
                      <Check size={12} color="white" strokeWidth={3} />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 1.5 BRAND SELECTOR (General/Tech) */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <LayoutGrid size={14} /> {isElectronics ? "MANUFACTURER" : "BRAND"}
        </div>
        <div className={styles.chipGrid}>
          {brands.map(brand => (
            <motion.button 
              key={brand}
              className={`${styles.chip} ${selectedBrands.includes(brand) ? styles.chipActive : ""}`}
              onClick={() => toggleBrand(brand)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {brand}
            </motion.button>
          ))}
        </div>
      </section>

      {/* 2. OCCASION SELECTOR (Fashion Only) */}
      {isFashion && (
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <Sparkles size={14} /> OCCASION
          </div>
          <div className={styles.chipGrid}>
            {occasions.map(occ => (
              <motion.button 
                key={occ}
                className={`${styles.chip} ${selectedOccasions.includes(occ) ? styles.chipActive : ""}`}
                onClick={() => toggleOccasion(occ)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {occ}
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {/* 3. COLOR PICKER */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <Palette size={14} /> {isElectronics ? "CHASSIS FINISH" : "COLOR PALETTE"}
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
                transition={{ type: "spring", stiffness: 300 }}
              />
              <AnimatePresence>
                {selectedColors.includes(c.hex) && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
                  >
                     <div style={{ background: 'white', borderRadius: '50%', padding: 1 }}>
                       <Check size={12} color={c.hex} strokeWidth={4} />
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRICE INTERACTION */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <DollarSign size={14} /> {isElectronics ? "PRICE RANGE" : "INVESTMENT RANGE"}
        </div>
        <div className={styles.priceSliderContainer}>
          <div className={styles.customSlider}>
            <div 
              className={styles.sliderTrack} 
              style={{ width: `${(price / 1000) * 100}%` }} 
            />
            <motion.div 
              className={styles.sliderThumb}
              style={{ left: `${(price / 1000) * 100}%` }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0}
            >
              <div className={styles.tooltip}>${price}</div>
            </motion.div>
            <input 
              type="range" 
              min="0" 
              max="1000" 
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
                zIndex: 3
              }}
            />
          </div>
          <div className={styles.priceValues}>
            <span>$0</span>
            <span>$1,000+</span>
          </div>
        </div>
      </section>

      {/* 5. SIZE + FIT (Fashion Only) */}
      {isFashion && (
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <Maximize2 size={14} /> SIZE & FIT
          </div>
          <div className={styles.sizeGrid}>
            {["XS", "S", "M", "L", "XL"].map(s => (
              <motion.button 
                key={s} 
                className={`${styles.sizeBtn} ${activeSize === s ? styles.sizeBtnActive : ""}`}
                onClick={() => setActiveSize(s)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {s}
              </motion.button>
            ))}
          </div>
          <div className={styles.fitOptions}>
            {["Slim", "Regular", "Oversized"].map(f => (
              <button 
                key={f} 
                className={`${styles.fitBtn} ${activeFit === f ? styles.fitBtnActive : ""}`}
                onClick={() => setActiveFit(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 5.5 TECH SPECS (Electronics Only) */}
      {isElectronics && (
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <Cpu size={14} /> SPECIFICATIONS
          </div>
          <div className={styles.chipGrid}>
            {["5G Ready", "8GB+ RAM", "256GB+ SSD", "OLED Display"].map(spec => (
              <motion.button 
                key={spec}
                className={styles.chip}
                whileHover={{ scale: 1.05 }}
              >
                {spec}
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {/* 6. TREND SWITCHES */}
      <section className={styles.section}>
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <Flame size={18} color="#ef4444" />
            <span className={styles.toggleLabel}>Trending Now</span>
          </div>
          <div 
            className={`${styles.switch} ${toggles.trending ? styles.switchActive : ""}`}
            onClick={() => setToggles({...toggles, trending: !toggles.trending})}
          >
            <motion.div 
              className={styles.switchThumb}
              animate={{ x: toggles.trending ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </div>
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <Clock size={18} color="#3b82f6" />
            <span className={styles.toggleLabel}>New Arrivals</span>
          </div>
          <div 
            className={`${styles.switch} ${toggles.new ? styles.switchActive : ""}`}
            onClick={() => setToggles({...toggles, new: !toggles.new})}
          >
            <motion.div 
              className={styles.switchThumb}
              animate={{ x: toggles.new ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </div>
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <Diamond size={18} color="#7024eb" />
            <span className={styles.toggleLabel}>Premium</span>
          </div>
          <div 
            className={`${styles.switch} ${toggles.premium ? styles.switchActive : ""}`}
            onClick={() => setToggles({...toggles, premium: !toggles.premium})}
          >
            <motion.div 
              className={styles.switchThumb}
              animate={{ x: toggles.premium ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </div>
      </section>

      {/* 7. EXCLUSIVE BLOCK */}
      <motion.div 
        className={styles.exclusiveCard}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className={styles.exclusiveTitle}>
          <Star size={18} fill="#fcd34d" color="#fcd34d" /> DESIGNER PICKS
        </div>
        <p className={styles.exclusiveDesc}>Handpicked high-fashion pieces from our top stylists.</p>
      </motion.div>

      {/* 9. RECOMMENDATION BLOCK */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <User size={14} /> RECOMMENDED FOR YOU
        </div>
        <div className={styles.recList}>
          <motion.div className={styles.recItem} whileHover={{ x: 5 }}>
            <img src="/images/styles/minimalist.png" alt="Rec 1" className={styles.recImage} />
            <div className={styles.recInfo}>
              <span className={styles.recName}>Silk Satin Gown</span>
              <span className={styles.recPrice}>$890</span>
            </div>
          </motion.div>
          <motion.div className={styles.recItem} whileHover={{ x: 5 }}>
            <img src="/images/styles/luxury.png" alt="Rec 2" className={styles.recImage} />
            <div className={styles.recInfo}>
              <span className={styles.recName}>Pearl Blazer Set</span>
              <span className={styles.recPrice}>$1,200</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div style={{ height: 120 }}></div>

      {/* 8. SUMMARY PANEL */}
      <AnimatePresence>
        {activeFilters.length > 0 && (
          <motion.div 
            className={styles.summaryPanel}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            <div className={styles.activeTags}>
              {activeFilters.slice(0, 3).map(f => (
                <div key={f} className={styles.tag}>
                  {f} <X size={12} />
                </div>
              ))}
              {activeFilters.length > 3 && (
                <div className={styles.tag}>+{activeFilters.length - 3} more</div>
              )}
            </div>
            <button 
              className={styles.clearAllBtn}
              onClick={clearAll}
            >
              CLEAR ALL FILTERS
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default SmartStyleAssistant;
