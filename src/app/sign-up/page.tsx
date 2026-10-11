"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { signUp } from "../../lib/auth-client";
import { toast } from "react-toastify";

const inputClass =
  "w-full rounded-lg border border-[#dce5dc] bg-white px-3 py-2.5 text-base outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3 sm:text-sm";

const labelClass = "mb-1.5 block text-sm font-medium text-[#25352b] sm:mb-2";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      toast.error("নাম ও ইমেইল লিখুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp.email({
        name: trimmedName,
        email: trimmedEmail,
        password,
      });

      if (result.error) {
        console.error("Sign-up API error:", result.error);
        toast.error(result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      toast.success("আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

      router.replace("/");
      router.refresh();
    } catch (err) {
      console.error("Sign-up request failed:", err);

      toast.error("সার্ভারের সঙ্গে সংযোগ করা যাচ্ছে না। পরে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70dvh] items-start justify-center bg-[#f0f5f0] px-3 py-6 sm:items-center sm:px-4 sm:py-10">
      <section className="w-full max-w-md rounded-xl border border-[#dce5dc] bg-[#fbfcfa] p-4 shadow-sm min-[400px]:p-6 sm:rounded-2xl sm:p-8">
        <header className="mb-5 text-center sm:mb-7">
          <h1 className="text-xl font-extrabold tracking-tight text-[#25352b] sm:text-2xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-1.5 text-xs leading-5 text-neutral-500 sm:mt-2 sm:text-sm sm:leading-6">
            বিনা খরচে সাইন আপ করে বাজারদরের বিস্তারিত তথ্য দেখুন।
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
          <div>
            <label htmlFor="name" className={labelClass}>
              আপনার নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="আপনার পূর্ণ নাম"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              ইমেইল ঠিকানা
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              placeholder="পাসওয়ার্ড আবার লিখুন"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ করুন"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-neutral-600 sm:mt-6">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="whitespace-nowrap font-semibold text-emerald-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>

        <div className="mt-4 border-t border-[#e5eae4] pt-3 text-center sm:mt-5 sm:pt-4">
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-emerald-800"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </section>
    </div>
  );
}
