"use client";

import React, { use } from "react";
import Link from "next/link";
import { getProductById } from "@/lib/data";
import { ArrowLeft, Star, ThumbsUp, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductReviewsPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const product = getProductById(id);

  const allReviews = [
    { id: 1, name: "Sarah L.", rating: 5, date: "October 12, 2025", title: "Absolutely incredible!", comment: "The quality exceeded my expectations and the delivery was super fast. Highly recommend checking out the new features.", helpful: 45 },
    { id: 2, name: "Michael R.", rating: 5, date: "September 28, 2025", title: "A premium product", comment: "A premium product through and through. The detailing is perfect and it feels extremely durable in hand.", helpful: 32 },
    { id: 3, name: "Emma T.", rating: 4, date: "August 15, 2025", title: "Almost perfect...", comment: "Very good quality, arrived in beautiful packaging. Taking one star off because it took an extra day to arrive, but the item itself is flawless.", helpful: 12 },
    { id: 4, name: "James D.", rating: 5, date: "July 02, 2025", title: "Best purchase of the year", comment: "I don't usually write reviews but this completely blew me away. The aesthetic is stunning and customer service was incredibly helpful when I had questions.", helpful: 89 },
    { id: 5, name: "Chloe V.", rating: 5, date: "June 20, 2025", title: "Matches the description perfectly", comment: "Exactly what I was looking for. Fits great, looks amazing, and the unboxing experience was a lovely surprise.", helpful: 6 },
    { id: 6, name: "David K.", rating: 3, date: "June 05, 2025", title: "Good, but pricey", comment: "The product is unquestionably good, but I do feel like it's a bit on the expensive side for what it is. Still heavily using it though.", helpful: 21 },
  ];

  if (!product) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h2>Product not found</h2>
        <Link href="/">Return to Catalog</Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "140px 2rem 60px", fontFamily: "inherit" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "30px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#94a3b8", fontSize: "0.95rem", fontWeight: 600 }}>
               <Link href="/" style={{ color: "#64748b", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={e=>e.target.style.color="#0f172a"} onMouseOut={e=>e.target.style.color="#64748b"}>Home</Link>
               <span>/</span>
               <Link href={`/category/${product.category}`} style={{ color: "#64748b", textDecoration: "none", textTransform: "capitalize", transition: "color 0.2s" }} onMouseOver={e=>e.target.style.color="#0f172a"} onMouseOut={e=>e.target.style.color="#64748b"}>{product.category.replace("-", " ")}</Link>
               <span>/</span>
               <Link href={`/product/${id}`} style={{ color: "#64748b", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={e=>e.target.style.color="#0f172a"} onMouseOut={e=>e.target.style.color="#64748b"}>{product.name}</Link>
               <span>/</span>
               <span style={{ color: "#0f172a", fontWeight: 800 }}>Reviews</span>
            </div>
            
            <Link href={`/product/${id}`} style={{ display: "flex", gap: "8px", alignItems: "center", color: "#0f172a", textDecoration: "none", fontWeight: 700, background: "white", padding: "10px 20px", borderRadius: "99px", boxShadow: "0 4px 15px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.05)", transition: "all 0.2s" }} onMouseOver={e=>{e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 20px rgba(0,0,0,0.06)"}} onMouseOut={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 15px rgba(0,0,0,0.03)"}}>
              <ArrowLeft size={16} /> Back to Product
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ fontSize: "3rem", fontWeight: 900, color: "#0f172a", margin: "0 0 10px 0", letterSpacing: "-0.03em" }}>All Reviews</h1>
              <span style={{ fontSize: "1.1rem", color: "#64748b", fontWeight: 600 }}>for {product.name}</span>
            </div>
            
            <div style={{ background: "white", padding: "15px 30px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "#0f172a" }}>4.9</div>
              <div>
                <div style={{ display: "flex", gap: "2px", color: "#f59e0b" }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <div style={{ color: "#64748b", fontSize: "0.85rem", fontWeight: 700, marginTop: "4px" }}>Based on 2,408 reviews</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px" }}>
          {allReviews.map((review, i) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ background: "white", padding: "40px", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.03)", display: "flex", gap: "40px" }}
            >
              <div style={{ minWidth: "200px" }}>
                <div style={{ display: "flex", gap: "15px", alignItems: "center", marginBottom: "15px" }}>
                  <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 800, color: "#0f172a" }}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <strong style={{ display: "block", color: "#0f172a", fontSize: "1.1rem" }}>{review.name}</strong>
                    <span style={{ color: "#10b981", fontSize: "0.8rem", fontWeight: 700 }}>VERIFIED BUYER</span>
                  </div>
                </div>
                <div style={{ color: "#94a3b8", fontSize: "0.9rem", fontWeight: 600 }}>Reviewed on {review.date}</div>
              </div>

              <div style={{ flex: 1, borderLeft: "1px solid #f1f5f9", paddingLeft: "40px" }}>
                <div style={{ display: "flex", gap: "4px", color: "#f59e0b", marginBottom: "10px" }}>
                   {[...Array(5)].map((_, j) => <Star key={j} size={16} fill={j < review.rating ? "currentColor" : "none"} color={j < review.rating ? "currentColor" : "#cbd5e1"} />)}
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px 0" }}>"{review.title}"</h3>
                <p style={{ color: "#475569", lineHeight: "1.8", fontSize: "1.05rem", margin: "0 0 20px 0" }}>{review.comment}</p>
                
                <div style={{ display: "flex", gap: "15px" }}>
                  <button style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "8px 16px", borderRadius: "99px", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "#64748b", fontWeight: 600, fontSize: "0.85rem" }}>
                    <ThumbsUp size={14} /> Helpful ({review.helpful})
                  </button>
                  <button style={{ background: "transparent", border: "none", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "#94a3b8", fontWeight: 600, fontSize: "0.85rem" }}>
                    <MessageSquare size={14} /> Comment
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
