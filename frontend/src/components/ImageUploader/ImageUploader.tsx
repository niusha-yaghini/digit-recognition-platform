import { useEffect, useRef, useState } from "react";
import styles from "./ImageUploader.module.css";

interface ImageUploaderProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = ["image/png", "image/jpeg"];

function ImageUploader({ file, onFileSelect, onRemove }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const validateFile = async (selectedFile: File) => {
    setError(null);

    if (selectedFile.size === 0) {
      setError("The selected file is empty.");
      return;
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError("Only PNG and JPEG images are supported.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("Image must be 5 MB or smaller.");
      return;
    }

    setIsValidating(true);

    try {
      const bitmap = await createImageBitmap(selectedFile);
      bitmap.close();

      onFileSelect(selectedFile);
    } catch {
      setError("The selected file is not a valid image.");
    } finally {
      setIsValidating(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      void validateFile(selectedFile);
    }

    // Allows selecting the same file again.
    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile) {
      void validateFile(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsDragging(false);
    }
  };

  const handleRemove = () => {
    setError(null);
    onRemove();
  };

  return (
    <div className={styles.uploader}>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleInputChange}
        hidden
      />

      {!file ? (
        <div
          className={`${styles.dropZone} ${isDragging ? styles.dragging : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className={styles.uploadIcon}>↑</div>

          <h3>Upload Your Image</h3>

          <p>Drag and drop your image here</p>

          <span>or</span>

          <button
            type="button"
            className={styles.browseButton}
            onClick={() => inputRef.current?.click()}
            disabled={isValidating}
          >
            Browse Files
          </button>

          <small>PNG or JPEG · Maximum 5 MB</small>

          {isValidating && (
            <p className={styles.statusMessage}>Validating image...</p>
          )}
        </div>
      ) : (
        <div className={styles.previewContainer}>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Selected handwritten digit"
              className={styles.previewImage}
            />
          )}

          <div className={styles.fileInfo}>
            <span className={styles.fileName}>{file.name}</span>

            <span className={styles.fileSize}>
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>

          <button
            type="button"
            className={styles.removeButton}
            onClick={handleRemove}
          >
            Remove Image
          </button>
        </div>
      )}

      {error && (
        <p className={styles.errorMessage} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default ImageUploader;
