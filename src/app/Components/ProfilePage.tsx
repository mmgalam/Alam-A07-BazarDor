"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  UserRound,
  Mail,
  LogOut,
  Save,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

type ProfileFormProps = {
  initialName: string;
  email: string;
};

function ProfileForm({ initialName, email }: ProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("আপনার নাম লিখুন।");
      return;
    }

    if (trimmedName.length > 100) {
      setError("নাম ১০০ অক্ষরের মধ্যে রাখুন।");
      return;
    }

    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        setError(result.error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      setName(trimmedName);
      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
    } catch {
      setError("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-[#dce8dc] bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">ব্যক্তিগত তথ্য</h2>
        <p className="mt-2 text-sm text-gray-500">
          আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।
        </p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label
            htmlFor="profile-name"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            আপনার নাম
          </label>

          <div className="relative">
            <UserRound
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setMessage("");
                setError("");
              }}
              placeholder="আপনার নাম লিখুন"
              maxLength={100}
              autoComplete="name"
              required
              disabled={saving}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#247348] focus:ring-2 focus:ring-[#247348]/15 disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="profile-email"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            ইমেইল
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
            <Mail size={19} className="shrink-0 text-gray-400" />
            <span
              id="profile-email"
              className="break-all text-sm text-gray-600"
            >
              {email}
            </span>
          </div>
        </div>

        {message && (
          <p
            role="status"
            className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700"
          >
            {message}
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#247348] px-5 py-3 font-semibold text-white transition hover:bg-[#195a36] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {saving ? (
            <LoaderCircle size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
        </button>
      </form>
    </section>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  async function handleSignOut() {
    setSignOutError("");
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setSignOutError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      router.replace("/sign-in");
      router.refresh();
    } catch {
      setSignOutError("সাইন আউট করার সময় সমস্যা হয়েছে।");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending || !session) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f3f7f2]">
        <div className="flex items-center gap-3 text-[#12372a]">
          <LoaderCircle size={22} className="animate-spin" />
          <span>প্রোফাইল লোড হচ্ছে...</span>
        </div>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-[#f3f7f2] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#173d2c] sm:text-4xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <section className="overflow-hidden rounded-2xl border border-[#dce8dc] bg-white shadow-sm">
          <div className="h-2 bg-[#247348]" />

          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#e5f1e6] text-[#246c45]">
                <UserRound size={32} />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold text-gray-900">
                  {user.name || "ব্যবহারকারী"}
                </h2>

                <p className="mt-1 break-all text-sm text-gray-600">
                  {user.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {signingOut ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <LogOut size={17} />
              )}
              {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
            </button>
          </div>
        </section>

        {signOutError && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {signOutError}
          </p>
        )}

        <ProfileForm
          key={user.id}
          initialName={user.name ?? ""}
          email={user.email}
        />

        
      </div>
    </main>
  );
}
