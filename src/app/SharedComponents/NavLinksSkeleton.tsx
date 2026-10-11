const widths = ["w-16", "w-24", "w-20", "w-28", "w-20", "w-24", "w-16", "w-28"];

const NavLinksSkeleton = () => {
  return (
    <nav aria-hidden="true" className="border-t border-neutral-100">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center gap-1 overflow-hidden py-1.5 sm:gap-1.5 sm:py-2">
          {widths.map((width, i) => (
            <div
              key={i}
              className={`h-7 shrink-0 animate-pulse rounded-md bg-emerald-100 sm:h-9 ${width}`}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavLinksSkeleton;
