"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { UserRound, Mail, LogOut, Save, LoaderCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

type ProfileUser = {
  id: string;
  name: string;
  email: string;
};

type ProfilePageProps = {
  user: ProfileUser;
};

type ProfileFormProps = {
  initialName: string;
  email: string;
};

function ProfileForm({ initialName, email }: ProfileFormProps) {
  const router = useRouter();
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
        setError(result.error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      setName(trimmedName);
      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      router.refresh();
    } catch {
      setError("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mt-4 rounded-xl border border-[#dce8dc] bg-white p-4 shadow-sm min-[400px]:p-5 sm:mt-6 sm:rounded-2xl sm:p-8">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
          ব্যক্তিগত তথ্য
        </h2>
        <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
          আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।
        </p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4 sm:space-y-5">
        <div>
          <label
            htmlFor="profile-name"
            className="mb-1.5 block text-sm font-semibold text-gray-700 sm:mb-2"
          >
            আপনার নাম
          </label>

          <div className="relative">
            <UserRound
              aria-hidden="true"
              className="absolute left-3 top-1/2 size-4.5 -translate-y-1/2 text-gray-400 sm:size-5"
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
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#247348] focus:ring-2 focus:ring-[#247348]/15 disabled:opacity-60 sm:py-3 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <p className="mb-1.5 block text-sm font-semibold text-gray-700 sm:mb-2">
            ইমেইল
          </p>

          <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 sm:px-4 sm:py-3">
            <Mail
              aria-hidden="true"
              className="size-4.5 shrink-0 text-gray-400 sm:size-5"
            />
            <span className="min-w-0 break-all text-sm text-gray-600">
              {email}
            </span>
          </div>
        </div>

        {message && (
          <p
            role="status"
            className="rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-700 sm:px-4 sm:py-3"
          >
            {message}
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700 sm:px-4 sm:py-3"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#247348] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#195a36] focus:outline-none focus:ring-2 focus:ring-[#247348] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-3"
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

export default function ProfilePage({ user }: ProfilePageProps) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  async function handleSignOut() {
    setSignOutError("");
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setSignOutError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      router.replace("/sign-in");
      router.refresh();
    } catch {
      setSignOutError("সাইন আউট করার সময় সমস্যা হয়েছে।");
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div className="bg-[#f3f7f2] px-3 py-6 sm:px-4 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 sm:mb-8">
          <h1 className="text-2xl font-bold text-[#173d2c] sm:text-4xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-600 sm:mt-3 sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <section className="overflow-hidden rounded-xl border border-[#dce8dc] bg-white shadow-sm sm:rounded-2xl">
          <div className="h-2 bg-[#247348]" />

          <div className="flex flex-col gap-4 p-4 min-[400px]:p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:p-8">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#e5f1e6] text-[#246c45] sm:size-16">
                <UserRound className="size-6 sm:size-8" aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-gray-900 sm:text-xl">
                  {user.name || "ব্যবহারকারী"}
                </h2>

                <p className="mt-0.5 break-all text-xs text-gray-600 sm:mt-1 sm:text-sm">
                  {user.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
            className="mt-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700 sm:px-4 sm:py-3"
          >
            {signOutError}
          </p>
        )}

        <ProfileForm key={user.id} initialName={user.name} email={user.email} />
      </div>
    </div>
  );
}
