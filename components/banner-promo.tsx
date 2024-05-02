import Image from "next/image";

export default function BannerPromo() {
  return (
    <div className="pb-6 pt-4">
      <Image
        width={300}
        height={150}
        className="h-auto w-full"
        src="/promo-pizza.png"
        alt=""
      />
    </div>
  );
}
