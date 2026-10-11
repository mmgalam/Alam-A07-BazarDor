import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 bg-[#f3f7f2]">
      <div className="container mx-auto flex flex-col items-center gap-2 px-3 py-4 text-center text-xs text-neutral-600 sm:px-4 sm:py-5 sm:text-sm md:flex-row md:justify-between md:gap-4 md:text-left lg:px-6 lg:py-6">
        <p>
          <Link
            href="/"
            className="font-bold text-emerald-900 transition-colors hover:text-emerald-700"
          >
            বাজার দর
          </Link>
          <span> — প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
        </p>

        <p className="max-w-md md:max-w-sm md:text-right lg:max-w-none">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
