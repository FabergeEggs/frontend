// FEED — GET /api/v1/feed и GET /api/v1/feed/projects/{id}



type FeedItem = {
  id: string                   // UUID
  source_type: "project" | "post" | "task" | "response"
  source_id: string            // UUID сущности в source-сервисе
  project_id: string | null
  actor_id: string | null      // кто сделал действие
  actor_name: string | null    // денорм (может быть null)
  actor_avatar_url: string | null
  verb: "created" | "updated" | "deleted" | "answered"
  label: string | null         // заголовок (название проекта/поста/задачи)
  short_description: string | null
  description: string | null
  media: MediaRef[]            // [] если нет вложений
  occurred_at: string          // ISO 8601
  payload: object              // сырые данные события (расширение)
}

type FeedPage = {
  items: FeedItem[]
  next_cursor: string | null   // opaque base64, null = конец ленты
  has_more: boolean
}

/**
 * 
 * Cursor pagination:

GET /api/v1/feed?limit=20
GET /api/v1/feed?limit=20&cursor=<next_cursor из предыдущего ответа>
has_more = false → остановить infinite scroll.
 * 
 */

// SUBSCRIPTIONS (Memberships)

type Subscription = {
  id: string
  target_type: "project" | "user" | "tag"
  target_id: string
  created_at: string
}

// GET /api/v1/subscriptions → { items: Subscription[] }
// POST /api/v1/subscriptions → { id, target_type, target_id, created_at }
// Body: { target_type: "project", target_id: "<uuid>" }
// DELETE /api/v1/subscriptions/{id} → 204




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