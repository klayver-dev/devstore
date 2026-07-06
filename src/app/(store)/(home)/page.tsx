import { Api } from "@/data/api";
import { Product } from "@/data/types/product";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// Busca os 3 produtos em destaque
async function getFeaturedProducts(): Promise<Product[]> {
  const response = await Api("/products/featured", {
    next: {
      revalidate: 60 * 60,
    },
  });
  return response.json();
}

// Busca todos os produtos
async function getAllProducts(): Promise<Product[]> {
  const response = await Api("/products", {
    next: {
      revalidate: 60 * 60,
    },
  });
  return response.json();
}

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  // Faz as requisições em paralelo para não travar a renderização
  const [featuredProducts, allProducts] = await Promise.all([
    getFeaturedProducts(),
    getAllProducts(),
  ]);

  const [highlightedProduct, ...otherProducts] = featuredProducts;

  // Filtra os produtos para a lista inferior, removendo os que já estão no destaque
  const featuredIds = featuredProducts.map((p) => p.id);
  const remainingProducts = allProducts.filter(
    (p) => !featuredIds.includes(p.id),
  );

  return (
    <main className="flex flex-col gap-16 pb-10">
      {/* 1. SEÇÃO DE DESTAQUES (Responsiva) */}
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
            className="group-hover:scale-105 transition-transform duration-500 object-cover"
          />

          {/* Posicionamento ajustado para mobile e desktop */}
          <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 lg:bottom-28 lg:right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">{highlightedProduct.title}</span>
            <span className="flex h-full rounded-full items-center justify-center bg-violet-500 px-4 font-semibold whitespace-nowrap">
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
                className="group-hover:scale-105 transition-transform duration-500 object-cover"
              />

              <div className="absolute bottom-4 right-4 lg:bottom-10 lg:right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                <span className="text-sm truncate">{product.title}</span>
                <span className="flex h-full rounded-full items-center justify-center bg-violet-500 px-4 font-semibold whitespace-nowrap">
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

      {/* 2. SEÇÃO DO RESTO DOS PRODUTOS (Nova) */}
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
                className="group-hover:scale-105 transition-transform duration-500 object-cover"
              />

              <div className="absolute bottom-4 right-4 h-12 flex items-center gap-2 max-w-[250px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                <span className="text-sm truncate">{product.title}</span>
                <span className="flex h-full rounded-full items-center justify-center bg-violet-500 px-4 font-semibold whitespace-nowrap">
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
