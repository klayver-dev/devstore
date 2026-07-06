import z from "zod";
import data from "../../data.json";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  await new Promise((resolver) => setTimeout(resolver, 1000));

  const { slug: slugParam } = await params;

  const slug = z.string().parse(slugParam);
  const product = data.products.find((product) => product.slug === slug);

  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 400 });
  }
  return Response.json(product);
}
