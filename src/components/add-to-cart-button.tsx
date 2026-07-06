"use client";
import { useCart } from "@/context/cart-context";

export function AddToCartButton({ productId }: { productId: number }) {
  const { addToCart } = useCart();
  return (
    <button
      type="button"
      className="cursor-pointer p-4 mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
      onClick={() => addToCart(productId)}
    >
      Adicionar ao carrinho
    </button>
  );
}
