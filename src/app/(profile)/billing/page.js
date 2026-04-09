"use client";

import React from 'react';
import styles from '../profile/profile.module.css';
import { 
  CreditCard, 
  Plus, 
  Download, 
  FileText,
  Clock
} from 'lucide-react';

export default function BillingPage() {
  const invoices = [
    { id: '#INV-9122', date: 'Oct 12, 2023', amount: '$24.00', status: 'Paid' },
    { id: '#INV-8812', date: 'Sep 12, 2023', amount: '$24.00', status: 'Paid' },
    { id: '#INV-7721', date: 'Aug 12, 2023', amount: '$24.00', status: 'Paid' }
  ];

  return (
    <main className={styles.mainContent}>
      <div className={styles.contentBody}>
        <header className={styles.header}>
          <h1 className={styles.title}>Billing & Payments</h1>
          <p className={styles.subtitle}>Manage your subscriptions, payment methods, and view your billing history.</p>
        </header>

        {/* Payment Methods */}
        <section className={styles.sectionBlock}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ margin: 0 }}>Payment Methods</h2>
            <button className={styles.saveBtn} style={{ width: 'auto', padding: '10px 20px', fontSize: '11px' }}>
              <Plus size={14} style={{ marginRight: '6px' }} /> ADD METHOD
            </button>
          </div>
          
          <div className={styles.accountRow} style={{ border: '1px solid var(--primary)', backgroundColor: 'rgba(var(--primary-rgb), 0.02)' }}>
            <div className={styles.accountInfo}>
              <div className={styles.googleIcon} style={{ backgroundColor: '#111', color: 'white', borderRadius: '4px', height: '28px', fontSize: '8px', fontWeight: 900 }}>VISA</div>
              <div className={styles.accountDetails}>
                <h4>Visa ending in 4242</h4>
                <p>Expires 09/2026 • Primary Method</p>
              </div>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 700 }}>EDIT</span>
          </div>
        </section>

        {/* Invoice History */}
        <section className={styles.sectionBlock} style={{ marginTop: '60px' }}>
          <h2>Invoice History</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {invoices.map(inv => (
              <div key={inv.id} className={styles.accountRow} style={{ backgroundColor: 'transparent', borderBottom: '1px solid #eee', borderRadius: '0' }}>
                <div className={styles.accountInfo}>
                  <FileText size={18} color="#999" />
                  <div className={styles.accountDetails}>
                    <p style={{ color: '#111', fontWeight: 600 }}>{inv.id}</p>
                    <span style={{ fontSize: '12px', color: '#999' }}>{inv.date}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                   <span style={{ fontSize: '14px', fontWeight: 600 }}>{inv.amount}</span>
                   <div className={styles.statusBadge} style={{ backgroundColor: '#eefff8', color: '#10b981' }}>{inv.status}</div>
                   <Download size={16} color="var(--primary)" style={{ cursor: 'pointer' }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className={styles.rightPanel}>
        <div className={styles.premiumCard}>
           <div className={styles.activePlanBadge}>PREMIUM</div>
           <h3 style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', marginBottom: '10px' }}>Annual Plan</h3>
           <p style={{ fontSize: '13px', opacity: 0.8, marginBottom: '20px' }}>$240 billed annually. You're saving $48/year compared to monthly billing.</p>
           <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
              <span style={{ fontSize: '11px', display: 'block', opacity: 0.6 }}>NEXT BILLING DATE</span>
              <span style={{ fontSize: '18px', fontWeight: 700 }}>Nov 12, 2024</span>
           </div>
        </div>
      </aside>
    </main>
  );
}
