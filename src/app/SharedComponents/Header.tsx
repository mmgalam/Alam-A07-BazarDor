import { Suspense } from "react";
import Image from "next/image";
import Logo from "@/logo-icon.png";
import Link from "next/link";
import NavLinks from "./NavLinks";
import NavLinksSkeleton from "./NavLinksSkeleton";
import Marquee from "./Marquee";
import MarqueeSkeleton from "./MarqueeSkeleton";
import AuthButtons from "@/app/Components/AuthButtons";

const Header = () => {
  const date = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
  }).format(new Date());

  return (
    <header className="border-b border-neutral-200 bg-[#f3f7f2]">
      {/* TOP HEADER */}
      <div className="container mx-auto flex items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-4 sm:py-4 lg:px-6">
        <Link href="/" className="group min-w-0 flex-1 sm:flex-none">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="shrink-0 rounded-xl bg-green-600 p-1.5 sm:rounded-2xl sm:p-2">
              <Image
                src={Logo}
                alt="বাজার দর"
                width={48}
                height={48}
                priority
                className="h-8 w-8 object-contain sm:h-10 sm:w-10 lg:h-12 lg:w-12"
              />
            </div>

            <div className="flex min-w-0 flex-col">
              <span className="truncate text-lg font-extrabold leading-tight tracking-tight text-emerald-900 sm:text-2xl lg:text-3xl">
                বাজার দর
              </span>
              <span className="mt-0.5 truncate text-[10px] font-medium leading-tight text-neutral-500 sm:text-xs lg:text-sm">
                {date}
              </span>
            </div>
          </div>
        </Link>

        <div className="shrink-0">
          <AuthButtons />
        </div>
      </div>

      {/* CATEGORY NAV */}
      <Suspense fallback={<NavLinksSkeleton />}>
        <NavLinks />
      </Suspense>

      {/* MARQUEE */}
      <Suspense fallback={<MarqueeSkeleton />}>
        <Marquee />
      </Suspense>
    </header>
  );
};

export default Header;
