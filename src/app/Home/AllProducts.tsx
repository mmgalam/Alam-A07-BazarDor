import ProductCard from "@/app/Components/ProductCard";
import { getProducts } from "@/lib/products";

const AllProducts = async () => {
  const products = await getProducts();

  return (
    <section
      id="all-products"
      aria-labelledby="all-products-heading"
      className="container mx-auto scroll-mt-4 px-3 py-4 sm:px-4 sm:py-5 lg:px-6"
    >
      <div className="mb-3 sm:mb-4">
        <h2
          id="all-products-heading"
          className="text-base font-bold text-neutral-800 sm:text-lg"
        >
          সব পণ্য
        </h2>
        <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 pb-6 min-[560px]:grid-cols-2 sm:gap-4 sm:pb-8 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-neutral-200 bg-white p-4 text-xs text-neutral-500 sm:p-5 sm:text-sm">
          বর্তমানে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
};

export default AllProducts;
