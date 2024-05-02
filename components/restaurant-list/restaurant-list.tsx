import { db } from "@/lib/prisma";
import RestaurantItem from "./restaurant-item";

export default async function RestaurantList() {
  const restaurants = await db.restaurant.findMany({
    take: 10,
  });

  return (
    <div className="mt-2 flex gap-x-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
