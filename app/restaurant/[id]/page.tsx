import { db } from "@/lib/prisma";
import Image from "next/image";

export default async function RestaurantPage() {
  const restaurant = await db.restaurant.findMany({});

  return <div>a</div>;
}
