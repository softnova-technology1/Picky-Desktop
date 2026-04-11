export const chatKnowledge = [
  // 1. Order Status & Tracking
  { keywords: ["status", "where", "order", "track", "package", "arrival", "check"], 
    answer: "You can track your order live on our 'Order Tracking' page. Currently, most orders reach Thanjavur within 3-5 business days.",
    actions: ["Track Latest Order", "View All Orders"] 
  },
  { keywords: ["location", "stuck", "moving", "delayed", "updates"], 
    answer: "If your tracking hasn't updated in 48 hours, it might be between scanning hubs. Don't worry, we're monitoring it closely!",
    actions: ["Contact Support"] 
  },
  { keywords: ["id", "order number", "find number", "where is id"], 
    answer: "Your Order ID is a 7-digit code starting with 'PKY', found in your confirmation email or the 'My Orders' section.",
    actions: ["Go to My Orders"] 
  },
  
  // 2. Returns & Refunds
  { keywords: ["return", "item", "back", "exchange", "replace", "wrong", "size", "fit"], 
    answer: "We offer a 30-day easy return policy. You can start a return directly from your 'Delivered' orders page.",
    actions: ["Start a Return", "Return Policy"] 
  },
  { keywords: ["refund", "money", "reimbursement", "original payment", "when", "days"], 
    answer: "Refunds are processed within 5-7 business days after we receive and inspect your returned item.",
    actions: ["Refund Status"] 
  },
  { keywords: ["damaged", "broken", "defective", "faulty", "not working"], 
    answer: "We're sorry! If an item arrived damaged, please upload a photo in the return section for an instant replacement.",
    actions: ["Report Damage"] 
  },

  // 3. Cancellations
  { keywords: ["cancel", "stop", "change mind", "don't want", "mistake"], 
    answer: "Orders can be cancelled as long as they haven't been shipped. Check your tracking page for the 'Cancel Order' button.",
    actions: ["Cancel Order Now"] 
  },
  { keywords: ["too late", "already shipped", "shipment"], 
    answer: "If the order has already shipped, you'll need to wait for delivery and then initiate a return.",
    actions: ["Track Shipment"] 
  },

  // 4. Delivery & Shipping
  { keywords: ["shipping cost", "delivery fee", "charges", "price"], 
    answer: "We offer free shipping on all orders above $50. Standard shipping is $5.99.",
    actions: ["Shipping Details"] 
  },
  { keywords: ["international", "outside", "global", "overseas", "country"], 
    answer: "Currently, we only ship within India and North America. We're working on global shipping soon!",
    actions: ["Service Areas"] 
  },
  { keywords: ["address", "change", "destination", "location", "wrong city"], 
    answer: "You can update your shipping address within 2 hours of placing an order. Contact us immediately for urgent changes.",
    actions: ["Update Address"] 
  },

  // 5. Payments & Invoices
  { keywords: ["payment", "credit card", "debit", "upi", "cod", "cash", "failed"], 
    answer: "We accept all major credit cards, UPI, and Cash on Delivery in selected regions.",
    actions: ["Payment Methods"] 
  },
  { keywords: ["invoice", "receipt", "bill", "download", "pdf"], 
    answer: "You can download your invoice directly from the 'Order Details' page for any completed purchase.",
    actions: ["Order Details"] 
  },
  { keywords: ["secure", "safe", "privacy", "protection"], 
    answer: "Your payments are 256-bit encrypted and processed through industry-leading secure gateways.",
    actions: ["Terms of Service"] 
  },

  // 6. Generic Interaction & Support
  { keywords: ["hi", "hello", "hey", "morning", "evening", "greetings"], 
    answer: "Hello! I'm your Picky assistant. How can I help you with your order today?",
    actions: ["Track Order", "Cancel Item"] 
  },
  { keywords: ["human", "support", "agent", "real person", "call", "phone", "talk"], 
    answer: "I can connect you to our live support team. They are available 24/7.",
    actions: ["Talk to Support", "Call 1-800-PICKY"] 
  },
  { keywords: ["bye", "thanks", "thank you", "ok", "helpful"], 
    answer: "You're welcome! Feel free to reach out if you have more questions. Happy shopping!",
    actions: [] 
  },

  // 7. Products & Availability
  { keywords: ["stock", "out of stock", "notify", "restock"], 
    answer: "You can click 'Notify Me' on any out-of-stock product page to get an email when it's back.",
    actions: ["Browse Shop"] 
  },
  { keywords: ["warranty", "guarantee"], 
    answer: "All electronic items come with a 1-year brand warranty. Check your product manual for details.",
    actions: ["Warranty Info"] 
  },

  // 8. Membership & Points
  { keywords: ["points", "reward", "loyal", "membership", "tier"], 
    answer: "You earn 10 points for every $1 spent. Redeem them at checkout for instant discounts!",
    actions: ["Check Points"] 
  },

  // 9. Gift Cards & Coupons
  { keywords: ["coupon", "promo", "code", "discount", "voucher"], 
    answer: "Apply your promo code in the 'Order Summary' section at checkout. New users get 15% off with code PICKY15.",
    actions: ["Current Offers"] 
  },
  { keywords: ["gift card", "redeem", "card"], 
    answer: "Select 'Gift Card' as your payment method during checkout to use your credit.",
    actions: ["Buy Gift Card"] 
  },

  // 10. Technical Issues
  { keywords: ["slow", "bug", "error", "broken link", "login issue", "password"], 
    answer: "Try clearing your browser cache. If the issue persists, our technical team can help you.",
    actions: ["Report a Bug", "Reset Password"] 
  },

  // 11. Sustainability & Ethics
  { keywords: ["sustainable", "organic", "eco", "green", "environment"], 
    answer: "We prioritize eco-friendly packaging and sustainably sourced materials for all our Picky Originals.",
    actions: ["Sustainability Report"] 
  },

  // 12. Security & Data
  { keywords: ["delete account", "data", "privacy", "gdpr", "personal info"], 
    answer: "Your privacy is our priority. You can manage your data settings in your account profile.",
    actions: ["Privacy Settings"] 
  }
];

// Helper to expand these to 100+ variations logically in the component
