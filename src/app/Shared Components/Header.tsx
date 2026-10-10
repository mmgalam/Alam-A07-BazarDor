import Image from "next/image";
import Logo from "@/logo-icon.png";
import Link from "next/link";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";
import AuthButtons from "@/app/Components/AuthButtons";

const Header = () => {
  const date = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
  }).format(new Date());

  return (
    <header className="border-b border-neutral-200 bg-[#f3f7f2]">
      {/* TOP HEADER */}
      <div className="container mx-auto flex min-h-22 items-center justify-between gap-3 px-4 py-4">
        {/* Brand */}
        <Link href="/" className="group min-w-0">
          <div className="flex items-center gap-3">
            <div className="shrink-0 rounded-2xl bg-green-600 p-2">
              <Image
                src={Logo}
                alt="বাজার দর"
                width={48}
                height={48}
                priority
                className="h-12 w-12 object-contain"
              />
            </div>

            <div className="flex min-w-0 flex-col">
              <span className="text-xl font-extrabold tracking-tight text-emerald-900 sm:text-3xl">
                বাজার দর
              </span>

              <span className="mt-0.5 text-xs font-medium text-neutral-500 sm:text-sm">
                {date}
              </span>
            </div>
          </div>
        </Link>

        {/* Authentication Buttons */}
        <AuthButtons />
      </div>

      {/* CATEGORY NAV */}
      <NavLinks />

      {/* MARQUEE */}
      <Marquee />
    </header>
  );
};

export default Header;
