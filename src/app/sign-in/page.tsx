"use client";

import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const inputClass =
  "w-full rounded-lg border border-[#dce5dc] bg-white px-3 py-2.5 text-base outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3 sm:text-sm";

const labelClass = "mb-1.5 block text-sm font-medium text-[#25352b] sm:mb-2";

const socialBtnClass =
  "flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#dce5dc] bg-white px-3 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড লিখুন।");
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
        toast.error(error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      router.replace("/");
      router.refresh();
    } catch (err) {
      console.error("Sign-in failed:", err);

      toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    if (loading) return;

    setLoading(true);

    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সোশ্যাল সাইন ইন করা যায়নি।");
        setLoading(false);
      }
    } catch (err) {
      console.error("Social sign-in failed:", err);

      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70dvh] bg-[#f0f5f0] px-3 py-6 sm:px-4 sm:py-14">
      <div className="mx-auto max-w-md">
        <div className="mb-5 text-center sm:mb-7">
          <h1 className="text-xl font-extrabold tracking-tight text-[#25352b] sm:text-2xl">
            সাইন ইন
          </h1>

          <p className="mt-1.5 text-xs leading-5 text-neutral-500 sm:mt-2 sm:text-sm sm:leading-6">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <section className="rounded-xl border border-emerald-900/10 bg-[#fbfcfa] p-4 shadow-sm min-[400px]:p-6 sm:rounded-2xl sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label htmlFor="email" className={labelClass}>
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
                autoComplete="current-password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={inputClass}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 sm:my-6">
            <div className="h-px flex-1 bg-[#dce5dc]" />
            <span className="text-xs text-neutral-500">অথবা</span>
            <div className="h-px flex-1 bg-[#dce5dc]" />
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={loading}
              className={socialBtnClass}
            >
              <FcGoogle className="size-5 shrink-0" />
              <span>Google দিয়ে সাইন ইন</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={loading}
              className={socialBtnClass}
            >
              <FaGithub className="size-5 shrink-0" />
              <span>GitHub দিয়ে সাইন ইন</span>
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-neutral-600 sm:mt-6">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="whitespace-nowrap font-semibold text-emerald-700 hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </section>

        <div className="mt-4 text-center sm:mt-5">
          <Link
            href="/"
            className="text-sm text-neutral-500 transition hover:text-emerald-800"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
