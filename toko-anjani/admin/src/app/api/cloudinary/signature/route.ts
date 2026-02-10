import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!apiSecret) {
    return NextResponse.json({ error: "Missing API secret" }, { status: 500 });
  }

  const body = await request.json();
  const timestamp = Math.round(Date.now() / 1000);
  
  // Create string to sign from params
  const signatureParams: Record<string, any> = {
    timestamp,
    ...body,
  };

  // Sort params alphabetically and create signature string
  const sortedParams = Object.keys(signatureParams)
    .sort()
    .map((key) => `${key}=${signatureParams[key]}`)
    .join("&");

  const signature = crypto
    .createHash("sha1")
    .update(sortedParams + apiSecret)
    .digest("hex");

  return NextResponse.json({
    signature,
    timestamp,
  });
}
