import CategoryList from "@/components/category-list/category-list";
import HeaderComponent from "@/components/header";
import SearchComponent from "@/components/ui/search-component";
import BannerPizza from "@/components/banner-pizza";
import ProductList from "@/components/product-list/product-list";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "@/lib/prisma";
import BannerBurger from "@/components/banner-burger";

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
        <BannerPizza />
      </div>
      <div>
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
        <BannerBurger />
      </div>
    </>
  );
}
