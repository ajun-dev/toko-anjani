import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!apiSecret) {
    return NextResponse.json({ error: "Missing API secret" }, { status: 500 });
  }

  const body = await request.json();
  const { paramsToSign } = body;

  if (!paramsToSign) {
    return NextResponse.json({ error: "Missing paramsToSign" }, { status: 400 });
  }

  // Sign the exact string sent by the widget
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + apiSecret)
    .digest("hex");

  return NextResponse.json({ signature });
}
