"use client";

import Logo from "../../info/Logo/Logo";
import HeaderIcon from "../../images/HeaderIcon/HeaderIcon";
import Link from "next/link";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import { useProfileInfo } from "@/src/lib/query/profile";

export default function BasicHeader() {
  const { userId } = useAuth();
  const { data: profile } = useProfileInfo(userId || "");

  return (
    <header className="basic-header">
      <Logo />
      <Link className="basic-link" href="/profile">
        <HeaderIcon src={profile?.avatar_url} />
      </Link>
    </header>
  );
}
