import { Product } from "../TypeScript/type";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  const resMarqueeData = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  if (!resMarqueeData.ok) {
    throw new Error("Failed to fetch marquee data");
  }

  const marqueeData: Product[] = await resMarqueeData.json();

  const filteredData = marqueeData.filter(
    (item) => item.change.dir === "up" || item.change.dir === "down",
  );

  const unitLabel: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    piece: "পিস",
  };

  return (
    <div className="overflow-hidden border-b border-t border-emerald-950/10">
      <MarqueeText direction="right" duration={15}>
        {filteredData.map((item) => {
          const isUp = item.change.dir === "up";

          return (
            <div
              key={item.id}
              className="mx-5 inline-flex items-center gap-2 py-2 text-sm"
            >
              <span className="text-base">{item.categoryIcon}</span>

              <span className="font-medium">{item.nameBn}</span>

              <span>
                {item.today} টাকা/{unitLabel[item.unit] ?? item.unit}
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

              <span className="text-neutral-300">•</span>
            </div>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
