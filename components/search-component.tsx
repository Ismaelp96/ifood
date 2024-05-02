import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function SearchComponent() {
  return (
    <div className="flex w-full items-center pt-6">
      <Input
        placeholder="Buscar Restaurantes"
        className="h-10 rounded-r-none border-none text-base focus-visible:ring-transparent"
      />
      <Button size="icon" className="absolute right-4">
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
}
