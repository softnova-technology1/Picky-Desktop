"use client";

import React from 'react';
import Link from 'next/link';
import styles from './cancel-order.module.css';
import { 
  ChevronLeft, 
  ChevronDown, 
  Wallet, 
  Clock, 
  ChevronRight 
} from 'lucide-react';
import CancelOrderPopup from '@/Components/CancelOrderPopup';

export default function CancelOrderPage() {
  const [showPopup, setShowPopup] = React.useState(false);
  const items = [
    {
      id: 1,
      name: "Ethereal Form Vase",
      variant: "Matte Bone Finish / Large",
      qty: 1,
      price: "$124.00",
      image: "https://i.pinimg.com/736x/ae/ef/07/aeef075aa6ec0b293ab809683d38df6a.jpg"
    },
    {
      id: 2,
      name: "Textured Linen Throw",
      variant: "Ecru / Organic Cotton Mix",
      qty: 1,
      price: "$88.00",
      image: "https://i.pinimg.com/736x/d0/e2/9b/d0e29b99da6fab6fccedfb599a2d5867.jpg"
    }
  ];

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.container}>
        
        {/* Header Section */}
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Cancel Order</h1>
            <div className={styles.orderMeta}>
              ORDER ID: <span>#ED-928374</span> &nbsp; • &nbsp; PLACED ON: <span>NOVEMBER 12, 2024</span>
            </div>
          </div>
          <Link href="/my-orders" className={styles.historyLink}>
             <ChevronLeft size={16} /> VIEW ORDER HISTORY
          </Link>
        </div>

        <div className={styles.layoutGrid}>
          {/* Main Content Area */}
          <div className={styles.mainContent}>
            
            {/* Review Items */}
            <h2 className={styles.sectionTitle}>Review Items</h2>
            <div className={styles.itemList}>
              {items.map(item => (
                <div key={item.id} className={styles.itemCard}>
                  <div className={styles.itemMain}>
                    <img src={item.image} alt={item.name} className={styles.itemImg} />
                    <div className={styles.itemInfo}>
                       <h4>{item.name}</h4>
                       <p className={styles.itemVariant}>{item.variant}</p>
                       <span className={styles.itemQty}>Qty: {item.qty}</span>
                    </div>
                  </div>
                  <span className={styles.itemPrice}>{item.price}</span>
                </div>
              ))}
            </div>

            {/* Reason for Cancellation */}
            <div className={styles.reasonSection}>
               <h2 className={styles.sectionTitle}>Reason for Cancellation</h2>
               <p className={styles.helperText}>Help us improve our curation by telling us why you changed your mind.</p>
               <div className={styles.dropdown}>
                  SELECT A REASON
                  <ChevronDown size={14} />
               </div>
            </div>

            {/* Additional Comments */}
            <div className={styles.commentsSection}>
               <h3>Additional Comments (Optional)</h3>
               <textarea 
                  className={styles.textArea}
                  placeholder="How can we help you better?"
               ></textarea>
            </div>
          </div>

          {/* Sidebar Area: Refund Summary */}
          <aside className={styles.sidebar}>
             <div className={styles.sidePanel}>
                <h3 className={styles.refundHeader}>Refund Information</h3>
                
                <div className={styles.refundList}>
                   <div className={styles.refundItem}>
                      <Wallet size={20} className={styles.refundIcon} />
                      <div className={styles.refundInfo}>
                         <h5>Original Payment Method</h5>
                         <p>Funds will be returned to your Visa ending in •••• 4242.</p>
                      </div>
                   </div>

                   <div className={styles.refundItem}>
                      <Clock size={20} className={styles.refundIcon} />
                      <div className={styles.refundInfo}>
                         <h5>Estimated Timeline</h5>
                         <p>Once processed, please allow 3-5 business days for the credit to appear on your statement.</p>
                      </div>
                   </div>
                </div>

                <div className={styles.refundTotal}>
                   <span className={styles.totalLabel}>TOTAL REFUND</span>
                   <span className={styles.totalValue}>$212.00</span>
                </div>
             </div>

             <div className={styles.buttonGroup}>
                <button className={styles.confirmBtn} onClick={() => setShowPopup(true)}>Confirm Cancellation</button>
                <button className={styles.cancelBtn}>Keep My Order</button>
             </div>

             <p className={styles.disclaimer}>
                By confirming, you acknowledge that items will be returned to stock and the cancellation cannot be undone.
             </p>
          </aside>
        </div>

      </div>
      <CancelOrderPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
}
