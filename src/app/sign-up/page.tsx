"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { signUp } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error] = useState("");
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
    toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("দুটি পাসওয়ার্ড মিলছে না।");
    return;
  }

  setLoading(true);

  try {
    const { error: signUpError } = await signUp.email({
      name: trimmedName,
      email: trimmedEmail,
      password,
    });

    if (signUpError) {
      toast.error(
        signUpError.message || "অ্যাকাউন্ট তৈরি করা যায়নি।",
      );
      return;
    }

    toast.success("আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

    router.replace("/");
    router.refresh();
  } catch (err) {
    console.error("Sign-up failed:", err);
    toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-[#dce5dc] bg-[#fbfcfa] p-6 shadow-sm sm:p-8">
        <header className="mb-7 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#25352b]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            বিনা খরচে সাইন আপ করে বাজারদরের বিস্তারিত তথ্য দেখুন।
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-[#25352b]"
            >
              আপনার নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="আপনার পূর্ণ নাম"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-[#dce5dc] bg-white px-3 py-3 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#25352b]"
            >
              ইমেইল ঠিকানা
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-[#dce5dc] bg-white px-3 py-3 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#25352b]"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-[#dce5dc] bg-white px-3 py-3 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-[#25352b]"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              placeholder="পাসওয়ার্ড আবার লিখুন"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-lg border border-[#dce5dc] bg-white px-3 py-3 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <p
              role="alert"
              aria-live="polite"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ করুন"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-600">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-emerald-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>

        <div className="mt-5 border-t border-[#e5eae4] pt-4 text-center">
          <Link
            href="/"
            className="text-sm text-neutral-500 transition hover:text-emerald-800"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </section>
    </main>
  );
}
