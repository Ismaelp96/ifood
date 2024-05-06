import HeaderComponent from "@/components/header";
import { ProductItem } from "@/components/product-list/product-list";
import { db } from "@/lib/prisma";

type RecommendedProductsPageProps = {};

export default async function RecommendedProductsPage() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <div className="space-y-6 px-5 pb-6">
      <HeaderComponent />
      <h1 className="text-xl font-semibold text-foreground">
        Pedidos recomendados
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
