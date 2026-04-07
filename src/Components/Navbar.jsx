"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, User, Menu, X, Heart, LogOut } from 'lucide-react';
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
        { name: 'CATEGORIES', path: '/categories' },
        { name: 'NEW ARRIVALS', path: '/categories' },
        { name: 'VENDORS', path: '/vendors' },
    ];

    return (
        <>
            <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
                <div className={styles.container}>
                    {/* Logo */}
                    <Link href="/" className={styles.logo}>
                        <div className={styles.logoIcon}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                        </div>
                        <span className={styles.logoText}>Picky</span>
                    </Link>

                    {/* Desktop Nav */}
                    <ul className={styles.navLinks}>
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    href={link.path}
                                    className={`${styles.navLink} ${pathname === link.path ? styles.active : ''}`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Search (Desktop) */}
                    <div className={styles.searchBox}>
                        <Search size={18} className={styles.searchIcon} />
                        <input type="text" placeholder="Search treasures..." className={styles.searchInput} />
                    </div>

                    {/* Actions */}
                    <div className={styles.actions}>
                        <button className={styles.iconBtn}><Heart size={20} /></button>
                        
                        {user ? (
                            <div className={styles.userProfile}>
                                <span className={styles.userName}>{user.name.split(' ')[0]}</span>
                                <button className={styles.logoutBtn} onClick={logout} title="Sign Out">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className={styles.iconBtn} title="Sign In">
                                <User size={20} />
                            </Link>
                        )}

                        <Link href="/cart" className={styles.cartBtn}>
                            <div className={styles.cartBadgeWrapper}>
                                <ShoppingBag size={20} />
                                {totalItems > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className={styles.cartBadge}
                                    >
                                        {totalItems}
                                    </motion.span>
                                )}
                            </div>
                            <span className={styles.cartLabel}>Bag</span>
                        </Link>

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
                                    key={link.path}
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
