import Logo from "../../info/Logo/Logo";
import HeaderIcon from "../../images/HeaderIcon/HeaderIcon";
import Link from "next/link";

export default function ProfileHeader() {
  return (
    <header className="basic-header">
      <Logo />
      <div className="basic-flex">
        <Link className="basic-link" href="/logout">
          <button className="basic-btn">
            Выйти
          </button>
        </Link>
        <Link className="basic-link" href="/profile">
          <HeaderIcon />
        </Link>
      </div>
      
    </header>
  );
}
