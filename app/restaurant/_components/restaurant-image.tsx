"use client";

import { Restaurant } from "@prisma/client";
import Image from "next/image";

type RestaurantImageProps = {
  restaurant: Pick<Restaurant, "name" | "imageUrl">;
};

export default function RestaurantImage({ restaurant }: RestaurantImageProps) {
  return (
    <div className="relative -z-10 h-[200px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        title={restaurant.name}
        fill
        className="object-cover"
      />
    </div>
  );
}
