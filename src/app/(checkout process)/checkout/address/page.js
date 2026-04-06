'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, Briefcase, MapPin, Plus, Check, ChevronLeft, Trash2, Edit2 } from 'lucide-react';

// Styling Constants
const addressCard = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '1.5rem',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: 'var(--border)',
  transition: 'all 0.3s ease',
  position: 'relative'
};

const addressCardActive = {
  ...addressCard,
  borderColor: 'var(--primary)',
  backgroundColor: 'rgba(79, 134, 247, 0.02)',
  boxShadow: '0 10px 30px rgba(79, 134, 247, 0.08)'
};

const iconBox = {
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  backgroundColor: '#f1f5f9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--primary)'
};

const iconBoxActive = {
  ...iconBox,
  backgroundColor: 'var(--primary)',
  color: 'white'
};

const defaultBadge = {
  fontSize: '0.7rem',
  fontWeight: '800',
  backgroundColor: 'var(--primary)',
  color: 'white',
  padding: '4px 10px',
  borderRadius: '99px',
  letterSpacing: '0.05em'
};

const addressText = {
  fontSize: '0.9rem',
  color: 'var(--text-muted)',
  lineHeight: '1.6',
  marginBottom: '1rem'
};

const selectBtn = {
  padding: '0.6rem 1.5rem',
  borderRadius: '0.75rem',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--border)',
  backgroundColor: 'transparent',
  fontWeight: '600',
  fontSize: '0.85rem',
  cursor: 'pointer',
  transition: 'all 0.2s'
};

const selectedBtn = {
  ...selectBtn,
  backgroundColor: 'var(--primary)',
  color: 'white',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem'
};

const actionBtn = {
  width: '38px',
  height: '38px',
  borderRadius: '10px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--border)',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: 'var(--text-muted)',
  transition: 'all 0.2s'
};

const deleteBtn = {
  ...actionBtn,
  color: '#ef4444',
  borderColor: '#fee2e2'
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.6rem',
  fontSize: '0.875rem',
  fontWeight: '600',
  color: 'var(--foreground)'
};

const inputStyle = {
  width: '100%',
  padding: '0.875rem 1.25rem',
  borderRadius: '0.75rem',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--border)',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.2s',
  backgroundColor: '#f8fafc'
};

export default function AddressPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(null); // ID of address being edited
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    type: 'Home' // Home, Office, etc.
  });

  // Load from localStorage on mount
  useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('picky_addresses');
      if (saved) {
        const parsed = JSON.parse(saved);
        setAddresses(parsed);
        if (parsed.length > 0) setSelectedId(parsed[0].id);
      }
    }
  }, []);

  // Save to localStorage whenever addresses change
  React.useEffect(() => {
    localStorage.setItem('picky_addresses', JSON.stringify(addresses));
  }, [addresses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    
    if (isEditing !== null) {
      // Update existing
      setAddresses(prev => prev.map(addr => addr.id === isEditing ? { ...formData, id: isEditing } : addr));
      setIsEditing(null);
    } else {
      // Add new
      const newAddress = { ...formData, id: Date.now() };
      setAddresses(prev => [...prev, newAddress]);
      if (!selectedId) setSelectedId(newAddress.id);
    }

    // Reset form
    setFormData({
      fullName: '',
      mobile: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      type: 'Home'
    });
  };

  const handleEdit = (addr) => {
    setFormData(addr);
    setIsEditing(addr.id);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleContinue = () => {
    if (!selectedId) {
      alert('Please select a delivery address to continue.');
      return;
    }
    const selected = addresses.find(a => a.id === selectedId);
    localStorage.setItem('picky_shipping_address', JSON.stringify(selected));
    router.push('/checkout/delivery-options');
  };

  return (
    <div className="section section-light" style={{ minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Header & Progress */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
             <div>
                <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem' }}>Delivery Address</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Checkout Step 2 of 3</p>
             </div>
             <Link href="/checkout" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600' }}>
                <ChevronLeft size={18} /> Back to Shipping
             </Link>
          </div>
          
          <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '66%', height: '100%', backgroundColor: 'var(--primary)', borderRadius: '4px' }}></div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '2.5rem' }}>
          
          {/* Saved Addresses List */}
          {addresses.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {addresses.map((addr) => (
                <div key={addr.id} style={selectedId === addr.id ? addressCardActive : addressCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={selectedId === addr.id ? iconBoxActive : iconBox}>
                      {addr.type === 'Office' ? <Briefcase size={20} /> : <Home size={20} />}
                    </div>
                    {selectedId === addr.id && <span style={defaultBadge}>SELECTED</span>}
                  </div>
                  <h3 style={{ fontWeight: '700', marginBottom: '0.25rem', fontSize: '1.1rem' }}>{addr.fullName}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: '600' }}>{addr.mobile}</p>
                  <p style={addressText}>
                    {addr.street}<br/>
                    {addr.city}, {addr.state} {addr.zip}<br/>
                    {addr.country}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                    <button 
                      onClick={() => setSelectedId(addr.id)}
                      style={selectedId === addr.id ? selectedBtn : selectBtn}
                    >
                      {selectedId === addr.id ? <><Check size={16} /> Current</> : 'Select'}
                    </button>
                    <button onClick={() => handleEdit(addr)} style={actionBtn}><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(addr)} style={deleteBtn}><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Combined Continue Button */}
          {addresses.length > 0 && !isEditing && (
            <div style={{ padding: '1.5rem', backgroundColor: 'rgba(79, 134, 247, 0.05)', borderRadius: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontWeight: '600', color: 'var(--primary)' }}>Ready to proceed with selected address?</p>
              <button 
                onClick={handleContinue}
                className="btn btn-primary" 
                style={{ padding: '0.75rem 2rem', borderRadius: '0.75rem' }}
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* New/Edit Address Form */}
          <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '2rem', boxShadow: 'var(--shadow)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
               <div style={iconBox}><Plus size={20} /></div>
               <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{isEditing ? 'Edit Address' : 'Add New Address'}</h2>
            </div>

            <form onSubmit={handleSaveAddress} style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input name="fullName" type="text" placeholder="John Doe" style={inputStyle} value={formData.fullName} onChange={handleInputChange} required />
                </div>
                <div>
                  <label style={labelStyle}>Mobile Number</label>
                  <input name="mobile" type="tel" placeholder="+1 (000) 000-0000" style={inputStyle} value={formData.mobile} onChange={handleInputChange} required />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Street Address</label>
                <input name="street" type="text" placeholder="123 Street Name" style={inputStyle} value={formData.street} onChange={handleInputChange} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>City</label>
                  <input name="city" type="text" placeholder="City" style={inputStyle} value={formData.city} onChange={handleInputChange} required />
                </div>
                <div>
                  <label style={labelStyle}>State</label>
                  <input name="state" type="text" placeholder="State" style={inputStyle} value={formData.state} onChange={handleInputChange} required />
                </div>
                <div>
                  <label style={labelStyle}>ZIP</label>
                  <input name="zip" type="text" placeholder="ZIP" style={inputStyle} value={formData.zip} onChange={handleInputChange} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Country</label>
                  <select name="country" style={inputStyle} value={formData.country} onChange={handleInputChange}>
                    <option>United States</option>
                    <option>Canada</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Address Type</label>
                  <select name="type" style={inputStyle} value={formData.type} onChange={handleInputChange}>
                    <option>Home</option>
                    <option>Office</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '1.25rem', borderRadius: '1rem', fontSize: '1.1rem', fontWeight: '700' }}>
                  {isEditing ? 'Update Address' : 'Save Address'}
                </button>
                {isEditing && (
                  <button type="button" onClick={() => { setIsEditing(null); setFormData({ fullName: '', mobile: '', street: '', city: '', state: '', zip: '', country: 'United States', type: 'Home' }); }} className="btn" style={{ padding: '1.25rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Delivery Area Preview (As per screenshot) */}
          <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '2rem', boxShadow: 'var(--shadow)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--border)' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <MapPin size={24} style={{ color: 'var(--primary)' }} />
                <h2 style={{ fontSize: '1.3rem', fontWeight: '700' }}>Delivery Area Preview</h2>
             </div>
             <div style={{ 
                height: '300px', 
                backgroundColor: '#cbd5e1', 
                borderRadius: '1.5rem', 
                overflow: 'hidden', 
                position: 'relative',
                backgroundImage: 'url("https://www.mapquestapi.com/staticmap/v5/map?key=GvGAuD7V39N5y6M0y0vC3q0J3O0vD6v0&center=Chicago,IL&size=1000,600&zoom=11")' /* Mock map */,
                backgroundSize: 'cover'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  backgroundColor: 'white',
                  padding: '8px 16px',
                  borderRadius: '99px',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                  Delivery available in your area
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

