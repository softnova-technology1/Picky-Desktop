"use client";

import React from 'react';
import styles from './refund.module.css';
import { 
  Check, 
  RotateCcw, 
  Download, 
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';

export default function RefundPage() {
  const returnedItems = [
    {
      id: 1,
      name: "Arctic Series Smartwatch",
      meta: "Ref: AS-002 • Midnight Silver",
      price: "$349.00",
      image: "https://images.unsplash.com/photo-1544117518-30df1641344d?auto=format&fit=crop&w=300"
    },
    {
      id: 2,
      name: "Zenith Wireless Headphones",
      meta: "Ref: ZH-990 • Bone White",
      price: "$599.00",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300"
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.requestId}>REQUEST ID: REF-992834</span>
        <h1 className={styles.title}>Your refund is being<br />processed.</h1>
        <p className={styles.subtitle}>
          We've received your items. Our specialists are currently performing a final 
          quality assessment before releasing the funds to your original payment method.
        </p>
      </header>

      <div className={styles.mainGrid}>
        {/* Left Side: Status */}
        <div className={styles.statusSide}>
          <div className={styles.statusCard}>
            <div className={styles.trackingIcon}>
              <RotateCcw size={64} />
            </div>
            <h3 className={styles.statusTitle}>Tracking Status</h3>
            
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={`${styles.dot} ${styles.dotCompleted}`}>
                  <Check size={16} />
                </div>
                <div className={styles.itemContent}>
                  <h4>Return Received</h4>
                  <p>OCT 24, 2024 • 10:42 AM</p>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={`${styles.dot} ${styles.dotActive}`}>
                  <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }}></div>
                </div>
                <div className={styles.itemContent}>
                  <h4>Quality Check</h4>
                  <p>Our team is inspecting the items for original condition.</p>
                  <span className={styles.stepTag}>CURRENT STEP</span>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={`${styles.dot} ${styles.dotCompleted}`}></div>
                <div className={styles.itemContent}>
                  <h4>Refund Initiated</h4>
                  <p>Funds will be sent to your bank.</p>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={`${styles.dot} ${styles.dotCompleted}`}></div>
                <div className={styles.itemContent}>
                  <h4>Refund Completed</h4>
                  <p>Transaction confirmed by provider.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.itemsSection}>
            <h3 className={styles.sectionTitle}>Returned Items</h3>
            {returnedItems.map(item => (
              <div key={item.id} className={styles.itemRow}>
                <div className={styles.itemImg}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={styles.itemMain}>
                  <h4>{item.name}</h4>
                  <p className={styles.itemMeta}>{item.meta}</p>
                  <span className={styles.eligibleTag}>RETURN ELIGIBLE</span>
                </div>
                <div className={styles.itemPrice}>{item.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Summary */}
        <div className={styles.sideColumn}>
          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Refund Summary</h3>
            <div className={styles.summaryRow}>
              <span>Total Items (2)</span>
              <span>$948.00</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping Credit</span>
              <span>$12.00</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Restocking Fee</span>
              <span>-$15.00</span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>TOTAL REFUND</span>
              <span className={styles.totalAmount}>$945.00</span>
            </div>
          </div>

          <div className={styles.destinationCard}>
            <h4 className={styles.destHeader}>REFUND DESTINATION</h4>
            <div className={styles.cardBox}>
              <div className={styles.cardIcon}>VISA</div>
              <div className={styles.cardInfo}>
                <h5>Visa ending in •••• 4242</h5>
                <p>Est. arrival: 3-5 business days</p>
              </div>
            </div>
          </div>

          <button className={`${styles.actionBtn} ${styles.btnOutline}`}>
            <Download size={18} /> Download Refund Receipt
          </button>
          
          <button className={`${styles.actionBtn} ${styles.btnSolid}`}>
            <MessageSquare size={18} /> Contact Support
          </button>

          <div className={styles.noteBox}>
             <p>
              "Each item is inspected with the utmost care to ensure the highest 
              quality standards for our next collector. We appreciate your patience 
              during this process."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
