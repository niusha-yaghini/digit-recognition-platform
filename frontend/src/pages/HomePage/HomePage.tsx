import { useState } from "react";

import ImageUploader from "../../components/ImageUploader/ImageUploader";
import styles from "./HomePage.module.css";

function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

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
          <ImageUploader
            file={selectedFile}
            onFileSelect={handleFileSelect}
            onRemove={handleRemoveFile}
          />

          <button
            type="button"
            className={styles.predictButton}
            disabled={!selectedFile}
          >
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
