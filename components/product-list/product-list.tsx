import { db } from "@/lib/prisma";
import { Category } from "@prisma/client";
import Image from "next/image";


export default async function ProductList() {
  const categories = await db.category.findMany({});

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-6">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}

type CategoryItemProps = {
  category: Category;
};

function CategoryItem({ category }: CategoryItemProps) {
  return (
    <button className="flex w-full max-w-[200px] items-center justify-center gap-x-1 rounded-full bg-white px-6 py-3 shadow-md transition-all duration-300 hover:brightness-90">
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={30}
        height={30}
        style={{ objectFit: "cover" }}
      />
      <p className="text-sm font-semibold">{category.name}</p>
    </button>
  );
}
