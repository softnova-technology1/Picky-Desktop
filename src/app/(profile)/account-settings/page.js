"use client";

import React, { useState } from 'react';
import styles from '../profile/profile.module.css';
import { 
  Key, 
  ShieldCheck, 
  Smartphone, 
  Trash2,
  AlertTriangle
} from 'lucide-react';

export default function AccountSettingsPage() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  return (
    <main className={styles.mainContent}>
      <div className={styles.contentBody}>
        <header className={styles.header}>
          <h1 className={styles.title}>Account Settings</h1>
          <p className={styles.subtitle}>Fine-tune your account credentials and security preferences.</p>
        </header>

        {/* Password Section */}
        <section className={styles.sectionBlock}>
          <h2>Password & Authentication</h2>
          <div className={styles.accountRow} style={{ marginBottom: '20px' }}>
            <div className={styles.accountInfo}>
              <div className={styles.googleIcon}><Key size={20} /></div>
              <div className={styles.accountDetails}>
                <h4>Password</h4>
                <p>Last changed 4 months ago</p>
              </div>
            </div>
            <button 
              className={styles.supportBtn} 
              style={{ backgroundColor: '#eee', color: '#111', fontSize: '12px' }}
              onClick={() => alert('Opening password change modal...')}
            >
              CHANGE PASSWORD
            </button>
          </div>

          <div className={styles.accountRow}>
            <div className={styles.accountInfo}>
              <div className={styles.googleIcon}><Smartphone size={20} /></div>
              <div className={styles.accountDetails}>
                <h4>Two-Factor Authentication</h4>
                <p>Protect your account with an extra layer of security.</p>
              </div>
            </div>
            <div className={styles.statusBadge} style={{ backgroundColor: twoFactorEnabled ? '#eeebff' : '#f4f5f8', color: twoFactorEnabled ? 'var(--primary)' : '#999', cursor: 'pointer' }} onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}>
              {twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className={styles.sectionBlock}>
          <h2>Email Notifications</h2>
          <div className={styles.formGrid}>
             <div className={styles.inputGroup}>
                <label>PRIMARY EMAIL</label>
                <input className={styles.inputField} value="alex.rivera@example.com" disabled />
             </div>
             <div className={styles.inputGroup}>
                <label>COMMUNICATION LANGUAGE</label>
                <select className={styles.inputField}>
                   <option>English (US)</option>
                   <option>French</option>
                   <option>Spanish</option>
                </select>
             </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className={styles.sectionBlock} style={{ marginTop: '100px', borderTop: '1px solid #eee', paddingTop: '40px' }}>
          <h2 style={{ color: '#ff4d4f' }}>Danger Zone</h2>
          <p className={styles.subtitle} style={{ marginBottom: '30px' }}>
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button 
            className={styles.saveBtn} 
            style={{ backgroundColor: '#ff4d4f', width: 'auto', padding: '15px 30px' }}
            onClick={() => confirm('Are you absolutely sure you want to delete your account?')}
          >
            <Trash2 size={18} style={{ marginRight: '10px' }} /> Delete My Account
          </button>
        </section>
      </div>

      {/* Right Column (Instructions) */}
      <aside className={styles.rightPanel}>
        <div className={styles.actionCard} style={{ textAlign: 'left', backgroundColor: '#fafafa' }}>
           <h4 style={{ marginBottom: '15px' }}><AlertTriangle size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Security Tips</h4>
           <ul style={{ fontSize: '13px', color: '#666', lineHeight: '2', paddingLeft: '0' }}>
              <li>• Use a unique password for each account.</li>
              <li>• Enable 2FA for maximum protection.</li>
              <li>• Never share your credentials with anyone.</li>
              <li>• Regularly review your log-in history.</li>
           </ul>
        </div>
      </aside>
    </main>
  );
}
