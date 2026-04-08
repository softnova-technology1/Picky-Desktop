import React from 'react'
import styles from "./about.module.css";
function About() {
  return (
    <div>
                <section className={styles.aboutContainer}>
            <div className={styles.contentWrapper}>
                {/* Left Side: Text Content */}
                <div className={styles.textContent}>
                    <p className={styles.subheading}>About Us</p>
                    <h2 className={styles.heading}>Best Brand Best Quality</h2>
                    <div className={styles.description}>
                        <p>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form words.
                        </p>
                        <p>
                            If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Inter net. It uses a dictionary of over 200 Latin words.
                        </p>
                    </div>
                    <a href="#" className={styles.moreLink}>
                        More About Us <span className={styles.arrow}>&rsaquo;</span>
                    </a>
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
                </div>
            </div>
        </section>
    </div>
  )
}

export default About;