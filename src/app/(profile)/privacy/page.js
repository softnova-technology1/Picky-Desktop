"use client";

import React from 'react';
import styles from '../profile/profile.module.css';
import { Eye, Shield, Lock, FileText } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <main className={styles.mainContent}>
      <div className={styles.contentBody}>
        <header className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>We care about your data. Review how we collect, use, and protect your information.</p>
        </header>

        <section className={styles.sectionBlock}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', border: '1px solid #eee' }}>
            <h2 style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', marginBottom: '30px' }}>Our Commitment</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <Shield size={24} color="var(--primary)" />
                <div>
                  <h4 style={{ marginBottom: '8px' }}>Encryption</h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Every piece of data that leaves your browser is protected by AES-256 bit encryption, ensuring your privacy remains absolute.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <Eye size={24} color="var(--primary)" />
                <div>
                  <h4 style={{ marginBottom: '8px' }}>Transparency</h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>We are transparent about the data we collect. You have full control to export or delete your profile at any time.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
