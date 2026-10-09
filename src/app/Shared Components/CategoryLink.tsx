"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "../TypeScript/type";

interface CategoryLinkProps {
  category: Category;
}

const CategoryLink = ({ category }: CategoryLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === `/category/${category.slug}`;

  return (
    <Link
      href={`/category/${category.slug}`}
      className={`shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-all ${
        isActive
          ? "bg-emerald-900 text-white shadow-sm"
          : "text-neutral-700 hover:bg-emerald-900 hover:text-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <span>{category.icon}</span>
        <span>{category.nameBn}</span>
      </div>
    </Link>
  );
};

export default CategoryLink;
