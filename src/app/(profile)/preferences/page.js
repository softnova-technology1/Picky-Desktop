"use client";

import React, { useState } from 'react';
import styles from '../profile/profile.module.css';
import { 
  Globe, 
  DollarSign, 
  Bell, 
  Moon,
  Volume2,
  Sparkles
} from 'lucide-react';

export default function PreferencesPage() {
  const [notifications, setNotifications] = useState({
    marketing: true,
    orders: true,
    security: true
  });

  return (
    <main className={styles.mainContent}>
      <div className={styles.contentBody}>
        <header className={styles.header}>
          <h1 className={styles.title}>Preferences</h1>
          <p className={styles.subtitle}>Customize your browsing experience, localization, and notifications.</p>
        </header>

        {/* Localization */}
        <section className={styles.sectionBlock}>
          <h2>Localization</h2>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label><Globe size={12} style={{ marginRight: '6px' }} /> LANGUAGE</label>
              <select className={styles.inputField}>
                <option>English (United States)</option>
                <option>English (United Kingdom)</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label><DollarSign size={12} style={{ marginRight: '6px' }} /> PREFERRED CURRENCY</label>
              <select className={styles.inputField}>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>JPY (¥)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className={styles.sectionBlock}>
          <h2>Notification Settings</h2>
          <p className={styles.subtitle} style={{ marginBottom: '30px', fontSize: '1rem' }}>We only send you the most important updates.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className={styles.accountRow} style={{ padding: '30px' }}>
              <div className={styles.accountInfo}>
                <div className={styles.googleIcon}><Bell size={20} /></div>
                <div className={styles.accountDetails}>
                  <h4>Order Updates</h4>
                  <p>Get notified about your shipment status and delivery times.</p>
                </div>
              </div>
              <div 
                className={styles.statusBadge} 
                style={{ backgroundColor: notifications.orders ? 'var(--primary)' : '#eee', color: notifications.orders ? 'white' : '#999', cursor: 'pointer', minWidth: '80px', textAlign: 'center' }}
                onClick={() => setNotifications(prev => ({ ...prev, orders: !prev.orders }))}
              >
                {notifications.orders ? 'ON' : 'OFF'}
              </div>
            </div>

            <div className={styles.accountRow} style={{ padding: '30px' }}>
              <div className={styles.accountInfo}>
                <div className={styles.googleIcon}><Sparkles size={20} /></div>
                <div className={styles.accountDetails}>
                  <h4>Curation News</h4>
                  <p>Receive weekly digests of new entries and architectural discoveries.</p>
                </div>
              </div>
              <div 
                className={styles.statusBadge} 
                style={{ backgroundColor: notifications.marketing ? 'var(--primary)' : '#eee', color: notifications.marketing ? 'white' : '#999', cursor: 'pointer', minWidth: '80px', textAlign: 'center' }}
                onClick={() => setNotifications(prev => ({ ...prev, marketing: !prev.marketing }))}
              >
                {notifications.marketing ? 'ON' : 'OFF'}
              </div>
            </div>
          </div>
        </section>
      </div>

      <aside className={styles.rightPanel}>
        <div className={styles.actionCard} style={{ backgroundColor: '#eeebff', border: 'none' }}>
           <h3 style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', marginBottom: '15px', color: 'var(--primary)' }}>Personalization</h3>
           <p style={{ fontSize: '13px', color: '#6c5f94', opacity: 0.8, lineHeight: '1.6' }}>
              These settings apply to your current device and are synced across your account for a seamless experience.
           </p>
        </div>
      </aside>
    </main>
  );
}
