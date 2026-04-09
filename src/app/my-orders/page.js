"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './orders.module.css';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Truck, 
  XCircle, 
  Search,
  PackageCheck,
  RotateCcw,
  ExternalLink
} from 'lucide-react';

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [timeRange, setTimeRange] = useState('Last 3 months');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const allOrders = [
    {
      id: "AU-928374",
      date: "October 14, 2023",
      total: "$245.00",
      shipTo: "Alex Thompson",
      status: "Delivered",
      statusDate: "DELIVERED OCT 18",
      productName: "Nike Air Zoom Pegasus 38",
      productDesc: "Crafted for everyday running, featuring high-rebound cushioning and a breathable mesh upper in triple black.",
      image: "https://i.pinimg.com/736x/ae/ef/07/aeef075aa6ec0b293ab809683d38df6a.jpg",
      primaryAction: "Buy it again",
      secondaryAction: "Return Item"
    },
    {
      id: "AU-104928",
      date: "October 28, 2023",
      total: "$120.00",
      shipTo: "Alex Thompson",
      status: "Shipped",
      statusDate: "SHIPPED - ARRIVING FRIDAY",
      productName: "Handcrafted Ceramic Brew Kit",
      productDesc: "Artisanal-made pour-over set finished in a matte basalt glaze. Includes heat-resistant glass carafe.",
      image: "https://i.pinimg.com/736x/d0/e2/9b/d0e29b99da6fab6fccedfb599a2d5867.jpg",
      primaryAction: "Track Package",
      secondaryAction: "Modify Order"
    },
    {
      id: "AU-883712",
      date: "September 12, 2023",
      total: "$55.00",
      shipTo: "Alex Thompson",
      status: "Cancelled",
      statusDate: "CANCELLED",
      productName: "Minimalist Daily Journal",
      productDesc: "Premium 120gsm paper bound in responsibly sourced vegan leather.",
      image: "https://i.pinimg.com/1200x/e1/1a/d6/e11ad623f494e27924d33917fc6f982e.jpg",
      primaryAction: "Re-order",
      secondaryAction: null
    },
    {
      id: "AU-772819",
      date: "August 20, 2023",
      total: "$89.50",
      shipTo: "Alex Thompson",
      status: "Delivered",
      statusDate: "DELIVERED AUG 25",
      productName: "Studio Wireless Headphones",
      productDesc: "Superior sound quality with active noise cancellation and 40-hour battery life.",
      image: "https://i.pinimg.com/736x/ae/ef/07/aeef075aa6ec0b293ab809683d38df6a.jpg",
      primaryAction: "Buy it again",
      secondaryAction: "Write Review"
    },
    {
      id: "AU-661524",
      date: "July 05, 2023",
      total: "$210.00",
      shipTo: "Alex Thompson",
      status: "Delivered",
      statusDate: "DELIVERED JULY 10",
      productName: "Luxury Silk Bedding Set",
      productDesc: "100% mulberry silk set for ultimate sleep comfort and skin protection.",
      image: "https://i.pinimg.com/736x/d0/e2/9b/d0e29b99da6fab6fccedfb599a2d5867.jpg",
      primaryAction: "Buy it again",
      secondaryAction: "Return Item"
    }
  ];

  // Functional Logic: Filtering
  const filteredOrders = useMemo(() => {
    return allOrders.filter(order => {
      const matchesTab = activeTab === 'All Orders' || order.status === activeTab;
      const matchesSearch = order.productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           order.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  // Functional Logic: Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <CheckCircle2 size={14} className={styles.statusDelivered} />;
      case 'Shipped': return <Truck size={14} className={styles.statusShipped} />;
      case 'Cancelled': return <XCircle size={14} className={styles.statusCancelled} />;
      default: return null;
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.container}>
        
        {/* Page Header */}
        <header className={styles.header}>
           <h1 className={styles.title}>My Orders</h1>
           <p className={styles.subtitle}>
             Manage and track your recent marketplace purchases. View shipment updates and revisit your favorite finds.
           </p>
        </header>

        {/* Enhanced Controls Row */}
        <div className={styles.controlsRow}>
          <div className={styles.filterRow}>
            <div className={styles.tabs}>
              {['All Orders', 'Shipped', 'Delivered', 'Cancelled'].map(tab => (
                <div 
                  key={tab} 
                  className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                  onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                >
                  {tab}
                </div>
              ))}
            </div>
            
            <div className={styles.searchWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search orders or products..." 
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>

            <select 
              className={styles.timeRange}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>2023</option>
            </select>
          </div>
        </div>

        {/* Order List */}
        <div className={styles.orderList}>
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.headerInfoItem}>
                    <span className={styles.label}>ORDER PLACED</span>
                    <span className={styles.value}>{order.date}</span>
                  </div>
                  <div className={styles.headerInfoItem}>
                    <span className={styles.label}>TOTAL</span>
                    <span className={styles.value}>{order.total}</span>
                  </div>
                  <div className={styles.headerInfoItem}>
                    <span className={styles.label}>SHIP TO</span>
                    <span className={styles.value}>{order.shipTo}</span>
                  </div>
                  <div className={styles.headerInfoItem}>
                    <span className={styles.label}>ORDER #</span>
                    <span className={styles.value}>{order.id}</span>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <img src={order.image} alt={order.productName} className={styles.productImage} />
                  
                  <div className={styles.infoArea}>
                    <div className={`${styles.statusBadge} ${styles[`status${order.status}`]}`}>
                      {getStatusIcon(order.status)}
                      <span>{order.statusDate}</span>
                    </div>
                    <h3 className={styles.productName}>{order.productName}</h3>
                    <p className={styles.productDesc}>{order.productDesc}</p>
                    
                    <div className={styles.links}>
                      <span className={styles.actionLink}><PackageCheck size={14} style={{ marginRight: '6px' }} /> Order Details</span>
                      <span className={styles.actionLink}><RotateCcw size={14} style={{ marginRight: '6px' }} /> Write Review</span>
                    </div>
                  </div>

                  <div className={styles.buttonGroup}>
                    <button 
                      className={styles.primaryBtn}
                      onClick={() => alert(`Redirecting to action: ${order.primaryAction}`)}
                    >
                      {order.primaryAction}
                    </button>
                    {order.secondaryAction ? (
                      <button 
                        className={styles.secondaryBtn}
                        onClick={() => alert(`Internal Modal: ${order.secondaryAction}`)}
                      >
                        {order.secondaryAction}
                      </button>
                    ) : (
                      <button className={styles.secondaryBtn} disabled>Not Available</button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <ShoppingBag size={48} strokeWidth={1} style={{ opacity: 0.2, marginBottom: '20px' }} />
              <h3>No matching orders found</h3>
              <p>Try searching for a different keyword or adjusting your filters.</p>
            </div>
          )}
        </div>

        {/* Functional Pagination */}
        {filteredOrders.length > 0 && (
          <div className={styles.pagination}>
            <div className={styles.pageControls}>
               <button 
                 className={styles.navBtn} 
                 disabled={currentPage === 1}
                 onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
               >
                 <ChevronLeft size={18} />
               </button>
               
               {[...Array(totalPages)].map((_, i) => (
                 <div 
                   key={i + 1}
                   className={`${styles.pageNum} ${currentPage === i + 1 ? styles.pageNumActive : ''}`}
                   onClick={() => setCurrentPage(i + 1)}
                 >
                   {i + 1}
                 </div>
               ))}

               <button 
                 className={styles.navBtn} 
                 disabled={currentPage === totalPages}
                 onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
               >
                 <ChevronRight size={18} />
               </button>
            </div>
            <div className={styles.resultsSummary}>
              SHOWING {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredOrders.length)} OF {filteredOrders.length} ORDERS
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
