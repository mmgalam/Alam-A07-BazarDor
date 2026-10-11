import Image from "next/image";
import Link from "next/link";
import HeroImg from "@/bazar-hero.png";

const Hero = () => {
  const date = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
  }).format(new Date());

  return (
    <section className="bg-[#f3f7f2] py-4 sm:py-6">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex flex-col items-center gap-5 rounded-xl border border-emerald-900/10 bg-[#f8faf7] px-4 py-5 sm:rounded-2xl sm:px-8 sm:py-7 md:flex-row md:justify-between md:gap-8 lg:px-10">
          {/* Left Side Content */}
          <div className="relative z-10 w-full max-w-2xl text-center md:text-left">
            <div className="mb-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-medium text-emerald-700 sm:text-xs">
              {date}
            </div>

            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-[#1f2922] sm:text-3xl lg:text-[34px]">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-xs leading-5 text-neutral-600 sm:text-sm sm:leading-6 md:mx-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস ও অন্যান্য পণ্যের— বাজারভিত্তিক
              বিবরণ, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="#all-products"
              className="mt-4 inline-flex items-center rounded-md bg-emerald-700 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800 sm:text-sm"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          {/* Right Side Img */}
          <div className="w-full max-w-65 shrink-0 sm:max-w-xs md:w-2/5 md:max-w-sm lg:w-1/3">
            <Image
              src={HeroImg}
              alt="বাজার দর"
              priority
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 40vw, 320px"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
