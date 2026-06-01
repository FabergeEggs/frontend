import { api } from './instances/base';
import { getMockFeedPage } from "./mockData";

// ─── Types ───────────────────────────────────────────────────────────────────

// export type MediaRef = {
//   id: string;
//   kind?: "image" | "video" | "audio" | "file";
//   mime?: string;
//   download_url?: string;
// };

// export type FeedItem = {
//   id: string;
//   source_type: "project" | "post" | "task" | "response";
//   source_id: string;
//   project_id: string | null;
//   actor_id: string | null;
//   actor_name: string | null;
//   actor_avatar_url: string | null;
//   verb: "created" | "updated" | "deleted" | "answered";
//   label: string | null;
//   short_description: string | null;
//   description: string | null;
//   media: MediaRef[];
//   occurred_at: string;
//   payload: object;
// };

// export type FeedPage = {
//   items: FeedItem[];
//   next_cursor: string | null;
//   has_more: boolean;
// };

// export type Subscription = {
//   id: string;
//   target_type: "project" | "user" | "tag";
//   target_id: string;
//   created_at: string;
// };

// export type AssetDetail = {
//   id: string;
//   kind: "image" | "video" | "audio" | "file";
//   mime: string;
//   size_bytes: number;
//   status: "pending" | "scanning" | "ready" | "rejected";
//   preview_url: null;
//   download_url: string | null;
//   download_expires_in: number | null;
// };

// export type AssetListItem = {
//   id: string;
//   kind: string;
//   mime: string;
//   size_bytes: number;
//   original_filename: string;
//   inserted_at: string;
// };

// ─── Feed ────────────────────────────────────────────────────────────────────

export const getFeed = async (
  limit: number = 20,
  cursor?: string,
): Promise<FeedPage> => {
  // const params: Record<string, string | number> = { limit };
  // if (cursor) params.cursor = cursor;
  // const { data } = await api.get("/api/v1/feed/global", { params });
  // return data;
  return getMockFeedPage(limit, cursor);
};

export const getProjectFeed = async (
  project_id: string,
  limit: number = 20,
  cursor?: string,
): Promise<FeedPage> => {
  // const params: Record<string, string | number> = { limit };
  // if (cursor) params.cursor = cursor;
  // const { data } = await api.get(
  //   `/api/v1/feed/projects/${project_id}`,
  //   { params },
  // );
  // return data;
  return getMockFeedPage(limit, cursor);
};

// ─── Subscriptions ───────────────────────────────────────────────────────────

export const getSubscriptions = async (): Promise<{ items: Subscription[] }> => {
  const { data } = await api.get("/api/v1/subscriptions");
  return data;
};

export const createSubscription = async (
  target_type: "project" | "user" | "tag",
  target_id: string,
): Promise<Subscription> => {
  const { data } = await api.post("/api/v1/subscriptions", {
    target_type,
    target_id,
  });
  return data;
};

export const deleteSubscription = async (id: string): Promise<void> => {
  await api.delete(`/api/v1/subscriptions/${id}`);
};

// ─── Media ───────────────────────────────────────────────────────────────────

type UploadInitRequest = {
  filename: string;
  content_type: string;
  size_bytes: number;
  visibility?: "owner_only" | "public";
};

type UploadInitResponse = {
  asset: { id: string; status: "pending"; [key: string]: unknown };
  upload: {
    url: string;
    expires_in: number;
    headers: Record<string, string>;
  };
};

/** Step 1: get presigned upload URL */
export const initUpload = async (
  request: UploadInitRequest,
): Promise<UploadInitResponse> => {
  const { data } = await api.post(
    "/api/v1/media/me/uploads",
    request,
  );
  return data;
};

/** Step 2: upload file directly to MinIO (no auth token needed) */
export const uploadFileDirect = async (
  url: string,
  file: File,
  contentType: string,
  headers: Record<string, string> = {},
): Promise<void> => {
  // content-length is a forbidden header in the Fetch API — browsers set it
  // automatically. Passing it explicitly is silently ignored, but filtering it
  // here makes the intent clear and avoids confusion if the presigned URL
  // ever starts signing it again.
  //
  // content-type is also filtered from safeHeaders to prevent duplicate values:
  // safeHeaders may contain "content-type" (lowercase) from the presigned URL,
  // and we also set "Content-Type" explicitly below. The Fetch API treats these
  // as the same header and combines them → "image/jpeg, image/jpeg" → MinIO
  // stores that combined value → scan_job rejects the file due to mime mismatch.
  const safeHeaders = Object.fromEntries(
    Object.entries(headers).filter(
      ([k]) => k.toLowerCase() !== "content-length" && k.toLowerCase() !== "content-type",
    ),
  );

  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": contentType, ...safeHeaders },
    body: file,
  });

  if (!res.ok) {
    throw new Error(`MinIO upload failed: ${res.status} ${res.statusText}`);
  }
};

/** Step 3: confirm upload is complete */
export const completeUpload = async (
  asset_id: string,
): Promise<{ asset: { id: string; status: string } }> => {
  const { data } = await api.post(
    `/api/v1/media/me/uploads/${asset_id}/complete`,
  );
  return data;
};

/**
 * Full 3-step upload helper — call this instead of the 3 functions above
 * Returns the asset id after confirming completion
 */
export const uploadFile = async (file: File): Promise<string> => {
  const { asset, upload } = await initUpload({
    filename: file.name,
    content_type: file.type,
    size_bytes: file.size,
    visibility: "owner_only",
  });

  await uploadFileDirect(upload.url, file, file.type, upload.headers);
  await completeUpload(asset.id);

  return asset.id;
};

/**
 * Upload file as public + poll until scan completes → returns presigned download URL.
 * Use for response attachments so any user (including task admin) can download them.
 * URL is valid for 7 days (MinIO presigned GET TTL).
 */
export const uploadFilePublic = async (file: File): Promise<string> => {
  const { asset, upload } = await initUpload({
    filename: file.name,
    content_type: file.type,
    size_bytes: file.size,
    visibility: "public",
  });

  await uploadFileDirect(upload.url, file, file.type, upload.headers);
  await completeUpload(asset.id);

  for (let i = 0; i < 15; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const info = await getAsset(asset.id);
    if (info.status === "ready" && info.download_url) return info.download_url;
    if (info.status === "rejected") throw new Error("Файл отклонён сервером");
  }
  throw new Error("Таймаут сканирования файла");
};

export const getAsset = async (id: string): Promise<AssetDetail> => {
  const { data } = await api.get(`/api/v1/media/me/assets/${id}`);
  return data;
};

export const getAssets = async (): Promise<{ items: AssetListItem[] }> => {
  const { data } = await api.get("/api/v1/media/me/assets");
  return data;
};

export const deleteAsset = async (id: string): Promise<void> => {
  await api.delete(`/api/v1/media/me/assets/${id}`);
};