import { Category } from "../TypeScript/type";
import CategoryLink from "./CategoryLink";

const NavLinks = async () => {
  const resCategories = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );

  if (!resCategories.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories: Category[] = await resCategories.json();

  return (
    <nav className="border-t border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          {/* Categories */}
          {categories.map((category) => (
            <CategoryLink key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavLinks;
