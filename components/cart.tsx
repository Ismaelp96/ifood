"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import CartItem from "./cart-item";
import { CartContext } from "@/context/cart-context";
import { Button } from "./ui/button";
import { formatCurrency } from "@/lib/price";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Loader2 } from "lucide-react";

type CartComponentProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export default function CartComponent({ setIsOpen }: CartComponentProps) {
  const {
    products,
    subtotalPrice,
    totalPrice,
    clearCart,
    totalDiscounts,
    totalQuantity,
  } = useContext(CartContext);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const restaurant = products[0].restaurant;

  return (
    <>
      <div className="flex h-[96%] w-full flex-col justify-between py-5">
        <div className="space-y-4">
          {products.map((product) => (
            <CartItem key={product.id} cartProduct={product} />
          ))}
        </div>
        <div className="w-full space-y-6">
          <div className="w-full space-y-6 rounded-lg border-[1px] border-muted-foreground/20 p-5">
            <div className="relative flex items-center justify-between after:absolute after:-bottom-[10px] after:left-0 after:h-[1px] after:w-full after:bg-muted-foreground/20">
              <span className="text-xs text-muted-foreground">Subtotal</span>
              <span className="text-xs text-foreground">
                {formatCurrency(subtotalPrice)}
              </span>
            </div>
            <div className="relative flex items-center justify-between after:absolute after:-bottom-[10px] after:left-0 after:h-[1px] after:w-full after:bg-muted-foreground/20">
              <span className="text-xs text-muted-foreground">Entrega</span>
              {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                <span className="uppercase text-primary">Grátis</span>
              ) : (
                formatCurrency(Number(products?.[0].restaurant.deliveryFee))
              )}
            </div>
            <div className="relative flex items-center justify-between after:absolute after:-bottom-[10px] after:left-0 after:h-[1px] after:w-full after:bg-muted-foreground/20">
              <span className="text-xs text-muted-foreground">Descontos</span>
              <span className="text-xs text-foreground">
                - {formatCurrency(totalDiscounts)}
              </span>
            </div>
            <div className="relative flex items-center justify-between ">
              <span className="text-sm font-semibold text-foreground">
                Total
              </span>
              <span className="text-sm font-semibold text-foreground">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </div>

          <Button
            disabled={isSubmitLoading}
            onClick={() => setIsConfirmDialogOpen(true)}
            className="h-[45px] w-full"
          >
            Finalizar pedido
          </Button>
        </div>
      </div>
      {/* <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido, você concorda com os termos e condições
              da nossa plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinishOrderClick}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
}
