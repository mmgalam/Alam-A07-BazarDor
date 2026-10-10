"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRound, LogOut, LoaderCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        console.error("Sign out failed:", result.error);
        return;
      }

      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending) {
    return (
      <div
        className="h-10 w-24 animate-pulse rounded-lg bg-emerald-100"
        aria-label="অ্যাকাউন্ট লোড হচ্ছে"
      />
    );
  }

  if (!session) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <Link
          href="/sign-in"
          className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-emerald-800 sm:px-4"
        >
          সাইন ইন
        </Link>

        <Link
          href="/sign-up"
          className="rounded-md bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 sm:px-5"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/profile"
        className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50 sm:px-4"
      >
        <UserRound size={18} />
        <span className="hidden sm:inline">আমার প্রোফাইল</span>
        <span className="sm:hidden">প্রোফাইল</span>
      </Link>

      <button
        type="button"
        onClick={handleSignOut}
        disabled={signingOut}
        className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
      >
        {signingOut ? (
          <LoaderCircle size={17} className="animate-spin" />
        ) : (
          <LogOut size={17} />
        )}

        <span className="hidden sm:inline">
          {signingOut ? "অপেক্ষা করুন..." : "লগ আউট"}
        </span>
      </button>
    </div>
  );
}
