import PostPageClient from "./client";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; post_id: string }>;
}) {
  const { id, post_id } = await params;

  return <PostPageClient projectId={id} postId={post_id} />;
}
