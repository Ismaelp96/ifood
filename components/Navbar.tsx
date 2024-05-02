"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, HeartIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [favority, setFavority] = useState(false);

  function handleButton() {
    setFavority((prevLiked) => !prevLiked);
  }

  return (
    <div className="flex items-center justify-between px-5 pt-6">
      <Link href={"/"}>
        <Button
          className="flex items-center justify-center rounded-full bg-white "
          variant="ghost"
        >
          <ChevronLeft size={16} />
        </Button>
      </Link>
      <button
        onClick={handleButton}
        className="flex items-center justify-center gap-0.5 rounded-full bg-black/40 p-2"
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
