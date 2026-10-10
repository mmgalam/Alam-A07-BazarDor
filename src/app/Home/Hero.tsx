import Image from "next/image";
import Link from "next/link";
import HeroImg from "@/bazar-hero.png";

const Hero = () => {
  const date = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
  }).format(new Date());
  return (
    <section className="bg-[#f3f7f2] py-6 sm:py-6">
      <div className="container mx-auto py-6 sm:px-4">
        <div className="flex justify-between items-center rounded-2xl border border-emerald-900/10 bg-[#f8faf7] px-5 py-5 sm:px-8 sm:py-7 lg:px-10">
          {/* Left Side Content */}
          <div className="relative z-10 max-w-2xl">
            <div className="mb-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-medium text-emerald-700 sm:text-xs">
              {date}
            </div>

            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-[#1f2922] sm:text-3xl lg:text-[34px]">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-3 max-w-xl text-[11px] leading-5 text-neutral-600 sm:text-xs sm:leading-6">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস ও অন্যান্য পণ্যের— বাজারভিত্তিক
              বিবরণ, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="#all-products"
              className="mt-4 inline-flex items-center rounded-md bg-emerald-700 px-4 py-2 text-[11px] font-semibold text-white shadow-sm transition hover:bg-emerald-800 sm:px-5 sm:py-2.5 sm:text-xs"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          {/* Right Side Img */}
          <div>
            <Image src={HeroImg} alt="Bazar-Gor"></Image>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
