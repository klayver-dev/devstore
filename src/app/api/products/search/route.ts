import z from "zod";
import { NextRequest } from "next/server";

import { searchProducts } from "@/data/products";

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { searchParams } = request.nextUrl;
  const query = z.string().parse(searchParams.get("q"));

  const products = searchProducts(query);

  return Response.json(products, { status: 200 });
}
