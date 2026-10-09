import Link from "next/link";
import { Product } from "@/app/TypeScript/type";

const AllProducts = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  const unitLabel: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    piece: "পিস",
    dozen: "ডজন",
  };

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

      {/* Products */}
      <div className="grid grid-cols-1 gap-3 pb-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group rounded-lg border border-neutral-200 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                {/* Product */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f3f6f2] text-xl">
                    {product.image}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-xs font-bold text-neutral-800">
                      {product.nameBn}
                    </h3>

                    <p className="mt-0.5 text-[10px] text-neutral-500">
                      প্রতি {unitLabel[product.unit] ?? product.unit}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex justify-between mt-3">
                <div>
                  <p className="text-[9px] text-neutral-500">আজকের দাম</p>

                  <p className="mt-0.5 text-sm font-extrabold text-neutral-900">
                    {product.today.toLocaleString("bn-BD")}{" "}
                    <span className="font-medium">টাকা</span>
                  </p>
                </div>

                <span
                  className={
                    isUp
                      ? "shrink-0 rounded-full bg-red-50 px-3 py-3 text-[9px] font-semibold text-red-500"
                      : isDown
                        ? "shrink-0 rounded-full bg-emerald-50 px-3 py-3 text-[9px] font-semibold text-emerald-600"
                        : "shrink-0 rounded-full bg-neutral-100 px-3 py-3 text-[9px] font-semibold text-neutral-600"
                  }
                >
                  {isUp ? "▲" : isDown ? "▼" : "—"} {product.change.pct}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default AllProducts;
