import { redirect } from "next/navigation";
import { requireGalleryAdmin } from "@/lib/admin";
import GalleryAdmin from "@/components/gallery-admin";

export default async function AdminGalleryPage() {
  if (!(await requireGalleryAdmin())) redirect("/sign-in?redirect_url=/admin/gallery");
  return <GalleryAdmin />;
}