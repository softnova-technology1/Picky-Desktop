"use client";

import React from 'react';
import styles from './tracking.module.css';
import { 
  Check, 
  MapPin, 
  Truck, 
  ShoppingBag, 
  User, 
  MessageCircle, 
  Edit3, 
  Box, 
  Package,
  XCircle
} from 'lucide-react';
import CancelOrderPopup from '@/Components/CancelOrderPopup';

export default function OrderTrackingPage() {
  const [isCancelPopupOpen, setIsCancelPopupOpen] = React.useState(false);
  const products = [
    { name: "Premium Headphones Pro", variant: "MATTE BLACK • 1 UNIT", image: "https://i.pinimg.com/736x/ae/ef/07/aeef075aa6ec0b293ab809683d38df6a.jpg" },
    { name: "Travel Hardcase", variant: "GUNMETAL • 1 UNIT", image: "https://i.pinimg.com/736x/d0/e2/9b/d0e29b99da6fab6fccedfb599a2d5867.jpg" }
  ];

  const timeline = [
    { title: "Delivered", desc: "Expected Arrival Today", status: "pending", icon: <Check size={16} /> },
    { title: "Out for Delivery", desc: "Your order is being handled by a courier", status: "active", icon: <Truck size={18} /> },
    { title: "Shipped", desc: "Oakland Distribution Center • 08:30 AM", status: "completed", icon: <Check size={16} /> },
    { title: "Order Placed", desc: "Nov 12, 2023 • 02:15 PM", status: "completed", icon: <Check size={16} /> }
  ];

  const getDotClass = (status) => {
    if (status === 'active') return styles.dotActive;
    if (status === 'completed') return styles.dotCompleted;
    return '';
  };

  const getContentClass = (status) => {
    if (status === 'active') return styles.contentActive;
    if (status === 'completed') return styles.contentCompleted;
    return '';
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.container}>
        

        {/* Page Header */}
        <header className={styles.headerRow}>
           <div className={styles.titleArea}>
              <span className={styles.topBadge}>TRACKING UPDATE</span>
              <h1 className={styles.orderId}>Order #PKY-8821</h1>
              <p className={styles.statusText}>In Transit</p>
           </div>
           <div className={styles.arrivalBox}>
              <span className={styles.arrivalLabel}>ESTIMATED ARRIVAL</span>
              <span className={styles.arrivalValue}>Today, 4:30 PM</span>
           </div>
        </header>

        {/* Main Tracking Grid */}
        <div className={styles.trackingGrid}>
           {/* Left Column: Map & Timeline */}
           <div className={styles.leftCol}>
              <div className={styles.journeySection}>
                 <h2>Journey Progress</h2>
                 <div className={styles.timeline}>
                    {timeline.map((item, index) => (
                       <div key={index} className={styles.timelineItem}>
                          <div className={`${styles.timelineDot} ${getDotClass(item.status)}`}>
                             {item.icon}
                          </div>
                          <div className={`${styles.timelineContent} ${getContentClass(item.status)}`}>
                             <h4>{item.title}</h4>
                             <p>{item.desc}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className={styles.mapSection}>
                 <div className={styles.mapWrapper}>
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62705.80165780282!2d79.10260485!3d10.7870!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baab892c906782c%3A0x19a0a4cff2e11e86!2sThanjavur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1712815600000!5m2!1sen!2sin"
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy"
                        className={styles.mapIframe}
                    ></iframe>
                    <div className={styles.currentLocationCard}>
                       <div className={styles.locationIcon}>
                          <Truck size={24} strokeWidth={1.5} />
                       </div>
                       <div className={styles.locationInfo}>
                          <label>CURRENT LOCATION</label>
                          <span>Thanjavur, Tamil Nadu</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right Column: Sidebar Panels */}
           <aside className={styles.sidebar}>
              <div className={styles.buttonGroup}>
                 <button className={styles.primaryBtn}><MessageCircle size={18} /> Live Chat Support</button>
                 <button 
                    className={styles.secondaryBtn}
                    onClick={() => setIsCancelPopupOpen(true)}
                 >
                    <XCircle size={18} /> Cancel Order
                 </button>
              </div>

              <p className={styles.helpText}>QUESTIONS? CALL US AT 1-800-GALLERY</p>

              <div className={styles.sideCard}>
                 <h3 className={styles.sideHeader}><Box size={20} /> Package Contents</h3>
                 {products.map((item, index) => (
                    <div key={index} className={styles.packageItem}>
                       <img src={item.image} alt={item.name} className={styles.itemImg} />
                       <div className={styles.itemInfo}>
                          <h5>{item.name}</h5>
                          <span>{item.variant}</span>
                       </div>
                    </div>
                 ))}
              </div>

              <div className={styles.sideCard}>
                 <h3 className={styles.sideHeader}><MapPin size={20} /> Shipping Address</h3>
                 <div className={styles.addressBox}>
                    <h5>Jameson Sterling</h5>
                    <p>842 Pine Street, Apt 4C <br /> San Francisco, CA 94108 <br /> United States</p>
                 </div>
              </div>
           </aside>
        </div>

      </div>
      <CancelOrderPopup 
         isOpen={isCancelPopupOpen} 
         onClose={() => setIsCancelPopupOpen(false)} 
         orderId="#PKY-8821" 
      />
    </div>
  );
}
