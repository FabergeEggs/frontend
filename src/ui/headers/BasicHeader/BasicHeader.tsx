import Logo from "../../info/Logo/Logo";
import HeaderIcon from "../../images/HeaderIcon/HeaderIcon";
import Link from "next/link";

export default function BasicHeader() {
  return (
    <header className="basic-header">
      <Link className="basic-link" href="/feed">
        <Logo />
      </Link>
      <Link className="basic-link" href="/profile">
        <HeaderIcon />
      </Link>
    </header>
  );
}
