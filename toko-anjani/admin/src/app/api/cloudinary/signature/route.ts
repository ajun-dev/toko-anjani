import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!apiKey || !apiSecret || !cloudName) {
    return NextResponse.json({ error: "Missing Cloudinary env" }, { status: 500 });
  }

  const body = await request.json();
  const { paramsToSign } = body;

  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + apiSecret)
    .digest("hex");

  return NextResponse.json({
    signature,
    apiKey,
  });
}
