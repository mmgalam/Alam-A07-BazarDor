import Link from "next/link";
import type { Product } from "@/app/TypeScript/type";

interface ProductCardProps {
  product: Product;
}

const unitLabel: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  piece: "পিস",
  dozen: "ডজন",
};

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pct = product.change?.pct ?? 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-lg border border-neutral-200 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-sm sm:p-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#f3f6f2] text-xl sm:size-12 sm:text-2xl">
          {product.image}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-neutral-800 sm:text-base">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 text-xs text-neutral-500">
            প্রতি {unitLabel[product.unit] ?? product.unit}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2 sm:mt-4 sm:gap-3">
        <div className="min-w-0">
          <p className="text-[11px] text-neutral-500 sm:text-xs">আজকের দাম</p>

          <p className="mt-0.5 whitespace-nowrap text-base font-extrabold text-neutral-900 sm:text-lg">
            {product.today.toLocaleString("bn-BD")}{" "}
            <span className="text-xs font-medium sm:text-sm">টাকা</span>
          </p>
        </div>

        <span
          className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold sm:px-3 sm:py-2 ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
                ? "bg-emerald-50 text-emerald-700"
                : "bg-neutral-100 text-neutral-600"
          }`}
        >
          <span aria-hidden="true">{isUp ? "▲" : isDown ? "▼" : "—"}</span>{" "}
          {pct.toLocaleString("bn-BD")}%
          <span className="sr-only">
            {isUp ? " দাম বেড়েছে" : isDown ? " দাম কমেছে" : " দাম অপরিবর্তিত"}
          </span>
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
