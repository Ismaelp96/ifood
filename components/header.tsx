import { MenuIcon } from "lucide-react";
import Image from "next/image";

export default function HeaderComponent() {
  return (
    <header>
      <div className="flex items-center justify-between pt-8">
        <Image width={100} height="0" src="/logo.svg" alt="Logo Food" />
        <MenuIcon />
      </div>
    </header>
  );
}
