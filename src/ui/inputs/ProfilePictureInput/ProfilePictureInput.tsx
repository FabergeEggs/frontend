"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./ProfilePictureInput.module.css";
import { uploadFile, getAsset } from "@/src/lib/api/media";

interface ProfilePictureInputProps {
  value?: string;
  onChange?: (url: string) => void;
}

async function pollUntilReady(assetId: string, maxAttempts = 15): Promise<string> {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const asset = await getAsset(assetId);
    if (asset.status === "ready" && asset.download_url) {
      return asset.download_url;
    }
    if (asset.status === "rejected") {
      throw new Error("Файл отклонён");
    }
  }
  throw new Error("Таймаут сканирования");
}

export default function ProfilePictureInput({ value, onChange }: ProfilePictureInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setIsLoading(true);
    setError(null);
    try {
      const assetId = await uploadFile(file);
      const downloadUrl = await pollUntilReady(assetId);
      onChange?.(downloadUrl);
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
        {value && (
          <Image src={value} alt="Аватар" fill style={{ objectFit: "cover" }} />
        )}
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
          onClick={() => onChange?.("")}
          disabled={isLoading || !value}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
