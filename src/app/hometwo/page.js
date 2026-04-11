"use client"
import Image from "next/image";
import styles from "./hometwo.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ArrowRight,
  Heart,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  User,
  Shirt,
  Smartphone,
  Sparkles,
  Laptop,
  Lamp,
  Tv,
  Gamepad2,
  Apple,
  Bike,
  Trophy,
  Book,
  Armchair,
  Flame,
  Quote,
  Truck,
  RotateCcw,
  Lock,
  Headphones,
  ShoppingCart
} from "lucide-react";
import AuthPopup from "@/Components/AuthPopup";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

export default function Home2() {
  const [userName, setUserName] = useState("Member");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("For You");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  
  const router = useRouter();
  const { addToCart, triggerNotification, setCheckoutItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  // Local notification state for Wishlist (to support custom titles without modifying global component)
  const [localNotif, setLocalNotif] = useState({ show: false, product: null, title: "" });

  const showLocalNotif = (product, title) => {
    setLocalNotif({ show: true, product, title });
    setTimeout(() => setLocalNotif(prev => ({ ...prev, show: false })), 3000);
  };

  const handleAddToCart = (e, prod) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Normalize price for cart (remove currency symbol if present)
    const numericPrice = typeof prod.price === 'string' ? parseFloat(prod.price.replace(/[^\d.]/g, '')) : prod.price;
    // Normalize image property for the notification component (which expects 'image')
    const normalizedProduct = { ...prod, price: numericPrice || 0, image: prod.image || prod.img };
    addToCart(normalizedProduct);
    triggerNotification(normalizedProduct);
  };

  const handleBuyNow = (e, prod) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const numericPrice = typeof prod.price === 'string' ? parseFloat(prod.price.replace(/[^\d.]/g, '')) : prod.price;
    const normalizedProduct = { 
      ...prod, 
      price: numericPrice || 0, 
      image: prod.image || prod.img,
      quantity: 1 
    };
    setCheckoutItems([normalizedProduct]);
    router.push('/checkout');
  };

  const handleWishlistToggle = (e, prod) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const isAdding = !isInWishlist(prod.id);
    toggleWishlist(prod);
    showLocalNotif(prod, isAdding ? "Added to Wishlist ❤️" : "Removed from Wishlist");
  };

  const promoSlides = [
    {
      brand: "ZARA",
      offer: "60% OFF",
      image: "https://i.pinimg.com/1200x/28/56/34/28563432c82fb689e5537b23e45f30fd.jpg",
      bg: "#f3f3f3"
    },
    {
      brand: "GUCCI",
      offer: "30% OFF",
      image: "https://i.pinimg.com/1200x/1d/f3/c3/1df3c39405253649603248231357d0d2.jpg",
      bg: "#e9ecef"
    },
    {
      brand: "PRADA",
      offer: "NEW DROP",
      image: "https://i.pinimg.com/1200x/13/86/b1/1386b1f8a086570c65c445c4987527d3.jpg",
      bg: "#f8f9fa"
    }
  ];

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) setUserName(savedName);

    // Carousel Timer
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 8000); // 8 seconds per slide

    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest(`.${styles.userDropdownContainer}`)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserDropdown]);

  // Entrance Scroll Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.activeReveal);
            // Optional: stop observing once revealed
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(`.${styles.revealSection}`);
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  // Magnetic Button Effect
  useEffect(() => {
    const magneticBtns = document.querySelectorAll(`.${styles.magneticBtn}`);
    
    const handleMouseMove = (e) => {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    const handleMouseLeave = (e) => {
      const btn = e.currentTarget;
      btn.style.transform = `translate(0px, 0px)`;
    };

    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      magneticBtns.forEach(btn => {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    window.location.href = '/';
  };

  const categoryRibbon = [
    { name: "For You", icon: ShoppingBag },
    { name: "Fashion", icon: Shirt },
    { name: "Mobiles", icon: Smartphone },
    { name: "Beauty", icon: Sparkles },
    { name: "Electronics", icon: Laptop },
    { name: "Home", icon: Lamp },
    { name: "Appliances", icon: Tv },
    { name: "Toys, baby...", icon: Gamepad2 },
    { name: "Food & Health", icon: Apple },
    // { name: "Auto Acc...", icon: Car },
    { name: "2 Wheeler", icon: Bike },
    { name: "Sports & ...", icon: Trophy },
    { name: "Books & ...", icon: Book },
    { name: "Furniture", icon: Armchair },
  ];

  return (
    <main className={styles.main}>

      {/* Promo Carousel (Full Width Hero) */}
      <section className={styles.promoContainer}>
        <div className={styles.carousel}>
          {promoSlides.map((slide, index) => (
            <div
              key={index}
              className={`${styles.slide} ${currentSlide === index ? styles.slideActive : ''}`}
            >
              <div className={styles.slideImage}>
                <Image
                  src={slide.image}
                  alt={slide.brand}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.slideContent}>
                <div className={styles.brandLabel}>
                  <h2 className={styles.brandSolid}>{slide.brand}</h2>
                  <h2 className={styles.brandOutline}>{slide.brand}</h2>
                </div>
                <h3 className={styles.offerText}>{slide.offer}</h3>
                <p className={styles.moreText}>+MORE</p>
                <button className={`${styles.slideCTA} ${styles.magneticBtn}`}>SHOP COLLECTION</button>
              </div>
            </div>
          ))}

          <div className={styles.navControls}>
            <button
              className={styles.navArrow}
              onClick={() => setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length)}
            >
              <ChevronLeft size={24} />
            </button>

            <div className={styles.carouselDots}>
              {promoSlides.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${currentSlide === index ? styles.dotActive : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>

            <button
              className={styles.navArrow}
              onClick={() => setCurrentSlide((prev) => (prev + 1) % promoSlides.length)}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Category Ribbon */}
      <section className={`${styles.categoryRibbon} ${styles.revealSection}`}>
        <div className={styles.ribbonContainer}>
          {categoryRibbon.map((item, idx) => (
            <div
              key={idx}
              className={`${styles.ribbonItem} ${activeCategory === item.name ? styles.ribbonActive : ''}`}
              onClick={() => setActiveCategory(item.name)}
            >
              <div className={styles.ribbonIconWrapper}>
                <item.icon size={26} strokeWidth={1.5} className={styles.ribbonIcon} />
              </div>
              <span className={styles.ribbonName}>{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reference-Matched Flash Deals Section */}
      <section className={`${styles.refFlashSection} ${styles.revealSection}`}>
        <div className="container">
          <div className={styles.userFriendlyHeader}>
            <div className={styles.titleTimerGroup}>
              <div className={styles.refFlashTextCol}>
                <h2 className={styles.refFlashTitle}>Flash Deals</h2>
                <p className={styles.refFlashSubtitle}>Don't miss out! Exclusive deals on premium essentials.</p>
              </div>
              <div className={styles.standardTimer}>
                <div className={styles.timerUnitBox}>04</div>
                <span className={styles.timerLowSep}>:</span>
                <div className={styles.timerUnitBox}>21</div>
                <span className={styles.timerLowSep}>:</span>
                <div className={styles.timerUnitBox}>55</div>
              </div>
            </div>
            <Link href="#" className={styles.refViewAll}>View All <ChevronRight size={18} /></Link>
          </div>

          <div className={styles.refFlashGrid}>
            { [
              { id: "electronics-audio-1", cat: "Electronics", name: "Premium Wireless Noise Canceling ...", price: "$249.00", old: "$399.00", discount: "-40%", type: "discount", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070" },
              { id: "fashion-watches-1", cat: "Fashion", name: "Minimalist Silver Watch Elite Edition", price: "$120.00", old: "$160.00", discount: "-25%", type: "discount", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999" },
              { id: "electronics-cameras-1", cat: "Gadgets", name: "Retro Instant Film Camera - Mint", price: "$85.00", old: "$100.00", discount: "-15%", type: "discount", img: "https://i.pinimg.com/736x/76/9d/84/769d8454f78dabe81ec54e51fea6d156.jpg" },
              { id: "fashion-footwear-1", cat: "Footwear", name: "AeroSprint Pro Running Shoes", price: "$129.00", old: "$180.00", discount: "HOT", type: "hot", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070" },
            ].map((prod, idx) => {
              const prodId = prod.id;
              return (
              <div 
                key={idx} 
                className={styles.refCard}
                onClick={() => router.push(`/product/${prodId}?img=${encodeURIComponent(prod.img)}`)}
              >
                <div className={styles.refImgWrapper}>
                  <Image src={prod.img} alt={prod.name} fill className={styles.refProductImg} />
                  <div className={`${styles.refBadge} ${prod.type === 'hot' ? styles.badgeHot : styles.badgeDisc}`}>
                    {prod.discount}
                  </div>

                  {/* Pixel-Perfect Shop Action Bar */}
                  <div className={styles.shopActionBar}>
                    <button 
                      className={styles.shopCartBtn}
                      onClick={(e) => handleAddToCart(e, { ...prod, id: prodId })}
                      title="Add to Cart"
                    >
                      <ShoppingCart size={20} />
                    </button>
                    <button 
                      className={`${styles.shopWishlistBtn} ${isInWishlist(prodId) ? styles.shopWishlistActive : ""}`}
                      onClick={(e) => handleWishlistToggle(e, { ...prod, id: prodId, image: prod.img })}
                      title={isInWishlist(prodId) ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      <Heart 
                        size={20} 
                        fill={isInWishlist(prodId) ? "#ff4d4d" : "none"} 
                        color={isInWishlist(prodId) ? "#ff4d4d" : "currentColor"} 
                      />
                    </button>
                  </div>
                </div>
                <div className={styles.refCardBody}>
                  <span className={styles.refProdCat}>{prod.cat}</span>
                  <h3 className={styles.refProdName}>{prod.name}</h3>
                  <div className={styles.refPricing}>
                    <span className={styles.refPriceNow}>{prod.price}</span>
                    <span className={styles.refPriceOld}>{prod.old}</span>
                  </div>
                  <button 
                    className={styles.refAddToCart}
                    onClick={(e) => handleBuyNow(e, { ...prod, id: prodId })}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            )}) }
          </div>
        </div>
      </section>

      {/* Reference-Matched Promotion Banners */}
      <section className={`${styles.refBannerSection} ${styles.revealSection}`}>
        <div className="container">
          <div className={styles.refBannerGrid}>
            <div className={`${styles.refBannerItem} ${styles.bannerBlack}`}>
              <Image src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012" alt="Luxe Fashion" fill className={styles.bannerImg} />
              <div className={styles.bannerOverlay}>
                <h3>Luxe Fashion</h3>
                <p>Upgrade your wardrobe with premium brands</p>
                <button 
                  className={`${styles.bannerBtn} ${styles.magneticBtn}`}
                  onClick={() => router.push('/category/fashion/footwear')}
                >
                  Explore Now
                </button>
              </div>
            </div>
            <div className={`${styles.refBannerItem} ${styles.bannerBlue}`}>
              <Image src="https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=2070" alt="Smart Tech" fill className={styles.bannerImg} />
              <div className={styles.bannerOverlay}>
                <h3>Smart Tech</h3>
                <p>The latest in innovation and productivity</p>
                <button 
                  className={`${styles.bannerBtn} ${styles.magneticBtn}`} 
                  style={{ background: '#3b82f6' }}
                  onClick={() => router.push('/category/electronics')}
                >
                  Explore Now
                </button>
              </div>
            </div>
            <div className={`${styles.refBannerItem} ${styles.bannerGray}`}>
              <Image src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2070" alt="Home Studio" fill className={styles.bannerImg} />
              <div className={styles.bannerOverlay}>
                <h3>Home Studio</h3>
                <p>Elevate your living and working space</p>
                 <button 
                  className={`${styles.bannerBtn} ${styles.magneticBtn}`} 
                  style={{ background: '#334155' }}
                  onClick={() => router.push('/category/home-decor')}
                >
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers / Deals Section - High-Conversion Layout */}
      <section className={`${styles.specialDealsMaster} ${styles.revealSection}`}>
        <div className="container">
          <div className={styles.spHeader}>
            <div className={styles.spTitleGroup}>
              <h2 className={styles.spMainTitle}>Limited Time Deals</h2>
              <div className={styles.spUnderline}></div>
            </div>
          </div>

          <div className={styles.spContentGrid}>
            {/* Main Premium Banner */}
            <div className={styles.spHeroBanner}>
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070"
                alt="Banner Deal"
                fill
                className={styles.spBannerImg}
              />
              <div className={styles.spBannerOverlay}>
                <div className={styles.spBannerInfo}>
                  <div className={styles.spHurryBadge}>Hurry! Limited Time Only</div>
                  <h3 className={styles.spPromoText}>50% OFF TODAY ONLY</h3>
                  <p className={styles.spPromoSub}>Grab the Deal Now. Exclusive high-fashion collections.</p>

                  <div className={styles.spCountdown}>
                    <div className={styles.spTimeBlock}>02<small>HRS</small></div>
                    <span className={styles.spTimeSep}>:</span>
                    <div className={styles.spTimeBlock}>45<small>MIN</small></div>
                    <span className={styles.spTimeSep}>:</span>
                    <div className={styles.spTimeBlock}>12<small>SEC</small></div>
                  </div>

                  <button 
                    className={`${styles.spMainCta} ${styles.magneticBtn}`}
                    onClick={() => router.push('/offers')}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>

            {/* Smaller Deal Cards */}
            <div className={styles.spCardsGrid}>
              {[
                { id: "fashion-footwear-1", off: "70%", title: "Elite Footwear", desc: "Premium sneakers collection.", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070" },
                { id: "electronics-smart-home-1", off: "40%", title: "Modern Tech", desc: "Next-gen smart essentials.", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065" },
                { id: "fashion-men's-wear-1", off: "55%", title: "Urban Wear", desc: "Unbeatable streetwear styles.", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920" },
                { id: "electronics-audio-1", off: "HOT", title: "Audio Gear", desc: "Studio quality listening.", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070" }
              ].map((card, i) => (
                <div 
                  key={i} 
                  className={styles.spMiniCard}
                  onClick={() => router.push(`/product/${card.id}?img=${encodeURIComponent(card.img)}`)}
                >
                  <div className={styles.spMiniVisual}>
                    <Image src={card.img} alt={card.title} fill className={styles.spMiniImg} />
                    <div className={styles.spMiniBadge}>-{card.off}</div>
                    
                    {/* Pixel-Perfect Shop Action Bar */}
                    <div className={styles.shopActionBar}>
                      <button 
                        className={styles.shopCartBtn}
                        onClick={(e) => handleBuyNow(e, { ...card, name: card.title, image: card.img, price: "₹0" })}
                        title="Add to Cart"
                      >
                        <ShoppingCart size={20} />
                      </button>
                      <button 
                        className={`${styles.shopWishlistBtn} ${isInWishlist(card.id) ? styles.shopWishlistActive : ""}`}
                        onClick={(e) => handleWishlistToggle(e, { ...card, name: card.title, image: card.img })}
                        title="Wishlist"
                      >
                        <Heart size={20} fill={isInWishlist(card.id) ? "#ff4d4d" : "none"} color={isInWishlist(card.id) ? "#ff4d4d" : "currentColor"} />
                      </button>
                    </div>
                  </div>
                  <div className={styles.spMiniBody}>
                    <h4 className={styles.spMiniTitle}>{card.title}</h4>
                    <p className={styles.spMiniDesc}>{card.desc}</p>
                    <button 
                      className={styles.spMiniBtn}
                      onClick={(e) => handleBuyNow(e, { ...card, name: card.title, image: card.img, price: "₹0" })}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS - The Mag-Grid Architectural Layout */}
      <section className={`${styles.magArrivalsMaster} ${styles.revealSection}`}>
        <div className="container">
          <div className={styles.magLayoutSplit}>

            {/* Left Sidebar Title Block */}
            <div className={styles.magTitleSidebar}>
              <div className={styles.magStickyContent}>
                <span className={styles.magSuperscript}>SEASON 2026</span>
                <h2 className={styles.magMainHeading}>New<br />Arrivals</h2>
                <p className={styles.magSidebarDesc}>Architectural silhouettes and premium textures. Discover the curation of the month.</p>
                <div className={styles.magActionLine}>
                  <Link href="/new-arrivals" className={styles.magExploreBtn}>View Entire Collection <ArrowRight size={20} /></Link>
                </div>

                {/* New Architectural Sidebar Banner */}
                <div className={styles.magSideBanner}>
                  <Image
                    src="https://i.pinimg.com/736x/83/a9/1c/83a91c9ad44aec38dcee9ad108c92739.jpg"
                    alt="Featured Look"
                    fill
                    className={styles.sideBannerImg}
                  />
                  <div className={styles.sideBannerOverlay}>
                    <div className={styles.sbTag}>LIMITED</div>
                    <div className={styles.sbTitle}>Elevated Essentials</div>
                    <div className={styles.sbOffer}>-20% OFF</div>
                    <button className={`${styles.sbBtn} ${styles.magneticBtn}`}>CLAIM NOW</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Product Flow - Medium 3-Column Grid */}
            <div className={styles.magProductFlowMedium}>
              {[
                { id: "fashion-men's-wear-5", count: "01", name: "Urban Essence Jacket", price: "₹4,999", img: "https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=1974" },
                { id: "electronics-wearables-5", count: "02", name: "Nexus Stealth Watch", price: "₹2,499", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999" },
                { id: "electronics-accessories-5", count: "03", name: "Solaris Pro Shades", price: "₹1,899", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080" },
                { id: "fashion-handbags-5", count: "04", name: "Vanguard Leather Bag", price: "₹3,750", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069" },
                { id: "electronics-audio-5", count: "05", name: "Aria Wireless Buds", price: "₹2,299", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070" },
                { id: "fashion-footwear-5", count: "06", name: "Cruiser Mesh Shoes", price: "₹2,999", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070" }
              ].map((prod, idx) => (
                <div 
                  key={idx} 
                  className={styles.magCardMedium}
                  onClick={() => router.push(`/product/${prod.id}?img=${encodeURIComponent(prod.img)}`)}
                >
                  <div className={styles.magImageFrameMedium}>
                    <Image src={prod.img} alt={prod.name} fill className={styles.magActualImg} />
                    <div className={styles.magNumberWatermark}>{prod.count}</div>
                    <div className={styles.magFloatingBadge}>NEW</div>
                    
                    {/* Pixel-Perfect Shop Action Bar */}
                    <div className={styles.shopActionBar}>
                      <button 
                        className={styles.shopCartBtn}
                        onClick={(e) => {
                          const numericPrice = typeof prod.price === 'string' ? parseFloat(prod.price.replace(/[^\d.]/g, '')) : prod.price;
                          handleAddToCart(e, { ...prod, price: numericPrice || 0, image: prod.img });
                        }}
                        title="Add to Cart"
                      >
                        <ShoppingCart size={20} />
                      </button>
                      <button 
                        className={`${styles.shopWishlistBtn} ${isInWishlist(prod.id) ? styles.shopWishlistActive : ""}`}
                        onClick={(e) => handleWishlistToggle(e, { ...prod, id: prod.id, image: prod.img })}
                        title="Wishlist"
                      >
                        <Heart size={20} fill={isInWishlist(prod.id) ? "#ff4d4d" : "none"} color={isInWishlist(prod.id) ? "#ff4d4d" : "currentColor"} />
                      </button>
                    </div>
                  </div>
                  <div className={styles.magProductMeta}>
                    <h4 className={styles.magProdName}>{prod.name}</h4>
                    <p className={styles.magProdPrice}>{prod.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS - The Spotlight Discovery Architectural Layout */}
      <section className={`${styles.spotlightMaster} ${styles.revealSection}`}>
        <div className="container">
          <div className={styles.spTitleHeader}>
            <div className={styles.spTitleMain}>
              <span className={styles.spTagLine}>TOP PERFOMERS</span>
              <h2 className={styles.spHeading}>Best Sellers</h2>
            </div>
            <div className={styles.spTitleSide}>
              <p className={styles.spSubtitleHero}>The most coveted pieces of the season, ranked by you.</p>
              <Link href="#" className={styles.spViewTrend}>View All Collection <ChevronRight size={18} /></Link>
            </div>
          </div>

          <div className={styles.spLayoutGrid}>

            {/* RANK #1 - THE PODIUM HERO (Remains Fixed Spotlight) */}
            <div 
              className={styles.podiumHeroCard}
              onClick={() => router.push(`/product/electronics-wearables-1?img=${encodeURIComponent("https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999")}`)}
            >
              <div className={styles.podiumVisual}>
                <Image src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999" alt="Top Seller" fill className={styles.podiumImg} />
                <div className={styles.podiumRankDigit}>01</div>
                <div className={styles.podiumBadge}><Trophy size={14} fill="#1a1a1a" /> TOP RANKED</div>
              </div>
              <div className={styles.podiumBody}>
                <div className={styles.podiumTrust}>
                  <div className={styles.podiumStars}>
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="#FFD700" color="#FFD700" />)}
                  </div>
                  <span className={styles.podiumReviews}>500+ Reviews</span>
                </div>
                <h3 className={styles.podiumTitle}>Nexus Stealth Edition</h3>
                <p className={styles.podiumDesc}>The definitive timepiece for the modern architect of style. Uncompromising precision and elegance.</p>

                <div className={styles.podiumHeatArea}>
                  <div className={styles.heatLabel}><Flame size={14} color="#4C0519" fill="#4C0519" /> HIGH DEMAND: 98% SOLD</div>
                  <div className={styles.heatBar}><div className={styles.heatFill} style={{ width: '98%' }}></div></div>
                </div>

                <div className={styles.podiumAction}>
                  <div className={styles.podiumPrice}>₹4,999</div>
                  <button 
                    className={`${styles.podiumAddBtn} ${styles.magneticBtn}`}
                    onClick={(e) => handleAddToCart(e, { id: "best-01", name: "Nexus Stealth Edition", price: "₹4,999", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999" })}
                  >
                    <ShoppingBag size={18} /> ADDTOCART
                  </button>
                </div>
              </div>
            </div>

            {/* AUTOMATIC TRENDING MARQUEE - Seamless Infinite Scroll */}
            <div className={styles.trendingMarqueeWrapper}>
              <div className={styles.trendingMarqueeTrack}>
                {[
                  { rank: "02", id: "electronics-audio-2", name: "Premium Wireless Pro", price: "₹8,450", desc: "Cinema-grade audio with active cancellation.", rating: 5, reviews: 312, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070", heat: "85%" },
                  { rank: "03", id: "fashion-handbags-2", name: "Luxe Leather Tote", price: "₹1,999", desc: "Handcrafted Italian leather for daily grace.", rating: 4, reviews: 145, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069", heat: "72%" },
                  { rank: "04", id: "fashion-footwear-2", name: "Vibe Mesh Runner", price: "₹2,299", desc: "Ultra-breathable tech for high performance.", rating: 5, reviews: 290, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070", heat: "91%" },
                  { rank: "05", id: "electronics-audio-3", name: "Aria Smart Buds", price: "₹3,450", desc: "Intelligent noise masking for focus.", rating: 4, reviews: 180, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=2070", heat: "64%" },
                  { rank: "06", id: "fashion-watches-3", name: "Modernist Chronograph", price: "₹5,200", desc: "Precision movement in a matte finish.", rating: 5, reviews: 210, img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1988", heat: "88%" },
                  { rank: "07", id: "home-decor-lighting-2", name: "Studio Desk Lamp", price: "₹1,850", desc: "Dual-spectrum light for 12hr workdays.", rating: 4, reviews: 95, img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1974", heat: "55%" },
                ].concat([
                  { rank: "02", id: "electronics-audio-2", name: "Premium Wireless Pro", price: "₹8,450", desc: "Cinema-grade audio.", rating: 5, reviews: 312, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070", heat: "85%" },
                  { rank: "03", id: "fashion-handbags-2", name: "Luxe Leather Tote", price: "₹1,999", desc: "Handcrafted Italian leather.", rating: 4, reviews: 145, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069", heat: "72%" },
                  { rank: "04", id: "fashion-footwear-2", name: "Vibe Mesh Runner", price: "₹2,299", desc: "Ultra-breathable tech.", rating: 5, reviews: 290, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070", heat: "91%" },
                  { rank: "05", id: "electronics-audio-3", name: "Aria Smart Buds", price: "₹3,450", desc: "Intelligent noise masking.", rating: 4, reviews: 180, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=2070", heat: "64%" },
                  { rank: "06", id: "fashion-watches-3", name: "Modernist Chronograph", price: "₹5,200", desc: "Precision movement.", rating: 5, reviews: 210, img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1988", heat: "88%" },
                  { rank: "07", id: "home-decor-lighting-2", name: "Studio Desk Lamp", price: "₹1,850", desc: "Dual-spectrum light.", rating: 4, reviews: 95, img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1974", heat: "55%" },
                ]).map((item, i) => (
                  <div 
                    key={i} 
                    className={styles.trendingMiniCard}
                    onClick={() => router.push(`/product/${item.id}?img=${encodeURIComponent(item.img)}`)}
                  >
                    <div className={styles.trendingImgWrapper}>
                      <Image src={item.img} alt={item.name} fill className={styles.tImg} />
                      <div className={styles.trendingRank}>{item.rank}</div>
                      
                      {/* Pixel-Perfect Shop Action Bar */}
                      <div className={styles.shopActionBar}>
                        <button 
                          className={styles.shopCartBtn}
                          onClick={(e) => handleAddToCart(e, { ...item, image: item.img })}
                          title="Add to Cart"
                        >
                          <ShoppingCart size={18} />
                        </button>
                        <button 
                          className={`${styles.shopWishlistBtn} ${isInWishlist(item.id) ? styles.shopWishlistActive : ""}`}
                          onClick={(e) => handleWishlistToggle(e, { ...item, image: item.img })}
                        >
                          <Heart size={18} fill={isInWishlist(item.id) ? "#ff4d4d" : "none"} color={isInWishlist(item.id) ? "#ff4d4d" : "currentColor"} />
                        </button>
                      </div>
                    </div>
                    <div className={styles.trendingInfo}>
                      <div className={styles.tRatingLine}>
                        <Star size={12} fill="#FFD700" color="#FFD700" />
                        <span className={styles.tRatingVal}>4.9/5</span>
                        <span className={styles.tReviewCount}>({item.reviews})</span>
                      </div>
                      <h4 className={styles.tProdName}>{item.name}</h4>
                      <p className={styles.tProdDesc}>{item.desc}</p>
                      <div className={styles.tPrice}>{item.price}</div>
                      <div className={styles.tHeatMini}>
                        <div className={styles.tHeatFill} style={{ width: item.heat }}></div>
                      </div>
                      <div className={styles.tActions}>
                        <button className={`${styles.tQuickBtn} ${styles.magneticBtn}`}>EXPLORE</button>
                       
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER VOICES - Architectural Step Carousel */}
      <section className={`${styles.reviewSectionMaster} ${styles.revealSection}`}>
        <div className="container">
          <div className={styles.reviewHeader}>
            <span className={styles.revTag}>TESTIMONIALS</span>
            <h2 className={styles.revHeading}>Customer Voices</h2>
            <div className={styles.revStatLine}>
              <div className={styles.revAverage}>4.9/5</div>
              <div className={styles.revStars}>
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="#4C0519" color="#4C0519" />)}
              </div>
              <div className={styles.revCount}>Based on 12,020+ Reviews</div>
            </div>
          </div>
        </div>

        <div className={styles.revCarouselWrapper}>
          <div className={styles.revCarouselTrack}>
            {[
              { name: "Sarah J.", role: "Verified Buyer", text: "The quality of the premium wireless headphones is unmatched. The deep wine color is stunning!", product: "Premium Wireless Pro", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976" },
              { name: "David M.", role: "Verified Buyer", text: "Fast delivery and the packaging was pure luxury. My Modernist Chronograph is my daily essential.", product: "Modernist Chronograph", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974" },
              { name: "Elena R.", role: "Verified Buyer", text: "I've tried many luxury totes, but this leather tote has the best balance. A masterpiece of design.", product: "Luxe Leather Tote", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070" },
              { name: "Alex K.", role: "Verified Buyer", text: "Stunning craftsmanship on the smartwatch band. The attention to detail is evident. Fast shipping!", product: "SmartWatch Pro", img: "https://images.unsplash.com/photo-1541647376583-d6c5ca910171?q=80&w=1974" },
              { name: "Jessica L.", role: "Verified Buyer", text: "The Smart Buds changed my commute. Noise cancellation is perfect and they look so stylish.", product: "Aria Smart Buds", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974" },
              { name: "Michael T.", role: "Verified Buyer", text: "The desk lamp is exactly what my studio needed. The light is very easy on the eyes.", product: "Studio Desk Lamp", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070" }
            ].map((rev, i) => (
              <div key={i} className={styles.revCardPremium}>
                <div className={styles.revQuoteIcon}><Quote size={30} fill="#4C0519" opacity={0.05} /></div>
                <div className={styles.revUser}>
                  <div className={styles.revAvatar}>
                    <Image src={rev.img} alt={rev.name} fill className={styles.revAvatarImg} />
                  </div>
                  <div className={styles.revUserInfo}>
                    <h4 className={styles.revUserName}>{rev.name}</h4>
                    <span className={styles.revUserRole}>{rev.role}</span>
                  </div>
                </div>
                <div className={styles.revStarsMini}>
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="#FFD700" color="#FFD700" />)}
                </div>
                <p className={styles.revText}>"{rev.text}"</p>

                <div className={styles.revProductHighlight}>
                  <span className={styles.revBoughtTag}>PURCHASED:</span>
                  <span className={styles.revBoughtName}>{rev.product}</span>
                </div>
              </div>
            ))}

            {/* Duplicate for seamless infinite step loop */}
            {[
              { name: "Sarah J.", role: "Verified Buyer", text: "The quality of the premium wireless headphones is unmatched.", product: "Premium Wireless Pro", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976" },
              { name: "David M.", role: "Verified Buyer", text: "Fast delivery and the packaging was pure luxury.", product: "Modernist Chronograph", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974" },
              { name: "Elena R.", role: "Verified Buyer", text: "I've tried many luxury totes, but this leather tote has the best balance.", product: "Luxe Leather Tote", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070" }
            ].map((rev, i) => (
              <div key={i + 10} className={styles.revCardPremium}>
                <div className={styles.revQuoteIcon}><Quote size={30} fill="#4C0519" opacity={0.05} /></div>
                <div className={styles.revUser}>
                  <div className={styles.revAvatar}>
                    <Image src={rev.img} alt={rev.name} fill className={styles.revAvatarImg} />
                  </div>
                  <div className={styles.revUserInfo}>
                    <h4 className={styles.revUserName}>{rev.name}</h4>
                    <span className={styles.revUserRole}>{rev.role}</span>
                  </div>
                </div>
                <div className={styles.revStarsMini}>
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="#FFD700" color="#FFD700" />)}
                </div>
                <p className={styles.revText}>"{rev.text}"</p>
                <div className={styles.revProductHighlight}>
                  <span className={styles.revBoughtTag}>PURCHASED:</span>
                  <span className={styles.revBoughtName}>{rev.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE EDITORIAL BLOG HUB - Latest News & Blog */}
      <section className={`${styles.blogSectionMaster} ${styles.revealSection}`}>
        <div className="container">
          <div className={styles.blogSectionHeader}>
            <div className={styles.blogTitleGroup}>
              <span className={styles.blogUpperTag}>NEWS & BLOG</span>
              <h2 className={styles.blogMainHeading}>Latest News & Blog</h2>
            </div>
            <Link href="#" className={styles.blogViewAllLink}>
              VIEW ALL BLOG <ArrowRight size={18} />
            </Link>
          </div>

          <div className={styles.blogGrid}>
            {[
              { id: 1, title: "Creative Modern Style", date: "15 Dec", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" },
              { id: 2, title: "The Urban Street Edit", date: "18 Dec", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920" },
              { id: 3, title: "Beauty & Delicate Craft", date: "22 Dec", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974" }
            ].map((post, i) => (
              <div key={post.id} className={styles.blogCard}>
                <div className={styles.blogCardVisual}>
                  <Image src={post.img} alt={post.title} fill className={styles.blogImg} />
                  <div className={styles.blogDateBadge}>
                    <span className={styles.dateDay}>{post.date.split(' ')[0]}</span>
                    <span className={styles.dateMonth}>{post.date.split(' ')[1]}</span>
                  </div>
                </div>

                <div className={styles.blogCardBody}>
                  <div className={styles.blogMeta}>
                    <User size={14} color="#4C0519" />
                    <span className={styles.blogAuthor}>By Admin</span>
                  </div>
                  <h3 className={styles.blogTitle}>{post.title}</h3>
                  <p className={styles.blogSnippet}>There are many variations of passages of professional styling available, but the majority have suffered luxury alteration.</p>

                  <button className={styles.blogReadBtn}>
                    READ MORE <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className={`${styles.newsSectionMaster} ${styles.revealSection}`}>
        <div className={styles.newsHeroBg}>
          <Image
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974"
            alt="Newsletter Background"
            fill
            className={styles.newsHeroImg}
          />
          <div className={styles.newsHeroOverlay}></div>
          <div className={styles.newsHeroContent}>
            <span className={styles.newsUpperTag}>GET NEWSLETTER</span>
            <h2 className={styles.newsHeroHeading}>Sign Up to Newsletter</h2>
          </div>
        </div>

        <div className="container">
          <div className={styles.newsOverCardContainer}>
            <div className={styles.newsOverCard}>
              <div className={styles.newsOverIconGroup}>
                <div className={styles.newsPaperPlane}>
                  <ShoppingCart size={40} strokeWidth={2} />
                </div>
              </div>

              <div className={styles.newsInputGroupPremium}>
                <input type="email" placeholder="Enter Your Email" className={styles.newsInputPremium} />
                <button className={`${styles.newsSubmitBtnGradient} ${styles.magneticBtn}`}>
                  SUBSCRIBE NOW <ArrowRight size={18} />
                </button>
              </div>
              <p className={styles.newsPrivacyNotice}>* By subscribing, you agree with our Privacy Policy and Terms of Service.</p>
            </div>
          </div>
        </div>
      </section>





      <section className={`${styles.trustSectionMaster} ${styles.revealSection}`}>
        <div className="container">
          <div className={styles.trustGrid}>
            {[
              { icon: <Truck size={32} />, title: "Free Delivery", desc: "For all orders above ₹2000. Seamless & fast." },
              { icon: <RotateCcw size={32} />, title: "Easy Returns", desc: "30-day hassle-free policy for your peace of mind." },
              { icon: <Lock size={32} />, title: "Secure Payment", desc: "100% SSL encrypted checkout for safe shopping." },
              { icon: <Headphones size={32} />, title: "24/7 Support", desc: "Dedicated team available round the clock for you." }
            ].map((pod, i) => (
              <div key={i} className={styles.trustPod}>
                <div className={styles.trustIconBox}>{pod.icon}</div>
                <div className={styles.trustContent}>
                  <h4 className={styles.trustTitle}>{pod.title}</h4>
                  <p className={styles.trustDesc}>{pod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Auth Popup */}
      <AuthPopup
        isOpen={showAuthPopup}
        onClose={() => setShowAuthPopup(false)}
        initialTab={authTab}
      />

      {/* Local Wishlist Notification UI */}
      <AnimatePresence>
        {localNotif.show && (
          <div className={styles.notifOverlay}>
            <motion.div 
              className={styles.notifCard}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
            >
              <div className={styles.notifHeader}>
                <div className={styles.notifIcon}><Check size={16} color="white" strokeWidth={3} /></div>
                <div className={styles.notifTitleGroup}>
                  <h4>{localNotif.title}</h4>
                  <p>Successfully updated your collection</p>
                </div>
                <button onClick={() => setLocalNotif(prev => ({ ...prev, show: false }))} className={styles.notifClose}>
                  <X size={14} />
                </button>
              </div>
              <div className={styles.notifBody}>
                <div className={styles.notifImgBox}>
                  <Image 
                    src={localNotif.product.image?.src || localNotif.product.image || localNotif.product.img || ""} 
                    alt={localNotif.product.name} 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.notifInfo}>
                  <h5>{localNotif.product.name}</h5>
                  <span>{localNotif.product.price}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
