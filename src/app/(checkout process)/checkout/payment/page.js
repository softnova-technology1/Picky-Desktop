'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { useCart } from '@/context/CartContext';

export default function PaymentPage() {
  const { checkoutSubtotal } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('credit-card');

  const tax = checkoutSubtotal * 0.08;
  const finalTotal = checkoutSubtotal + tax;

  const methods = [
    { id: 'credit-card', name: 'Credit Card', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'apple-pay', name: 'Apple Pay', icon: '🍎' },
    { id: 'google-pay', name: 'Google Pay', icon: '🇬' },
  ];

  return (
    <div className="section section-light" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Payment</h1>
          <p className="section-subtitle">Choose your preferred payment method.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '2.5rem' }}>
          {/* Payment Methods */}
          <div style={{ backgroundColor: 'var(--card-bg)', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Select Payment Method</h2>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
              {methods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1.25rem',
                    borderRadius: '1rem',
                    border: '2px solid ' + (selectedPayment === method.id ? 'var(--primary)' : 'var(--border)'),
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backgroundColor: selectedPayment === method.id ? 'rgba(79, 134, 247, 0.05)' : 'transparent',
                    boxShadow: selectedPayment === method.id ? '0 10px 15px -3px rgba(79, 134, 247, 0.1)' : 'none',
                  }}
                >
                  <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>{method.icon}</span>
                  <span style={{ fontSize: '1.125rem', fontWeight: '600', color: selectedPayment === method.id ? 'var(--primary)' : 'inherit' }}>{method.name}</span>
                </div>
              ))}
            </div>

            {selectedPayment === 'credit-card' && (
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Card Number</label>
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" style={inputStyle} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>CVV</label>
                    <input type="text" placeholder="XXX" style={inputStyle} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Summary */}
          <div style={{ alignSelf: 'start', backgroundColor: 'var(--card-bg)', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Billing Summary</h2>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="flex-between">
                <span style={{ color: 'var(--text-muted)' }}>Order Total</span>
                <span style={{ fontWeight: '700', fontSize: '1.5rem', color: 'var(--primary)' }}>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <Link href="/checkout/payment/success" className="btn btn-primary" style={{ width: '100%', borderRadius: '0.75rem' }}>
                Complete Purchase
              </Link>
              <Link href="/checkout/payment/failed" className="btn btn-secondary" style={{ width: '100%', borderRadius: '0.75rem', color: 'var(--secondary)' }}>
                 Test Failure
              </Link>
            </div>
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
