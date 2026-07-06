import z from "zod";
import data from "../../data.json";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await new Promise((resolver) => setTimeout(resolver, 1000));
  const { searchParams } = request.nextUrl;
  const query = z.string().parse(searchParams.get("q"));

  const products = data.products.filter((product) => {
    return product.title.toLowerCase().includes(query.toLowerCase());
  });

  return Response.json(products, { status: 200 });
}
