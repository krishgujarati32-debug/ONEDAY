import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { emptyState, stateSchema } from "../src/lib/state";
const A = "11111111-1111-4111-8111-111111111111",
  B = "22222222-2222-4222-8222-222222222222";
test("PostgreSQL migration, RLS ownership, RPC round-trip, atomic rollback and revision conflicts", async () => {
  const db = new PGlite();
  try {
    await db.exec(
      `create role authenticated nologin;create role anon nologin;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;grant usage on schema public,auth to authenticated,anon;grant execute on function auth.uid() to authenticated,anon;insert into auth.users values('${A}'),('${B}');`,
    );
    await db.exec(
      readFileSync(
        "supabase/migrations/202611010001_learning_platform.sql",
        "utf8",
      ),
    );
    const as = async (id: string, role = "authenticated") => {
      await db.exec("reset role");
      await db.query("select set_config('request.jwt.claim.sub',$1,false)", [
        id,
      ]);
      await db.exec("set role " + role);
    };
    const read = async () => {
      const r = await db.query<{ value: { data: unknown; revision: number } }>(
        "select public.read_learning_state() as value",
      );
      return r.rows[0].value;
    };
    const save = async (data: unknown, revision: number) =>
      db.query<{ revision: number }>(
        "select public.save_learning_state($1::jsonb,$2::bigint) as revision",
        [JSON.stringify(data), revision],
      );
    const state = emptyState();
    state.settings.name = "Learner A";
    state.lastTopic = "0.1";
    state.progress["0.1.1"] = {
      status: "completed",
      completedAt: "2026-11-01T05:00:00.000Z",
    };
    state.notes["topic:0.1"] = "Private note A";
    state.notes["topic:1.6-javascript"] = "Historical note";
    state.progress["1.6-javascript.1"] = {
      status: "completed",
      completedAt: "2026-11-01T05:00:00.000Z",
    };
    state.progress["v2-http-contract"] = {
      status: "completed",
      completedAt: "2026-11-01T06:00:00.000Z",
    };
    state.progress["evidence:0.1"] = state.progress["0.1.1"];
    state.progress["job-ready:concurrency"] = state.progress["0.1.1"];
    state.projectChecks["portfolio-python-toolkit.0"] = true;
    state.projectChecks["portfolio-rag-backend.0"] = true;
    state.bookmarks = ["topic:0.1"];
    state.sessions = [
      {
        id: crypto.randomUUID(),
        topicId: "0.1",
        minutes: 30,
        date: "2026-11-01",
        notes: "CPU practice",
      },
    ];
    state.projectChecks["project-1.0"] = true;
    await as(A);
    assert.deepEqual(stateSchema.parse((await read()).data), emptyState());
    await save(state, 0);
    assert.deepEqual(stateSchema.parse((await read()).data), state);
    assert.equal((await read()).revision, 1);
    await assert.rejects(
      save({ ...state, notes: { "topic:0.1": "stale overwrite" } }, 0),
      /revision_conflict/,
    );
    assert.deepEqual(stateSchema.parse((await read()).data), state);
    const invalid = {
      ...state,
      sessions: [{ ...state.sessions[0], minutes: 0 }],
    };
    await assert.rejects(save(invalid, 1), /check constraint/);
    assert.deepEqual(stateSchema.parse((await read()).data), state);
    assert.equal((await read()).revision, 1);
    await as(B);
    assert.deepEqual(stateSchema.parse((await read()).data), emptyState());
    const tables = [
      "user_settings",
      "learning_progress",
      "notes",
      "bookmarks",
      "study_sessions",
      "project_checks",
    ];
    for (const table of tables) {
      const visible = await db.query("select * from public." + table);
      assert.equal(visible.rows.length, 0, table + " leaks rows");
      const update = await db.query(
        `update public.${table} set user_id=user_id where user_id=$1`,
        [A],
      );
      assert.equal(
        update.affectedRows,
        0,
        table + " permits cross-user update",
      );
      const removed = await db.query(
        `delete from public.${table} where user_id=$1`,
        [A],
      );
      assert.equal(
        removed.affectedRows,
        0,
        table + " permits cross-user deletion",
      );
    }
    const forbidden = [
      `insert into public.user_settings(user_id) values('${A}')`,
      `insert into public.learning_progress(user_id,subtopic_id,status) values('${A}','0.1.2','not_started')`,
      `insert into public.notes(user_id,item_key,content) values('${A}','topic:0.2','intrusion')`,
      `insert into public.bookmarks(user_id,item_type,item_id) values('${A}','topic','0.2')`,
      `insert into public.study_sessions(id,user_id,topic_id,duration_minutes,session_date) values(gen_random_uuid(),'${A}','0.1',1,'2026-11-01')`,
      `insert into public.project_checks(user_id,item_key,completed) values('${A}','project-1.1',true)`,
    ];
    for (const sql of forbidden)
      await assert.rejects(db.exec(sql), /row-level security/);
    await save(emptyState(), 0);
    assert.equal((await read()).revision, 1);
    await assert.rejects(
      db.query("update public.user_settings set user_id=$1 where user_id=$2", [
        A,
        B,
      ]),
      /row-level security/,
    );
    await as(A);
    assert.deepEqual(stateSchema.parse((await read()).data), state);
    await as("", "anon");
    for (const table of tables)
      await assert.rejects(
        db.query("select * from public." + table),
        /permission denied/,
      );
    await assert.rejects(read(), /permission denied/);
    await assert.rejects(save(emptyState(), 0), /permission denied/);

    await db.exec("reset role");
    const archiveMigration = readFileSync(
      "supabase/migrations/202611080001_preserve_planner_archive.sql",
      "utf8",
    );
    await db.exec(archiveMigration);
    const readWorkspace = async () =>
      (
        await db.query<{ value: { data: unknown; revision: number } }>(
          "select public.read_learning_workspace() as value",
        )
      ).rows[0].value;
    const saveWorkspace = async (data: unknown, revision: number) =>
      db.query("select public.save_learning_workspace($1::jsonb,$2::bigint)", [
        JSON.stringify(data),
        revision,
      ]);
    await as(A);
    assert.deepEqual(await readWorkspace(), { data: state, revision: 1 });
    const planner = {
      version: 1,
      custom: {},
      unknown: { nested: ["keep this", true] },
    } as const;
    const archived = { ...state, planner };
    await saveWorkspace(archived, 1);
    assert.deepEqual(stateSchema.parse((await readWorkspace()).data), archived);
    await assert.rejects(
      saveWorkspace({ ...archived, planner: { version: "1" } }, 2),
      /invalid_planner_archive/,
    );
    await assert.rejects(
      saveWorkspace(
        { ...archived, planner: { version: 1 }, sessions: invalid.sessions },
        2,
      ),
      /check constraint/,
    );
    await assert.rejects(saveWorkspace(archived, 1), /revision_conflict/);
    assert.deepEqual(await readWorkspace(), { data: archived, revision: 2 });
    await saveWorkspace(state, 2);
    await save(state, 3);
    assert.deepEqual(await readWorkspace(), { data: archived, revision: 4 });
    await db.exec("reset role");
    await db.exec(archiveMigration);
    await as(A);
    assert.deepEqual(await readWorkspace(), { data: archived, revision: 4 });
    await as(B);
    assert.deepEqual(await readWorkspace(), {
      data: emptyState(),
      revision: 1,
    });
    assert.equal(
      (
        await db.query(
          "select planner from public.user_settings where user_id=$1",
          [A],
        )
      ).rows.length,
      0,
    );
    await as("", "anon");
    await assert.rejects(readWorkspace(), /permission denied/);
    await assert.rejects(saveWorkspace(archived, 4), /permission denied/);
    await as(A);
    await saveWorkspace({ ...state, planner: null }, 4);
    assert.deepEqual(await readWorkspace(), { data: state, revision: 5 });
  } finally {
    await db.close();
  }
});
