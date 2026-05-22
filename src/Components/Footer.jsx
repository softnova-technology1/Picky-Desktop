"use client"
import styles from '../Stylesheet/Footer.module.css';
import Image from 'next/image';
import { MapPin, Phone, Mail } from "lucide-react";

const FacebookIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const InstagramIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const YoutubeIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>;
const TwitterIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>;

/**
 * Global Premium Footer Component
 */
const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>

      <div className="container">
        <div className={styles.footerMainGrid}>
          {/* Column 1: Company & Contact */}
          <div className={styles.footerColBrand}>
            <div className={styles.footerLogo}>
              <div className={styles.logoIconFooter}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <span>Picky</span>
            </div>
            <p className={styles.footerDesc}>
              The modern marketplace for premium curated products and verified worldwide vendors. Quality in every pick.
            </p>
            
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <MapPin size={18} className={styles.contactIcon} /> 
                <span>1st Floor, Softnova Appartment, SNV Mahal back side,
                Near SBI bank, Peravurani.</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={18} className={styles.contactIcon} /> 
                <span>+91 63851 18083</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={18} className={styles.contactIcon} /> 
                <span>support@picky.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.footerColLinks}>
            <h4 className={styles.footerColTitle}>Quick Links</h4>
            <ul className={styles.footerLinksList}>
              <li><a href="/">Home</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/sale">Sale</a></li>
              <li><a href="/new-arrivals">New Arrivals</a></li>
              <li><a href="/blog">Blog / Articles</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/mission">Our Story / Mission</a></li>
            </ul>
          </div>

          {/* Column 3: Account & Legal */}
          <div className={styles.footerColLinks}>
            <h4 className={styles.footerColTitle}>Customer Account</h4>
            <ul className={styles.footerLinksList}>
              <li><a href="/login">My Account / Login</a></li>
              <li><a href="/orders">Order Tracking</a></li>
              <li><a href="/wishlist">Wishlist</a></li>
            </ul>
            
            <h4 className={styles.footerColTitle} style={{marginTop: '30px'}}>Legal</h4>
            <ul className={styles.footerLinksList}>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/cookie-policy">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Customer Support */}
          <div className={styles.footerColLinks}>
            <h4 className={styles.footerColTitle}>Customer Support</h4>
            <ul className={styles.footerLinksList}>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/faq">FAQ / Help Center</a></li>
              <li><a href="/returns">Return & Refund Policy</a></li>
              <li><a href="/shipping-policy">Shipping Policy</a></li>
              <li><a href="/cancellation">Cancellation Policy</a></li>
            </ul>
          </div>

          {/* Column 5: Newsletter & Connect */}
          <div className={styles.footerColNewsletter}>
            <h4 className={styles.footerColTitle}>Newsletter Signup</h4>
            <p className={styles.newsletterDesc}>Subscribe to get updates on exclusive offers and new arrivals.</p>
            <div className={styles.newsletterBox}>
              <input type="email" placeholder="Your email address" className={styles.newsletterInput} />
              <button className={styles.newsletterBtn}>Subscribe</button>
            </div>
            
            <h4 className={styles.footerColTitle} style={{marginTop: '36px', marginBottom: '16px'}}>Connect With Us</h4>
            <div className={styles.footerSocials}>
              <a href="#" className={styles.socialIcon} aria-label="Instagram"><InstagramIcon size={18} /></a>
              <a href="#" className={styles.socialIcon} aria-label="Facebook"><FacebookIcon size={18} /></a>
              <a href="#" className={styles.socialIcon} aria-label="YouTube"><YoutubeIcon size={18} /></a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter"><TwitterIcon size={18} /></a>
            </div>


          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment */}
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            <div className={styles.copyrightText}>
              © 2026 Picky MarketPlace Inc. All rights reserved.
            </div>

          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
