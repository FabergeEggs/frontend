"use client";

import FeedHeader from "@/src/ui/headers/FeedHeader/FeedHeader";
import ProjectCard from "@/src/ui/info/ProjectCard/ProjectCard";
import { useEffect, useState } from "react";
import styles from "./feedpage.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface FeedItem {
  id: string;
  source_type: "project" | "post" | "task" | "response";
  source_id: string;
  project_id: string | null;
  actor_id: string | null;
  actor_name: string | null;
  verb: string;
  label: string | null;
  short_description: string | null;
  description: string | null;
  occurred_at: string;
}

export default function Page() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`${API_URL}/api/v1/feed/global?limit=30`);
        if (!res.ok) throw new Error(`feed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setItems(Array.isArray(data.items) ? data.items : []);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "load failed");
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const projects = items.filter((i) => i.source_type === "project" && i.verb !== "deleted");
  const seen = new Set<string>();
  const uniqueProjects = projects.filter((p) => {
    const key = p.project_id || p.source_id;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <>
      <FeedHeader />
      <div className={`pagecontainer ${styles.container}`}>
        <h2 className={styles.title}>Лента проектов</h2>

        {loading && <div className="centered">Загрузка...</div>}
        {error && <div className={styles.error}>Ошибка: {error}</div>}

        {!loading && !error && uniqueProjects.length === 0 && (
          <div className={styles.empty}>
            <p>Пока нет проектов.</p>
            <p>Создайте первый проект — он появится здесь.</p>
          </div>
        )}

        <div className={`basic-flex-column ${styles.list}`}>
          {uniqueProjects.map((item) => (
            <ProjectCard
              key={item.id}
              project_id={item.project_id || item.source_id}
              label={item.label || "Без названия"}
              short_description={item.short_description || item.description || ""}
            />
          ))}
        </div>
      </div>
    </>
  );
}
