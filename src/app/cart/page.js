"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './cart.module.css';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className={styles.emptyCart}>
        <div className="container">
          <div className={styles.emptyContent}>
            <div className={styles.emptyIcon}>
              <ShoppingBag size={64} color="var(--primary-light)" />
            </div>
            <h1 className={styles.emptyTitle}>Your cart is empty</h1>
            <p className={styles.emptyText}>
              Looks like you haven't added anything to your cart yet.
              Explore our curated collections and find your next favorite pick.
            </p>
            <Link href="/" className={styles.shopBtn}>
              STAY SHOPPING <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.cartPage}>
      <div className="container">
        <header className={styles.cartHeader}>
          <h1 className={styles.cartTitle}>Shopping Bag</h1>
          <span className={styles.itemCount}>{totalItems} {totalItems === 1 ? 'item' : 'items'} in your bag</span>
        </header>

        <div className={styles.cartLayout}>
          {/* Cart Items List */}
          <div className={styles.itemsList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain' }} />
                </div>
                <div className={styles.itemInfo}>
                  <Link href={`/product/${item.id}`} className={styles.itemName}>{item.name}</Link>
                  <span className={styles.itemCategory}>{item.category}</span>
                  <div className={styles.itemActions}>
                    <div className={styles.qtyControl}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={18} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
                <div className={styles.itemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <aside className={styles.summary}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>FREE (Standard)</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Estimated Tax</span>
                <span>${(subtotal * 0.08).toFixed(2)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>${(subtotal * 1.08).toFixed(2)}</span>
              </div>
              <button className={styles.checkoutBtn}>
                SECURE CHECKOUT
              </button>
              <div className={styles.paymentIcons}>
                {/* Placeholder icons */}
                <span>SSL SECURE ENCRYPTION</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
