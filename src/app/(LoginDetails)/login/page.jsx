"use client"
import styles from './Login.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AuthBackground from '@/components/AuthBackground';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const registrationSuccess = sessionStorage.getItem('picky_registration_success');
        if (registrationSuccess) {
            setSuccessMessage("Account created successfully! Please sign in.");
            sessionStorage.removeItem('picky_registration_success');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        try {
            login(email, password);
            router.push('/hometwo');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.page}>
            <AuthBackground />
            <div className={styles.card}>
                <header className={styles.header}>
                    <Link href="/" className={styles.logo} style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                        <Image src="/logos.png" alt="Picky Logo" width={120} height={40} priority style={{ objectFit: 'contain' }} />
                    </Link>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Sign in to your account to continue.</p>
                </header>

                {error && <div className={styles.errorMessage}>{error}</div>}
                {successMessage && <div className={styles.successMessage}>{successMessage}</div>}


                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label}>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="name@example.com" 
                            className={styles.input} 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Password</label>
                        <Link href="/forgot-password" className={styles.forgot}>Forgot password?</Link>
                        <div className={styles.inputWrapper}>
                           <input 
                               type={showPassword ? 'text' : 'password'} 
                               placeholder="Enter your password" 
                               className={styles.input} 
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required 
                           />
                           <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                )}
                           </button>
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn}>Sign In</button>
                </form>

                <div className={styles.divider}>
                    <span>OR CONTINUE WITH</span>
                </div>

                <button className={styles.socialBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 1 0 10 10h-10z"/></svg>
                    Google
                </button>

                <div className={styles.footer}>
                    Don't have an account? <Link href="/create-account">Sign up for free</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
