'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, Zap, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function DeliveryOptionsPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('standard');

  const options = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      time: '3-5 business days',
      price: 'FREE',
      icon: <Box size={24} />,
      image: '/images/standard_delivery_boxes.png',
      description: 'Reliable shipping for your everyday needs.'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      time: '1-2 business days',
      price: '$5.99',
      icon: <Zap size={24} />,
      image: '/images/express_delivery_van.png',
      description: 'Need it fast? Get your order tomorrow with our priority handling.'
    }
  ];

  const handleContinue = () => {
    const selected = options.find(o => o.id === selectedOption);
    // Remove React components (icon) before stringifying to avoid circular reference errors
    const { icon, ...serializableSelected } = selected;
    localStorage.setItem('picky_delivery_option', JSON.stringify(serializableSelected));
    router.push('/checkout/order-summary');
  };

  return (
    <div className="section section-light" style={{ minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Header & Progress */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1.5rem' }}>
             <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>Delivery Options</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Select your preferred shipping method</p>
             </div>
             <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.25rem' }}>Step 2 of 3</p>
                <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#64748b' }}>SHIPPING</p>
             </div>
          </div>
          
          <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '66%', height: '100%', backgroundColor: 'var(--primary)', borderRadius: '4px' }}></div>
          </div>
        </div>

        {/* Options List */}
        <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
          {options.map((option) => (
            <div 
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              style={selectedOption === option.id ? optionCardActive : optionCard}
            >
              <div style={{ display: 'flex', gap: '2rem', flex: 1 }}>
                {/* Icon & Details */}
                <div style={{ flex: 1, display: 'flex', gap: '1.5rem' }}>
                   <div style={selectedOption === option.id ? iconBoxActive : iconBox}>
                      {option.icon}
                   </div>
                   <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', display: 'block', marginBottom: '0.25rem' }}>{option.price}</span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>{option.name}</h3>
                      <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5', maxWidth: '300px' }}>{option.description} Arrives in {option.time}.</p>
                      
                      <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ 
                          width: '20px', 
                          height: '20px', 
                          borderRadius: '50%', 
                          borderStyle: 'solid',
                          borderWidth: selectedOption === option.id ? '6px' : '2px',
                          borderColor: selectedOption === option.id ? 'var(--primary)' : '#cbd5e1',
                          transition: 'all 0.2s'
                        }}></div>
                        <span style={{ fontSize: '0.9rem', fontWeight: '700', color: selectedOption === option.id ? 'var(--primary)' : '#64748b' }}>
                          {selectedOption === option.id ? 'Selected' : 'Select Option'}
                        </span>
                      </div>
                   </div>
                </div>

                {/* Abstract Preview Image (As per screenshot) */}
                <div style={{ width: '220px', height: '140px', borderRadius: '1rem', overflow: 'hidden', position: 'relative' }}>
                   <img src={option.image} alt={option.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={20} /> Back to Address
          </button>
          
          <button 
            onClick={handleContinue}
            className="btn btn-primary" 
            style={{ 
              padding: '1.25rem 2.5rem', 
              borderRadius: '1.25rem', 
              fontSize: '1.1rem', 
              fontWeight: '700',
              boxShadow: '0 10px 25px rgba(79, 134, 247, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            Continue to Payment <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

const optionCard = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '1.5rem',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: '#f1f5f9',
  display: 'flex',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

const optionCardActive = {
  ...optionCard,
  borderColor: 'rgba(79, 134, 247, 0.1)',
  backgroundColor: 'white',
  boxShadow: '0 15px 40px rgba(0,0,0,0.04)'
};

const iconBox = {
  width: '56px',
  height: '56px',
  borderRadius: '14px',
  backgroundColor: '#f8fafc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#64748b'
};

const iconBoxActive = {
  ...iconBox,
  backgroundColor: 'rgba(79, 134, 247, 0.08)',
  color: 'var(--primary)'
};
