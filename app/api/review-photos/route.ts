import { list } from "@vercel/blob";

export async function GET() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ photos: [] });
  }

  try {
    const { blobs } = await list({ prefix: "review-photos/", limit: 50 });
    const photos = blobs
      .filter((blob) => /\.(jpe?g|png|webp)$/i.test(blob.pathname))
      .map((blob) => ({
        src: blob.url,
        alt: "Guest photo from a Bali Volkswagen tour",
      }));

    return Response.json({ photos }, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("Review photo listing failed", error);
    return Response.json({ photos: [] });
  }
}
