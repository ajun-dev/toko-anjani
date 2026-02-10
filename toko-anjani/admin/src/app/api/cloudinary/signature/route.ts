import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST() {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!apiSecret) {
    return NextResponse.json({ error: "Missing API secret" }, { status: 500 });
  }

  const timestamp = Math.round(Date.now() / 1000);
  
  // Create signature string: timestamp={timestamp}{apiSecret}
  const signatureString = `timestamp=${timestamp}${apiSecret}`;
  
  const signature = crypto
    .createHash("sha1")
    .update(signatureString)
    .digest("hex");

  return NextResponse.json({
    signature,
    timestamp,
  });
}
