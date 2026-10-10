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
    fetch(`https://api.abcz.workers.dev/api/bazardor/categories/${slug}`),
    fetch(
      `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(slug)}`,
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
      <main className="min-h-[60vh] bg-[#f3f7f2] px-4 py-12">
        <div className="mx-auto max-w-6xl rounded-xl border border-emerald-900/10 bg-white p-10 text-center">
          <p className="text-4xl">🛒</p>
          <h1 className="mt-4 text-xl font-bold text-neutral-800">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h1>
          <Link
            href="/"
            className="mt-5 inline-flex rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f7f2]">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:py-7">
        {/* Category Header */}
        <section className="flex items-center gap-4 rounded-xl border border-emerald-900/10 bg-[#f8faf7] p-4 sm:p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef3ee] text-3xl">
            {category.icon}
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-[#202a23] sm:text-2xl">
              {category.nameBn}
            </h1>
            <p className="mt-1 text-xs text-neutral-500">
              {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও
              পরিবর্তন
            </p>
          </div>
        </section>

        <CategoryProductList products={products} />
      </div>
    </main>
  );
};

export default CategoryPage;
