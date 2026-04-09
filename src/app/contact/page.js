'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Pin as Pinterest, ArrowUpRight } from 'lucide-react';
import styles from './Contact.module.css';

export default function ContactPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className={styles.contactPage}>
      {/* 1. Hero Section */}
      <section className={styles.heroSection}>
        <motion.h1 
          className={styles.heroTitle}
          {...fadeIn}
        >
          Get in touch.
        </motion.h1>
        <motion.p 
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Whether you have an inquiry or need assistance, our team is here to help.
        </motion.p>
      </section>

      {/* 2. Main Layout (2-Column) */}
      <main className={styles.mainContent}>
        
        {/* Left Side - Contact Form */}
        <motion.section 
          className={styles.formSection}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input type="text" placeholder="Your Full Name" className={styles.input} />
            </div>
            
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="email" placeholder="email@example.com" className={styles.input} />
            </div>
            
            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea placeholder="How may we assist you today?" className={styles.textarea}></textarea>
            </div>
            
            <button type="submit" className={styles.submitBtn}>
              Send Message
            </button>
          </form>
        </motion.section>

        {/* Right Side - Info Section */}
        <motion.section 
          className={styles.infoSection}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className={styles.infoImageContainer}>
            <Image 
              src="/images/contact-details.png" 
              alt="Editorial Still Life" 
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className={styles.infoContent}>
            <div className={styles.infoBlock}>
              <h3>Visit Us</h3>
              <p>
                14 Rue de la Paix,<br />
                75002 Paris, France
              </p>
              <p style={{ marginTop: '1rem' }}>
                24 Savile Row,<br />
                London W1S 3PR, UK
              </p>
            </div>

            <div className={styles.infoBlock}>
              <h3>Connect</h3>
              <div className={styles.socials}>
                <a href="#" className={styles.socialLink}>
                  Instagram <ArrowUpRight size={16} />
                </a>
                <a href="#" className={styles.socialLink}>
                  Pinterest <ArrowUpRight size={16} />
                </a>
                <a href="#" className={styles.socialLink}>
                  LinkedIn <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </motion.section>

      </main>

      {/* 3. Bottom Section - Abstract/Map */}
      <motion.section 
        className={styles.bottomSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.237256199187!2d2.329845376885374!3d48.87181640034509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e3bce748805%3A0xc6cb5a3d72b22709!2s14%20Rue%20de%20la%20Paix%2C%2075002%20Paris%2C%20France!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(0.6) opacity(0.8) contrast(1.1)' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className={styles.bottomOverlay}></div>
      </motion.section>
    </div>
  );
}
