"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  ChevronDown, 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Settings 
} from "lucide-react";
import styles from "./HomeTwoNavbar.module.css";
import { useAuth } from "@/context/AuthContext";
import AuthPopup from "@/Components/AuthPopup";

export default function HomeTwoNavbar() {
  const { user, logout } = useAuth();
  const [userName, setUserName] = useState("Member");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [authTab, setAuthTab] = useState('login');

  useEffect(() => {
    if (user) {
      setUserName(user.name || user.email || "Member");
    }
    
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest(`.${styles.userDropdownContainer}`)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserDropdown, user]);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const openAuth = (tab) => {
    setAuthTab(tab);
    setShowAuthPopup(true);
    setShowUserDropdown(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>Picky</Link>

        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>HOME</Link>
          <Link href="/products" className={styles.navLink}>SHOP</Link>
          <div className={styles.hasMegaMenu}>
            <Link href="/categories" className={styles.navLink}>
              CATEGORIES <ChevronDown size={14} />
            </Link>
            {/* Mega Menu Dropdown */}
            <div className={styles.megaMenu}>
              <div className={styles.megaColumn}>
                <h4 className={styles.megaTitle}>INNER PAGES</h4>
                <div className={styles.megaLinks}>
                  {["ABOUT", "BLOGS", "BLOGS LAYOUT 2", "BLOG DETAILS", "CONTACT", "FAQ", "OUR STORE", "REVIEWS", "LOG IN", "SIGN UP"].map(link => {
                    if (link === "LOG IN") {
                      return (
                        <button key={link} onClick={() => openAuth('login')} className={styles.megaLink} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                          {link}
                        </button>
                      );
                    }
                    if (link === "SIGN UP") {
                      return (
                        <button key={link} onClick={() => openAuth('signup')} className={styles.megaLink} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                          {link}
                        </button>
                      );
                    }

                    let href = "#";
                    if (link === "BLOGS") href = "/Blog";
                    else if (link === "ABOUT") href = "/about";
                    else if (link === "OUR STORE") href = "/products";
                    else if (link.includes("BLOG")) href = "/Blog/1";
                    
                    return (
                      <Link
                        key={link}
                        href={href}
                        className={styles.megaLink}
                      >
                        {link}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className={styles.megaColumn}>
                <h4 className={styles.megaTitle}>SHOP PAGES</h4>
                <div className={styles.megaLinks}>
                  {["SHOP LEFT SIDEBAR", "SHOP RIGHT SIDEBAR", "SHOP FULL WIDTH", "SHOP DETAILS", "WISHLIST", "CART", "CHECKOUT"].map(link => {
                    let href = "/products";
                    if (link === "CART") href = "/cart";
                    else if (link === "CHECKOUT") href = "/checkout";
                    else if (link === "WISHLIST") href = "/wishlist";
                    return <Link key={link} href={href} className={styles.megaLink}>{link}</Link>;
                  })}
                </div>
              </div>
              <div className={styles.megaColumn}>
                <h4 className={styles.megaTitle}>FASHION</h4>
                <div className={styles.megaLinks}>
                  {["CLOTHING", "FOOTWEAR", "ACCESSORIES", "ACTIVEWEAR", "GROOMING", "BEAUTY", "ETHNIC WEAR"].map(link => (
                    <Link key={link} href="/categories" className={styles.megaLink}>{link}</Link>
                  ))}
                </div>
              </div>
              <div className={styles.megaColumn}>
                <h4 className={styles.megaTitle}>CHILDREN'S</h4>
                <div className={styles.megaLinks}>
                  {["CLOTHING", "FOOTWEAR", "ACCESSORIES", "TOYS & GAMES", "BABY ESSENTIALS"].map(link => (
                    <Link key={link} href="/categories" className={styles.megaLink}>{link}</Link>
                  ))}
                </div>
              </div>
              <div className={styles.megaColumn}>
                <h4 className={styles.megaTitle}>JEWELLERY</h4>
                <div className={styles.megaLinks}>
                  {["ETHNIC", "BRIDAL", "BRACELETS", "RINGS", "EARRINGS", "CHAINS"].map(link => (
                    <Link key={link} href="/categories" className={styles.megaLink}>{link}</Link>
                  ))}
                </div>
              </div>
              <div className={styles.featuredColumn}>
                <div className={styles.featuredCard}>
                  <span className={styles.featuredTag}>NEW ARRIVAL</span>
                  <h5 className={styles.featuredTitle}>The Heritage Collection</h5>
                  <p className={styles.featuredText}>Explore our most anticipated luxury release of the season.</p>
                  <button className={styles.primaryBtn} style={{ padding: '10px 24px', fontSize: '11px' }}>DISCOVER NOW</button>
                </div>
              </div>
            </div>
          </div>
          <Link href="/new-arrivals" className={styles.navLink}>NEW ARRIVALS</Link>
          <Link href="/offers" className={styles.navLink}>OFFERS</Link>
          <Link href="/Blog" className={styles.navLink}>BLOG</Link>
          <Link href="/about" className={styles.navLink}>ABOUT US</Link>
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} size={18} />
            <input type="text" placeholder="Search Picky..." className={styles.searchInput} />
          </div>
        </div>

        <div className={styles.navIcons}>
          <button className={styles.iconBtn}><Heart size={22} /></button>
          <button className={styles.iconBtn}><ShoppingBag size={22} /></button>

          <div className={styles.userDropdownContainer}>
            <button
              className={styles.iconBtn}
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              <User size={22} />
            </button>

            {showUserDropdown && (
              <div className={styles.userDropdown}>
                <div className={styles.dropdownHeader}>
                  <span className={styles.dropdownWelcome}>Welcome, {userName}</span>
                </div>
                <div className={styles.dropdownLinks}>
                  {!user ? (
                    <>
                      <button onClick={() => openAuth('login')} className={styles.dropdownLink}>
                        <User size={16} /> LOGIN
                      </button>
                      <button onClick={() => openAuth('signup')} className={styles.dropdownLink}>
                        <Settings size={16} /> SIGN UP
                      </button>
                    </>
                  ) : (
                    <>
                      <button className={styles.dropdownLink}>
                        <User size={16} /> PROFILE
                      </button>
                      <button className={styles.dropdownLink}>
                        <Settings size={16} /> SETTINGS
                      </button>
                    </>
                  )}
                  <div className={styles.dropdownDivider}></div>
                  <button className={styles.dropdownLink}>
                    <ShoppingBag size={16} /> MY ORDERS
                  </button>
                  {user && (
                    <button
                      className={`${styles.dropdownLink} ${styles.logoutText}`}
                      onClick={() => {
                        handleLogout();
                        setShowUserDropdown(false);
                      }}
                    >
                      LOGOUT
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className={styles.navSpacer}></div>
      <AuthPopup 
        isOpen={showAuthPopup} 
        onClose={() => setShowAuthPopup(false)} 
        initialTab={authTab} 
      />
    </>
  );
}
