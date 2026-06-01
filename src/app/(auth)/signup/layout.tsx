import SignupHeader from "@/src/ui/headers/SignupHeader/SignupHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignupHeader />
      {children}
    </>
  );
}
