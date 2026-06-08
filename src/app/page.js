"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";
import FashionHero from "@/components/FashionHero";
import CuratedCategory from "@/components/CuratedCategory";
import Seasonal from "@/components/Seasonal";
import Trending from "@/components/Trending";
import FeaturedVendorS from "@/components/FeaturedVendorS";
import TestimonialSection from "@/components/TestimonialSection";
import AppSection from "@/components/AppSection";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/hometwo');
    }
  }, [user, router]);

  if (user) return null;

  return (
    <main className={styles.main}>
      <FashionHero />
      <CuratedCategory />
      <Seasonal />
      <Trending />
      <FeaturedVendorS />
      <TestimonialSection />
      <AppSection />
    </main>
  );
}
