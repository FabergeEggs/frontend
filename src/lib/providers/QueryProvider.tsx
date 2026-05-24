"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/src/lib/query/client";
// import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>
  );
}
