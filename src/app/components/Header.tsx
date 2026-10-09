import Image from "next/image";
import Logo from "@/logo-icon.png";
import Link from "next/link";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";

const Header = () => {
  const date = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
  }).format(new Date());

  return (
    <header className="border-b border-neutral-200 bg-[#f3f7f2]">

      {/* ================= TOP HEADER ================= */}
      <div className="container mx-auto flex min-h-22 items-center justify-between px-4 py-4">

        {/* Brand */}
        <Link href="/" className="group">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-2xl">
              <Image
                src={Logo}
                alt="বাজার দর"
                width={48}
                height={48}
                priority
                className="h-12 w-12 object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-emerald-900 sm:text-3xl">
                বাজার দর
              </span>

              <span className="mt-0.5 text-xs font-medium text-neutral-500 sm:text-sm">
                {date}
              </span>
            </div>
          </div>
        </Link>

        {/* Auth */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/signin"
            className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-emerald-800 sm:px-4"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-md bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 sm:px-5"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      {/* ================= CATEGORY NAV ================= */}
      <NavLinks />

      {/* ================= MARQUEE ================= */}
      <Marquee />
      
    </header>
  );
};

export default Header;
