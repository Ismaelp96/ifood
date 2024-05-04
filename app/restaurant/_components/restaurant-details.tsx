"use client";

import Image from "next/image";
import { Prisma } from "@prisma/client";
import DeliveryDetails from "@/components/delivery-details";
import ProductList from "@/components/product-list/product-list";

type RestaurantDetailsProps = {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: {
        orderBy: {
          createdAt: "desc";
        };
        include: {
          products: {
            include: {
              restaurant: {
                select: {
                  name: true;
                };
              };
            };
          };
        };
      };
      products: {
        take: 10;
        include: {
          restaurant: {
            select: {
              name: true;
            };
          };
        };
      };
    };
  }>;
};

export default function RestaurantDetails({
  restaurant,
}: RestaurantDetailsProps) {
  return (
    <div className="relative pb-6 pt-2 before:absolute before:-top-4 before:left-0 before:h-4 before:w-full before:rounded-t-3xl before:bg-white">
      <div className="flex items-center justify-between px-5">
        <div className="mb-1.5 flex items-center gap-1.5">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            title={restaurant.name}
            width={30}
            height={30}
            className="h-[30px] w-[30px] rounded-full"
            priority
          />
          <h1 className="text-xl font-semibold text-foreground">
            {restaurant.name}
          </h1>
        </div>
        <div className="flex items-center justify-center gap-x-[3px] rounded-full bg-foreground px-2.5 py-[4px]">
          <Image
            src="/star-icon.svg"
            alt="icone de estrela"
            title="icone de estrela"
            width={10}
            height={10}
          />
          <span className=" text-xs font-semibold text-white">
            {Number(restaurant.rating)}
          </span>
        </div>
      </div>
      <div className="mt-6 px-5">
        <DeliveryDetails restaurant={restaurant} />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-5">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-center rounded-sm bg-[#F4F4F5] px-[56px] py-1"
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-4">
        <h2 className="px-5 font-semibold">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>
      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4" key={category.id}>
          <h2 className="px-5 font-semibold">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}
    </div>
  );
}
