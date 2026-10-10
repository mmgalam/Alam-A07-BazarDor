
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfilePage from "@/app/Components/ProfilePage";

export const dynamic = "force-dynamic";

export default async function ProfileRoute() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return <ProfilePage />;
}
