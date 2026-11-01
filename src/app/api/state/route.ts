import { NextRequest, NextResponse } from "next/server";
import { configured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { emptyState, stateSchema } from "@/lib/state";
import { z } from "zod";
export const dynamic = "force-dynamic";
const reply = (data: unknown, status = 200) =>
  NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "private, no-store" },
  });
export async function GET() {
  if (!configured)
    return reply({ mode: "preview", data: emptyState(), revision: 0 });
  const db = await createClient();
  const {
    data: { user },
    error,
  } = await db.auth.getUser();
  if (error || !user)
    return reply({ error: "Sign in to access saved learning data." }, 401);
  const { data, error: readError } = await db.rpc("read_learning_state");
  if (readError) {
    console.error("Learning state read:", readError.message);
    return reply(
      {
        error:
          "Could not load cloud progress. Check your connection and Supabase migrations.",
      },
      503,
    );
  }
  const result = stateSchema.safeParse(data?.data ?? emptyState());
  if (!result.success)
    return reply(
      {
        error:
          "Saved data needs attention. Export a backup and check the curriculum version.",
      },
      422,
    );
  return reply({
    mode: "cloud",
    user: { id: user.id, email: user.email },
    data: result.data,
    revision: data?.revision ?? 0,
  });
}
const saveSchema = z
  .object({ data: stateSchema, revision: z.number().int().nonnegative() })
  .strict();
export async function PUT(request: NextRequest) {
  if (!configured) return reply({ error: "Database is not configured." }, 503);
  if (request.headers.get("origin") !== request.nextUrl.origin)
    return reply({ error: "Invalid request origin." }, 403);
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 5_000_000) return reply({ error: "Payload too large." }, 413);
  const body = await request.text();
  if (body.length > 5_000_000)
    return reply({ error: "Payload too large." }, 413);
  let json: unknown;
  try {
    json = JSON.parse(body);
  } catch {
    return reply({ error: "Invalid JSON." }, 400);
  }
  const parsed = saveSchema.safeParse(json);
  if (!parsed.success)
    return reply(
      { error: "Invalid learning data. " + parsed.error.issues[0]?.message },
      400,
    );
  const db = await createClient();
  const {
    data: { user },
    error,
  } = await db.auth.getUser();
  if (error || !user)
    return reply(
      { error: "Your session expired. Sign in again before saving." },
      401,
    );
  const { data, error: saveError } = await db.rpc("save_learning_state", {
    payload: parsed.data.data,
    expected_revision: parsed.data.revision,
  });
  if (saveError) {
    if (saveError.message.includes("revision_conflict"))
      return reply(
        {
          error:
            "Progress changed in another tab or device. Reload before saving again.",
        },
        409,
      );
    console.error("Learning state save:", saveError.message);
    return reply(
      {
        error: "Could not save. Your change was rolled back; please try again.",
      },
      503,
    );
  }
  return reply({ revision: data });
}
