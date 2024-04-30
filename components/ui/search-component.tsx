import { Search } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";

export default function SearchComponent() {
  return (
    <div className="flex w-full items-center pt-6">
      <Input
        placeholder="Buscar Restaurantes"
        className="h-10 rounded-r-none border-none text-base focus-visible:ring-transparent"
      />
      <Button size="icon" className="absolute right-7">
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
}
