import RestaurantItem from "@/components/restaurant-list/restaurant-item";
import { db } from "@/lib/prisma";
import Navbar from "../_components/Navbar";
import HeaderComponent from "@/components/header";

const RecommendedRestaurantsPage = async () => {
  const restaurants = await db.restaurant.findMany({ take: 10 });
  return (
    <div className="flex w-full flex-col gap-y-8 px-5 pb-6">
      <HeaderComponent />
      <h1 className=" text-xl font-semibold ">Restaurantes recomendados</h1>
      {restaurants.map((restaurant) => (
        <RestaurantItem restaurant={restaurant} key={restaurant.id} />
      ))}
    </div>
  );
};

export default RecommendedRestaurantsPage;
