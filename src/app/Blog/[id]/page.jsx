import React from 'react';
import styles from './BlogDetail.module.css';
import Link from 'next/link';
import { blogPosts } from '@/data/blogData';
import { Home, ChevronRight } from 'lucide-react';

const BlogDetail = async ({ params }) => {
    // Correctly accessing params in Next.js 15
    const { id } = await params;
    const postId = parseInt(id);
    const post = blogPosts.find(p => p.id === postId);

    if (!post) {
        return (
            <div className={styles.blogDetailPage}>
                <div className={styles.container}>
                    <h1>Post Not Found</h1>
                    <Link href="/">Go Back Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.blogDetailPage}>
            <div className={styles.container}>
                {/* Main Content Area */}
                <main className={styles.mainContent}>
                    <div className={styles.breadcrumb}>
                        <Link href="/" className={styles.breadcrumbLink}>
                            <Home size={14} className={styles.breadcrumbIcon} /> 
                            <span>Home</span>
                        </Link>
                        <ChevronRight size={14} className={styles.breadcrumbSeparator} />
                        <Link href="/Blog" className={styles.breadcrumbLink}>Blog</Link>
                        <ChevronRight size={14} className={styles.breadcrumbSeparator} />
                        <span className={styles.breadcrumbCurrent}>{post.title}</span>
                    </div>

                    <header className={styles.header}>
                        <h1 className={styles.title}>
                            {post.title}
                        </h1>
                    </header>

                    <div className={styles.heroImageWrapper}>
                        <img 
                            src={post.image} 
                            alt={post.title} 
                            className={styles.heroImage}
                        />
                        <div className={styles.metaBadge}>
                            <span className={styles.metaItem}>👤 By {post.author}</span>
                            <span className={styles.metaItem}>📅 {post.dateLong}</span>
                        </div>
                    </div>

                    <div className={styles.articleBody}>
                        <p>{post.content}</p>
                        
                        <p>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                        </p>


                        <blockquote className={styles.quote}>
                            <span className={styles.quoteIcon}>❝</span>
                            <p>
                                Fashion is what you're offered four times a year by designers. And style is what you choose.
                            </p>
                        </blockquote>

                        <p>
                            If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.
                        </p>
                    </div>
                </main>

                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <div className={styles.searchBox}>
                        <input type="text" placeholder="Search Here" className={styles.searchInput} />
                        <button className={styles.searchBtn}>🔍</button>
                    </div>

                    <div className={styles.sidebarSection}>
                        <h2 className={styles.sectionTitle}>Recent Posts</h2>
                        <div className={styles.recentPosts}>
                            {blogPosts.slice(0, 3).map((item) => (
                                <Link href={`/Blog/${item.id}`} key={item.id} className={styles.recentPostItem}>
                                    <img src={item.image} alt={item.title} className={styles.recentThumb} />
                                    <div className={styles.recentInfo}>
                                        <span className={styles.recentDate}>📅 {item.dateLong}</span>
                                        <p className={styles.recentTitle}>{item.title}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className={styles.sidebarSection}>
                        <h2 className={styles.sectionTitle}>Recommended Topics</h2>
                        <div className={styles.topicsGrid}>
                            {['Accessories', 'Fashion', 'Blog', 'Lifestyle', 'Tadatheme'].map((topic) => (
                                <span key={topic} className={styles.topicTag}>{topic}</span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.adBanner}>
                        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop" alt="Ad" />
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default BlogDetail;
