import { ChevronRightIcon } from "lucide-react";

import CategoryList from "@/components/category-list/category-list";
import HeaderComponent from "@/components/header";
import SearchComponent from "@/components/search-component";
import ProductList from "@/components/product-list/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import RestaurantList from "@/components/restaurant-list/restaurant-list";
import PromoBanner from "@/components/promo-banner";

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <div className="px-5">
        <HeaderComponent />
        <SearchComponent />
      </div>
      <CategoryList />
      <div className="px-5">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas"
          title="Até 30% de desconto em pizzas"
        />
      </div>
      <div className="pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant={"ghost"}
            className="h-fit p-0 text-xs text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={20} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>
      <div className="px-5">
        <PromoBanner
          src="/promo-banner-02.png"
          alt="Lanches a partir de R$ 17,90"
          title="Lanches a partir de R$ 17,90"
        />
      </div>
      <div className="py-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant={"ghost"}
            className="h-fit p-0 text-xs text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={20} />
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
}
