import { cache } from "react";
import type { Product } from "@/app/TypeScript/type";

const PRODUCTS_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

export const getProducts = cache(async (): Promise<Product[]> => {
  const res = await fetch(PRODUCTS_URL, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
});