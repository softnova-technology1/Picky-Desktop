"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";
import FashionHero from "@/Components/FashionHero";
import CuratedCategory from "@/Components/CuratedCategory";
import Seasonal from "@/Components/Seasonal";
import Trending from "@/Components/trending";
import FeaturedVendorS from "@/Components/FeaturedVendorS";
import TestimonialSection from "@/Components/TestimonialSection";
import AppSection from "@/Components/AppSection";

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
