/* eslint-disable react/no-array-index-key */
import ProductCard from "@/components/product-card";
import Skeleton from "@/components/skeleton";

export default async function SearchPage() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-40 h-5" />

      <div className="grid grid-cols-12 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <ProductCard.Loading key={i} />
        ))}
      </div>
    </div>
  );
}
