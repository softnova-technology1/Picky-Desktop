"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, User, Menu, X, Heart, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './Navbar.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import CartNotification from './CartNotification';
import AuthPopup from './AuthPopup';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const [authTab, setAuthTab] = useState('login');
    const pathname = usePathname();
    const { totalItems, cartItems, subtotal } = useCart();
    const { wishlistItems } = useWishlist();
    const { user, logout } = useAuth();
    const [showCartDrawer, setShowCartDrawer] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    const openAuth = (tab) => {
        setAuthTab(tab);
        setShowAuthPopup(true);
    };

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'SHOP', path: '/shop' },
        { name: 'CATEGORIES', path: '/category' },
        { name: 'NEW ARRIVALS', path: '/new-arrivals' },
        { name: 'OFFERS', path: '/offers' },
        { name: 'BLOG', path: '/Blog' },
        { name: 'ABOUT US', path: '/about' },
    ];

    return (
        <>
            <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
                <div className={styles.container}>
                    {/* Logo (Left) */}
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoText}>Picky</span>
                    </Link>

                    {/* Desktop Nav (Center) */}
                    <ul className={styles.navLinks}>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.path}
                                    className={`${styles.navLink} ${pathname === link.path ? styles.active : ''}`}
                                >
                                    {link.name}
                                    {link.hasDropdown && <ChevronDown size={14} className={styles.chevron} />}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Search Bar (Center-Right) */}
                    <div className={styles.searchContainer}>
                        <div className={styles.searchWrapper}>
                            <Search size={18} className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search Picky..."
                                className={styles.searchInput}
                            />
                        </div>
                        <span className={styles.trendingText}>TRENDING:</span>
                    </div>

                    {/* Actions (Right) */}
                    <div className={styles.actions}>
                        <Link href="/wishlist" className={styles.iconBtn} title="Wishlist">
                            <div className={styles.badgeWrapper}>
                                <Heart size={22} fill={wishlistItems.length > 0 ? "currentColor" : "none"} />
                                {wishlistItems.length > 0 && <span className={styles.badge}>{wishlistItems.length}</span>}
                            </div>
                        </Link>

                        <div 
                            className={styles.cartDrawerContainer}
                            onMouseEnter={() => setShowCartDrawer(true)}
                        >
                            <button 
                                className={styles.cartBtn} 
                                title="Cart"
                                onClick={() => setShowCartDrawer(true)}
                            >
                                <div className={styles.cartBadgeWrapper}>
                                    <ShoppingBag size={22} />
                                    {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
                                </div>
                            </button>

                            <AnimatePresence>
                                {showCartDrawer && (
                                    <>
                                        <motion.div 
                                            className={styles.drawerBackdrop}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setShowCartDrawer(false)}
                                        />
                                        <motion.div 
                                            className={styles.cartDrawer}
                                            initial={{ x: "100%" }}
                                            animate={{ x: 0 }}
                                            exit={{ x: "100%" }}
                                            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                                        >
                                            <div className={styles.drawerHeader}>
                                                <div className={styles.drawerTitleGroup}>
                                                    <h2 className={styles.drawerTitle}>YOUR CART</h2>
                                                    <span className={styles.drawerItemCount}>{totalItems} ITEMS</span>
                                                </div>
                                                <button 
                                                    className={styles.closeDrawerBtn} 
                                                    onClick={() => setShowCartDrawer(false)}
                                                >
                                                    <X size={24} />
                                                </button>
                                            </div>

                                            <div className={styles.drawerContent}>
                                                {cartItems.length > 0 ? (
                                                    <div className={styles.drawerItemsList}>
                                                        {cartItems.map((item) => (
                                                            <div key={item.id} className={styles.drawerItem}>
                                                                <div className={styles.drawerItemImage}>
                                                                    <img src={item.image || "/images/placeholder.png"} alt={item.name} />
                                                                </div>
                                                                <div className={styles.drawerItemInfo}>
                                                                    <h3 className={styles.drawerItemName}>{item.name}</h3>
                                                                    <div className={styles.drawerItemMeta}>
                                                                        <span className={styles.drawerItemPrice}>${item.price}</span>
                                                                        <span className={styles.drawerItemQty}>QTY: {item.quantity}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className={styles.emptyDrawer}>
                                                        <div className={styles.emptyIconWrapper}>
                                                            <ShoppingBag size={60} strokeWidth={1} />
                                                        </div>
                                                        <h3 className={styles.emptyDrawerTitle}>Your cart is empty</h3>
                                                        <p className={styles.emptyDrawerText}>Looks like you haven't added anything to your cart yet.</p>
                                                        <Link 
                                                            href="/shop" 
                                                            className={styles.shopNowBtn}
                                                            onClick={() => setShowCartDrawer(false)}
                                                        >
                                                            START SHOPPING
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>

                                            {cartItems.length > 0 && (
                                                <div className={styles.drawerFooter}>
                                                    <div className={styles.drawerSubtotal}>
                                                        <span className={styles.subtotalLabel}>SUBTOTAL</span>
                                                        <span className={styles.subtotalValue}>${subtotal.toFixed(2)}</span>
                                                    </div>
                                                    <p className={styles.drawerTaxNote}>Shipping & taxes calculated at checkout</p>
                                                    <div className={styles.drawerActions}>
                                                        <Link 
                                                            href="/cart" 
                                                            className={styles.drawerSecondaryBtn}
                                                            onClick={() => setShowCartDrawer(false)}
                                                        >
                                                            VIEW CART
                                                        </Link>
                                                        <Link 
                                                            href="/checkout" 
                                                            className={styles.drawerPrimaryBtn}
                                                            onClick={() => setShowCartDrawer(false)}
                                                        >
                                                            CHECKOUT NOW
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        {user ? (
                            <div className={styles.userProfile}>
                                <User size={22} />
                                <button className={styles.logoutBtn} onClick={logout} title="Sign Out">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <button
                                className={styles.iconBtn}
                                title="Account"
                                onClick={() => openAuth('login')}
                            >
                                <User size={22} />
                            </button>
                        )}

                        {/* Mobile Toggle */}
                        <button
                            className={styles.menuToggle}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className={styles.mobileMenu}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className={styles.mobileLink}
                                >
                                    {link.name}
                                    {link.hasDropdown && <ChevronDown size={14} className={styles.chevron} />}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>


            <AuthPopup
                isOpen={showAuthPopup}
                onClose={() => setShowAuthPopup(false)}
                initialTab={authTab}
            />
        </>              
    );
};

export default Navbar;
