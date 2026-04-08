import React from 'react'
import styles from "./about.module.css";

function About() {
  return (
    <div className={styles.mainWrapper}>
        <section className={styles.aboutContainer}>
            {/* Background Decorative Text */}
            <div className={styles.bgText}>SINCE 2024</div>
            
            <div className={styles.contentWrapper}>
                {/* Left Side: Text Content */}
                <div className={styles.textContent}>
                    <div className={styles.subheadingWrapper}>
                        <span className={styles.dot}></span>
                        <p className={styles.subheading}>Our Legacy</p>
                    </div>
                    
                    <h2 className={styles.heading}>
                        Crafting <span className={styles.highlight}>Premium</span> Fashion For The Modern World
                    </h2>
                    
                    <div className={styles.description}>
                        <p>
                            Experience the pinnacle of craftsmanship. We don't just create clothes; we curate experiences that define your unique style. Our journey began with a simple vision: to bring high-end design to every wardrobe without compromising on quality or ethics.
                        </p>
                        <p>
                            Every stitch tells a story of dedication and artistry. From sourcing the finest materials to perfecting the smallest detail, our process is a testament to our commitment to excellence. Join us in redefining luxury for the contemporary era.
                        </p>
                    </div>

                    <div className={styles.linkWrapper}>
                        <a href="#" className={styles.moreLink}>
                            <span>Explore Our Story</span>
                            <div className={styles.arrowIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </a>
                    </div>

                    <div className={styles.statsGrid}>
                        <div className={styles.statBox}>
                            <span className={styles.statNumber}>10k+</span>
                            <span className={styles.statLabel}>Happy Clients</span>
                        </div>
                        <div className={styles.statBox}>
                            <span className={styles.statNumber}>50+</span>
                            <span className={styles.statLabel}>Collections</span>
                        </div>
                        <div className={styles.statBox}>
                            <span className={styles.statNumber}>15+</span>
                            <span className={styles.statLabel}>Design Awards</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Image Collage */}
                <div className={styles.imageCollage}>
                    <div className={styles.largeImageWrapper}>
                        <img 
                            src="https://i.pinimg.com/736x/ae/ef/07/aeef075aa6ec0b293ab809683d38df6a.jpg" 
                            alt="Fashion Store" 
                            className={styles.largeImage}
                        />
                    </div>
                    <div className={styles.mediumImageWrapper}>
                        <img 
                            src="https://i.pinimg.com/736x/d0/e2/9b/d0e29b99da6fab6fccedfb599a2d5867.jpg" 
                            alt="Designer working" 
                            className={styles.mediumImage}
                        />
                    </div>
                    <div className={styles.smallImageWrapper}>
                        <img 
                            src="https://i.pinimg.com/1200x/e1/1a/d6/e11ad623f494e27924d33917fc6f982e.jpg" 
                            alt="Fabrics" 
                            className={styles.smallImage}
                        />
                    </div>
                    
                    {/* Decorative element for the collage */}
                    <div className={styles.collageDecoration}></div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default About;