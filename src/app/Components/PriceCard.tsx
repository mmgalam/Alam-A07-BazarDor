interface PriceCardProps {
  label: string;
  price: number;
  description: string;
  color: "green" | "red";
}

const PriceCard = ({ label, price, description, color }: PriceCardProps) => {
  return (
    <div className="rounded-2xl border border-[#dce5dc] bg-[#fbfcfa] px-5 py-5">
      <p className="text-xs font-medium text-neutral-700">{label}</p>

      <p
        className={`mt-2 text-xl font-extrabold ${
          color === "red" ? "text-red-600" : "text-emerald-600"
        }`}
      >
        {price.toLocaleString("bn-BD")}{" "}
        <span className="text-sm font-medium">টাকা</span>
      </p>

      <p className="mt-1 text-xs text-neutral-600">{description}</p>
    </div>
  );
};

export default PriceCard;
