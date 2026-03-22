export default async function Page({
  params,
}: {
  params: Promise<{ id: string, task_id: string }>;
}) {
  const { id: id, task_id: task_id } = await params;
  return (
      <div>
        <p>Page with form to send task with ID={task_id} of project with ID={id}</p>
      </div>
  )
}