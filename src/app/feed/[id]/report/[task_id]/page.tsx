import ReportPageClient from "./client";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; task_id: string }>;
}) {
  const { id, task_id } = await params;
  return <ReportPageClient projectId={id} taskId={task_id} />;
}
