import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { configured } from "@/lib/supabase/config";
import type { EmailOtpType } from "@supabase/supabase-js";
export async function GET(request: NextRequest) {
  const token_hash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type");
  if (
    configured &&
    token_hash &&
    type &&
    ["signup", "recovery", "email", "email_change"].includes(type)
  ) {
    const db = await createClient();
    const { error } = await db.auth.verifyOtp({
      token_hash,
      type: type as EmailOtpType,
    });
    if (!error)
      return NextResponse.redirect(
        new URL(
          type === "recovery" ? "/auth/update-password" : "/dashboard",
          request.url,
        ),
      );
  }
  return NextResponse.redirect(
    new URL(
      "/auth/sign-in?error=The+confirmation+link+is+invalid+or+expired.",
      request.url,
    ),
  );
}
