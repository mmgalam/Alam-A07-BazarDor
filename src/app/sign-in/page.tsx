"use client";

import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (loading) return;

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড লিখুন।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await signIn.email({
        email: trimmedEmail,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।",
        );
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      router.replace("/");
      router.refresh();
    } catch (err) {
      console.error("Sign-in failed:", err);

      toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: "google" | "github",
  ) => {
    if (loading) return;

    setLoading(true);

    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "সোশ্যাল সাইন ইন করা যায়নি।",
        );
        setLoading(false);
      }
    } catch (err) {
      console.error("Social sign-in failed:", err);

      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-160px)] bg-[#f0f5f0] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-md">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#25352b]">
            সাইন ইন
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে
            অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <section className="rounded-2xl border border-emerald-900/10 bg-[#fbfcfa] p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#25352b]"
              >
                ইমেইল
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
                autoComplete="current-password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-[#dce5dc] bg-white px-3 py-3 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#dce5dc]" />
            <span className="text-xs text-neutral-500">অথবা</span>
            <div className="h-px flex-1 bg-[#dce5dc]" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#dce5dc] bg-white px-3 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-60"
            >
              <FcGoogle />
              Google দিয়ে সাইন ইন
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#dce5dc] bg-white px-3 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-60"
            >
              <FaGithub />
              GitHub দিয়ে সাইন ইন
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-neutral-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-emerald-700 hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </section>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm text-neutral-500 transition hover:text-emerald-800"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}