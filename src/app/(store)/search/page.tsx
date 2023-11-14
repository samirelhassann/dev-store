import { redirect } from "next/navigation";

import ProductCard from "@/components/product-card";
import { api } from "@/data/api";
import { Product } from "@/data/types/product";

interface SearchPageProps {
  searchParams: {
    q: string;
  };
}

async function getSearchProducts(searchText: string): Promise<Product[]> {
  const productsResponse = await api(`/products/search?q=${searchText}`, {
    cache: "no-store",
  });

  const data = await productsResponse.json();

  return data;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: searchText } = searchParams;

  if (!searchText) {
    redirect("/");
  }

  const products = await getSearchProducts(searchText);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Result for: <span className="font-semibold">{searchText}</span>
      </p>

      <div className="grid grid-cols-12 gap-6">
        {products.map((p) => (
          <ProductCard.Component
            key={p.id}
            title={p.title}
            price={p.price}
            image={p.image}
            slug={p.slug}
          />
        ))}
      </div>
    </div>
  );
}
