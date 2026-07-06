import { AddToCartButton } from "@/components/add-to-cart-button";
import { Api } from "@/data/api";
import { Product } from "@/data/types/product";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// Busca os detalhes do produto atual
async function getProduct(slug: string): Promise<Product> {
  const response = await Api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60,
    },
  });
  return response.json();
}

// Busca todos os produtos para a lista inferior
async function getAllProducts(): Promise<Product[]> {
  const response = await Api("/products", {
    next: {
      revalidate: 60 * 60,
    },
  });
  return response.json();
}

interface ProductProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return {
    title: product.title,
  };
}

export default async function ProductPage({ params }: ProductProps) {
  const { slug } = await params;

  // Faz as requisições em paralelo
  const [product, allProducts] = await Promise.all([
    getProduct(slug),
    getAllProducts(),
  ]);

  const installmentPrice = product.price / 12;

  // Remove o produto atual da lista de recomendações
  const relatedProducts = allProducts.filter((p) => p.id !== product.id);

  return (
    <main className="flex flex-col gap-16 pb-10">
      {/* 1. SEÇÃO DO PRODUTO (Responsiva) */}
      <div className="relative flex flex-col lg:grid lg:max-h-[860px] lg:grid-cols-3 gap-8 lg:gap-0">
        <div className="col-span-2 overflow-hidden flex justify-center bg-zinc-900/50 lg:bg-transparent rounded-lg lg:rounded-none">
          <Image
            src={product.image}
            alt=""
            width={1000}
            height={1000}
            quality={100}
            className="object-cover"
          />
        </div>

        {/* Ajuste de padding para mobile (px-4) e desktop (lg:px-12) */}
        <div className="flex flex-col justify-center px-4 lg:px-12">
          <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

          <p className="mt-2 leading-relaxed text-zinc-400">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
            <span className="text-sm text-zinc-400">
              Em 12x s/ juros de{" "}
              {installmentPrice.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="mt-8 space-y-4">
            <span className="block font-semibold">Tamanhos:</span>

            <div className="flex gap-2 flex-wrap">
              {["P", "M", "G", "GG"].map((size) => (
                <button
                  key={size}
                  type="button"
                  className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold transition-colors hover:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 w-full">
            <AddToCartButton productId={product.id} />
          </div>
        </div>
      </div>

      {/* 2. SEÇÃO DE OUTROS PRODUTOS */}
      <section className="px-4 lg:px-0">
        <h2 className="text-2xl font-bold mb-6">Veja também</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Link
              href={`/product/${relatedProduct.slug}`}
              className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end min-h-[350px]"
              key={relatedProduct.id}
            >
              <Image
                src={relatedProduct.image}
                width={400}
                height={400}
                quality={100}
                alt=""
                className="group-hover:scale-105 transition-transform duration-500 object-cover"
              />

              <div className="absolute bottom-4 right-4 h-12 flex items-center gap-2 max-w-[250px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                <span className="text-sm truncate">{relatedProduct.title}</span>
                <span className="flex h-full rounded-full items-center justify-center bg-violet-500 px-4 font-semibold whitespace-nowrap">
                  {relatedProduct.price.toLocaleString("pt-BR", {
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
