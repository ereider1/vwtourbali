import { NextResponse } from "next/server";
import { listPublishedReviews, savePublishedReview } from "@/lib/reviews";

export const runtime = "nodejs";

export async function GET() {
  const reviews = await listPublishedReviews();
  return NextResponse.json(
    { reviews },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: unknown;
      country?: unknown;
      rating?: unknown;
      review?: unknown;
      permission?: unknown;
      website?: unknown;
    };

    if (body.website) {
      return NextResponse.json({ ok: true, published: false });
    }

    if (body.permission !== true) {
      return NextResponse.json({ ok: true, published: false });
    }

    const review = await savePublishedReview({
      name: body.name,
      country: body.country,
      rating: body.rating,
      review: body.review,
    });

    return NextResponse.json({ ok: true, published: true, review }, { status: 201 });
  } catch (error) {
    console.error("Review submission failed", error);
    return NextResponse.json(
      { error: "We couldn't add your review just yet. Please try again." },
      { status: 400 },
    );
  }
}
