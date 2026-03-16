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
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        return <Link key={link.name} href={link.href}></Link>;
      })}
    </>
  );
}
