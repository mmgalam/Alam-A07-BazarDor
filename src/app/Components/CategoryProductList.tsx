"use client";

import { useState } from "react";
import type { Product } from "@/app/TypeScript/type";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

type SortOption = "default" | "asc" | "desc";

const CategoryProductList = ({ products }: Props) => {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "asc") return a.today - b.today;
    if (sort === "desc") return b.today - a.today;
    return 0;
  });

  return (
    <>
      <div className="mb-4 flex items-center justify-end gap-2">
        <label htmlFor="product-sort" className="text-xs text-neutral-600">
          সাজান:
        </label>
        <select
          id="product-sort"
          value={sort}
          onChange={(event) => setSort(event.target.value as SortOption)}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-700 outline-none focus:border-emerald-600"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3 pb-8 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default CategoryProductList;
