type MediaRef = {
  id: string
  // если media-service ответил — будут дополнительные поля:
  kind?: "image" | "video" | "audio" | "file"
  mime?: string
  download_url?: string
}

// MEDIA — загрузка файла (3 шага)

// Шаг 1: POST /api/v1/media/me/uploads
// Body:
// {
//   filename: "photo.jpg",
//   content_type: "image/jpeg",
//   size_bytes: 102400,           // в байтах, обязательно число
//   visibility: "owner_only"      // | "public" (опц.)
// }
// Response:
// {
//   asset: { id: string, status: "pending", ... },
//   upload: {
//     url: string,       // presigned PUT URL в MinIO (localhost:9000/...)
//     expires_in: number, // секунды
//     headers: { [key: string]: string }  // обычно пустой объект
//   }
// }

// Шаг 2: PUT <upload.url>  — напрямую с клиента, без токена
// Headers: Content-Type: image/jpeg  (обязательно совпадает с content_type выше)
// Body: raw bytes файла

// Шаг 3: POST /api/v1/media/me/uploads/{asset.id}/complete
// Response:
// { asset: { id: string, status: "scanning" | "ready", ... } }

// GET /api/v1/media/me/assets/{id}
type AssetDetail = {
  id: string
  kind: "image" | "video" | "audio" | "file"
  mime: string
  size_bytes: number
  status: "pending" | "scanning" | "ready" | "rejected"
  preview_url: null              // пока не реализован
  download_url: string | null    // null пока status != "ready"
  download_expires_in: number | null
}

// GET /api/v1/media/me/assets → { items: AssetListItem[] }
type AssetListItem = {
  id: string
  kind: string
  mime: string
  size_bytes: number
  original_filename: string
  inserted_at: string
}

// DELETE /api/v1/media/me/assets/{id} → 204

// Ошибки (единый формат)

// // 400
// { errors: { field: string[] } }       // ошибки валидации
// { error: "missing_params", missing: string[] }

// // 401
// { error: "unauthorized" }

// // 403
// { error: "forbidden" }

// // 404
// { error: "not_found" }