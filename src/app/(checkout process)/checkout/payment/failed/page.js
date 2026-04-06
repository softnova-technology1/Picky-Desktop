'use client';

import React from 'react';
import Link from 'next/link';

export default function PaymentFailedPage() {
  return (
    <div className="section section-light" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <div style={{ backgroundColor: 'white', padding: '3.5rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>❌</div>
          <h1 className="section-title">Payment Failed!</h1>
          <p className="section-subtitle">There was an issue processing your payment. Please try again or use a different payment method.</p>
          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/checkout/payment" className="btn btn-primary" style={{ borderRadius: '0.75rem' }}>
              Retry Payment
            </Link>
            <Link href="/contact" className="btn btn-secondary" style={{ borderRadius: '0.75rem' }}>
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
