import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, getAllProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const [featuredProducts, allProducts] = await Promise.all([
    getFeaturedProducts(),
    getAllProducts(),
  ]);

  const [highlightedProduct, ...otherProducts] = featuredProducts;

  const featuredIds = featuredProducts.map((p) => p.id);
  const remainingProducts = allProducts.filter(
    (p) => !featuredIds.includes(p.id),
  );

  return (
    <main className="flex flex-col gap-16 pb-10 px-4 lg:px-0 max-w-full overflow-hidden">
      {/* 1. SEÇÃO DE DESTAQUES */}
      <div className="grid grid-cols-1 lg:grid-cols-9 lg:grid-rows-6 gap-6 lg:max-h-[860px]">
        {/* Produto Principal */}
        <Link
          href={`/product/${highlightedProduct.slug}`}
          className="group relative col-span-1 lg:col-span-6 lg:row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end min-h-[400px]"
        >
          <Image
            src={highlightedProduct.image}
            width={860}
            height={860}
            quality={100}
            alt=""
            className="group-hover:scale-105 transition-transform duration-500 object-cover w-full h-full absolute inset-0"
          />

          {/* AJUSTE: max-w-[calc(100%-2rem)], pl-3 (mobile) e texto levemente menor no preço */}
          <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 lg:bottom-28 lg:right-28 h-12 flex items-center gap-2 max-w-[calc(100%-2rem)] sm:max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-3 sm:pl-5">
            <span className="text-xs sm:text-sm truncate flex-1">
              {highlightedProduct.title}
            </span>
            <span className="flex h-full rounded-full items-center justify-center bg-violet-500 px-3 sm:px-4 font-semibold whitespace-nowrap text-xs sm:text-base">
              {highlightedProduct.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>

        {/* Outros 2 Produtos em Destaque */}
        {otherProducts.map((product) => {
          return (
            <Link
              href={`/product/${product.slug}`}
              className="group relative col-span-1 lg:col-span-3 lg:row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end min-h-[400px]"
              key={product.id}
            >
              <Image
                src={product.image}
                width={860}
                height={860}
                quality={100}
                alt=""
                className="group-hover:scale-105 transition-transform duration-500 object-cover w-full h-full absolute inset-0"
              />

              {/* AJUSTE IGUAL AO PRODUTO PRINCIPAL */}
              <div className="absolute bottom-4 right-4 lg:bottom-10 lg:right-10 h-12 flex items-center gap-2 max-w-[calc(100%-2rem)] sm:max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-3 sm:pl-5">
                <span className="text-xs sm:text-sm truncate flex-1">
                  {product.title}
                </span>
                <span className="flex h-full rounded-full items-center justify-center bg-violet-500 px-3 sm:px-4 font-semibold whitespace-nowrap text-xs sm:text-base">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 2. SEÇÃO DO RESTO DOS PRODUTOS */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Mais Produtos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {remainingProducts.map((product) => (
            <Link
              href={`/product/${product.slug}`}
              className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end min-h-[350px]"
              key={product.id}
            >
              <Image
                src={product.image}
                width={400}
                height={400}
                quality={100}
                alt=""
                className="group-hover:scale-105 transition-transform duration-500 object-cover w-full h-full absolute inset-0"
              />

              {/* AJUSTE IGUAL AOS PRODUTOS DE CIMA */}
              <div className="absolute bottom-4 right-4 h-12 flex items-center gap-2 max-w-[calc(100%-2rem)] sm:max-w-[250px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-3 sm:pl-5">
                <span className="text-xs sm:text-sm truncate flex-1">
                  {product.title}
                </span>
                <span className="flex h-full rounded-full items-center justify-center bg-violet-500 px-3 sm:px-4 font-semibold whitespace-nowrap text-xs sm:text-base">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
