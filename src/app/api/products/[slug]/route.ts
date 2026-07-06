import z from "zod";

import { getProductBySlug } from "@/data/products";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { slug: slugParam } = await params;
  const slug = z.string().parse(slugParam);

  const product = getProductBySlug(slug);

  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }

  return Response.json(product);
}
