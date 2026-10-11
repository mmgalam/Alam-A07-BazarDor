import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL ইচ্ছা করে বাদ দেওয়া হয়েছে।
  // তখন ক্লায়েন্ট যে ডোমেইনে পেজ খুলেছে, সেখানেই অনুরোধ পাঠাবে।
});

export const { signIn, signUp, signOut, useSession } = authClient;