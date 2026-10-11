"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "../TypeScript/type";

interface CategoryLinkProps {
  category: Category;
}

const CategoryLink = ({ category }: CategoryLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === `/category/${category.slug}`;

  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isActive) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [isActive]);

  return (
    <Link
      href={`/category/${category.slug}`}
      aria-current={isActive ? "page" : undefined}
      className={`shrink-0 snap-start whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium transition-all sm:px-3.5 sm:py-2 sm:text-sm lg:px-4 ${
        isActive
          ? "bg-emerald-900 text-white shadow-sm"
          : "text-neutral-700 hover:bg-emerald-900 hover:text-white"
      }`}
    >
      <span className="flex items-center gap-1.5 sm:gap-2">
        <span className="text-sm leading-none sm:text-base">
          {category.icon}
        </span>
        <span>{category.nameBn}</span>
      </span>
    </Link>
  );
};

export default CategoryLink;
