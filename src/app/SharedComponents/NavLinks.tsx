import { Category } from "../TypeScript/type";
import CategoryLink from "./CategoryLink";

const NavLinks = async () => {
  const resCategories = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
    { next: { revalidate: 600 } },
  );

  if (!resCategories.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories: Category[] = await resCategories.json();

  return (
    <nav aria-label="ক্যাটাগরি" className="border-t border-neutral-100">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div
          className="
            flex items-center gap-1 overflow-x-auto py-1.5
            snap-x snap-proximity scroll-px-3
            [-ms-overflow-style:none] scrollbar-none
            [&::-webkit-scrollbar]:hidden
            sm:gap-1.5 sm:py-2
          "
        >
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
