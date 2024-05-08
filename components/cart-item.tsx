"use client";
import { ChevronLeft, ChevronRight, Trash2Icon } from "lucide-react";
import Image from "next/image";

import { calculateProductTotalPrice, formatCurrency } from "@/lib/price";
import { CartContext, CartProduct } from "@/context/cart-context";
import { Button } from "./ui/button";
import { memo, useContext } from "react";

interface CardItemProps {
  cartProduct: CartProduct;
}

function CartItem({ cartProduct }: CardItemProps) {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantity = () => decreaseProductQuantity(cartProduct.id);
  const handleincreaseQuantity = () => increaseProductQuantity(cartProduct.id);
  const handleRemoveItem = () => {
    removeProductFromCart(cartProduct.id);
  };

  return (
    <div className="">
      <div className="flex w-full items-start justify-between">
        <div className="flex gap-x-4">
          <div className="relative h-20 w-20">
            <Image
              src={cartProduct.imageUrl}
              alt={cartProduct.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col items-start">
            <h4 className="mb-1 text-xs font-medium text-foreground">
              {cartProduct.name}
            </h4>
            <div className="mb-2 flex items-center gap-x-1">
              <h5 className="text-sm font-semibold text-foreground">
                {formatCurrency(
                  Number(
                    calculateProductTotalPrice(cartProduct) *
                      cartProduct.quantity,
                  ),
                )}
              </h5>
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            </div>
            <div className="flex items-center gap-x-1">
              <Button
                variant="outline"
                className="h-8 w-8 border border-solid border-muted-foreground/40 px-0"
                onClick={handleDecreaseQuantity}
              >
                <ChevronLeft size={16} />
              </Button>
              <p className="w-6 text-center text-sm">{cartProduct.quantity}</p>
              <Button
                onClick={handleincreaseQuantity}
                variant="default"
                className="h-8 w-8 px-0"
              >
                <ChevronRight className="text-white" size={16} />
              </Button>
            </div>
          </div>
        </div>
        <div className="self-center">
          <Button
            size={"icon"}
            variant={"outline"}
            className="border-text-muted-foreground"
            onClick={handleRemoveItem}
          >
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(CartItem, (prev, next) => {
  return prev.cartProduct.quantity === next.cartProduct.quantity;
});
