// Just a test component

import Link from "next/link";

const links = [
  {
    name: "Profile",
    href: "/profile",
  },
  {
    name: "Feed",
    href: "/feed",
  },
  {
    name: "Login",
    href: "/login",
  },
  {
    name: "Sign up",
    href: "/signup"
  },
  {
    name: "Create project",
    href: "/feed/create"
  }
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        return <Link key={link.name} href={link.href}>{link.name} </Link>;
      })}
    </>
  );
}
