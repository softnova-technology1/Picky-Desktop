'use client';

import React from 'react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div className="section section-light" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <div style={{ backgroundColor: 'white', padding: '3.5rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✅</div>
          <h1 className="section-title">Payment Successful!</h1>
          <p className="section-subtitle">Thank you for your purchase. We have received your payment and will notify you when your order is shipped.</p>
          <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
            <Link href="/" className="btn btn-primary" style={{ borderRadius: '0.75rem' }}>
              Return to Shop
            </Link>
            <p style={{ color: 'var(--text-muted)' }}>Order Reference: #PICKY-12345</p>
          </div>
        </div>
      </div>
    </div>
  );
}
