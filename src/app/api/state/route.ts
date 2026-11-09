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
const snapshotSchema = z
  .object({ data: stateSchema, revision: z.number().int().nonnegative() })
  .strict();
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
  const workspace = await db.rpc("read_learning_workspace");
  const { data, error: readError } =
    workspace.error?.code === "PGRST202"
      ? await db.rpc("read_learning_state")
      : workspace;
  if (readError) {
    console.error("Learning state read failed:", readError.code);
    return reply(
      {
        error:
          "Could not load cloud progress. Check your connection and Supabase migrations.",
      },
      503,
    );
  }
  const result = snapshotSchema.safeParse(data);
  if (!result.success)
    return reply(
      {
        error:
          "The cloud snapshot could not be validated. Check that your app and database are using compatible versions.",
      },
      422,
    );
  return reply({
    mode: "cloud",
    user: { id: user.id, email: user.email },
    ...result.data,
  });
}
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
  const parsed = snapshotSchema.safeParse(json);
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
  const args = {
    payload: parsed.data.data,
    expected_revision: parsed.data.revision,
  };
  const workspace = await db.rpc("save_learning_workspace", args);
  if (
    workspace.error?.code === "PGRST202" &&
    parsed.data.data.planner !== undefined
  ) {
    return reply(
      {
        error:
          "Cloud sync for this planner backup needs the Supabase planner archive migration. Apply it, then retry. No data was saved.",
      },
      503,
    );
  }
  const { data, error: saveError } =
    workspace.error?.code === "PGRST202"
      ? await db.rpc("save_learning_state", args)
      : workspace;
  if (saveError) {
    if (saveError.message.includes("revision_conflict"))
      return reply(
        {
          error:
            "Progress changed in another tab or device. Reload before saving again.",
        },
        409,
      );
    if (saveError.message === "invalid_planner_archive") {
      return reply(
        {
          error:
            "The planner snapshot exceeds the cloud archive limits. No data was saved.",
        },
        422,
      );
    }
    console.error("Learning state save failed:", saveError.code);
    return reply(
      {
        error: "Could not save. Your change was rolled back; please try again.",
      },
      503,
    );
  }
  return reply({ revision: data });
}
