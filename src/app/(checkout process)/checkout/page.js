'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { checkoutItems, checkoutSubtotal } = useCart();
  
  const shipping = 0; // FREE Standard
  const tax = checkoutSubtotal * 0.08;
  const total = checkoutSubtotal + shipping + tax;

  return (
    <div className="section section-light" style={{ minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          <h1 className="section-title">Checkout</h1>
          <p className="section-subtitle">Please finalize your shipping details below.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3rem' }}>
          {/* Shipping Form */}
          <div style={{ backgroundColor: 'var(--card-bg)', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '700' }}>Shipping Information</h2>
            <form style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input type="text" placeholder="John" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input type="text" placeholder="Doe" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" placeholder="john.doe@example.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Full Address</label>
                <input type="text" placeholder="123 Street Name, Apt 4" style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>City</label>
                  <input type="text" placeholder="City" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>State</label>
                  <input type="text" placeholder="State" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Zip Code</label>
                  <input type="text" placeholder="Zip" style={inputStyle} />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div style={{ alignSelf: 'start', backgroundColor: 'var(--card-bg)', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
            <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '700' }}>Order Summary</h2>
            
            {/* Selected Products List */}
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '1.5rem', display: 'grid', gap: '1rem' }}>
              {checkoutItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', flexShrink: 0 }}>
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain', padding: '4px' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>{item.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</span>
                  </div>
                  <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {checkoutItems.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No items selected for checkout.</p>}
            </div>

            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
              <div className="flex-between">
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span style={{ fontWeight: '600' }}>${checkoutSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex-between">
                <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                <span style={{ color: '#059669', fontWeight: '600' }}>FREE</span>
              </div>
              <div className="flex-between">
                <span style={{ color: 'var(--text-muted)' }}>Estimated Tax</span>
                <span style={{ fontWeight: '600' }}>${tax.toFixed(2)}</span>
              </div>
              <div style={{ borderTop: '2px solid var(--border)', marginTop: '0.5rem', paddingTop: '1.5rem' }} className="flex-between">
                <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>Total</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link 
              href="/checkout/address" 
              className="btn btn-primary" 
              style={{ width: '100%', borderRadius: '1rem', padding: '1.25rem', fontSize: '1.1rem' }}
              disabled={checkoutItems.length === 0}
            >
              Continue to Payment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  marginBottom: '0.75rem',
  fontSize: '0.875rem',
  fontWeight: '600',
  color: 'var(--foreground)'
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '0.75rem',
  border: '1px solid var(--border)',
  fontSize: '1rem',
  transition: 'border-color 0.2s',
  outline: 'none',
};
