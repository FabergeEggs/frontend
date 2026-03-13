export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: id } = await params;
  return (
      <div>
        <p>Page of Project with ID={id}</p>
      </div>
      
  )
}