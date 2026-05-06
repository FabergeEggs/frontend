"use client";

import styles from "./ProfilePictureInput.module.css";
import { useRef, useState } from "react";
import { updateProfile } from "@/src/lib/api/profile";
import { getAccessToken } from "@/src/lib/api/tokenStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface Props {
  initialAvatarUrl?: string | null;
  userId?: string | null;
}

type Phase = "idle" | "uploading" | "scanning" | "error";

export default function ProfilePictureInput({ initialAvatarUrl, userId }: Props) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatarUrl || null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    setError(null);
    setPhase("uploading");

    try {
      const token = getAccessToken();
      const authHeader: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

      const createRes = await fetch(`${API_URL}/api/v1/media/me/uploads`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", ...authHeader },
        body: JSON.stringify({
          filename: file.name,
          content_type: file.type,
          size_bytes: file.size,
          visibility: "public",
        }),
      });
      if (!createRes.ok) throw new Error(`create upload: ${createRes.status}`);
      const { asset, upload } = await createRes.json();

      const putRes = await fetch(upload.url, {
        method: "PUT",
        headers: { "Content-Type": file.type, ...(upload.headers || {}) },
        body: file,
      });
      if (!putRes.ok) throw new Error(`s3 put: ${putRes.status}`);

      const completeRes = await fetch(`${API_URL}/api/v1/media/me/uploads/${asset.id}/complete`, {
        method: "POST",
        credentials: "include",
        headers: authHeader,
      });
      if (!completeRes.ok) throw new Error(`complete: ${completeRes.status}`);

      setPhase("scanning");

      const downloadUrl = await pollUntilReady(asset.id, authHeader);
      if (!downloadUrl) throw new Error("scan timed out or rejected");

      setAvatarUrl(downloadUrl);
      setPhase("idle");

      await updateProfile(userId, {
        first_name: "",
        last_name: "",
        bio: "",
        avatar_url: downloadUrl,
      });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "upload failed");
      setPhase("error");
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleRemove() {
    if (!userId) return;
    setAvatarUrl(null);
    try {
      await updateProfile(userId, {
        first_name: "",
        last_name: "",
        bio: "",
        avatar_url: "",
      });
    } catch (err) {
      console.error(err);
    }
  }

  const isBusy = phase === "uploading" || phase === "scanning";

  return (
    <div className={styles.container}>
      <p className={styles.title}>Аватар профиля</p>
      <div
        className={styles.imageContainer}
        style={
          avatarUrl
            ? {
                backgroundImage: `url(${avatarUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {isBusy && (
          <div className={styles.overlay}>
            {phase === "uploading" ? "Загрузка..." : "Обработка..."}
          </div>
        )}
      </div>
      <div className={styles.buttons}>
        <button
          type="button"
          className={`basic-btn ${styles.btn}`}
          onClick={() => fileRef.current?.click()}
          disabled={isBusy}
        >
          Загрузить
        </button>
        <button
          type="button"
          className={`basic-btn ${styles.btn}`}
          onClick={handleRemove}
          disabled={isBusy || !avatarUrl}
        >
          Удалить
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}

async function pollUntilReady(
  assetId: string,
  authHeader: Record<string, string>,
  maxAttempts = 15,
  intervalMs = 2000
): Promise<string | null> {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, intervalMs));
    try {
      const res = await fetch(`${API_URL}/api/v1/media/me/assets/${assetId}`, {
        credentials: "include",
        headers: authHeader,
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (data.status === "ready" && data.download_url) return data.download_url;
      if (data.status === "rejected") return null;
    } catch {
      // keep polling
    }
  }
  return null;
}
