import React from 'react';
import BlogSection from '@/components/BlogDetails/BlogSection';

export const metadata = {
    title: 'Picky Blog | Premium Insights',
    description: 'Explore the latest in luxury fashion, minimal interiors, and premium lifestyle curated by Picky.'
};

const BlogMainPage = () => {
    return (
        <main style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
            <div style={{ padding: '60px 0 30px', textAlign: 'center' }}>
                <h1 style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontSize: '3.5rem', 
                    fontWeight: '900', 
                    color: '#1a1a1a', 
                    marginBottom: '15px',
                    letterSpacing: '-1px'
                }}>
                    Our Journal
                </h1>
                <p style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.2rem', 
                    color: '#666', 
                    maxWidth: '600px', 
                    margin: '0 auto',
                    lineHeight: '1.6'
                }}>
                    Curated stories about design, fashion, and the pursuit of refined lifestyle.
                </p>
            </div>
            
            {/* The blog list section */}
            <BlogSection />
            
            <div style={{ height: '40px' }}></div>
        </main>
    );
};

export default BlogMainPage;
