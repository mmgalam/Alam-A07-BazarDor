"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/app/TypeScript/type";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

type SortOption = "default" | "asc" | "desc";

const CategoryProductList = ({ products }: Props) => {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const list = [...products];

    if (sort === "asc") return list.sort((a, b) => a.today - b.today);
    if (sort === "desc") return list.sort((a, b) => b.today - a.today);

    return list;
  }, [products, sort]);

  return (
    <>
      <div className="mb-3 mt-4 flex items-center justify-end gap-2 sm:mb-4">
        <label
          htmlFor="product-sort"
          className="shrink-0 text-xs text-neutral-600 sm:text-sm"
        >
          সাজান:
        </label>
        <select
          id="product-sort"
          value={sort}
          onChange={(event) => setSort(event.target.value as SortOption)}
          className="min-w-0 max-w-[60%] rounded-lg border border-neutral-200 bg-white px-3 py-2 text-base text-neutral-700 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 sm:max-w-none sm:text-sm"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3 pb-6 min-[560px]:grid-cols-2 sm:gap-4 sm:pb-8 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default CategoryProductList;