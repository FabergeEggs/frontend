import TaskPageClient from './client'

// Import the API function - this will run on server
import { getTaskResponses } from "@/src/lib/api/project";
import type { ResponseDTO } from "@/src/lib/models/export/response";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string, task_id: string }>;
}) {
  const { id, task_id } = await params;

  // Fetch responses server-side
  let responses: ResponseDTO[] = [];
  try {
    responses = await getTaskResponses(id, task_id);
  } catch (error) {
    console.error("Failed to load task responses:", error);
  }

  return <TaskPageClient projectId={id} taskId={task_id} responses={responses} />;
}
