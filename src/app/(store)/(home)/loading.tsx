/* eslint-disable react/no-array-index-key */
import ProductCard from "@/components/product-card";

export default function Loading() {
  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6 ">
      {Array.from({ length: 3 }).map((_, i) => {
        return <ProductCard.Loading key={i} isMainProduct={i === 0} />;
      })}
    </div>
  );
}
