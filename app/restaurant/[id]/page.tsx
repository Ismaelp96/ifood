import { db } from "@/lib/prisma";

import { notFound } from "next/navigation";
import RestaurantImage from "../_components/restaurant-image";
import RestaurantDetails from "../_components/restaurant-details";

type RestaurantPageProps = {
  params: {
    id: string;
  };
};

export default async function RestaurantPage({
  params: { id },
}: RestaurantPageProps) {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
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

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />
      <RestaurantDetails restaurant={restaurant} />
    </div>
  );
}
