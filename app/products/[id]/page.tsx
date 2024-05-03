import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductsPage({
  params: { id },
}: ProductPageProps) {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      restaurant: true,
      category: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const complementaries = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div className="">
      <ProductImage product={product} />
      <ProductDetails
        product={product}
        complementaryProduct={complementaries}
      />
    </div>
  );
}
