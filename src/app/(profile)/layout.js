"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './profile-layout.module.css';
import { 
  User, 
  Settings, 
  ShieldCheck, 
  CreditCard, 
  ToggleLeft, 
  HelpCircle, 
  Eye 
} from 'lucide-react';

export default function ProfileLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'EDIT PROFILE', icon: <User size={20} />, path: '/profile' },
    { name: 'ACCOUNT SETTINGS', icon: <Settings size={20} />, path: '/account-settings' },
    { name: 'SECURITY', icon: <ShieldCheck size={20} />, path: '/security' },
    { name: 'BILLING', icon: <CreditCard size={20} />, path: '/billing' },
    { name: 'PREFERENCES', icon: <ToggleLeft size={20} />, path: '/preferences' },
  ];

  const footerNav = [
    { name: 'HELP CENTER', icon: <HelpCircle size={20} />, path: '/help' },
    { name: 'PRIVACY', icon: <Eye size={20} />, path: '/privacy' },
  ];

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.layoutInner}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.userCard}>
            <div className={styles.avatarWrapper}>
              <img 
                src="/images/amber.png" 
                alt="User" 
                className={styles.avatar} 
              />
            </div>
            <h2 className={styles.userName}>Julianne Moore</h2>
            <span className={styles.userRole}>PREMIUM MEMBER</span>
          </div>

          <nav className={styles.navSection}>
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={index} 
                  href={item.path}
                  className={`${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className={styles.footerNav}>
            {footerNav.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={index} 
                  href={item.path}
                  className={`${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
            <div className={styles.logoutBtn}>LOGOUT</div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={styles.mainContainer}>
          {children}
        </main>
      </div>
    </div>
  );
}
