"use client";

import { formatCurrency } from "@/lib/price";
import { Restaurant } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "./../../lib/utils";
import Link from "next/link";

type RestaurantListProps = {
  restaurant: Restaurant;
};

export default function RestaurantItem({ restaurant }: RestaurantListProps) {
  const [favority, setFavority] = useState(false);

  function handleButton() {
    setFavority((prevLiked) => !prevLiked);
  }
  const href = `/restaurant/${restaurant.id}`;
  return (
    <Link href={href}>
      <div className=" w-full min-w-[266px] space-y-3">
        <div className="relative h-[136px] w-full rounded-lg">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            title={restaurant.name}
            fill
            className="rounded-lg object-cover shadow-sm"
          />

          <div className="absolute left-2 top-2 flex items-center justify-center gap-0.5 rounded-full bg-white px-2 py-[4px]">
            <Image
              src="/star-icon.svg"
              alt="icone de estrela"
              title="icone de estrela"
              width={10}
              height={10}
            />
            <span className="text- pt-0.5 text-xs font-semibold text-foreground">
              {Number(restaurant.rating)}
            </span>
          </div>
          <button
            onClick={handleButton}
            className="absolute right-2 top-2 flex items-center justify-center gap-0.5 rounded-full bg-black/40 p-2"
          >
            <HeartIcon
              className={cn(
                "h-4 w-4  transition-all duration-300 active:fill-primary active:text-primary",
                favority
                  ? "fill-primary text-primary"
                  : "fill-white text-white",
              )}
            />
          </button>
        </div>
        <div className="flex flex-col">
          <h4 className="truncate text-sm font-semibold text-foreground">
            {restaurant.name}
          </h4>
          <div className="flex w-full gap-x-3">
            <div className="flex items-center gap-x-1.5">
              <Image
                src="/icon-motoboy.svg"
                width={13}
                height={12}
                alt="Icone de entrega"
                title="icone de entrega"
              />
              <p className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) == 0
                  ? "Entrega Grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </p>
            </div>
            <div className="flex items-center gap-x-1.5">
              <Image
                src="/icon-clock.svg"
                width={13}
                height={12}
                alt="Icone de entrega"
                title="icone de entrega"
              />
              <p className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes}min
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
