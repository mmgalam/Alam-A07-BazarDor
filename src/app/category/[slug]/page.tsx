import { notFound } from "next/navigation";
import Link from "next/link";
import CategoryProductList from "@/app/Components/CategoryProductList";
import { Category, Product } from "@/app/TypeScript/type";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  const [categoryRes, productsRes] = await Promise.all([
    fetch(
      `https://openapi.programming-hero.com/api/bazardor/categories/${encodeURIComponent(slug)}`,
    ),
    fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(slug)}`,
    ),
  ]);

  if (!categoryRes.ok) {
    notFound();
  }

  if (!productsRes.ok) {
    throw new Error("Failed to fetch category products");
  }

  const category: Category = await categoryRes.json();
  const products: Product[] = await productsRes.json();

  if (products.length === 0) {
    return (
      <div className="bg-[#f3f7f2] px-3 py-8 sm:px-4 sm:py-12">
        <div className="mx-auto max-w-6xl rounded-xl border border-emerald-900/10 bg-white p-6 text-center sm:p-10">
          <p className="text-3xl sm:text-4xl" aria-hidden="true">
            🛒
          </p>
          <h1 className="mt-3 text-lg font-bold text-neutral-800 sm:mt-4 sm:text-xl">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h1>
          <Link
            href="/"
            className="mt-4 inline-flex rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 sm:mt-5 sm:py-3"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f3f7f2]">
      <div className="mx-auto max-w-6xl px-3 py-4 sm:px-4 sm:py-7 lg:px-6">
        {/* Category Header */}
        <section className="flex items-center gap-3 rounded-xl border border-emerald-900/10 bg-[#f8faf7] p-3 min-[400px]:p-4 sm:gap-4 sm:p-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eef3ee] text-2xl sm:size-12 sm:text-3xl">
            {category.icon}
          </div>

          <div className="min-w-0">
            <h1 className="text-lg font-extrabold leading-tight text-[#202a23] sm:text-2xl">
              {category.nameBn}
            </h1>
            <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
              {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও
              পরিবর্তন
            </p>
          </div>
        </section>

        <CategoryProductList products={products} />
      </div>
    </div>
  );
};

export default CategoryPage;
