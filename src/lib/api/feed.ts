import { api } from './instances/base';
import { ApiRoutes } from './constants';

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
  const params: Record<string, string | number> = { limit };
  if (cursor) params.cursor = cursor;
  const { data } = await api.get("/api/v1/feed", { params });
  return data;
};

export const getProjectFeed = async (
  project_id: string,
  limit: number = 20,
  cursor?: string,
): Promise<FeedPage> => {
  const params: Record<string, string | number> = { limit };
  if (cursor) params.cursor = cursor;
  const { data } = await api.get(
    `/api/v1/feed/projects/${project_id}`,
    { params },
  );
  return data;
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
  await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": contentType, ...headers },
    body: file,
  });
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