"use client";

import { useCart } from "@/contexts/cart-context";

interface AddToCartButtonProps {
  productId: number;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddProduct = () => {
    addToCart(productId);
  };

  return (
    <button
      type="button"
      className="bg-emerald-500  py-3 flex items-center justify-center rounded-full font-semibold text-white hover:opacity-90 transition-all duration-200"
      onClick={handleAddProduct}
    >
      Add to cart
    </button>
  );
}
