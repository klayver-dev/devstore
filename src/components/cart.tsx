"use client";
import { useCart } from "@/context/cart-context";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/data/types/product"; // Confirme o caminho
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function CartWidget() {
  const { items } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Erro ao buscar produtos", err));
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const cartTotal = items.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.productId);
    return acc + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 cursor-pointer rounded-full bg-zinc-900 px-4 py-2 hover:bg-zinc-800 transition-colors">
          <ShoppingBag className="h-4 w-4" />
          <span className="text-sm font-semibold">Cart ({totalItems})</span>
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md bg-zinc-950 border-zinc-800 flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Seu Carrinho</SheetTitle>
        </SheetHeader>

        <div className="mt-2 flex-1 overflow-y-auto pr-2">
          {items.length === 0 ? (
            <p className="text-zinc-500 text-sm text-center">
              Seu carrinho está vazio.
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;

                return (
                  <div
                    key={item.productId}
                    className="flex items-start gap-4 border-b border-zinc-800 p-2"
                  >
                    {/* Imagem do Produto levemente aumentada para acompanhar o texto */}
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-zinc-900 mt-1">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Informações */}
                    <div className="flex flex-1 flex-col min-h-[6rem]">
                      {/* Título e Preço */}
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-sm font-medium line-clamp-1">
                          {product.title}
                        </span>
                      </div>

                      {/* Nova Descrição */}
                      <p className="mt-1 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Quantidade */}
                      <div className="flex items-center justify-between gap-3 text-zinc-400 mt-auto pt-2">
                        <span className="text-xs bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800">
                          Qtd: {item.quantity}
                        </span>
                        <span className="text-lg font-bold text-violet-500 whitespace-nowrap">
                          {(product.price * item.quantity).toLocaleString(
                            "pt-BR",
                            {
                              style: "currency",
                              currency: "BRL",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-800 mt-auto bg-zinc-950">
            <div className="flex items-center justify-between font-semibold">
              <span className="text-white">Total:</span>
              <span className="text-violet-500 text-lg">
                {cartTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <button className="w-full cursor-pointer mt-6 bg-violet-500 hover:bg-violet-600 text-white font-semibold py-3 rounded-md transition-colors">
              Finalizar Compra
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
