"use client";

import { useContext } from "react";

import CartItem from "./cart-item";
import { CartContext } from "@/providers/_context/cart-context";
import { Button } from "./ui/button";

export default function CartComponent() {
  const { products } = useContext(CartContext);

  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}

        <div className="w-full self-end">
          <Button className="w-full">Finalizar pedido</Button>
        </div>
      </div>
    </div>
  );
}
