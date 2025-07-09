import { signout } from "@/lib/actions/auth.action";
import { NextResponse } from "next/server";

export async function POST() {
  // Deletes the session cookie from the server
  await signout();

  return NextResponse.json({ success: true });
}