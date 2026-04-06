"use client"
import styles from '../../../Stylesheet/ForgotPassword.module.css';
import Link from 'next/link';
import { useState } from 'react';
import AuthBackground from '@/Components/AuthBackground';

const ForgotPassword = () => {
    const [activeTab, setActiveTab] = useState('email');

    return (
        <div className={styles.page}>
            <AuthBackground />
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z"/></svg>
                    </div>
                    <span className={styles.logoText}>Picky</span>
                </Link>
                <button className={styles.supportBtn}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Support
                </button>
            </header>

            <main className={styles.main}>
                <div className={styles.card}>
                    <div className={styles.iconCircle}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><rect x="10" y="10" width="4" height="5" rx="1"/><path d="M11 10V9a1 1 0 0 1 2 0v1"/></svg>
                    </div>

                    <h1 className={styles.title}>Forgot password?</h1>
                    <p className={styles.desc}>
                        No worries, it happens. Enter your email or phone number and we’ll send you a link to reset your password.
                    </p>

                    <nav className={styles.tabs}>
                        <div 
                            className={`${styles.tab} ${activeTab === 'email' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('email')}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            Email
                        </div>
                        <div 
                            className={`${styles.tab} ${activeTab === 'phone' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('phone')}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                            Phone number
                        </div>
                    </nav>

                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.field}>
                            <label className={styles.label}>{activeTab === 'email' ? 'Email address' : 'Phone number'}</label>
                            <div className={styles.inputWrapper}>
                                <div className={styles.fieldIcon}>
                                    {activeTab === 'email' ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                                    )}
                                </div>
                                <input 
                                    type={activeTab === 'email' ? 'email' : 'tel'} 
                                    placeholder={activeTab === 'email' ? 'e.g. name@email.com' : 'e.g. +1 234 567 890'} 
                                    className={styles.input} 
                                />
                            </div>
                        </div>

                        <button className={styles.submitBtn}>Send Reset Link</button>

                        <Link href="/" className={styles.backBtn}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
                            Back to login
                        </Link>
                    </form>

                    <div className={styles.footer}>
                        <div className={styles.footerDivider}></div>
                        <p className={styles.footerText}>
                            Don’t have an account? <Link href="/create-account">Sign up</Link>
                        </p>
                    </div>
                </div>
            </main>

            <footer className={styles.pageFooter}>
                <div className={styles.footerLinks}>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Cookie Settings</a>
                </div>
                <p className={styles.copyright}>© 2024 Picky Inc. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ForgotPassword;
