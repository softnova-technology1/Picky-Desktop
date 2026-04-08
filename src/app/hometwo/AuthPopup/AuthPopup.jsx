"use client"
import React, { useState } from 'react';
import styles from './AuthPopup.module.css';
import { X, Mail, Lock, User, Smartphone } from 'lucide-react';

const AuthPopup = ({ isOpen, onClose, initialTab = 'login' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        <div className={styles.authContainer}>
          <div className={styles.header}>
            <h2 className={styles.title}>{activeTab === 'login' ? 'Login' : 'Create Account'}</h2>
            <p className={styles.subtitle}>
              {activeTab === 'login' 
                ? 'Welcome back! Access your curated picks.' 
                : 'Join Picky and experience curated lifestyle.'}
            </p>
          </div>

          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'login' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('login')}
            >
              LOGIN
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'signup' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              SIGN UP
            </button>
          </div>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            {activeTab === 'signup' && (
              <div className={styles.inputGroup}>
                <label className={styles.label}>Full Name</label>
                <div className={styles.inputWrapper}>
                  <User className={styles.inputIcon} size={18} />
                  <input type="text" placeholder="John Doe" className={styles.input} />
                </div>
              </div>
            )}

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address</label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} size={18} />
                <input type="email" placeholder="john@example.com" className={styles.input} />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} size={18} />
                <input type="password" placeholder="••••••••" className={styles.input} />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              {activeTab === 'login' ? 'CONTINUE' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <div className={styles.footer}>
            <p className={styles.subtitle}>
              {activeTab === 'login' 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <span 
                className={styles.link} 
                onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
              >
                {activeTab === 'login' ? 'Register' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;
