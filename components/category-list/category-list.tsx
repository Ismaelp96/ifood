import { db } from "@/lib/prisma";
import { Category } from "@prisma/client";
import Image from "next/image";

export default async function CategoryList() {
  const categories = await db.category.findMany({});

  return (
    <div className="flex gap-x-3 overflow-x-scroll pb-1 pt-6 [&::-webkit-scrollbar]:hidden">
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
    <button className="flex w-full min-w-[160px] items-center justify-center gap-x-1 rounded-full bg-white py-2 shadow-md transition-all duration-300 hover:brightness-90">
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
