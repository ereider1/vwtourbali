import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

const allowedContentTypes = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("review-photos/")) {
          throw new Error("Review photos must be uploaded to the review-photos folder.");
        }

        return {
          allowedContentTypes,
          maximumSizeInBytes: 8 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        void blob;
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Review photo upload failed", error);
    return NextResponse.json({ error: "Unable to upload this photo." }, { status: 500 });
  }
}
