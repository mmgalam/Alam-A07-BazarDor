interface PriceCardProps {
  label: string;
  price: number;
  description: string;
  color: "green" | "red";
}

const PriceCard = ({ label, price, description, color }: PriceCardProps) => {
  return (
    <div className="rounded-xl border border-[#dce5dc] bg-[#fbfcfa] px-4 py-3 sm:rounded-2xl sm:px-5 sm:py-5">
      <p className="text-xs font-medium text-neutral-700 sm:text-sm">{label}</p>

      <p
        className={`mt-1 whitespace-nowrap text-xl font-extrabold sm:mt-2 sm:text-2xl ${
          color === "red" ? "text-red-600" : "text-emerald-700"
        }`}
      >
        {price.toLocaleString("bn-BD")}{" "}
        <span className="text-xs font-medium sm:text-sm">টাকা</span>
      </p>

      <p className="mt-0.5 text-xs text-neutral-600 sm:mt-1">{description}</p>
    </div>
  );
};

export default PriceCard;
