import LoginHeader from "@/src/ui/headers/LoginHeader/LoginHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoginHeader />
      {children}
    </>
  );
}
