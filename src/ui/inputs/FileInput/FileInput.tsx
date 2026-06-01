"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./FileInput.module.css";
import FileImage from "@/public/assets/response/file.svg";
import { uploadFilePublic } from "@/src/lib/api/feed";

interface FileInputProps {
  /** Called with the asset_id once the file is uploaded and ready */
  onAdd?: (assetId: string) => void;
  /** Optional: restrict accepted file types, e.g. "image/*,.pdf" */
  accept?: string;
}

type UploadState = "idle" | "uploading" | "error";

export default function FileInput({ onAdd, accept }: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<UploadState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleFile(file: File) {
    setState("uploading");
    setErrorMsg(null);
    try {
      const { downloadUrl } = await uploadFilePublic(file);
      onAdd?.(downloadUrl);
      setState("idle");
    } catch (e) {
      setState("error");
      setErrorMsg(e instanceof Error ? e.message : "Ошибка загрузки");
    }
  }

  const isUploading = state === "uploading";

  return (
    <div className={`basic-box basic-btn ${styles.container}`}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          // Reset so the same file can be re-selected after an error
          e.target.value = "";
        }}
      />
      <button
        className={styles.button}
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        type="button"
      >
        <Image className={styles.image} src={FileImage} alt="file" />
        {isUploading ? "Загрузка…" : "Прикрепить файл"}
      </button>
      {state === "error" && errorMsg && (
        <span className={styles.error}>{errorMsg}</span>
      )}
    </div>
  );
}
