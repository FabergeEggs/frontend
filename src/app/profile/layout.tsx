import ProfileHeader from "@/src/ui/headers/ProfileHeader/ProfileHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProfileHeader />
      {children}
    </>
  );
}
