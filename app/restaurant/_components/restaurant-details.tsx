"use client";

import Image from "next/image";
import { Prisma } from "@prisma/client";
import { Bike, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/price";

type RestaurantDetailsProps = {
  restaurant: Prisma.RestaurantGetPayload<{}>;
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
        <div className="mb-6 flex w-full items-center justify-between rounded-sm border border-muted-foreground/40 py-2.5">
          <div className="flex flex-col items-center justify-center px-12">
            <div className="flex items-center gap-x-1">
              <h6 className="text-xs text-muted-foreground">Entrega</h6>
              <Bike className="h-3 w-3 text-muted-foreground" />
            </div>
            <span className="text-xs font-semibold text-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Grátis"
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center px-12">
            <div className="flex items-center gap-x-1">
              <h6 className="text-xs text-muted-foreground">Entrega</h6>
              <Clock className="h-3 w-3 text-muted-foreground" />
            </div>
            <span className="text-xs font-semibold text-foreground">
              {restaurant.deliveryTimeMinutes}min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
