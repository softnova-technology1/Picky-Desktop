"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, User, Menu, X, Heart, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import styles from './Navbar.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import LoginPopup from './LoginPopup';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const pathname = usePathname();
    const { totalItems } = useCart();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        // Auto-show login popup after 5 seconds if user is not logged in and not on login page
        const hasShownBefore = sessionStorage.getItem('login_popup_shown');
        
        if (!user && pathname !== '/login' && !hasShownBefore) {
            const timer = setTimeout(() => {
                setShowLogin(true);
                sessionStorage.setItem('login_popup_shown', 'true');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [user, pathname]);

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'SHOP', path: '/shop' },
        { name: 'CATEGORIES', path: '/categories', hasDropdown: true },
        { name: 'NEW ARRIVALS', path: '/new-arrivals' },
        { name: 'OFFERS', path: '/offers' },
        { name: 'BLOG', path: '/blog' },
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
                        <button className={styles.iconBtn} title="Wishlist">
                            <Heart size={22} />
                        </button>
                        
                        <Link href="/cart" className={styles.cartBtn} title="Cart">
                            <div className={styles.cartBadgeWrapper}>
                                <ShoppingBag size={22} />
                                {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
                            </div>
                        </Link>

                        {user ? (
                            <div className={styles.userProfile}>
                                <User size={22} />
                                <button className={styles.logoutBtn} onClick={logout} title="Sign Out">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className={styles.iconBtn} title="Account">
                                <User size={22} />
                            </Link>
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
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Login Popup - Outside Nav for Perfect Centering */}
            <AnimatePresence>
                {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
