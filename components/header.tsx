import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeaderComponent() {
  return (
    <header>
      <div className="flex items-center justify-between pt-8">
        <Link href="/">
          <Image width={100} height="0" src="/logo.svg" alt="Logo Food" />
        </Link>
        <MenuIcon />
      </div>
    </header>
  );
}
