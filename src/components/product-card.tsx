import Image from "next/image";
import Link from "next/link";

import Skeleton from "./skeleton";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  slug: string;
  isMainProduct?: boolean;
}

function Component({
  title,
  price,
  image,
  slug,
  isMainProduct = false,
}: ProductCardProps) {
  const formatedPrice = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  return (
    <Link
      href={slug}
      className="group row-span-3 col-span-3 data-[main-product=true]:col-span-6 data-[main-product=true]:row-span-6  rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end relative"
      data-main-product={isMainProduct}
    >
      <Image
        src={image}
        className="group-hover:scale-105 transition-transform duration-500"
        alt=""
        width={920}
        height={920}
        quality={100}
      />

      <div className="absolute bottom-14 right-14 group-data-[main-product=true]:bottom-32 group-data-[main-product=true]:right-32 bg-zinc-950/60 w-[15rem] rounded-full border-2 border-zinc-500 flex items-center justify-between p-px group-hover:scale-105 transition-transform duration-500">
        <span className="text-sm text-zinc-100 truncate px-2">{title}</span>

        <div className="bg-violet-500 h-full flex items-center justify-center rounded-full p-2">
          <span className="font-semibold text-white">{formatedPrice}</span>
        </div>
      </div>
    </Link>
  );
}

function Loading({ isMainProduct = false }: { isMainProduct?: boolean }) {
  return (
    <Skeleton
      className="group row-span-3 col-span-3 data-[main-product=true]:col-span-6 data-[main-product=true]:row-span-6  rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end relative h-[25rem] data-[main-product=true]:h-[51.5rem]"
      data-main-product={isMainProduct}
    />
  );
}

export default { Component, Loading };
