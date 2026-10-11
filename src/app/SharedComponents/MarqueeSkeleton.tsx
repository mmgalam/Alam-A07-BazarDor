const MarqueeSkeleton = () => {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-emerald-950/10 bg-white"
    >
      <div className="flex items-center gap-6 whitespace-nowrap px-3 py-1.5 sm:gap-8 sm:px-4 sm:py-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex shrink-0 items-center gap-2">
            <div className="size-4 animate-pulse rounded-full bg-emerald-100 sm:size-5" />
            <div className="h-4 w-16 animate-pulse rounded bg-neutral-200 sm:h-5 sm:w-20" />
            <div className="h-4 w-24 animate-pulse rounded bg-neutral-100 sm:h-5 sm:w-28" />
            <div className="h-4 w-10 animate-pulse rounded bg-emerald-100 sm:h-5 sm:w-12" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeSkeleton;
