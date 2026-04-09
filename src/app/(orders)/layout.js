"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./orders-layout.module.css";
import { 
  ShoppingBag, 
  MapPin, 
  FileText, 
  XOctagon 
} from "lucide-react";

export default function OrdersLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { name: "My Orders", path: "/my-orders", icon: <ShoppingBag size={18} /> },
    { name: "Order Details", path: "/order-details", icon: <FileText size={18} /> },
    { name: "Order Tracking", path: "/order-tracking", icon: <MapPin size={18} /> },
    { name: "Cancel Order", path: "/cancel-order", icon: <XOctagon size={18} /> },
  ];

  return (
    <div className={styles.layoutWrapper}>
      <nav className={styles.navContainer}>
        <div className={styles.navBar}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {item.icon}
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
      <main className={styles.pageContent}>
        {children}
      </main>
    </div>
  );
}
