"use client";

import { useAuth } from "@/context/AuthContext";
import Navbar from "@/Components/Navbar";
import HomeTwoNavbar from "@/Components/HomeTwoNavbar";
import Footer from "@/Components/Footer";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import AuthPopup from "@/Components/AuthPopup";

export default function NavbarWrapper({ children }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [showAutoLogin, setShowAutoLogin] = useState(false);

  useEffect(() => {
    // Only trigger if user is NOT logged in and hasn't seen it this session
    const hasShown = sessionStorage.getItem('auto_login_shown');
    
    if (!user && !hasShown && pathname !== '/login' && !pathname.includes('/create-account')) {
      const timer = setTimeout(() => {
        setShowAutoLogin(true);
        sessionStorage.setItem('auto_login_shown', 'true');
      }, 5000); // 5 seconds delay
      
      return () => clearTimeout(timer);
    }
  }, [user, pathname]);

  // Show HomeTwoNavbar if user is logged in OR if explicitly on hometwo page
  const showHomeTwoNavbar = user || pathname === "/hometwo";
  
  return (
    <>
      {showHomeTwoNavbar ? <HomeTwoNavbar /> : <Navbar />}
      {children}
      <Footer />
      
      {/* Global Auto-Login Popup */}
      <AuthPopup 
        isOpen={showAutoLogin} 
        onClose={() => setShowAutoLogin(false)} 
        initialTab="login"
      />
    </>
  );
}
