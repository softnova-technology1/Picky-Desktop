"use client";

import React from 'react';
import styles from '../profile/profile.module.css';
import { HelpCircle, MessageSquare, Book, LifeBuoy } from 'lucide-react';

export default function HelpPage() {
  return (
    <main className={styles.mainContent}>
      <div className={styles.contentBody}>
        <header className={styles.header}>
          <h1 className={styles.title}>Help Center</h1>
          <p className={styles.subtitle}>How can we assist you today? Search our guides or contact support.</p>
        </header>

        <section className={styles.sectionBlock}>
          <div className={styles.formGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className={styles.accountRow} style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '40px', gap: '20px' }}>
              <LifeBuoy size={32} color="var(--primary)" />
              <h3 style={{ margin: 0 }}>Guides & Documentation</h3>
              <p style={{ fontSize: '14px', color: '#888' }}>Find answers to common questions about buying, selling, and curation.</p>
              <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '12px', borderBottom: '1px solid currentColor', cursor: 'pointer' }}>READ MORE</span>
            </div>

            <div className={styles.accountRow} style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '40px', gap: '20px' }}>
              <MessageSquare size={32} color="var(--primary)" />
              <h3 style={{ margin: 0 }}>Contact Support</h3>
              <p style={{ fontSize: '14px', color: '#888' }}>Our concierge team is available 24/7 to help with technical or order issues.</p>
              <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '12px', borderBottom: '1px solid currentColor', cursor: 'pointer' }}>START CHAT</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
