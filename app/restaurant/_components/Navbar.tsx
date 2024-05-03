"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, HeartIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [favority, setFavority] = useState(false);

  function handleButton() {
    setFavority((prevLiked) => !prevLiked);
  }

  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="absolute left-0 top-0 flex w-full items-center justify-between px-5 pt-6">
      <Button
        onClick={handleBackClick}
        className="flex items-center justify-center rounded-full bg-white"
        variant="ghost"
        size="icon"
      >
        <ChevronLeft size={16} />
      </Button>
      <button
        onClick={handleButton}
        className="flex h-10 w-10 items-center justify-center gap-0.5 rounded-full bg-black/40 p-2"
      >
        <HeartIcon
          className={cn(
            "h-4 w-4  transition-all duration-300 active:fill-primary active:text-primary",
            favority ? "fill-primary text-primary" : "fill-white text-white",
          )}
        />
      </button>
    </div>
  );
}
