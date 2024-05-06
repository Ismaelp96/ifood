import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { calculateProductTotalPrice, formatCurrency } from "@/lib/price";
import BagdeDiscount from "../bagde-descont";
import { cn } from "@/lib/utils";

type ProductListProps = {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="mt-2 flex gap-x-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
}

type ProductsItemProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
  className?: string;
};

export function ProductItem({ product, className }: ProductsItemProps) {
  const href = `/products/${product.id}`;

  return (
    <div className={cn("w-full min-w-[150px] space-y-2", className)}>
      <Link href={href}>
        <div className="relative h-[150px] w-full rounded-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            title={product.name}
            fill
            className="rounded-lg object-cover shadow-sm"
          />
          {product.discountPercentage && (
            <div className="absolute left-2 top-2">
              <BagdeDiscount product={product} />
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-col">
        <Link href={`/products/${product.id}`}>
          <h4 className="truncate text-sm font-medium text-foreground">
            {product.name}
          </h4>
        </Link>

        <div className="flex items-center gap-1">
          <p className="font-semibold">
            {formatCurrency(calculateProductTotalPrice(product))}
          </p>
          <p className="text-xs text-muted-foreground line-through">
            {formatCurrency(Number(product.price))}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </p>
      </div>
    </div>
  );
}
