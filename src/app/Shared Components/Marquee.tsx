import { Product } from "../TypeScript/type";
import MarqueeText from "react-fast-marquee";

const Marquee = async () => {
  const resMarqueeData = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: { revalidate: 60 },
    },
  );

  if (!resMarqueeData.ok) {
    throw new Error("Failed to fetch marquee data");
  }

  const marqueeData: Product[] = await resMarqueeData.json();

  const filteredData = marqueeData.filter(
    (item) => item.change?.dir === "up" || item.change?.dir === "down",
  );

  const unitLabel: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    piece: "পিস",
  };

  return (
    <div className="overflow-hidden border-y border-emerald-950/10 bg-white">
      {filteredData.length > 0 ? (
        <MarqueeText
          direction="left"
          speed={40}
          pauseOnHover
          gradient={false}
          autoFill
        >
          {filteredData.map((item) => {
            const isUp = item.change.dir === "up";

            return (
              <div
                key={item.id}
                className="mx-5 inline-flex shrink-0 items-center gap-2 py-2 text-sm"
              >
                <span className="text-base">{item.categoryIcon}</span>

                <span className="font-medium text-neutral-800">
                  {item.nameBn}
                </span>

                <span className="whitespace-nowrap text-neutral-700">
                  {item.today} টাকা/
                  {unitLabel[item.unit] ?? item.unit}
                </span>

                <span
                  className={
                    isUp
                      ? "whitespace-nowrap font-semibold text-red-600"
                      : "whitespace-nowrap font-semibold text-green-600"
                  }
                >
                  {isUp ? "▲" : "▼"} {item.change.pct}%
                </span>

                <span className="text-neutral-300">•</span>
              </div>
            );
          })}
        </MarqueeText>
      ) : (
        <p className="py-2 text-center text-sm text-neutral-500">
          বর্তমানে কোনো মূল্য পরিবর্তনের তথ্য নেই।
        </p>
      )}
    </div>
  );
};

export default Marquee;
