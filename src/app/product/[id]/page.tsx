import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import type { Product } from "@/app/TypeScript/type";
import PriceCard from "@/app/Components/PriceCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

const formatMoney = (amount: number) =>
  `${amount.toLocaleString("bn-BD")} টাকা`;

const unitLabels: Record<string, string> = {
  kg: "কেজি",
  kilogram: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  piece: "পিস",
  pcs: "পিস",
  dozen: "ডজন",
};

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  // Better Auth session verification
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/sign-in?callbackURL=${encodeURIComponent(`/product/${id}`)}`);
  }

  const response = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${id}`,
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const product: Product = await response.json();
  const markets: Market[] = product.markets ?? [];

  const minPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : product.today;

  const maxPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : product.today;

  const averagePrice = markets.length
    ? Math.round(
        markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / markets.length,
      )
    : product.today;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const priceDifference = Math.abs(product.today - product.yesterday);
  const unit = unitLabels[product.unit] ?? product.unit;

  return (
    <main className="min-h-screen bg-[#f0f5f0] text-[#25352b]">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-xs text-neutral-500"
        >
          <Link href="/" className="hover:text-emerald-800">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-emerald-800"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-neutral-700">{product.nameBn}</span>
        </nav>

        {/* Product summary */}
        <section className="flex flex-col justify-between gap-4 rounded-xl border border-emerald-900/10 bg-[#fbfcfa] p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl sm:h-16 sm:w-16 sm:text-3xl">
              {product.image}
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-extrabold sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-xs text-neutral-500">
                প্রতি {unit} · {product.categoryNameBn}
              </p>

              <p className="mt-2 text-sm text-neutral-700">
                গতকালের তুলনায় আজ দাম
                <span>
                  {isUp ? " বেড়েছে" : isDown ? " কমেছে" : " অপরিবর্তিত"}
                </span>
                {" · "}
                {priceDifference.toLocaleString("bn-BD")} টাকা
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#f0f5f0] px-5 py-3 text-center sm:min-w-32">
            <p className="text-[10px] text-neutral-500">আজকের দাম</p>

            <p className="mt-1 text-2xl font-extrabold">
              {product.today.toLocaleString("bn-BD")}
            </p>

            <p className="text-xs text-neutral-500">টাকা / {unit}</p>

            <p
              className={`mt-1 text-[10px] font-bold ${
                isUp
                  ? "text-red-600"
                  : isDown
                    ? "text-emerald-700"
                    : "text-neutral-500"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {product.change.pct.toLocaleString("bn-BD")}%
            </p>
          </div>
        </section>

        {/* Price summary */}
        <section className="mt-4 rounded-xl border border-emerald-900/10 bg-[#fbfcfa] p-4 sm:p-5">
          <h2 className="mb-4 text-sm font-bold">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <PriceCard
              label="সর্বনিম্ন দাম"
              price={minPrice}
              description="সবচেয়ে কম দামের বাজার"
              color="green"
            />

            <PriceCard
              label="সর্বোচ্চ দাম"
              price={maxPrice}
              description="সবচেয়ে বেশি দামের বাজার"
              color="red"
            />

            <PriceCard
              label="গড় দাম"
              price={averagePrice}
              description={`প্রতি ${unit}-এর হিসাবে`}
              color="green"
            />
          </div>

          {/* Market table */}
          <h2 className="mb-3 mt-6 text-sm font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full min-w-155 border-collapse text-left text-xs">
              <thead className="bg-[#f8faf7] text-neutral-500">
                <tr>
                  <th className="px-3 py-3 font-medium">বাজার</th>
                  <th className="px-3 py-3 font-medium">বিভাগ</th>
                  <th className="px-3 py-3 text-right font-medium">
                    সর্বনিম্ন
                  </th>
                  <th className="px-3 py-3 text-right font-medium">সর্বোচ্চ</th>
                  <th className="px-3 py-3 text-right font-medium">গড়</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className={`border-t border-neutral-200 ${
                      index % 2 === 0 ? "bg-[#fbfcfa]" : "bg-[#f0f5f0]"
                    }`}
                  >
                    <td className="whitespace-nowrap px-3 py-3 font-medium">
                      {market.market}
                    </td>

                    <td className="px-3 py-3 text-neutral-600">
                      {market.division}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right">
                      {formatMoney(market.min)}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right">
                      {formatMoney(market.max)}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right font-semibold">
                      {formatMoney(Math.round((market.min + market.max) / 2))}
                    </td>
                  </tr>
                ))}

                {markets.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-neutral-500"
                    >
                      বাজারের দামের তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
