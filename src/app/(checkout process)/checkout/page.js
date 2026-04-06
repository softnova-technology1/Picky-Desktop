'use client';

import React from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="section section-light" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Checkout</h1>
          <p className="section-subtitle">Please finalize your shipping details below.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem' }}>
          {/* Shipping Form */}
          <div style={{ backgroundColor: 'var(--card-bg)', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Shipping Information</h2>
            <form style={{ display: 'grid', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>First Name</label>
                  <input type="text" placeholder="John" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Last Name</label>
                  <input type="text" placeholder="Doe" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Email Address</label>
                <input type="email" placeholder="john.doe@example.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Address</label>
                <input type="text" placeholder="123 Street Name" style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>City</label>
                  <input type="text" placeholder="City" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>State</label>
                  <input type="text" placeholder="State" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Zip Code</label>
                  <input type="text" placeholder="Zip" style={inputStyle} />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div style={{ alignSelf: 'start', backgroundColor: 'var(--card-bg)', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Order Summary</h2>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="flex-between">
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span style={{ fontWeight: '600' }}>$150.00</span>
              </div>
              <div className="flex-between">
                <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                <span style={{ fontWeight: '600' }}>$10.00</span>
              </div>
              <div className="flex-between">
                <span style={{ color: 'var(--text-muted)' }}>Tax (8%)</span>
                <span style={{ fontWeight: '600' }}>$12.00</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', margin: '0.5rem 0', paddingTop: '1rem' }} className="flex-between">
                <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>Total</span>
                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)' }}>$172.00</span>
              </div>
            </div>
            <Link href="/checkout/payment" className="btn btn-primary" style={{ width: '100%', borderRadius: '0.75rem' }}>
              Continue to Payment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '0.75rem',
  border: '1px solid var(--border)',
  fontSize: '1rem',
  transition: 'border-color 0.2s',
  outline: 'none',
};
