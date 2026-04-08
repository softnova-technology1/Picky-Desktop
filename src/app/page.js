"use client";
import CuratedCategory from "@/Components/CuratedCategory";
import Seasonal from "@/Components/Seasonal";
import Trending from "@/Components/trending";
import FeaturedVendorS from "@/Components/FeaturedVendorS";
import TestimonialSection from "@/Components/TestimonialSection";
import AppSection from "@/Components/AppSection";
import styles from "./page.module.css";
import FashionHero from "@/Components/FashionHero";

export default function Home() {
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
