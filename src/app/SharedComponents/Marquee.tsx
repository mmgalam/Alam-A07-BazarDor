import MarqueeText from "react-fast-marquee";
import { getProducts } from "@/lib/products";

const Marquee = async () => {
  const marqueeData = await getProducts();
  const filteredData = marqueeData.filter(
    (item) => item.change?.dir === "up" || item.change?.dir === "down",
  );

  const unitLabel: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    piece: "পিস",
  };

  return (
    <div
      aria-label="আজকের দামের পরিবর্তন"
      className="overflow-hidden border-y border-emerald-950/10 bg-white"
    >
      {filteredData.length > 0 ? (
        <MarqueeText
          direction="left"
          speed={30}
          pauseOnHover
          gradient={false}
          autoFill
        >
          {filteredData.map((item) => {
            const isUp = item.change.dir === "up";

            return (
              <div
                key={item.id}
                className="mx-3 inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap py-1.5 text-xs sm:mx-4 sm:gap-2 sm:py-2 sm:text-sm lg:mx-5"
              >
                <span className="text-sm leading-none sm:text-base">
                  {item.categoryIcon}
                </span>

                <span className="font-medium text-neutral-800">
                  {item.nameBn}
                </span>

                <span className="text-neutral-700">
                  {item.today} টাকা/
                  {unitLabel[item.unit] ?? item.unit}
                </span>

                <span
                  className={
                    isUp
                      ? "font-semibold text-red-600"
                      : "font-semibold text-green-600"
                  }
                >
                  {isUp ? "▲" : "▼"} {item.change.pct}%
                </span>

                <span className="text-neutral-300" aria-hidden="true">
                  •
                </span>
              </div>
            );
          })}
        </MarqueeText>
      ) : (
        <p className="px-3 py-1.5 text-center text-xs text-neutral-500 sm:py-2 sm:text-sm">
          বর্তমানে কোনো মূল্য পরিবর্তনের তথ্য নেই।
        </p>
      )}
    </div>
  );
};

export default Marquee;
