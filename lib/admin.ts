import { auth, currentUser } from "@clerk/nextjs/server";

export async function requireGalleryAdmin() {
  const { userId } = await auth();
  if (!userId) return false;

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress.toLowerCase();
  const allowedEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return Boolean(email && allowedEmails.includes(email));
}