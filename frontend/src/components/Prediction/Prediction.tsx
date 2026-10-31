import { useEffect, useState } from "react";
import styles from "./Prediction.module.css";

interface PredictionProps {
  file: File | null;
}

interface PredictionResponse {
  success: boolean;
  data: {
    digit: number;
    confidence: number;
  };
}

function Prediction({ file }: PredictionProps) {
  const [result, setResult] = useState<PredictionResponse["data"] | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset prediction whenever the selected file changes
  useEffect(() => {
    setResult(null);
    setError(null);
  }, [file]);

  const handlePredict = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // const response = await fetch("http://localhost:3000/api/predict", {
      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      const data: PredictionResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          (data as unknown as { error?: { message?: string } }).error
            ?.message || "Prediction failed.",
        );
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <button type="button" onClick={handlePredict} disabled={!file || loading}>
        {loading ? "Predicting..." : "Recognize Digit"}
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {result && (
        <section className={styles.result}>
          <h2>Prediction Result</h2>

          <p>Recognized Digit: {result.digit}</p>

          <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
        </section>
      )}
    </div>
  );
}

export default Prediction;
