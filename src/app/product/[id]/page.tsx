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
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
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

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pct = product.change?.pct ?? 0;
  const priceDifference = Math.abs(product.today - product.yesterday);
  const unit = unitLabels[product.unit] ?? product.unit;

  return (
    <div className="bg-[#f0f5f0] text-[#25352b]">
      <div className="mx-auto max-w-6xl px-3 py-4 sm:px-6 sm:py-5">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500 sm:mb-5"
        >
          <Link href="/" className="hover:text-emerald-800">
            হোম
          </Link>
          <span aria-hidden="true">›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-emerald-800"
          >
            {product.categoryNameBn}
          </Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page" className="text-neutral-700">
            {product.nameBn}
          </span>
        </nav>

        {/* Product summary */}
        <section className="flex flex-col gap-4 rounded-xl border border-emerald-900/10 bg-[#fbfcfa] p-3 min-[400px]:p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl sm:size-16 sm:text-3xl">
              {product.image}
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-extrabold leading-tight sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                প্রতি {unit} · {product.categoryNameBn}
              </p>

              <p className="mt-1.5 text-xs text-neutral-700 sm:mt-2 sm:text-sm">
                গতকালের তুলনায় আজ দাম
                <span>
                  {isUp ? " বেড়েছে" : isDown ? " কমেছে" : " অপরিবর্তিত"}
                </span>
                {" · "}
                {priceDifference.toLocaleString("bn-BD")} টাকা
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl bg-[#f0f5f0] px-4 py-3 sm:min-w-36 sm:flex-col sm:justify-center sm:gap-0 sm:px-5 sm:text-center">
            <div className="sm:text-center">
              <p className="text-xs text-neutral-500">আজকের দাম</p>

              <p className="mt-0.5 whitespace-nowrap text-2xl font-extrabold sm:mt-1">
                {product.today.toLocaleString("bn-BD")}
                <span className="ml-1 text-xs font-medium text-neutral-500 sm:ml-0 sm:block">
                  টাকা / {unit}
                </span>
              </p>
            </div>

            <p
              className={`whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-bold sm:mt-2 sm:bg-transparent sm:p-0 ${
                isUp
                  ? "text-red-600"
                  : isDown
                    ? "text-emerald-700"
                    : "text-neutral-500"
              }`}
            >
              <span aria-hidden="true">{isUp ? "▲" : isDown ? "▼" : "—"}</span>{" "}
              {pct.toLocaleString("bn-BD")}%
            </p>
          </div>
        </section>

        {/* Price summary */}
        <section className="mt-3 rounded-xl border border-emerald-900/10 bg-[#fbfcfa] p-3 min-[400px]:p-4 sm:mt-4 sm:p-5">
          <h2 className="mb-3 text-sm font-bold sm:mb-4 sm:text-base">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
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
              label="গড় দাম"
              price={averagePrice}
              description={`প্রতি ${unit}-এর হিসাবে`}
              color="green"
            />
          </div>

          {/* Market list */}
          <h2 className="mb-3 mt-5 text-sm font-bold sm:mt-6 sm:text-base">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length === 0 ? (
            <p className="rounded-xl border border-neutral-200 px-4 py-8 text-center text-sm text-neutral-500">
              বাজারের দামের তথ্য পাওয়া যায়নি।
            </p>
          ) : (
            <>
              {/* Mobile: cards */}
              <ul className="space-y-2.5 md:hidden">
                {markets.map((market, index) => (
                  <li
                    key={`${market.market}-${index}`}
                    className="rounded-lg border border-neutral-200 bg-white p-3"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="min-w-0 truncate text-sm font-bold">
                        {market.market}
                      </p>
                      <p className="shrink-0 text-xs text-neutral-500">
                        {market.division}
                      </p>
                    </div>

                    <dl className="mt-2.5 grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-md bg-[#f0f5f0] px-1 py-2">
                        <dt className="text-[11px] text-neutral-500">
                          সর্বনিম্ন
                        </dt>
                        <dd className="mt-0.5 text-xs font-semibold">
                          {market.min.toLocaleString("bn-BD")}
                        </dd>
                      </div>
                      <div className="rounded-md bg-[#f0f5f0] px-1 py-2">
                        <dt className="text-[11px] text-neutral-500">
                          সর্বোচ্চ
                        </dt>
                        <dd className="mt-0.5 text-xs font-semibold">
                          {market.max.toLocaleString("bn-BD")}
                        </dd>
                      </div>
                      <div className="rounded-md bg-emerald-50 px-1 py-2">
                        <dt className="text-[11px] text-emerald-700">গড়</dt>
                        <dd className="mt-0.5 text-xs font-bold text-emerald-800">
                          {Math.round(
                            (market.min + market.max) / 2,
                          ).toLocaleString("bn-BD")}
                        </dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>

              {/* Tablet & desktop: table */}
              <div className="hidden overflow-x-auto rounded-xl border border-neutral-200 md:block">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-[#f8faf7] text-neutral-500">
                    <tr>
                      <th className="px-3 py-3 font-medium">বাজার</th>
                      <th className="px-3 py-3 font-medium">বিভাগ</th>
                      <th className="px-3 py-3 text-right font-medium">
                        সর্বনিম্ন
                      </th>
                      <th className="px-3 py-3 text-right font-medium">
                        সর্বোচ্চ
                      </th>
                      <th className="px-3 py-3 text-right font-medium">গড়</th>
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
                          {formatMoney(
                            Math.round((market.min + market.max) / 2),
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
