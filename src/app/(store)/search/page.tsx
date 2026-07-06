import { Api } from "@/data/api";
import { Product } from "@/data/types/product";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getSearchProducts(query: string): Promise<Product[]> {
  const response = await Api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60,
    },
  });

  const data = await response.json();
  return data;
}

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: query } = await searchParams;

  if (!query) {
    redirect("/");
  }

  const products = await getSearchProducts(query);

  return (
    <div className="flex flex-col gap-4">
      <p>
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.slug}`}
              key={product.id}
              className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
            >
              <Image
                src={product.image}
                width={480}
                height={480}
                quality={100}
                alt=""
                className="group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                <span className="text-sm truncate">{product.title}</span>
                <span className="flex h-full rounded-full items-center justify-center bg-violet-500 px-4 font-semibold">
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
    </div>
  );
}
