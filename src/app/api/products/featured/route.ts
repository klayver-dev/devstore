import { getFeaturedProducts } from "@/data/products";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Response.json(getFeaturedProducts());
}
