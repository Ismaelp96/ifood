"use server";

import { db } from "@/lib/prisma";

export const searchForResturant = async (search: string) => {
  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return restaurants;
};
