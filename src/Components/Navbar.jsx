"use client"
import styles from '../Stylesheet/Navbar.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User, Heart, ShoppingBag, Search, LogOut, Layout } from 'lucide-react';
import LoginPopup from './LoginPopup';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Check for login status
        const loginStatus = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loginStatus === 'true');

        // Auto-show login popup after 5 seconds, only on home page and if not already on login/signup
        let timer;
        if (pathname === '/' && loginStatus !== 'true') {
            timer = setTimeout(() => {
                setIsLoginOpen(true);
            }, 5000);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timer) clearTimeout(timer);
        };
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        setIsLoggedIn(false);
        router.push('/');
    };

    // Hide navbar on auth pages
    const authPages = ['/login', '/create-account', '/forgot-password'];
    if (authPages.includes(pathname)) return null;

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
            <div className={styles.navbarContent}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    </div>
                    <span className={styles.logoText}>Picky</span>
                </Link>
                
                <ul className={styles.navLinks}>
                    <li className={styles.navItem}><Link href="/browse">BROWSE</Link></li>
                    <li className={styles.navItem}><Link href="/vendors">VENDORS</Link></li>
                    <li className={styles.navItem}><Link href="/categories">CATEGORIES</Link></li>
                    <li className={styles.navItem}><Link href="/deals">DEALS</Link></li>
                </ul>

                <div className={styles.searchContainer}>
                    <Search size={18} className={styles.searchIcon} />
                    <input type="text" placeholder="Search curated products..." className={styles.searchInput} />
                </div>

                <div className={styles.navActions}>
                    {isLoggedIn ? (
                        <>
                            <Link href="/home2" className={styles.iconButton}>
                                <Layout size={20} strokeWidth={2.5} />
                            </Link>
                            <div className={styles.iconButton} onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                <LogOut size={20} strokeWidth={2.5} />
                            </div>
                        </>
                    ) : (
                        <Link href="/login" className={styles.iconButton}>
                            <User size={20} strokeWidth={2.5} />
                        </Link>
                    )}
                    <div className={styles.iconButton}>
                        <Heart size={20} strokeWidth={2.5} />
                    </div>
                    {isLoggedIn ? (
                        <Link href="/home2" className={styles.cartButton}>
                            <ShoppingBag size={18} />
                            <span>Dashboard</span>
                        </Link>
                    ) : (
                        <Link href="/login" className={styles.cartButton}>
                            <ShoppingBag size={18} />
                            <span>Account</span>
                        </Link>
                    )}
                </div>
            </div>
            {isLoginOpen && <LoginPopup onClose={() => setIsLoginOpen(false)} />}
        </nav>
    );
};

export default Navbar;
