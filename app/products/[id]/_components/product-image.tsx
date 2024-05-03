"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";

type ProductImageProps = {
  product: Pick<Product, "imageUrl" | "name">;
};

export default function ProductImage({ product }: ProductImageProps) {
  const router = useRouter();

  const handleBackClick = () => router.back();
  return (
    <div className="relative h-[356px] w-full">
      <Button
        onClick={handleBackClick}
        className="absolute left-4 top-4 z-10 flex items-center justify-center rounded-full bg-white"
        variant="ghost"
        size="icon"
      >
        <ChevronLeft />
      </Button>
      <Image
        src={product.imageUrl}
        alt={product.name}
        title={product.name}
        fill
        className="object-cover"
      />
    </div>
  );
}
