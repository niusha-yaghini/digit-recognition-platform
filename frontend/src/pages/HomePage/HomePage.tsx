import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <main className={styles.homePage}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>✦</span>
          <span>DigitAI</span>
        </div>

        <nav>
          <a href="/">Home</a>
          <a href="/history">History</a>
          <a href="/about">About</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <span className={styles.eyebrow}>MACHINE LEARNING PROJECT</span>

        <h1>
          Handwritten Digit
          <br />
          <span>Recognition</span>
        </h1>

        <p className={styles.heroDescription}>
          Upload an image of a handwritten digit and let our AI model recognize
          it.
        </p>
      </section>

      {/* Upload Section */}
      <section className={styles.uploadSection}>
        <div className={styles.uploadContent}>
          <div className={styles.uploadIcon}>↑</div>

          <h2>Upload Your Image</h2>

          <p>Select an image containing a handwritten digit.</p>

          <div className={styles.uploadBox}>
            <p>Drag and drop your image here</p>

            <span>or</span>

            <button type="button" disabled>
              Browse Files
            </button>

            <small>PNG, JPG or JPEG</small>
          </div>

          <button type="button" className={styles.predictButton} disabled>
            Recognize Digit
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.pageFooter}>
        <p>DigitAI · Powered by Machine Learning</p>
      </footer>
    </main>
  );
}

export default HomePage;
