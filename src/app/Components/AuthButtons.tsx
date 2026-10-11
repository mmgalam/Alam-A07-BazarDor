"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRound, LogOut, LoaderCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        console.error("Sign out failed:", result.error);
        toast.error("লগ আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      toast.success("সফলভাবে লগ আউট হয়েছে।");
      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      toast.error("লগ আউটের সময় সমস্যা হয়েছে।");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending) {
    return (
      <div
        className="h-8 w-20 animate-pulse rounded-lg bg-emerald-100 sm:h-10 sm:w-24"
        aria-label="অ্যাকাউন্ট লোড হচ্ছে"
      />
    );
  }

  if (!session) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <Link
          href="/sign-in"
          className="whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-emerald-800 sm:px-4 sm:py-2 sm:text-sm"
        >
          সাইন ইন
        </Link>

        <Link
          href="/sign-up"
          className="whitespace-nowrap rounded-md bg-emerald-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Link
        href="/profile"
        aria-label="আমার প্রোফাইল"
        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-emerald-200 bg-white px-2.5 py-2 text-xs font-semibold text-emerald-900 transition hover:bg-emerald-50 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
      >
        <UserRound className="size-4 sm:size-4.5" />
        <span className="hidden min-[400px]:inline sm:hidden">প্রোফাইল</span>
        <span className="hidden sm:inline">আমার প্রোফাইল</span>
      </Link>

      <button
        type="button"
        onClick={handleSignOut}
        disabled={signingOut}
        aria-label="লগ আউট"
        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-red-50 px-2.5 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
      >
        {signingOut ? (
          <LoaderCircle className="size-4 animate-spin sm:size-4.25" />
        ) : (
          <LogOut className="size-4 sm:size-4.25" />
        )}

        <span className="hidden sm:inline">
          {signingOut ? "অপেক্ষা করুন..." : "লগ আউট"}
        </span>
      </button>
    </div>
  );
}
