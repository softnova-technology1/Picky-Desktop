"use client";

import React from 'react';
import styles from './order-details.module.css';
import { 
  Check, 
  Package, 
  Truck, 
  MapPin, 
  CreditCard, 
  Download, 
  Share2, 
  HelpCircle 
} from 'lucide-react';

export default function OrderDetailsPage() {
  const items = [
    {
      id: 1,
      name: "Sculpted Canvas Sneaker",
      variant: "Desert Mist / Size 42",
      qty: 1,
      price: "$240.00",
      image: "https://i.pinimg.com/736x/ae/ef/07/aeef075aa6ec0b293ab809683d38df6a.jpg"
    },
    {
      id: 2,
      name: "The Horizon Dial Watch",
      variant: "Brushed Steel / Midnight Strap",
      qty: 1,
      price: "$485.00",
      image: "https://i.pinimg.com/736x/d0/e2/9b/d0e29b99da6fab6fccedfb599a2d5867.jpg"
    },
    {
      id: 3,
      name: "Aura Sound Studio Gen II",
      variant: "Matte Obsidian",
      qty: 1,
      price: "$350.00",
      image: "https://i.pinimg.com/1200x/e1/1a/d6/e11ad623f494e27924d33917fc6f982e.jpg"
    }
  ];

  const steps = [
    { title: "Order Confirmed", date: "OCT 14, 09:30 AM", status: "completed", icon: <Check size={18} /> },
    { title: "Processing", date: "OCT 15, 11:20 AM", status: "completed", icon: <Package size={18} /> },
    { title: "In Transit", date: "OCT 17, 04:45 PM", status: "active", icon: <Truck size={18} /> },
    { title: "Delivered", date: "EXPECTED OCT 19", status: "pending", icon: <MapPin size={18} /> }
  ];

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.container}>
        
        {/* Header Section */}
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Order Details</h1>
            <div className={styles.orderMeta}>
              <span className={styles.orderIdBadge}>ORDER #AE-2024-9182</span>
              <span className={styles.orderDate}>Placed on October 14, 2024</span>
            </div>
          </div>
          <div className={styles.deliveryEstimate}>
             <span className={styles.estimateLabel}>ESTIMATED DELIVERY</span>
             <span className={styles.estimateDate}>October 19, 2024</span>
          </div>
        </div>

        {/* Tracking Stepper */}
        <div className={styles.stepperWrapper}>
            <div className={styles.stepperLine}>
                <div className={styles.stepperLineActive}></div>
            </div>
            {steps.map((step, index) => (
                <div key={index} className={styles.step}>
                    <div className={`${styles.stepCircle} ${step.status !== 'pending' ? styles.stepCircleActive : ''}`}>
                        {step.icon}
                    </div>
                    <div className={`${styles.stepInfo} ${step.status !== 'pending' ? styles.stepInfoActive : ''}`}>
                        <label>{step.title}</label>
                        <span>{step.date}</span>
                    </div>
                </div>
            ))}
        </div>

        <div className={styles.detailsGrid}>
          {/* Main Content: Items Ordered */}
          <div className={styles.mainContent}>
            <h2 className={styles.sectionTitle}>Items Ordered</h2>
            <div className={styles.itemList}>
              {items.map(item => (
                <div key={item.id} className={styles.itemCard}>
                  <div className={styles.itemMain}>
                    <img src={item.image} alt={item.name} className={styles.itemImg} />
                    <div className={styles.itemDetails}>
                      <h4>{item.name}</h4>
                      <p className={styles.itemVariant}>{item.variant}</p>
                      <div className={styles.itemBottom}>
                         <span className={styles.qtyBadge}>Qty: {item.qty}</span>
                         <span className={styles.writeLink}>Write a Review</span>
                      </div>
                    </div>
                  </div>
                  <span className={styles.itemPrice}>{item.price}</span>
                </div>
              ))}
            </div>

            {/* Support Banner */}
            <div className={styles.helpBanner}>
               <div className={styles.helpInfo}>
                  <div className={styles.helpIcon}><HelpCircle size={24} /></div>
                  <div className={styles.helpText}>
                     <h4>Need help?</h4>
                     <p>Our editorial concierge is available 24/7.</p>
                  </div>
               </div>
               <button className={styles.supportBtn}>Contact Support</button>
            </div>
          </div>

          {/* Side Panel: Summaries */}
          <div className={styles.sidePanel}>
            <div className={styles.sideSection}>
               <label><MapPin size={12} /> SHIPPING ADDRESS</label>
               <div className={styles.addressBox}>
                  <h5>Julianne Sterling</h5>
                  <p>
                    482 Editorial Lane, Suite 10 <br />
                    San Francisco, CA 94103 <br />
                    United States
                  </p>
               </div>
            </div>

            <div className={styles.sideSection}>
               <label><CreditCard size={12} /> PAYMENT METHOD</label>
               <div className={styles.paymentBox}>
                  <div className={styles.visaLogo}>VISA</div>
                  <div className={styles.payInfo}>
                     <h6>Visa ending in 8842</h6>
                     <span>Exp: 09/27</span>
                  </div>
               </div>
            </div>

            <div className={styles.sideSection}>
               <label><Package size={12} /> ORDER SUMMARY</label>
               <div className={styles.summaryList}>
                  <div className={styles.summaryRow}>
                     <span>Subtotal</span>
                     <span>$1,075.00</span>
                  </div>
                  <div className={styles.summaryRow}>
                     <span>Shipping</span>
                     <span className={styles.summaryRowActive}>Free</span>
                  </div>
                  <div className={styles.summaryRow}>
                     <span>Estimated Tax</span>
                     <span>$86.00</span>
                  </div>
               </div>
               <div className={styles.totalRow}>
                  <label>Total</label>
                  <span>$1,161.00</span>
               </div>
               
               <div className={styles.sideActions}>
                  <button className={styles.primaryBtn}><Download size={16} /> Download Invoice</button>
                  <button className={styles.secondaryBtn}><Share2 size={16} /> Share Status</button>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
