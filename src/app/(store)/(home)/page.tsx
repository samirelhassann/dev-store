import ProductCard from "@/components/product-card";
import { api } from "@/data/api";
import { Product } from "@/data/types/product";

async function getFeaturedProducts(): Promise<Product[]> {
  const productsResponse = await api("/products/featured");

  const { data } = await productsResponse.json();

  return data;
}

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6 ">
      {products.map((product: Product) => {
        return (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            slug={product.slug}
            isMainProduct={products.indexOf(product) === 0}
          />
        );
      })}
    </div>
  );
}
