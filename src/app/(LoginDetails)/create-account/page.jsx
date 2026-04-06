"use client"
import styles from '../../../Stylesheet/CreateAccount.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthBackground from '@/Components/AuthBackground';

const CreateAccount = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate register success
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', e.target[0].value);
        router.push('/home2');
    };

    return (
        <div className={styles.page}>
            <AuthBackground />
            <div className={styles.card}>
                {/* Image/Blue Side */}
                <div className={styles.visualSide}>
                    <div className={styles.logo}>
                         <div className={styles.logoIcon}>
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z"/></svg>
                         </div>
                         <span className={styles.logoName}>Picky</span>
                    </div>

                    <div className={styles.heroContent}>
                        <h1 className={styles.heroText}>Start your journey with us today.</h1>
                        <p className={styles.heroDesc}>Join thousands of users who trust Picky for their daily exploration and discovery.</p>
                    </div>
                    
                    <div className={styles.trustInfo}>
                        <div className={styles.userAvatars}>
                            <div className={styles.avatar} style={{ backgroundColor: '#ff9a9e' }}></div>
                            <div className={styles.avatar} style={{ backgroundColor: '#a18cd1' }}></div>
                            <div className={styles.avatar} style={{ backgroundColor: '#fad0c4' }}></div>
                            <div className={styles.avatarMore}>+10k</div>
                        </div>
                        <p className={styles.trustText}>Trusted by over 10,000+ happy customers</p>
                    </div>

                    <div className={styles.bgCircles}>
                        <div className={styles.circle1}></div>
                        <div className={styles.circle2}></div>
                    </div>
                </div>

                {/* Form Side */}
                <div className={styles.formSide}>
                    <div className={styles.formHeader}>
                        <h4 className={styles.title}>Create Account</h4>
                        <p className={styles.subtitle}>Join Picky and start exploring the possibilities.</p>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.field}>  
                            <label className={styles.label}>Full Name</label>
                            <div className={styles.inputWrapper}>
                                <svg className={styles.fieldIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                <input type="text" placeholder="John Doe" className={styles.input} required />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Email Address</label>
                            <div className={styles.inputWrapper}>
                                <svg className={styles.fieldIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                <input type="email" placeholder="john@example.com" className={styles.input} required />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Mobile Number</label>
                            <div className={styles.inputWrapper}>
                                <svg className={styles.fieldIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                                <input type="text" placeholder="+1 (555) 000-0000" className={styles.input} required />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Password</label>
                            <div className={styles.inputWrapper}>
                                <svg className={styles.fieldIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className={styles.input} required />
                                <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                                     {showPassword ? (
                                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                     ) : (
                                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                     )}
                                </button>
                            </div>
                        </div>

                        <div className={styles.termsWrapper}>
                            <input type="checkbox" id="terms" className={styles.checkbox} required />
                            <label htmlFor="terms" className={styles.checkboxLabel}>
                                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                            </label>
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            Create Account
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </button>
                    </form>

                    <div className={styles.divider}>
                        <span>OR SIGN UP WITH</span>
                    </div>

                    <div className={styles.socialButtons}>
                        <button className={styles.socialBtn} type="button">
                             <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                             Google
                        </button>
                        <button className={styles.socialBtn} type="button">
                             <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C4.65 17.59 4 15.02 4 12.02c0-3.03 1.34-4.8 3.23-4.8 1.15 0 1.95.45 2.76.45.8 0 2.21-.6 3.65-.6 1.44 0 2.68.51 3.48 1.63-2.9 1.4-2.45 5.5.43 6.94-.57 1.4-1.33 2.81-2.5 4.64zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.26 2.45-2.3 4.54-3.74 4.25z"/></svg>
                             Apple
                        </button>
                    </div>

                    <p className={styles.footerText}>
                        Already have an account? <Link href="/login">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
