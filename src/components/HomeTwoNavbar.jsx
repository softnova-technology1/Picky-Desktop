"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {

  ChevronDown,
  Search,
  Heart,
  ShoppingBag,
  User,
  Settings,
  ArrowRight,
  MapPin,
  Menu,
  X
} from "lucide-react";
import { usePathname } from "next/navigation";
import styles from "./HomeTwoNavbar.module.css";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import AuthPopup from "@/components/AuthPopup";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeTwoNavbar() {
  const { user, logout } = useAuth();
  const { wishlistItems } = useWishlist();
  const { totalItems, cartItems, subtotal, removeFromCart, prepareCheckout, clearCart, isCartOpen, setIsCartOpen, openCart, closeCart, toggleCart } = useCart();
  const pathname = usePathname();
  const [userName, setUserName] = useState("Member");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [closeRotation, setCloseRotation] = useState(0);

  const spinCloseBtn = () => setCloseRotation(prev => prev + 360);
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);


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

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      <div className={styles.announcementBar}>
        <div className={styles.tickerTrack}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className={styles.tickerItem}>
              🔥 NEW ARRIVAL: LUXURY COLLECTION JUST DROPPED
              <div className={styles.tickerDot}></div>
              ✨ LIMITED TIME OFFER: 50% OFF TODAY ONLY
              <div className={styles.tickerDot}></div>
            </div>
          ))}
        </div>
        <div className={styles.topLocation}>
          <MapPin size={12} strokeWidth={3} />
          <span className={styles.topLocationText}>Peravurani - Thanjavur, India</span>
          <div className={styles.indiaFlag}>
            <svg viewBox="0 0 640 480" width="16" height="12">
              <path fill="#ff9933" d="M0 0h640v160H0z" />
              <path fill="#ffffff" d="M0 160h640v160H0z" />
              <path fill="#128807" d="M0 320h640v160H0z" />
              <g transform="translate(320 240)">
                <circle r="40" fill="#000080" />
                <circle r="35" fill="#ffffff" />
                <circle r="5" fill="#000080" />
                {[...Array(24)].map((_, j) => (
                  <path
                    key={j}
                    fill="#000080"
                    d="M0-35L1.5 0 0 35-1.5 0z"
                    transform={`rotate(${j * 15})`}
                  />
                ))}
              </g>
            </svg>
          </div>
        </div>
      </div>
      <nav className={styles.navbar}>
        <div className={styles.leftSection}>
          <Link href="/" className={styles.logo}>
            <Image src="/logos.png" alt="Picky Logo" width={120} height={36} priority className={styles.logoImg} />
          </Link>
          <div className={styles.navLinks}>
            <Link href="/" className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}>HOME</Link>
            <Link href="/shop" className={`${styles.navLink} ${isActive('/shop') ? styles.active : ''}`}>SHOP</Link>
            <div className={styles.hasMegaMenu}>
              <Link href="/category" className={`${styles.navLink} ${isActive('/category') ? styles.active : ''}`}>
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
                      else if (link === "OUR STORE") href = "/shop";
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
                      let href = "/shop";
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
                      <Link key={link} href="/category" className={styles.megaLink}>{link}</Link>
                    ))}
                  </div>
                </div>
                <div className={styles.megaColumn}>
                  <h4 className={styles.megaTitle}>CHILDREN'S</h4>
                  <div className={styles.megaLinks}>
                    {["CLOTHING", "FOOTWEAR", "ACCESSORIES", "TOYS & GAMES", "BABY ESSENTIALS"].map(link => (
                      <Link key={link} href="/category" className={styles.megaLink}>{link}</Link>
                    ))}
                  </div>
                </div>
                <div className={styles.megaColumn}>
                  <h4 className={styles.megaTitle}>JEWELLERY</h4>
                  <div className={styles.megaLinks}>
                    {["ETHNIC", "BRIDAL", "BRACELETS", "RINGS", "EARRINGS", "CHAINS"].map(link => (
                      <Link key={link} href="/category" className={styles.megaLink}>{link}</Link>
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
            <Link href="/new-arrivals" className={`${styles.navLink} ${isActive('/new-arrivals') ? styles.active : ''}`}>NEW ARRIVALS</Link>
            <Link href="/offers" className={`${styles.navLink} ${isActive('/offers') ? styles.active : ''}`}>OFFERS</Link>
            <Link href="/Blog" className={`${styles.navLink} ${isActive('/Blog') ? styles.active : ''}`}>BLOG</Link>
            <Link href="/about" className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}>ABOUT US</Link>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <Search className={styles.searchIcon} size={20} />
              <input type="text" placeholder="Search Picky..." className={styles.searchInput} />
            </div>
          </div>

          <div className={styles.navIcons}>
            <Link href="/wishlist" className={styles.iconBtn}>
              <div className={styles.iconWrapper}>
                <Heart size={22} fill={wishlistItems.length > 0 ? "currentColor" : "none"} />
                {wishlistItems.length > 0 && <span className={`${styles.badge} ${styles.wishlistBadge}`}>{wishlistItems.length}</span>}
              </div>
            </Link>
            <div 
              className={styles.cartDrawerContainer}
            >
              <button 
                className={styles.iconBtn}
                onClick={toggleCart}
              >
                <div className={styles.iconWrapper}>
                  <ShoppingBag size={22} />
                  {totalItems > 0 && <span className={`${styles.badge} ${styles.cartBadge}`}>{totalItems}</span>}
                </div>
              </button>
            </div>

            <div className={styles.userDropdownContainer}>
              <button
                className={styles.iconBtn}
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <User size={22} />
              </button>

              <AnimatePresence>
                {showUserDropdown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.userDropdown}
                  >
                    <div className={styles.dropdownHeader}>
                      <div className={styles.headerTop}>
                        <div className={styles.miniAvatar}>
                          <Image src="/images/amber.png" alt="User" width={50} height={50} />
                        </div>
                        <div className={styles.headerInfo}>
                          <span className={styles.dropdownWelcome}>{userName}</span>
                          <span className={styles.memberStatus}>PREMIUM MEMBER</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.dropdownLinks}>
                      {!user ? (
                        <>
                          <button onClick={() => openAuth('login')} className={styles.dropdownLink}>
                            <div className={styles.linkIcon}><User size={14} /></div>
                            <span>LOGIN</span>
                          </button>
                          <button onClick={() => openAuth('signup')} className={styles.dropdownLink}>
                            <div className={styles.linkIcon}><Settings size={14} /></div>
                            <span>SIGN UP</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <Link href="/profile" className={styles.dropdownLink} onClick={() => setShowUserDropdown(false)}>
                            <div className={styles.linkIcon}><User size={14} /></div>
                            <span>PROFILE</span>
                          </Link>
                          <div className={styles.dropdownDivider}></div>
                          <Link href="/my-orders" className={styles.dropdownLink} onClick={() => setShowUserDropdown(false)}>
                            <div className={styles.linkIcon}><ShoppingBag size={14} /></div>
                            <span>MY ORDERS</span>
                          </Link>
                          <button
                            className={`${styles.dropdownLink} ${styles.logoutText}`}
                            onClick={() => {
                              handleLogout();
                              setShowUserDropdown(false);
                            }}
                          >
                            <div className={styles.linkIcon} style={{ background: 'rgba(255, 77, 77, 0.1)', color: '#ff4d4d' }}>
                              <ArrowRight size={14} />
                            </div>
                            <span>LOGOUT</span>
                          </button>
                        </>
                      )}
                    </div>

                    <div className={styles.dropdownFooter}>
                      <button className={styles.supportButton}>NEED HELP?</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggler */}
            <button
              className={styles.menuToggle}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer (Slides in from the right) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="hometwo-backdrop"
            className={styles.mobileMenuBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        {mobileMenuOpen && (
          <motion.div
            key="hometwo-drawer"
            className={styles.mobileMenu}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className={styles.mobileMenuHeader}>
              <span className={styles.mobileMenuLogo}>Picky Menu</span>
              <motion.button 
                className={styles.mobileMenuCloseBtn} 
                onClick={() => setMobileMenuOpen(false)}
                title="Close Menu"
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                exit={{ rotate: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <X size={24} />
              </motion.button>
            </div>
            <div className={styles.mobileLinksList}>
              <Link href="/" className={`${styles.mobileLink} ${isActive('/') ? styles.active : ''}`}>HOME</Link>
              <Link href="/shop" className={`${styles.mobileLink} ${isActive('/shop') ? styles.active : ''}`}>SHOP</Link>
              <Link href="/category" className={`${styles.mobileLink} ${isActive('/category') ? styles.active : ''}`}>CATEGORIES</Link>
              <Link href="/new-arrivals" className={`${styles.mobileLink} ${isActive('/new-arrivals') ? styles.active : ''}`}>NEW ARRIVALS</Link>
              <Link href="/offers" className={`${styles.mobileLink} ${isActive('/offers') ? styles.active : ''}`}>OFFERS</Link>
              <Link href="/Blog" className={`${styles.mobileLink} ${isActive('/Blog') ? styles.active : ''}`}>BLOG</Link>
              <Link href="/about" className={`${styles.mobileLink} ${isActive('/about') ? styles.active : ''}`}>ABOUT US</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.navSpacer}></div>
      <AuthPopup
        isOpen={showAuthPopup}
        onClose={() => setShowAuthPopup(false)}
        initialTab={authTab}
      />
    </>
  );
}
