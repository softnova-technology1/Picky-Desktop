"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './OrderAIChat.module.css';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  Truck,
  RotateCcw,
  XOctagon,
  LifeBuoy,
  ChevronRight
} from 'lucide-react';
import { chatKnowledge } from '@/data/chatKnowledge';

const OrderAIChat = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi 👋 I'm your Picky Assistant. Need help with your order?",
      actions: ["Track my order", "Cancel order", "Return item", "Talk to support"]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Extract Order ID from pathname if exists
  const getOrderId = () => {
    const parts = pathname.split('/');
    if (parts.includes('order-details') || parts.includes('order-tracking')) {
      return "#PKY-8821"; // Simulated context detection
    }
    return null;
  };

  const handleSend = (text) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    const newMessages = [...messages, { type: 'user', text: messageText }];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    // AI Logic Simulation
    setTimeout(() => {
      const response = generateAIResponse(messageText, getOrderId());
      setMessages([...newMessages, { type: 'bot', ...response }]);
      setIsTyping(false);
    }, 1200);
  };

  const generateAIResponse = (query, orderId) => {
    const q = query.toLowerCase();
    
    // Search in knowledge base
    const match = chatKnowledge.find(entry => 
      entry.keywords.some(keyword => q.includes(keyword.toLowerCase()))
    );

    if (match) {
      // Injection of dynamic data if needed
      let text = match.answer;
      if (orderId && (q.includes('track') || q.includes('status') || q.includes('cancel'))) {
        text = text.replace("Your order", `Your order ${orderId}`);
      }
      return { text, actions: match.actions };
    }

    // Default fallback
    return { 
      text: "I'm not exactly sure about that, but I can find out for you. Would you like to speak with a human support agent?", 
      actions: ["Talk to support", "View FAQ"] 
    };
  };

  return (
    <div className={styles.chatWrapper}>
      {isOpen && (
        <div className={styles.chatPanel}>
          <div className={styles.header}>
            <div className={styles.avatar}>
              <img src="/picky-ai-v2.png" alt="Picky AI" className={styles.botIcon} />
              <div className={styles.statusDot} />
            </div>
            <div className={styles.headerInfo}>
              <h3>Picky AI Assistant</h3>
              <p>
                <span className={styles.onlinePulse} />
                Order Support • Online
              </p>
            </div>
            {/* <button 
              className={styles.closeHeaderBtn} 
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button> */}
          </div>

          <div className={styles.messagesArea} ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.message} ${m.type === 'bot' ? styles.botMessage : styles.userMessage}`}>
                {m.text}
                {m.actions && (
                  <div className={styles.quickActions}>
                    {m.actions.map(action => (
                      <button key={action} className={styles.actionBtn} onClick={() => handleSend(action)}>
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className={styles.typing}>
                AI is typing...
              </div>
            )}
          </div>

          <form className={styles.inputArea} onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <input
              type="text"
              className={styles.chatInput}
              placeholder="Type your question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className={styles.sendBtn}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <button className={styles.chatButton} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        </button>
        {!isOpen && <div className={styles.badge} />}
      </div>
    </div>
  );
};

export default OrderAIChat;
