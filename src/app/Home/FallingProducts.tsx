import type { Product } from "@/app/TypeScript/type";
import ProductCard from "@/app/Components/ProductCard";

const FallingProducts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch falling products");
  }

  const products: Product[] = await res.json();

  const fallingProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="container mx-auto py-5">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-neutral-800 sm:text-base">
          <span className="text-emerald-600">▼</span> আজ দাম কমেছে{" "}
        </h2>
      </div>
      {fallingProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fallingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-neutral-200 bg-white p-5 text-sm text-neutral-500">
          বর্তমানে দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
};

export default FallingProducts;
