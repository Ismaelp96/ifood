import Image from "next/image";

export default function BannerBurger() {
  return (
    <div className="pt-6">
      <Image
        width={300}
        height={150}
        className="h-auto w-full"
        src="/promo-burger.png"
        alt=""
      />
    </div>
  );
}
