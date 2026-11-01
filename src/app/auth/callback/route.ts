import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/slug";
import { configured } from "@/lib/supabase/config";
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const next = request.nextUrl.searchParams.get("next") || "/dashboard";
  if (configured && code) {
    const db = await createClient();
    const { error } = await db.auth.exchangeCodeForSession(code);
    if (!error)
      return NextResponse.redirect(new URL(safeNextPath(next), request.url));
  }
  return NextResponse.redirect(
    new URL(
      "/auth/sign-in?error=The+link+is+invalid+or+expired.+Request+a+new+one.",
      request.url,
    ),
  );
}
