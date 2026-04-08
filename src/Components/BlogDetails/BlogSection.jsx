import React from 'react';
import styles from './BlogSection.module.css';

import { blogPosts } from '@/data/blogData';
import Link from 'next/link';

const BlogSection = () => {
    return (
        <section className={styles.blogSection}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {blogPosts.map((post) => (
                        <div key={post.id} className={styles.blogCard}>
                            <div className={styles.imageWrapper}>
                                <img src={post.image} alt={post.title} className={styles.image} />
                                <div className={styles.dateBadge}>
                                    <span className={styles.dateDay}>{post.date.split(' ')[0]}</span>
                                    <span className={styles.dateMonth}>{post.date.split(' ')[1]}</span>
                                </div>
                            </div>
                            <div className={styles.blogInfo}>
                                <div className={styles.metadata}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    <span className={styles.authorName}>By {post.author}</span>
                                </div>
                                <h3 className={styles.blogTitle}>{post.title}</h3>
                                <p className={styles.blogExcerpt}>{post.excerpt}</p>
                                <Link href={`/Blog/${post.id}`} className={styles.readMoreBtn}>
                                    READ MORE
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#df213a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
