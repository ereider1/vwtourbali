import { NextResponse } from "next/server";
import { requireGalleryAdmin } from "@/lib/admin";
import { listGalleryPhotos, removeGalleryPhoto, updateGalleryPhoto, updateGalleryPhotos, type GalleryPhoto } from "@/lib/gallery";

export const runtime = "nodejs";

async function authorized() {
  return requireGalleryAdmin();
}

export async function GET() {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ photos: await listGalleryPhotos(true) }, { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(request: Request) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = (await request.json()) as { action?: string; id?: string; photos?: GalleryPhoto[]; alt?: string; isPublished?: boolean };
    if (body.action === "reorder" && Array.isArray(body.photos)) {
      return NextResponse.json({ photos: await updateGalleryPhotos(body.photos) });
    }
    if (!body.id) return NextResponse.json({ error: "Photo id is required." }, { status: 400 });
    return NextResponse.json({ photos: await updateGalleryPhoto(body.id, { alt: body.alt, isPublished: body.isPublished }) });
  } catch {
    return NextResponse.json({ error: "Unable to update the gallery." }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = (await request.json()) as { id?: string };
    if (!id) return NextResponse.json({ error: "Photo id is required." }, { status: 400 });
    await removeGalleryPhoto(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to remove the photo." }, { status: 400 });
  }
}