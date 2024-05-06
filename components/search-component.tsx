"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchComponent() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleChangeSubit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }

    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form
      className="flex w-full items-center pt-6"
      onSubmit={handleChangeSubit}
    >
      <Input
        onChange={handleChange}
        value={search}
        placeholder="Buscar Restaurantes"
        className="h-10 rounded-r-none border-none py-[9.5px] pl-4 text-base focus-visible:ring-transparent"
      />
      <Button size="icon" className="absolute right-4" type="submit">
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
}
