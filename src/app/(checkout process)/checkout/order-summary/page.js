'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { MapPin, Truck, ShoppingBag, ChevronRight, ChevronLeft, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function OrderSummaryPage() {
  const router = useRouter();
  const { checkoutItems, checkoutSubtotal } = useCart();
  const [address, setAddress] = useState(null);
  const [delivery, setDelivery] = useState(null);

  useEffect(() => {
    const savedAddress = localStorage.getItem('picky_shipping_address');
    const savedDelivery = localStorage.getItem('picky_delivery_option');
    if (savedAddress) setAddress(JSON.parse(savedAddress));
    if (savedDelivery) setDelivery(JSON.parse(savedDelivery));
  }, []);

  if (!address || !delivery || checkoutItems.length === 0) {
    return (
      <div className="section section-light flex-center" style={{ minHeight: '80vh' }}>
        <div className="text-center">
          <ShoppingBag size={64} style={{ color: 'var(--border)', marginBottom: '2rem' }} />
          <h2 style={{ marginBottom: '1rem' }}>Missing Order Data</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Please complete the previous steps.</p>
          <Link href="/checkout" className="btn btn-primary">Go to Checkout</Link>
        </div>
      </div>
    );
  }

  const deliveryCharge = delivery.price === 'FREE' ? 0 : parseFloat(delivery.price.replace('$', ''));
  const total = checkoutSubtotal + deliveryCharge;

  return (
    <div className="section section-light" style={{ minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>Order Summary</h1>
          <p style={{ color: 'var(--text-muted)' }}>Review your order before proceeding to payment</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '3rem' }}>
          
          <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Shipping Address Card */}
            <div style={summaryCard}>
              <div style={cardHeader}>
                <div style={iconBox}><MapPin size={20} /></div>
                <h2 style={cardTitle}>Shipping Address</h2>
                <Link href="/checkout/address" style={editLink}>Change</Link>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <p style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{address.fullName}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {address.street}<br/>
                  {address.city}, {address.state} {address.zip}<br/>
                  {address.country}<br/>
                  <span style={{ fontWeight: '600', color: '#1e293b', marginTop: '0.5rem', display: 'block' }}>{address.mobile}</span>
                </p>
              </div>
            </div>

            {/* Delivery Method Card */}
            <div style={summaryCard}>
              <div style={cardHeader}>
                <div style={iconBox}><Truck size={20} /></div>
                <h2 style={cardTitle}>Delivery Method</h2>
                <Link href="/checkout/delivery-options" style={editLink}>Change</Link>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>{delivery.name}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Estimated: {delivery.time}</p>
                </div>
                <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1.1rem' }}>{delivery.price}</span>
              </div>
            </div>

            {/* Product List Card */}
            <div style={summaryCard}>
              <div style={cardHeader}>
                <div style={iconBox}><ShoppingBag size={20} /></div>
                <h2 style={cardTitle}>Items ({checkoutItems.length})</h2>
              </div>
              <div style={{ padding: '1.5rem' }}>
                {checkoutItems.map((item, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', 
                    gap: '1.5rem', 
                    paddingBottom: idx === checkoutItems.length - 1 ? 0 : '1.5rem',
                    marginBottom: idx === checkoutItems.length - 1 ? 0 : '1.5rem',
                    borderBottom: idx === checkoutItems.length - 1 ? 'none' : '1px solid var(--border)'
                  }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '1rem', overflow: 'hidden', backgroundColor: '#f8fafc', border: '1px solid var(--border)' }}>
                      <Image src={item.image} alt={item.name} width={80} height={80} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem' }}>{item.name}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Quantity: {item.quantity}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: '700', color: 'var(--primary)' }}>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout Totals Card */}
          <div style={{ alignSelf: 'start' }}>
            <div style={{ ...summaryCard, backgroundColor: '#1e293b', border: 'none' }}>
              <div style={{ padding: '2rem' }}>
                <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem' }}>Order Totals</h2>
                
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  <div className="flex-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                    <span style={{ color: '#cbd5e1' }}>Subtotal</span>
                    <span style={{ color: 'white', fontWeight: '600' }}>${checkoutSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                    <span style={{ color: '#cbd5e1' }}>Shipping</span>
                    <span style={{ color: 'white', fontWeight: '600' }}>{delivery.price}</span>
                  </div>
                  <div className="flex-between">
                    <span style={{ color: 'white', fontSize: '1.25rem', fontWeight: '700' }}>Total</span>
                    <span style={{ color: 'var(--primary)', fontSize: '1.75rem', fontWeight: '800' }}>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div style={{ marginTop: '2.5rem', display: 'grid', gap: '1rem' }}>
                  <button 
                    onClick={() => router.push('/checkout/payment')}
                    className="btn btn-primary" 
                    style={{ 
                      width: '100%', 
                      padding: '1.25rem', 
                      borderRadius: '1.25rem', 
                      fontSize: '1.1rem', 
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      boxShadow: '0 10px 30px rgba(79, 134, 247, 0.3)'
                    }}
                  >
                    Proceed to Payment <ChevronRight size={20} />
                  </button>
                  <button onClick={() => router.back()} style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <ChevronLeft size={16} /> Back to Delivery
                  </button>
                </div>
              </div>
              
              <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                 <div style={{ padding: '8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}><CreditCard size={20} color="#94a3b8" /></div>
                 <p style={{ color: '#94a3b8', fontSize: '0.75rem', lineHeight: '1.4' }}>Secure payments provided by Picky Pay. Your data is encrypted and safe.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styling Constants
const summaryCard = {
  backgroundColor: 'white',
  borderRadius: '2rem',
  boxShadow: '0 15px 45px rgba(0,0,0,0.03)',
  border: '1px solid var(--border)',
  overflow: 'hidden',
  transition: 'all 0.3s ease'
};

const cardHeader = {
  padding: '1.5rem',
  borderBottom: '1px solid var(--border)',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  backgroundColor: '#f8fafc'
};

const cardTitle = {
  fontSize: '1.2rem',
  fontWeight: '800',
  color: '#1e293b',
  flex: 1
};

const editLink = {
  fontSize: '0.85rem',
  fontWeight: '700',
  color: 'var(--primary)',
  textDecoration: 'none'
};

const iconBox = {
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  backgroundColor: 'rgba(79, 134, 247, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--primary)'
};
