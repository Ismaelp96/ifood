"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Restaurant } from "@prisma/client";
import { searchForResturant } from "@/actions/search";
import RestaurantItem from "@/components/restaurant-list/restaurant-item";
import HeaderComponent from "@/components/header";

const RestaurantsSearchPage = () => {
  const searchParams = useSearchParams();

  const [restaurants, setResturants] = useState<Restaurant[]>([]);
  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForResturant(searchFor);
      setResturants(foundRestaurants);
    };
    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <div className="flex w-full flex-col gap-y-8 px-5 pb-6">
      <HeaderComponent />
      <h1 className=" text-xl font-semibold ">Restaurantes encontrados</h1>
      {restaurants.map((restaurant) => (
        <RestaurantItem restaurant={restaurant} key={restaurant.id} />
      ))}
    </div>
  );
};
export default RestaurantsSearchPage;
