'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';

export default function PaymentSuccessPage() {
  const { checkoutItems, checkoutSubtotal, clearCart } = useCart();
  const orderId = 'PICKY-' + Math.floor(Math.random() * 90000 + 10000);

  useEffect(() => {
    // Optionally clear cart if the items were in the cart
    // clearCart(); 
  }, []);

  return (
    <div className="section section-light" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
        <div style={{ backgroundColor: 'white', padding: '3.5rem', borderRadius: '2rem', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>✨</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--foreground)' }}>Payment Successful</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            Thank you for your purchase. Your order <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{orderId}</span> is being processed.
          </p>

          {/* Order Snapshot */}
          <div style={{ background: 'var(--section-bg)', padding: '2rem', borderRadius: '1.5rem', marginBottom: '2.5rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order Summary</h3>
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              {checkoutItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <div style={{ position: 'relative', width: '50px', height: '50px', background: 'white', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain', padding: '4px' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>{item.name}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Quantity: {item.quantity}</p>
                  </div>
                  <span style={{ fontWeight: '700' }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '0.5rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>Total Paid</span>
                <span style={{ fontWeight: '800', fontSize: '1.3rem', color: 'var(--primary)' }}>${(checkoutSubtotal * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <Link href="/" className="btn btn-primary" style={{ padding: '1.25rem', borderRadius: '1rem', fontSize: '1.1rem' }}>
              Continue Shopping
            </Link>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>A confirmation email has been sent to your inbox.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
