"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-[70dvh] items-center justify-center overflow-hidden bg-[#f3f7f2] px-3 py-8 sm:px-5 sm:py-16">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-16 size-48 rounded-full bg-green-200/40 blur-3xl sm:-left-24 sm:-top-24 sm:size-72"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-16 size-52 rounded-full bg-emerald-200/40 blur-3xl sm:-bottom-24 sm:-right-24 sm:size-80"
      />

      <section className="relative w-full max-w-xl rounded-2xl border border-green-900/10 bg-white/90 p-5 text-center shadow-xl shadow-green-950/5 backdrop-blur min-[400px]:p-6 sm:rounded-3xl sm:p-12">
        {/* Icon */}
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-xl bg-green-900 text-white shadow-lg shadow-green-900/20 sm:mb-6 sm:size-20 sm:rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-7 sm:size-10"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
            <path d="m10 8 4 4" />
            <path d="m14 8-4 4" />
          </svg>
        </div>

        {/* Error code */}
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-green-800 sm:mb-2 sm:text-sm sm:tracking-[0.3em]">
          Page Not Found
        </p>

        <h1 className="mb-3 text-6xl font-extrabold tracking-tight text-green-950 sm:mb-4 sm:text-8xl">
          404
        </h1>

        <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-amber-500 sm:mb-6 sm:w-20" />

        <h2 className="mb-2 text-xl font-bold text-gray-900 sm:mb-3 sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h2>

        <p className="mx-auto mb-6 max-w-md text-sm leading-6 text-gray-600 sm:mb-8 sm:text-base sm:leading-7">
          আপনি যে পেজটি খুঁজছেন, সেটি সরানো হয়েছে, ঠিকানা পরিবর্তন হয়েছে অথবা
          পেজটি বর্তমানে উপলব্ধ নেই।
        </p>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-2.5 sm:flex-row sm:gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-green-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 sm:px-6 sm:py-3.5 sm:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-4.5 shrink-0 sm:size-5"
            >
              <path d="m3 10 9-7 9 7" />
              <path d="M5 9v11h14V9" />
              <path d="M9 20v-7h6v7" />
            </svg>
            হোম পেজে ফিরুন
          </Link>

          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-green-900/20 bg-white px-5 py-3 text-sm font-semibold text-green-950 transition hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 sm:px-6 sm:py-3.5 sm:text-base"
          >
            আগের পেজে ফিরুন
          </button>
        </div>

        <p className="mt-6 text-xs font-medium tracking-wide text-gray-500 sm:mt-8">
          BAZARDOR · আপনার বিশ্বস্ত বাজার
        </p>
      </section>
    </div>
  );
}
