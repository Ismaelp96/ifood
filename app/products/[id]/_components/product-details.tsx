"use client";

import Image from "next/image";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import { Bike, ChevronLeft, ChevronRight, Clock } from "lucide-react";

import BagdeDiscount from "@/components/bagde-descont";
import { calculateProductTotalPrice, formatCurrency } from "@/lib/price";
import { Button } from "@/components/ui/button";
import ProductList from "@/components/product-list/product-list";

type ProductDetailsProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProduct: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
};

export default function ProductDetails({
  product,
  complementaryProduct,
}: ProductDetailsProps) {
  const restaurants = product.restaurant;

  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () =>
    setQuantity((currentState) => currentState + 1);

  const handleDecreaseQuantity = () => {
    setQuantity((currentState) => {
      if (currentState === 1) return 1;

      return currentState - 1;
    });
  };

  return (
    <div className="relative pb-6 pt-2 before:absolute before:-top-4 before:left-0 before:h-4 before:w-full before:rounded-t-3xl before:bg-white">
      <div className="mb-1 flex items-center gap-1.5 px-5">
        <Image
          src={restaurants.imageUrl}
          alt={restaurants.name}
          title={restaurants.name}
          width={16}
          height={16}
          className="h-4 w-4 rounded-full"
          priority
        />
        <span className="text-xs text-muted-foreground">
          {restaurants.name}
        </span>
      </div>
      <div className="mb-6 px-5">
        <h1 className="mb-3 text-xl font-semibold text-foreground">
          {product.name}
        </h1>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-x-1.5">
              <h2 className="text-xl font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>
              {product.discountPercentage && (
                <BagdeDiscount product={product} />
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 border border-solid border-muted-foreground/40 px-0"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeft size={16} />
            </Button>
            <p className="w-6 text-center">{quantity}</p>
            <Button
              variant="default"
              className="h-8 w-8 px-0"
              onClick={handleIncreaseQuantity}
            >
              <ChevronRight className="text-white" size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className="px-5">
        <div className="mb-6 flex w-full items-center justify-between rounded-sm border border-muted-foreground/40 py-2.5">
          <div className="flex flex-col items-center justify-center px-12">
            <div className="flex items-center gap-x-1">
              <h6 className="text-xs text-muted-foreground">Entrega</h6>
              <Bike className="h-3 w-3 text-muted-foreground" />
            </div>
            <span className="text-xs font-semibold text-foreground">
              {Number(restaurants.deliveryFee) === 0
                ? "Grátis"
                : formatCurrency(Number(restaurants.deliveryFee))}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center px-12">
            <div className="flex items-center gap-x-1">
              <h6 className="text-xs text-muted-foreground">Entrega</h6>
              <Clock className="h-3 w-3 text-muted-foreground" />
            </div>
            <span className="text-xs font-semibold text-foreground">
              {restaurants.deliveryTimeMinutes}min
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>
      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sucos</h3>
      </div>
      <ProductList products={complementaryProduct} />
    </div>
  );
}
