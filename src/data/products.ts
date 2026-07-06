import data from "./data.json";

export function getAllProducts() {
  return data.products;
}

export function getFeaturedProducts() {
  return data.products.filter((product) => product.featured);
}

export function getProductBySlug(slug: string) {
  return data.products.find((product) => product.slug === slug);
}

export function searchProducts(query: string) {
  return data.products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  );
}
