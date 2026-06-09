"use client"
import React, { useState, useEffect, useRef } from 'react';
import styles from './AuthPopup.module.css';
import { X, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

/* ── Images per tab ── */
const TAB_IMAGES = {
  login:  '/ecommerce_login_pro.png',
  signup: '/ecommerce_signup_pro.png',
};

const AuthPopup = ({ isOpen, onClose, initialTab = 'login' }) => {
  const router  = useRouter();
  const { login, register } = useAuth();

  const [activeTab, setActiveTab]   = useState(initialTab);
  const [email,     setEmail]       = useState('');
  const [password,  setPassword]    = useState('');
  const [name,      setName]        = useState('');
  const [agreed,    setAgreed]      = useState(false);
  const [error,     setError]       = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  /* 
   * isSwapped = false → Login:  image LEFT  | form RIGHT
   * isSwapped = true  → Signup: form  LEFT  | image RIGHT
   */
  const [isSwapped, setIsSwapped] = useState(initialTab === 'signup');

  /* image cross-fade */
  const [currentImg, setCurrentImg]   = useState(TAB_IMAGES[initialTab]);
  const [imgFading,  setImgFading]    = useState(false);

  /* sliding pill indicator */
  const tabsRef      = useRef(null);
  const tabLoginRef  = useRef(null);
  const tabSignupRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({ left: '4px', width: '50%' });

  /* ── sync when popup reopens ── */
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setIsSwapped(initialTab === 'signup');
      setCurrentImg(TAB_IMAGES[initialTab]);
      setError('');
      setSuccessMessage('');
    }
  }, [isOpen, initialTab]);

  /* ── pill slider position ── */
  useEffect(() => {
    const container = tabsRef.current;
    const activeEl  = activeTab === 'login' ? tabLoginRef.current : tabSignupRef.current;
    if (!container || !activeEl) return;
    const cr = container.getBoundingClientRect();
    const er = activeEl.getBoundingClientRect();
    setSliderStyle({ left: `${er.left - cr.left}px`, width: `${er.width}px` });
  }, [activeTab, isOpen]);

  /* ── tab switch handler — panels swap + image cross-fades ── */
  const handleTabSwitch = (tab) => {
    if (tab === activeTab) return;

    setError('');
    setSuccessMessage('');

    /* 1. Fade image out */
    setImgFading(true);

    /* 2. After half the slide duration: swap the image src */
    setTimeout(() => {
      setCurrentImg(TAB_IMAGES[tab]);
      setImgFading(false);
    }, 350);

    /* Slide panels + update active tab immediately */
    setActiveTab(tab);
    setIsSwapped(tab === 'signup');
  };

  /* ── form submit ── */
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (activeTab === 'login') {
      try {
        login(email, password);
        onClose();
        router.push('/hometwo');
      } catch (err) {
        setError(err.message);
      }
    } else {
      if (!agreed) {
        setError('You must agree to the Terms of Service and Privacy Policy');
        return;
      }
      try {
        register(name, email, password);
        handleTabSwitch('login');
        setPassword('');
        setError('');
        setSuccessMessage('Account created successfully! Please log in.');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.popup}>

        {/* ── Close ── */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>

        {/* ══════════════════════════════════════════════════
            IMAGE PANEL (left by default, right when swapped)
            ══════════════════════════════════════════════════ */}
        <div className={`${styles.leftPanel} ${isSwapped ? styles.swapped : ''}`}>
          <img
            src={currentImg}
            alt={activeTab === 'login' ? 'Login – Picky Fashion' : 'Sign Up – Picky Lifestyle'}
            className={imgFading ? styles.imgFadeOut : ''}
          />
          <div className={styles.leftOverlay} />

          {/* Floating review card */}
          <div className={styles.floatReview}>
            <div className={styles.floatAvatarGroup}>
              <div className={styles.floatAvatar}>A</div>
              <div className={styles.floatAvatar}>S</div>
              <div className={styles.floatAvatar}>R</div>
            </div>
            <div>
              <span className={styles.floatReviewStars}>★★★★★</span>
              <div className={styles.floatReviewText}>4.9 Rating</div>
              <div className={styles.floatReviewSub}>12k+ Happy Members</div>
            </div>
          </div>

          {/* Floating premium badge */}
          <div className={styles.floatBadge}>
            <span className={styles.floatBadgeIcon}>✦</span>
            <span className={styles.floatBadgeText}>Premium Member</span>
          </div>

          {/* Floating discount card */}
          <div className={styles.floatDiscount}>
            <div className={styles.floatDiscountLabel}>First Order</div>
            <div className={styles.floatDiscountValue}>20% Off</div>
            <div className={styles.floatDiscountSub}>on signup today</div>
          </div>

          {/* Brand */}
          <div className={styles.brandBlock}>
            <div className={styles.brandLogo}>PICKY</div>
            <div className={styles.brandTagline}>Because Every Choice Matters</div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            CENTER DIVIDER — always fixed at midpoint
            ══════════════════════════════════════════════════ */}
        <div className={styles.centerDivider}>
          <div className={styles.centerOrb}>
            <span className={styles.centerOrbInner}>✦</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            FORM PANEL (right by default, left when swapped)
            ══════════════════════════════════════════════════ */}
        <div className={`${styles.rightPanel} ${isSwapped ? styles.swapped : ''}`}>
          <div className={styles.authCard}>

            {/* Header */}
            <div className={styles.authHeader}>
              <h2 className={styles.authTitle}>
                {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className={styles.authSubtitle}>
                {activeTab === 'login'
                  ? 'Sign in to access your curated picks'
                  : 'Join thousands of curated lifestyle members'}
              </p>
            </div>

            {/* Error & Success Messages */}
            {error && <div className={styles.errorMessage}>{error}</div>}
            {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

            {/* Pill toggle */}
            <div className={styles.tabs} ref={tabsRef} role="tablist">
              <div className={styles.tabSlider} style={sliderStyle} aria-hidden="true" />
              <button
                ref={tabLoginRef}
                role="tab"
                aria-selected={activeTab === 'login'}
                className={`${styles.tab} ${activeTab === 'login' ? styles.activeTab : ''}`}
                onClick={() => handleTabSwitch('login')}
              >
                Login
              </button>
              <button
                ref={tabSignupRef}
                role="tab"
                aria-selected={activeTab === 'signup'}
                className={`${styles.tab} ${activeTab === 'signup' ? styles.activeTab : ''}`}
                onClick={() => handleTabSwitch('signup')}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form className={styles.form} onSubmit={handleSubmit} noValidate>

              {activeTab === 'signup' && (
                <div className={styles.inputGroup}>
                  <div className={styles.inputWrapper}>
                    <User className={styles.inputIcon} size={15} />
                    <input
                      type="text"
                      placeholder="Full name"
                      className={styles.input}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="name"
                    />
                  </div>
                </div>
              )}

              <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.inputIcon} size={15} />
                  <input
                    type="email"
                    placeholder="Email address"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.inputIcon} size={15} />
                  <input
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete={activeTab === 'login' ? 'current-password' : 'new-password'}
                  />
                </div>
              </div>

              {activeTab === 'signup' && (
                <label className={styles.termsRow}>
                  <input
                    type="checkbox"
                    className={styles.termsCheckbox}
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                  />
                  <span className={styles.termsText}>
                    I agree to the{' '}
                    <span className={styles.termsLink}>Terms of Service</span>
                    {' '}and{' '}
                    <span className={styles.termsLink}>Privacy Policy</span>
                  </span>
                </label>
              )}

              <button type="submit" className={styles.submitBtn}>
                <span className={styles.submitBtnText}>
                  {activeTab === 'login' ? 'Continue →' : 'Create Account'}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className={styles.dividerRow}>
              <div className={styles.dividerLine} />
              <span className={styles.dividerText}>or continue with</span>
              <div className={styles.dividerLine} />
            </div>

            {/* Social */}
            <div className={styles.socialRow}>
              <button className={styles.socialBtn} type="button" aria-label="Google">
                <span className={styles.socialBtnIcon}>G</span>
                Google
              </button>
              <button className={styles.socialBtn} type="button" aria-label="Apple">
                <span className={styles.socialBtnIcon}>⌘</span>
                Apple
              </button>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              <p className={styles.footerText}>
                {activeTab === 'login' ? "New to Picky? " : "Already a member? "}
                <span
                  className={styles.link}
                  onClick={() => handleTabSwitch(activeTab === 'login' ? 'signup' : 'login')}
                >
                  {activeTab === 'login' ? 'Join now' : 'Sign in'}
                </span>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPopup;
