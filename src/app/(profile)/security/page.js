"use client";

import React from 'react';
import styles from '../profile/profile.module.css';
import { 
  Shield, 
  Monitor, 
  Smartphone, 
  MapPin, 
  Clock,
  History
} from 'lucide-react';

export default function SecurityPage() {
  const activeSessions = [
    { id: 1, device: 'MacBook Pro 16"', location: 'San Francisco, USA', date: 'Active Now', current: true, icon: <Monitor size={20} /> },
    { id: 2, device: 'iPhone 15 Pro', location: 'San Francisco, USA', date: 'Yesterday at 4:32 PM', icon: <Smartphone size={20} /> },
    { id: 3, device: 'Safari on iPad', location: 'Oakland, USA', date: 'Oct 24, 2023 at 10:15 AM', icon: <Monitor size={20} /> }
  ];

  return (
    <main className={styles.mainContent}>
      <div className={styles.contentBody}>
        <header className={styles.header}>
          <h1 className={styles.title}>Security History</h1>
          <p className={styles.subtitle}>Review your login activity and manage active sessions across all devices.</p>
        </header>

        {/* Active Sessions */}
        <section className={styles.sectionBlock}>
          <h2>Active Sessions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {activeSessions.map(session => (
              <div key={session.id} className={styles.accountRow}>
                <div className={styles.accountInfo}>
                  <div className={styles.googleIcon}>{session.icon}</div>
                  <div className={styles.accountDetails}>
                    <h4>{session.device} {session.current && <span style={{ color: 'var(--primary)', fontSize: '10px', marginLeft: '8px' }}>• THIS DEVICE</span>}</h4>
                    <p>{session.location} • {session.date}</p>
                  </div>
                </div>
                {!session.current && (
                  <button 
                    className={styles.discardBtn} 
                    style={{ fontSize: '11px', color: '#ff4d4f' }}
                    onClick={() => alert(`Sign out from ${session.device}?`)}
                  >
                    SIGN OUT
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Security Logs */}
        <section className={styles.sectionBlock} style={{ marginTop: '60px' }}>
          <h2>Security Log</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div className={styles.accountRow} style={{ backgroundColor: 'transparent', borderBottom: '1px solid #eee', borderRadius: '0' }}>
               <div className={styles.accountInfo}>
                  <Shield size={16} color="#bbb" />
                  <div className={styles.accountDetails}>
                     <p style={{ color: '#111', fontSize: '0.9rem' }}>Account recovery email changed</p>
                     <span style={{ fontSize: '11px', color: '#999' }}>2 days ago</span>
                  </div>
               </div>
            </div>
            <div className={styles.accountRow} style={{ backgroundColor: 'transparent', borderBottom: '1px solid #eee', borderRadius: '0' }}>
               <div className={styles.accountInfo}>
                  <History size={16} color="#bbb" />
                  <div className={styles.accountDetails}>
                     <p style={{ color: '#111', fontSize: '0.9rem' }}>Password successfully changed</p>
                     <span style={{ fontSize: '11px', color: '#999' }}>4 months ago</span>
                  </div>
               </div>
            </div>
          </div>
        </section>
      </div>

      <aside className={styles.rightPanel}>
        <div className={styles.premiumCard} style={{ backgroundColor: '#111' }}>
           <h3 style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', marginBottom: '15px' }}>Device Trust</h3>
           <p style={{ fontSize: '13px', opacity: 0.7, lineHeight: '1.6' }}>
              We track the devices you use to access Picky to ensure your data stays protected.
           </p>
           <button className={styles.manageBtn} style={{ marginTop: '20px' }}>Secure All Devices</button>
        </div>
      </aside>
    </main>
  );
}
