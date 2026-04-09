const fs = require('fs');

const file = 'd:/DHARSHIKA-S/PROJECTS/Picky-Desktop/Picky-Desktop/src/app/hometwo/page.js';
let content = fs.readFileSync(file, 'utf-8');

// Find the last purchased rev product highlight for Duplicate loop
// Actually, I can slice just before "className={styles.newsHeroImg}"
const cutoff = content.indexOf('className={styles.newsHeroImg}');
let newContent = content.slice(0, cutoff);

// We need to properly close the reviewSectionMaster
newContent += `            ))}
          </div>
        </div>
      </section>

      {/* THE EDITORIAL BLOG HUB - Latest News & Blog */}
      <section className={\`\${styles.blogSectionMaster} \${styles.revealSection}\`}>
        <div className="container">
          <div className={styles.blogSectionHeader}>
            <div className={styles.blogTitleGroup}>
              <span className={styles.blogUpperTag}>NEWS & BLOG</span>
              <h2 className={styles.blogMainHeading}>Latest News & Blog</h2>
            </div>
            <Link href="/Blog" className={styles.blogViewAllLink}>
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

                  <Link href={\`/Blog/\${post.id}\`} className={styles.blogReadBtn}>
                    READ MORE <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.newsSectionMaster}>
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
                <button className={styles.newsSubmitBtnGradient}>
                  SUBSCRIBE NOW <ArrowRight size={18} />
                </button>
              </div>
              <p className={styles.newsPrivacyNotice}>* By subscribing, you agree with our Privacy Policy and Terms of Service.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.trustSectionMaster}>
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
    </main>
  );
}
`;

fs.writeFileSync(file, newContent);
console.log('Fixed hometwo page.js successfully');
