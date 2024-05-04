import { formatCurrency } from "@/lib/price";
import { Prisma } from "@prisma/client";
import { Bike, Clock } from "lucide-react";

type DeliveryDetailsProps = {
  restaurant: Prisma.RestaurantGetPayload<{}>;
};

export default function DeliveryDetails({ restaurant }: DeliveryDetailsProps) {
  return (
    <div className="mb-3 flex w-full items-center justify-between rounded-lg border border-muted-foreground/40 py-2.5">
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
  );
}
