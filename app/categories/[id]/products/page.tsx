import ProductDetails from "@/app/products/[id]/_components/product-details";
import HeaderComponent from "@/components/header";
import { ProductItem } from "@/components/product-list/product-list";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

type CategoriesPageProps = {
  params: {
    id: string;
  };
};
export default async function CategoriesPage({
  params: { id },
}: CategoriesPageProps) {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <div className="space-y-6 px-5">
      <HeaderComponent />
      <h1 className="mb-6 text-xl font-semibold">{category.name}</h1>
      <div className="grid grid-cols-2 gap-6">
        {category.products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            className="min-w-full"
          />
        ))}
      </div>
    </div>
  );
}
