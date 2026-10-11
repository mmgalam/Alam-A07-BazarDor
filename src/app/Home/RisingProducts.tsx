import ProductCard from "@/app/Components/ProductCard";
import { getProducts } from "@/lib/products";

const RisingProducts = async () => {
  const products = await getProducts();

  const risingProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <section
      aria-labelledby="rising-products-heading"
      className="container mx-auto px-3 py-4 sm:px-4 sm:py-5 lg:px-6"
    >
      <div className="mb-3 sm:mb-4">
        <h2
          id="rising-products-heading"
          className="text-base font-bold text-neutral-800 sm:text-lg"
        >
          <span className="text-red-600" aria-hidden="true">
            ▲
          </span>{" "}
          আজ দাম বেড়েছে
        </h2>
      </div>

      {risingProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 min-[560px]:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {risingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-neutral-200 bg-white p-4 text-xs text-neutral-500 sm:p-5 sm:text-sm">
          বর্তমানে দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
};

export default RisingProducts;
