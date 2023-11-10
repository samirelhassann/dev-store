import { Metadata } from "next";
import Image from "next/image";

import AddToCartButton from "@/components/add-to-cart-button";
import { api } from "@/data/api";
import { Product } from "@/data/types/product";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

async function getProductDetails(slug: string): Promise<Product> {
  const productsResponse = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60 * 1, // 1 hour
    },
  });

  const productInfo = await productsResponse.json();

  return productInfo;
}

export async function generateStaticParams() {
  const response = await api("/products/featured");
  const { data: products } = await response.json();

  return products.map((product: Product) => {
    return { slug: product.slug };
  });
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { title } = await getProductDetails(params.slug);

  return {
    title,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { title, description, price, image, id } = await getProductDetails(
    params.slug
  );

  const formatedPrice = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  const formatedInstallmentPrice = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price / 12);

  const formatedInstallment = `Up to 12x of ${formatedInstallmentPrice} without interest`;

  return (
    <div className="grid grid-cols-10 justify-center">
      <Image
        src={image}
        className="col-span-7"
        alt=""
        width={900}
        height={900}
        quality={100}
      />

      <div className="col-span-3 flex flex-col justify-center gap-8">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-4xl text-white ">{title}</span>
          <span className="text-zinc-400 leading-6 self-stretch">
            {description}
          </span>
        </div>

        <div className="flex gap-3 items-center">
          <div className="bg-violet-500 px-5 py-2 flex items-center justify-center rounded-full">
            <span className="text-base font-semibold">{formatedPrice}</span>
          </div>

          <span className="text-sm font-normal leading-5 text-zinc-400">
            {formatedInstallment}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-semibold text-white">Sizes</span>

          <div className="flex gap-2 items-center">
            <div className="bg-zinc-800 border-[1px] border-zinc-700 px-5 py-2 flex items-center justify-center rounded-full">
              <span className="text-base font-semibold">P</span>
            </div>
            <div className="bg-zinc-800 border-[1px] border-zinc-700 px-5 py-2 flex items-center justify-center rounded-full">
              <span className="text-base font-semibold">M</span>
            </div>
            <div className="bg-zinc-800 border-[1px] border-zinc-700 px-5 py-2 flex items-center justify-center rounded-full">
              <span className="text-base font-semibold">G</span>
            </div>
          </div>
        </div>

        <AddToCartButton productId={id} />
      </div>
    </div>
  );
}
