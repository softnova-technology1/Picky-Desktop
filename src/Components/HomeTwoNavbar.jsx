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
  ArrowRight
} from "lucide-react";
import styles from "./HomeTwoNavbar.module.css";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import AuthPopup from "@/Components/AuthPopup";

export default function HomeTwoNavbar() {
  const { user, logout } = useAuth();
  const { wishlistItems } = useWishlist();
  const { totalItems } = useCart();
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
      </div>
      <nav className={styles.navbar}>
        <div className={styles.leftSection}>
          <Link href="/" className={styles.logo}>Picky</Link>
        </div>

        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>HOME</Link>
          <Link href="/shop" className={styles.navLink}>SHOP</Link>
          <div className={styles.hasMegaMenu}>
            <Link href="/category" className={styles.navLink}>
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
          <Link href="/new-arrivals" className={styles.navLink}>NEW ARRIVALS</Link>
          <Link href="/offers" className={styles.navLink}>OFFERS</Link>
          <Link href="/Blog" className={styles.navLink}>BLOG</Link>
          <Link href="/about" className={styles.navLink}>ABOUT US</Link>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <Search className={styles.searchIcon} size={18} />
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
            <Link href="/cart" className={styles.iconBtn}>
              <div className={styles.iconWrapper}>
                <ShoppingBag size={22} />
                {totalItems > 0 && <span className={`${styles.badge} ${styles.cartBadge}`}>{totalItems}</span>}
              </div>
            </Link>

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
                    <div className={styles.headerTop}>
                      <div className={styles.miniAvatar}>
                        <img src="/images/amber.png" alt="User" />
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
                        <Link href="/account-settings" className={styles.dropdownLink} onClick={() => setShowUserDropdown(false)}>
                          <div className={styles.linkIcon}><Settings size={14} /></div>
                          <span>SETTINGS</span>
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
                </div>
              )}
            </div>
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
