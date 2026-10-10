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
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-lg border border-neutral-200 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#f3f6f2] text-xl">
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
      <div className="mt-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[9px] text-neutral-500">আজকের দাম</p>

          <p className="mt-0.5 text-sm font-extrabold text-neutral-900">
            {product.today.toLocaleString("bn-BD")}
            <span className="font-medium">টাকা</span>
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-2 text-[9px] font-semibold ${
            isUp
              ? "bg-red-50 text-red-500"
              : isDown
                ? "bg-emerald-50 text-emerald-600"
                : "bg-neutral-100 text-neutral-600"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}
          {product.change.pct.toLocaleString("bn-BD")}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
