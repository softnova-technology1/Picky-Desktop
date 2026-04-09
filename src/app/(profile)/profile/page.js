"use client";

import React, { useState } from 'react';
import styles from './profile.module.css';
import { 
  Camera, 
  Sparkles, 
  Download
} from 'lucide-react';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    fullName: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 000-0000',
    location: 'San Francisco, CA',
    bio: ''
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 1200);
  };

  const handleDiscard = () => {
    if (confirm('Are you sure you want to discard your changes?')) {
      setFormData({
        fullName: 'Alex Rivera',
        email: 'alex.rivera@example.com',
        phone: '+1 (555) 000-0000',
        location: 'San Francisco, CA',
        bio: ''
      });
    }
  };

  return (
    <main className={styles.mainContent}>
      <div className={styles.contentBody}>
        <header className={styles.header}>
          <h1 className={styles.title}>Profile Information</h1>
          <p className={styles.subtitle}>Manage your visual identity and public presence across Picky.</p>
        </header>

        {/* Photo Section */}
        <section className={styles.photoSection}>
          <div className={styles.profilePhotoWrapper}>
            <div className={styles.profilePhoto} style={{ 
              backgroundImage: 'url("/images/amber.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            <div className={styles.editIcon}>
              <Camera size={18} />
            </div>
          </div>
          <div className={styles.photoInfo}>
            <h3>Profile Photo</h3>
            <p>We recommend an image of at least 400x400px.<br />Gifs are not supported.</p>
          </div>
        </section>

        {/* Form Grid */}
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label>FULL NAME</label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={styles.inputField}
              placeholder="Full Name"
            />
          </div>
          <div className={styles.inputGroup}>
            <label>EMAIL ADDRESS</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.inputField}
              placeholder="alex.rivera@example.com"
            />
          </div>
          <div className={styles.inputGroup}>
            <label>PHONE NUMBER</label>
            <input 
              type="text" 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={styles.inputField}
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div className={styles.inputGroup}>
            <label>LOCATION</label>
            <input 
              type="text" 
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={styles.inputField}
              placeholder="San Francisco, CA"
            />
          </div>
        </div>

        <div className={styles.inputGroup} style={{ marginBottom: '60px' }}>
          <label>BIOGRAPHY</label>
          <textarea 
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className={`${styles.inputField} ${styles.textArea}`}
            placeholder="Share a brief story about your curatorial journey..."
          />
        </div>

        {/* Connected Accounts */}
        <section className={styles.sectionBlock}>
          <h2>Connected Accounts</h2>
          <div className={styles.accountRow}>
            <div className={styles.accountInfo}>
              <div className={styles.googleIcon}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" width={24} />
              </div>
              <div className={styles.accountDetails}>
                <h4>Google Account</h4>
                <p>alex.rivera@example.com</p>
              </div>
            </div>
            <div className={styles.statusBadge}>CONNECTED</div>
          </div>
        </section>

        {/* Data & Privacy */}
        <section className={styles.sectionBlock} style={{ marginBottom: '80px' }}>
          <h2>Data & Privacy</h2>
          <div className={styles.exportBox}>
            <div className={styles.exportInfo}>
              <h5>Export Profile Data</h5>
              <p>Download a permanent archive of your curation history and personal details.</p>
            </div>
            <div className={styles.downloadLink}>
              <Download size={20} />
              Download My Data
            </div>
          </div>
        </section>
      </div>

      {/* Floating Right Panel */}
      <div className={styles.rightPanel}>
        <div className={styles.premiumCard} style={{ backgroundColor: 'var(--primary)' }}>
          <div className={styles.activePlanBadge}>ACTIVE PLAN</div>
          <div className={styles.premiumIcon}><Sparkles size={32} /></div>
          <h2 className={styles.premiumTitle}>Premium Member</h2>
          <p className={styles.premiumDesc}>
            Enjoy unlimited archives, early access to new store drops, and zero platform fees.
          </p>
          <div className={styles.renewalBox}>
            <span className={styles.renewalLabel}>NEXT RENEWAL</span>
            <span className={styles.renewalDate}>Nov 12, 2024</span>
          </div>
          <button className={styles.manageBtn} style={{ color: 'var(--primary)' }}>Manage Subscription</button>
        </div>

        <div className={styles.actionCard}>
          <button 
            className={styles.saveBtn} 
            onClick={handleSave}
            disabled={isSaving}
            style={{ backgroundColor: 'var(--foreground)' }}
          >
            {isSaving ? 'Saving Changes...' : 'Save Changes'}
          </button>
          <button 
            className={styles.discardBtn}
            onClick={handleDiscard}
          >
            Discard
          </button>
        </div>

        <div className={styles.assistanceSection}>
          <h4 className={styles.assistanceTitle}>Need assistance?</h4>
          <p className={styles.assistanceText}>
            Our curation team is available 24/7 to help you with your account settings or premium features.
          </p>
          <span className={styles.contactLink}>
            Contact Support
          </span>
        </div>
      </div>
    </main>
  );
}
