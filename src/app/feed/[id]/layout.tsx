import BasicHeader from "@/src/ui/headers/BasicHeader/BasicHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BasicHeader />
      {children}
    </>
  );
}
