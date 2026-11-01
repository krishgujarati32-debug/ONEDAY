"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Cloud,
  Download,
  LogOut,
  Monitor,
  Moon,
  Settings2,
  Sun,
  Trash2,
  Upload,
} from "lucide-react";
import { useLearning } from "./learning-provider";
import {
  emptyState,
  mergeStates,
  parseImport,
  dateKey,
  type LearningState,
} from "@/lib/state";
import { topicIndex } from "@/lib/progress";
import { createClient } from "@/lib/supabase/client";
import { Modal, PageHeading, Pill } from "./ui";
export function Settings() {
  const { state, ready, pending, mode, user, mutate, notify, reload } =
    useLearning();
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(state.settings.name),
    [goal, setGoal] = useState(state.settings.dailyGoal),
    [language, setLanguage] = useState(state.settings.language);
  const [incoming, setIncoming] = useState<LearningState | null>(null),
    [importMode, setImportMode] = useState<"merge" | "replace">("merge"),
    [reset, setReset] = useState(false),
    [confirmation, setConfirmation] = useState(""),
    [deleteSession, setDeleteSession] = useState<string | null>(null),
    [signingOut, setSigningOut] = useState(false);
  useEffect(() => {
    if (ready)
      Promise.resolve().then(() => {
        setName(state.settings.name);
        setGoal(state.settings.dailyGoal);
        setLanguage(state.settings.language);
      });
  }, [
    ready,
    state.settings.name,
    state.settings.dailyGoal,
    state.settings.language,
  ]);
  const download = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          { version: 1, exportedAt: new Date().toISOString(), data: state },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "engineer-learning-" + dateKey() + ".json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify("Learning export downloaded. Keep it somewhere safe.");
  };
  return (
    <>
      <PageHeading
        eyebrow="YOUR SPACE, YOUR PACE"
        title="Make this journey yours."
        description="Set a sustainable study rhythm, choose how you read, and keep control of your learning data."
      />
      <div className="settings-layout">
        <nav className="settings-nav" aria-label="Settings sections">
          <a href="#profile">Profile & account</a>
          <a href="#appearance">Appearance</a>
          <a href="#study-goal">Study preferences</a>
          <a href="#cloud">Cloud sync</a>
          <a href="#data">Your learning data</a>
          <a href="#sessions">Study history</a>
        </nav>
        <div className="settings-content">
          <section className="content-card" id="profile">
            <div className="setting-title">
              <div>
                <h2>Your profile</h2>
                <p>A personal space for a long-term ambition.</p>
              </div>
              <span className="phase-icon">
                <Settings2 size={19} />
              </span>
            </div>
            <form
              className="form-stack"
              onSubmit={async (e) => {
                e.preventDefault();
                await mutate(
                  (s) => ({ ...s, settings: { ...s.settings, name } }),
                  "Profile updated.",
                );
              }}
            >
              <label>
                Your name
                <input
                  value={name}
                  maxLength={80}
                  placeholder="What should we call you?"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label>
                Email
                <input
                  value={user?.email ?? "Local preview — no account connected"}
                  readOnly
                />
              </label>
              <button
                className="button button-primary"
                disabled={!ready || pending || name === state.settings.name}
              >
                <Check size={14} />
                Save profile
              </button>
            </form>
            <div className="account-setting">
              <div>
                <strong>
                  {mode === "cloud"
                    ? "Signed in securely"
                    : "A local preview workspace"}
                </strong>
                <p>
                  {mode === "cloud"
                    ? "Progress belongs to your account and syncs through Supabase."
                    : "Explore the curriculum and keep progress on this device. Configure Supabase for an account."}
                </p>
              </div>
              {mode === "cloud" ? (
                <button
                  className="button button-secondary button-small"
                  disabled={pending || signingOut}
                  onClick={async () => {
                    setSigningOut(true);
                    const { error } = await createClient().auth.signOut();
                    if (error) {
                      notify(error.message, true);
                      setSigningOut(false);
                    } else {
                      await reload();
                      router.replace("/");
                      router.refresh();
                    }
                  }}
                >
                  <LogOut size={14} />
                  {signingOut ? "Signing out…" : "Sign out"}
                </button>
              ) : (
                <Link
                  href="/auth/sign-in"
                  className="button button-secondary button-small"
                >
                  Account options
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </section>
          <section className="content-card" id="appearance">
            <h2>A comfortable place to think.</h2>
            <p>Choose your theme. System follows your device’s appearance.</p>
            <div
              className="theme-options"
              role="group"
              aria-label="Choose appearance"
            >
              {[
                { value: "light", label: "Light", icon: Sun },
                { value: "dark", label: "Dark", icon: Moon },
                { value: "system", label: "System", icon: Monitor },
              ].map((t) => (
                <button
                  aria-pressed={state.settings.theme === t.value}
                  className={state.settings.theme === t.value ? "selected" : ""}
                  key={t.value}
                  disabled={!ready || pending}
                  onClick={() =>
                    void mutate(
                      (s) => ({
                        ...s,
                        settings: {
                          ...s.settings,
                          theme: t.value as "light" | "dark" | "system",
                        },
                      }),
                      "Appearance updated.",
                    )
                  }
                >
                  <t.icon size={24} />
                  <span>{t.label}</span>
                  {state.settings.theme === t.value && <Check size={13} />}
                </button>
              ))}
            </div>
          </section>
          <section className="content-card" id="study-goal">
            <h2>A pace you can come back to.</h2>
            <p>
              Lesson estimates adjust to your goal. Real completion comes from
              practice, never from time passing.
            </p>
            <form
              className="form-stack"
              onSubmit={async (e) => {
                e.preventDefault();
                await mutate(
                  (s) => ({
                    ...s,
                    settings: { ...s.settings, dailyGoal: goal, language },
                  }),
                  "Study preferences saved.",
                );
              }}
            >
              <div className="two-columns">
                <label>
                  Daily study goal (minutes)
                  <input
                    type="number"
                    min={15}
                    max={480}
                    step={15}
                    required
                    value={goal}
                    onChange={(e) => setGoal(Number(e.target.value))}
                  />
                </label>
                <label>
                  Explanation language
                  <select
                    value={language}
                    onChange={(e) =>
                      setLanguage(e.target.value as "english" | "hinglish")
                    }
                  >
                    <option value="english">English</option>
                    <option value="hinglish">English + Hinglish aids</option>
                  </select>
                </label>
              </div>
              <p className="form-hint">
                Hinglish aids are available for selected topics. Every lesson
                includes its English definition and official learning
                references.
              </p>
              <button
                className="button button-primary"
                disabled={
                  !ready ||
                  pending ||
                  (goal === state.settings.dailyGoal &&
                    language === state.settings.language)
                }
              >
                <Check size={14} />
                Save preferences
              </button>
            </form>
          </section>
          <section className="content-card cloud-settings" id="cloud">
            <div className="setting-title">
              <div>
                <h2>Your progress, wherever you learn.</h2>
                <p>
                  {mode === "cloud"
                    ? "Cloud storage is connected to your authenticated account."
                    : "Cloud sync needs a Supabase project and its public connection settings."}
                </p>
              </div>
              <Cloud size={25} />
            </div>
            <Pill tone={mode === "cloud" ? "green" : "amber"}>
              {mode === "cloud"
                ? "Connected · cloud persistence"
                : "Preview · this device only"}
            </Pill>
            {mode !== "cloud" && (
              <ol className="plain-list cloud-steps">
                <li>
                  Create a Supabase project and run the included database
                  migration.
                </li>
                <li>
                  Set the project URL and publishable key in your local or
                  Vercel environment.
                </li>
                <li>
                  Configure authentication redirect URLs and restart or
                  redeploy.
                </li>
                <li>
                  Create your account. Export your preview progress, then import
                  it after signing in.
                </li>
              </ol>
            )}
            <p className="form-hint">
              The project README and docs contain the complete setup guide.
              Preview data is never silently merged into an authenticated
              account.
            </p>
            <a
              href="https://supabase.com/docs/guides/auth/server-side/nextjs"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Supabase setup reference
              <ArrowUpRight size={13} />
            </a>
          </section>
          <section className="content-card" id="data">
            <h2>Your effort belongs to you.</h2>
            <p>
              Export your progress, notes, bookmarks, study sessions, project
              checklists and preferences as a portable JSON file.
            </p>
            <div className="data-actions">
              <button
                className="button button-secondary"
                disabled={!ready || pending}
                onClick={download}
              >
                <Download size={15} />
                Export progress
              </button>
              <button
                className="button button-secondary"
                disabled={!ready || pending}
                onClick={() => input.current?.click()}
              >
                <Upload size={15} />
                Import progress
              </button>
              <input
                className="sr-only"
                ref={input}
                type="file"
                accept="application/json,.json"
                aria-label="Choose learning export"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  e.target.value = "";
                  if (!f) return;
                  try {
                    if (f.size > 5_000_000)
                      throw new Error(
                        "Please choose a JSON export smaller than 5 MB.",
                      );
                    setIncoming(parseImport(await f.text()));
                  } catch (error) {
                    notify(
                      error instanceof Error
                        ? error.message
                        : "Could not read that export.",
                      true,
                    );
                  }
                }}
              />
            </div>
            <div className="danger-zone">
              <div>
                <strong>Start fresh</strong>
                <p>
                  Delete all learning data from this workspace. Your account
                  will remain available.
                </p>
              </div>
              <button
                className="button button-secondary button-small"
                disabled={!ready || pending}
                onClick={() => {
                  setReset(true);
                  setConfirmation("");
                }}
              >
                <Trash2 size={14} />
                Reset learning data
              </button>
            </div>
          </section>
          <section className="content-card" id="sessions">
            <h2>Your study history</h2>
            <p>
              Keep an honest record. Remove a session if you entered it by
              mistake.
            </p>
            {state.sessions.length ? (
              <div className="history-list">
                {[...state.sessions]
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map((s) => (
                    <div key={s.id}>
                      <div>
                        <strong>
                          {topicIndex.find((t) => t.id === s.topicId)?.title}
                        </strong>
                        <small>
                          {s.date} · {s.minutes} minutes
                        </small>
                        {s.notes && <p>{s.notes}</p>}
                      </div>
                      <button
                        className="icon-button"
                        disabled={pending}
                        aria-label={"Delete session on " + s.date}
                        onClick={() => setDeleteSession(s.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="mini-empty">
                No sessions yet. Log your first study session from the
                dashboard.
              </p>
            )}
            <Link href="/dashboard" className="text-link">
              Open your dashboard
              <ArrowRight size={14} />
            </Link>
          </section>
        </div>
      </div>
      <Modal
        open={incoming !== null}
        onClose={() => setIncoming(null)}
        title="Bring your learning with you"
      >
        <p>
          This file contains {Object.keys(incoming?.progress ?? {}).length}{" "}
          progress records, {Object.keys(incoming?.notes ?? {}).length} notes
          and {incoming?.sessions.length ?? 0} study sessions. All IDs and
          values have been validated.
        </p>
        <div className="import-choices">
          <label>
            <input
              type="radio"
              name="import"
              checked={importMode === "merge"}
              onChange={() => setImportMode("merge")}
            />
            <span>
              <strong>Merge with current data</strong>
              <small>
                Keep current items and add the imported items. Imported records
                win when IDs match, including notes and preferences.
              </small>
            </span>
          </label>
          <label>
            <input
              type="radio"
              name="import"
              checked={importMode === "replace"}
              onChange={() => setImportMode("replace")}
            />
            <span>
              <strong>Replace current data</strong>
              <small>
                Remove existing progress, notes, bookmarks, sessions and
                preferences, then use this file.
              </small>
            </span>
          </label>
        </div>
        <div className="modal-actions">
          <button
            className="button button-secondary"
            onClick={() => setIncoming(null)}
          >
            Cancel
          </button>
          <button
            className="button button-primary"
            disabled={pending}
            onClick={async () => {
              if (
                incoming &&
                (await mutate(
                  (s) =>
                    importMode === "merge"
                      ? mergeStates(s, incoming)
                      : incoming,
                  "Learning data imported.",
                ))
              )
                setIncoming(null);
            }}
          >
            Confirm {importMode === "merge" ? "merge" : "replacement"}
            <Upload size={14} />
          </button>
        </div>
      </Modal>
      <Modal
        open={reset}
        onClose={() => setReset(false)}
        title="Reset this learning workspace?"
      >
        <p>
          This permanently removes all saved lesson progress, notes, bookmarks,
          study sessions, project checklists and preferences from{" "}
          {mode === "cloud" ? "your cloud account" : "this browser preview"}.
          Export a backup first if you want to keep a copy.
        </p>
        <label>
          Type RESET to confirm
          <input
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            autoComplete="off"
          />
        </label>
        <div className="modal-actions">
          <button
            className="button button-secondary"
            onClick={() => setReset(false)}
          >
            Keep my data
          </button>
          <button
            className="button button-danger"
            disabled={confirmation !== "RESET" || pending}
            onClick={async () => {
              if (
                await mutate(
                  () => emptyState(),
                  "Workspace reset. Your next chapter starts here.",
                )
              ) {
                setReset(false);
                router.push("/dashboard");
              }
            }}
          >
            Reset learning data
          </button>
        </div>
      </Modal>
      <Modal
        open={deleteSession !== null}
        onClose={() => setDeleteSession(null)}
        title="Remove this study session?"
      >
        <p>
          The session will be removed from your study history and weekly time
          totals. Lesson completion will remain as you marked it.
        </p>
        <div className="modal-actions">
          <button
            className="button button-secondary"
            onClick={() => setDeleteSession(null)}
          >
            Keep session
          </button>
          <button
            className="button button-danger"
            disabled={pending}
            onClick={async () => {
              if (
                await mutate(
                  (s) => ({
                    ...s,
                    sessions: s.sessions.filter((x) => x.id !== deleteSession),
                  }),
                  "Study session removed.",
                )
              )
                setDeleteSession(null);
            }}
          >
            Remove session
          </button>
        </div>
      </Modal>
    </>
  );
}
