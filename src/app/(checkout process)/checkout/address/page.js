'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Briefcase, 
  MapPin, 
  Plus, 
  Check, 
  ChevronLeft, 
  Trash2, 
  Edit2,
  ShoppingCart,
  CreditCard,
  ArrowRight
} from 'lucide-react';
import styles from './Address.module.css';

export default function AddressPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    type: 'Home'
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('picky_addresses');
      if (saved) {
        const parsed = JSON.parse(saved);
        setAddresses(parsed);
        if (parsed.length > 0) setSelectedId(parsed[0].id);
      }
    }
  }, []);

  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.setItem('picky_addresses', JSON.stringify(addresses));
    }
  }, [addresses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (isEditing !== null) {
      setAddresses(prev => prev.map(addr => addr.id === isEditing ? { ...formData, id: isEditing } : addr));
      setIsEditing(null);
    } else {
      const newAddress = { ...formData, id: Date.now() };
      setAddresses(prev => [...prev, newAddress]);
      if (!selectedId) setSelectedId(newAddress.id);
    }
    setFormData({ fullName: '', mobile: '', street: '', city: '', state: '', zip: '', country: 'United States', type: 'Home' });
  };

  const handleEdit = (addr) => {
    setFormData(addr);
    setIsEditing(addr.id);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleContinue = () => {
    if (!selectedId) {
      alert('Please select or add a delivery address to continue.');
      return;
    }
    const selected = addresses.find(a => a.id === selectedId);
    localStorage.setItem('picky_shipping_address', JSON.stringify(selected));
    router.push('/checkout/payment'); // Directing to payment for simplicity of this flow
  };

  return (
    <div className={styles.pageWrapper}>
      <motion.div 
        className={styles.container}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        
        {/* Step Progress UI */}
        <div className={styles.progressContainer}>
          <div className={styles.stepWrapper}>
            <div className={`${styles.step} ${styles.stepCompleted}`}>
              <div className={styles.stepCircle}><Check size={18} /></div>
              <span className={styles.stepLabel}>Cart</span>
            </div>
            <div className={`${styles.stepLine} ${styles.stepLineActive}`}></div>
            <div className={`${styles.step} ${styles.stepActive}`}>
              <div className={styles.stepCircle}>2</div>
              <span className={styles.stepLabel}>Address</span>
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.step}>
              <div className={styles.stepCircle}>3</div>
              <span className={styles.stepLabel}>Payment</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--foreground)' }}>Shipping Information</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '500' }}>Where should we send your order?</p>
          </div>
          <Link href="/checkout" style={{ color: 'var(--primary)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ChevronLeft size={20} /> Back
          </Link>
        </div>

        {/* Form Card */}
        <motion.div className={styles.card} variants={itemVariants}>
          <div className={styles.sectionHeader}>
            <div className={styles.iconBox}><MapPin size={24} /></div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{isEditing ? 'Edit Shipping Address' : 'Add New Shipping Address'}</h2>
          </div>

          <form onSubmit={handleSaveAddress} className={styles.formGrid}>
            <div className={`${styles.grid} ${styles.cols2}`}>
              <div className={styles.formGroup}>
                <label className={`${styles.label} ${styles.required}`}>Full Name</label>
                <input 
                  name="fullName" 
                  type="text" 
                  placeholder="Jane Cooper" 
                  className={styles.input} 
                  value={formData.fullName} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label className={`${styles.label} ${styles.required}`}>Mobile Number</label>
                <input 
                  name="mobile" 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  className={styles.input} 
                  value={formData.mobile} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} ${styles.required}`}>Street Address</label>
              <input 
                name="street" 
                type="text" 
                placeholder="1234 Applewood Dr" 
                className={styles.input} 
                value={formData.street} 
                onChange={handleInputChange} 
                required 
              />
            </div>

            <div className={`${styles.grid} ${styles.cols3}`}>
              <div className={styles.formGroup}>
                <label className={`${styles.label} ${styles.required}`}>City</label>
                <input name="city" type="text" placeholder="City" className={styles.input} value={formData.city} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label className={`${styles.label} ${styles.required}`}>State</label>
                <input name="state" type="text" placeholder="State" className={styles.input} value={formData.state} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label className={`${styles.label} ${styles.required}`}>ZIP Code</label>
                <input name="zip" type="text" placeholder="ZIP" className={styles.input} value={formData.zip} onChange={handleInputChange} required />
              </div>
            </div>

            <div className={`${styles.grid} ${styles.cols2}`}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Country</label>
                <select name="country" className={styles.input} value={formData.country} onChange={handleInputChange}>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Address Type</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                   {['Home', 'Office', 'Other'].map(type => (
                     <button 
                       key={type}
                       type="button"
                       onClick={() => setFormData(p => ({...p, type}))}
                       style={{
                         flex: 1,
                         padding: '0.8rem',
                         borderRadius: '0.75rem',
                         border: `2px solid ${formData.type === type ? 'var(--primary)' : 'var(--border)'}`,
                         backgroundColor: formData.type === type ? 'rgba(100, 61, 151, 0.05)' : 'white',
                         fontWeight: '700',
                         color: formData.type === type ? 'var(--primary)' : 'var(--text-muted)',
                         transition: 'all 0.2s',
                         cursor: 'pointer'
                       }}
                     >
                        {type === 'Home' && <Home size={16} style={{ marginBottom: '2px' }} />}
                        {type === 'Office' && <Briefcase size={16} style={{ marginBottom: '2px' }} />}
                        <div style={{ fontSize: '0.8rem' }}>{type}</div>
                     </button>
                   ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <button 
                type="submit" 
                className={styles.continueBtn} 
                style={{ flex: 2 }}
              >
                {isEditing ? 'Update Shipping Address' : 'Save & Continue'}
              </button>
              {isEditing && (
                <button 
                  type="button" 
                  onClick={() => { setIsEditing(null); setFormData({ fullName: '', mobile: '', street: '', city: '', state: '', zip: '', country: 'United States', type: 'Home' }); }} 
                  style={{ flex: 1, padding: '1rem', borderRadius: '1.25rem', border: '1px solid var(--border)', fontWeight: '600', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Saved Addresses Section */}
        {addresses.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className={styles.sectionHeader} style={{ marginBottom: '1.5rem' }}>
               <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Your Saved Addresses</h3>
            </div>
            <div className={styles.addressGrid}>
              {addresses.map((addr) => (
                <motion.div 
                  key={addr.id} 
                  className={`${styles.addressCard} ${selectedId === addr.id ? styles.addressCardActive : ''}`}
                  onClick={() => setSelectedId(addr.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                    <div style={{ 
                      backgroundColor: selectedId === addr.id ? 'var(--primary)' : '#f1f5f9', 
                      color: selectedId === addr.id ? 'white' : 'var(--primary)',
                      padding: '8px', 
                      borderRadius: '8px' 
                    }}>
                      {addr.type === 'Office' ? <Briefcase size={18} /> : <Home size={18} />}
                    </div>
                    {selectedId === addr.id && (
                      <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '800' }}>
                        SELECTED
                      </div>
                    )}
                  </div>
                  
                  <h4 style={{ fontWeight: '700', marginBottom: '0.2rem' }}>{addr.fullName}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>{addr.mobile}</p>
                  
                  <p style={{ fontSize: '0.85rem', color: 'var(--foreground)', lineHeight: '1.5', opacity: 0.8 }}>
                    {addr.street}, {addr.city}<br/>
                    {addr.state} {addr.zip}, {addr.country}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.5rem' }}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEdit(addr); }} 
                      style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer' }}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(addr.id); }} 
                      style={{ padding: '6px', borderRadius: '6px', border: '1px solid #fee2e2', background: 'transparent', color: '#ef4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
              
              <div 
                className={styles.addressCard} 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', gap: '0.5rem' }}
                onClick={() => { setIsEditing(null); setFormData({ fullName: '', mobile: '', street: '', city: '', state: '', zip: '', country: 'United States', type: 'Home' }); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
              >
                <Plus size={32} style={{ color: 'var(--primary)', opacity: 0.5 }} />
                <span style={{ fontWeight: '700', color: 'var(--text-muted)' }}>Add Another Address</span>
              </div>
            </div>

            {!isEditing && (
              <motion.button 
                className={styles.continueBtn}
                onClick={handleContinue}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Continue to Payment</span>
                <ArrowRight size={20} />
              </motion.button>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

