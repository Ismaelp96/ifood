import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "@/lib/price";

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
};

function ProductItem({ product }: ProductsItemProps) {
  return (
    <div className=" w-full min-w-[150px] space-y-2 ">
      <div className="relative h-[150px] w-full rounded-lg">
        <Image
          src={product.imageUrl}
          alt={product.name}
          title={product.name}
          fill
          className="rounded-lg object-cover shadow-sm"
        />
        {product.discountPercentage && (
          <div className="absolute left-2 top-2 flex items-center gap-0.5 rounded-full bg-primary px-2 py-[2px]">
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
        )}
      </div>
      <div className="flex flex-col">
        <h4 className="truncate text-sm font-medium text-foreground">
          {product.name}
        </h4>
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
