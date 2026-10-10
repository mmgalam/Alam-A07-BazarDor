"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#f3f7f2] px-5 py-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

      <section className="relative w-full max-w-xl rounded-3xl border border-green-900/10 bg-white/90 p-8 text-center shadow-xl shadow-green-950/5 backdrop-blur sm:p-12">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-green-900 text-white shadow-lg shadow-green-900/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
            <path d="m10 8 4 4" />
            <path d="m14 8-4 4" />
          </svg>
        </div>

        {/* Error code */}
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-green-800">
          Page Not Found
        </p>

        <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-green-950 sm:text-8xl">
          404
        </h1>

        <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-amber-500" />

        <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h2>

        <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
          আপনি যে পেজটি খুঁজছেন, সেটি সরানো হয়েছে, ঠিকানা পরিবর্তন হয়েছে
          অথবা পেজটি বর্তমানে উপলব্ধ নেই।
        </p>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-900 px-6 py-3.5 font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
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
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-900/20 bg-white px-6 py-3.5 font-semibold text-green-950 transition hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
          >
            আগের পেজে ফিরুন
          </button>
        </div>

        <p className="mt-8 text-xs font-medium tracking-wide text-gray-400">
          BAZARDOR · আপনার বিশ্বস্ত বাজার
        </p>
      </section>
    </main>
  );
}