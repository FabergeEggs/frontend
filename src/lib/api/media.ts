import { api } from './instances/base';
import { ApiRoutes } from './constants';

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