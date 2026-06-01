"use client";

import { useRef, useState } from "react";
import styles from "./ProfilePictureInput.module.css";
import { uploadFilePublic } from "@/src/lib/api/feed";
const DEFAULT_AVATAR = "/assets/project/example.png";

interface ProfilePictureInputProps {
  value?: string;
  onChange?: (data: { assetId: string; displayUrl: string }) => void;
  onDelete?: () => void;
}

export default function ProfilePictureInput({ value, onChange, onDelete }: ProfilePictureInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setIsLoading(true);
    setError(null);
    try {
      const { assetId, downloadUrl } = await uploadFilePublic(file);
      onChange?.({ assetId, displayUrl: downloadUrl });
    } catch {
      setError("Ошибка загрузки. Попробуйте снова.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Аватар профиля</p>
      <div className={styles.imageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value || DEFAULT_AVATAR}
          alt="Аватар"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      {error && <p style={{ color: "red", fontSize: 12 }}>{error}</p>}
      <div className={styles.buttons}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
        <button
          className={`basic-btn ${styles.btn}`}
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
        >
          {isLoading ? "Загрузка…" : "Загрузить"}
        </button>
        <button
          className={`basic-btn ${styles.btn}`}
          onClick={() => onDelete?.()}
          disabled={isLoading || !value}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
