import type { Product } from "@/app/TypeScript/type";
import ProductCard from "@/app/Components/ProductCard";

const AllProducts = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  return (
    <section id="all-products" className="container mx-auto py-5">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-neutral-800 sm:text-base">
          সব পণ্য
        </h2>
        <p className="mt-1 text-xs text-neutral-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 pb-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
