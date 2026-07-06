import { getFeaturedProducts } from "@/data/products";

export function GET() {
  return Response.json(getFeaturedProducts());
}
