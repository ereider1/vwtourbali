import { NextResponse } from "next/server";
import { requireGalleryAdmin } from "@/lib/admin";
import { addUploadedPhoto } from "@/lib/gallery";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await requireGalleryAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Use a JPG, PNG, or WebP image up to 8 MB." }, { status: 400 });
  }
  try {
    return NextResponse.json({ photo: await addUploadedPhoto(file) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to upload the photo." }, { status: 500 });
  }
}