"use client"
import styles from '../Stylesheet/Footer.module.css';
import { Star, CheckCircle2, ArrowRight } from "lucide-react";
import Link from 'next/link';

/**
 * Global Footer Component
 * 4-Column Layout: Brand, Shop, Company, Newsletter
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand Column */}
           <div className={styles.footerBrandCol}>
              <div className={styles.footerLogo}>
                <div className={styles.logoIconFooter}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <span>Picky</span>
              </div>
              <p className={styles.footerDesc}>
                The modern marketplace for premium curated products and verified worldwide vendors. Quality in every pick.
              </p>
              <div className={styles.footerSocials}>
                <div className={styles.socialIcon}><Star size={18} /></div>
                <div className={styles.socialIcon}><CheckCircle2 size={18} /></div>
                <div className={styles.socialIcon}><ArrowRight size={18} /></div>
              </div>
           </div>

           {/* Shop Column */}
           <div className={styles.footerCol}>
              <h4 className={styles.footerColTitle}>Shop</h4>
              <ul className={styles.footerLinksList}>
                <li><a href="#">Trending Now</a></li>
                <li><a href="#">New Arrivals</a></li>
                <li><a href="#">Gift Cards</a></li>
                <li><a href="#">Sustainability</a></li>
              </ul>
           </div>

           {/* Company Column */}
           <div className={styles.footerCol}>
              <h4 className={styles.footerColTitle}>Company</h4>
              <ul className={styles.footerLinksList}>
                <li><a href="#">About Us</a></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
           </div>

           {/* Newsletter Column */}
           <div className={styles.footerNewsletterCol}>
              <h4 className={styles.footerColTitle}>Newsletter</h4>
              <p className={styles.newsletterDesc}>Join our newsletter to receive updates on new products and special offers.</p>
              <div className={styles.newsletterBox}>
                 <input type="email" placeholder="Your email" className={styles.newsletterInput} />
                 <button className={styles.newsletterBtn}>
                    <ArrowRight size={20} />
                 </button>
              </div>
           </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.footerBottom}>
           <div className={styles.footerBottomContent}>
              <span className={styles.copyrightText}>© 2024 Picky Marketplace Inc. All rights reserved.</span>
              <div className={styles.footerBottomLinks}>
                 <a href="#">Terms of Service</a>
                 <a href="#">Cookies</a>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
