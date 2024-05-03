import { Product } from "@prisma/client";
import Image from "next/image";

type BadgeDiscountProps = {
  product: Pick<Product, "discountPercentage">;
};

export default function BagdeDiscount({ product }: BadgeDiscountProps) {
  return (
    <div className="flex items-center gap-0.5 rounded-full bg-primary px-2 py-[2px]">
      <Image
        src="/move-down.svg"
        width={7}
        height={9}
        title="Seta para baixo"
        alt="seta para baixo"
      />
      <span className="text-xs font-semibold text-white">
        {product.discountPercentage}%
      </span>
    </div>
  );
}
