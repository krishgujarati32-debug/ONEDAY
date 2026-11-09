"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  emptyState,
  preservePlanner,
  stateSchema,
  type LearningState,
} from "@/lib/state";
import type { Status } from "@/lib/types";
const LOCAL_KEY = "engineer-learning-preview-v1";
type Toast = { message: string; error?: boolean; undo?: () => void };
type Context = {
  state: LearningState;
  ready: boolean;
  pending: boolean;
  mode: "preview" | "cloud" | "guest" | "error";
  user: { id: string; email: string } | null;
  toast: Toast | null;
  loadFailure: { message: string; original: string | null } | null;
  notify: (message: string, error?: boolean) => void;
  mutate: (
    fn: (s: LearningState) => LearningState,
    message?: string,
  ) => Promise<boolean>;
  setStatus: (id: string, status: Status) => Promise<void>;
  bookmark: (key: string) => Promise<void>;
  setTheme: (theme: LearningState["settings"]["theme"]) => Promise<void>;
  reload: () => Promise<void>;
  dismiss: () => void;
};
const LearningContext = createContext<Context | null>(null);
export function LearningProvider({
  children,
  configured,
}: {
  children: React.ReactNode;
  configured: boolean;
}) {
  const [state, setState] = useState<LearningState>(emptyState);
  const ref = useRef(state);
  const revision = useRef(0);
  const lock = useRef(false);
  const loading = useRef(false);
  const previewRaw = useRef<string | null>(null);
  const [ready, setReady] = useState(false),
    [pending, setPending] = useState(false),
    [mode, setMode] = useState<Context["mode"]>(
      configured ? "guest" : "preview",
    ),
    [user, setUser] = useState<Context["user"]>(null),
    [toast, setToast] = useState<Toast | null>(null);
  const [loadFailure, setLoadFailure] = useState<Context["loadFailure"]>(null);
  const router = useRouter();
  const notify = useCallback(
    (message: string, error = false) => setToast({ message, error }),
    [],
  );
  const reload = useCallback(async () => {
    if (loading.current || lock.current) return;
    loading.current = true;
    setPending(true);
    let original: string | null = null;
    let message =
      "Could not load cloud progress. Check your connection and retry.";
    try {
      if (!configured) {
        original = localStorage.getItem(LOCAL_KEY);
        const next =
          original === null
            ? emptyState()
            : stateSchema.parse(JSON.parse(original));
        previewRaw.current = original;
        ref.current = next;
        setState(next);
        setMode("preview");
      } else {
        const response = await fetch("/api/state", { cache: "no-store" });
        const body = await response.json();
        if (response.status === 401) {
          const guest = emptyState();
          const preferred = localStorage.getItem("engineer-theme");
          if (
            preferred === "light" ||
            preferred === "dark" ||
            preferred === "system"
          )
            guest.settings.theme = preferred;
          ref.current = guest;
          setState(guest);
          setUser(null);
          setMode("guest");
        } else {
          if (!response.ok) {
            if (typeof body?.error === "string") message = body.error;
            throw new Error(message);
          }
          message =
            "The cloud response could not be validated. Check the app and database versions, then retry.";
          const next = stateSchema.parse(body.data);
          if (
            !Number.isSafeInteger(body.revision) ||
            body.revision < 0 ||
            typeof body.user?.id !== "string"
          ) {
            throw new Error(message);
          }
          ref.current = next;
          setState(next);
          revision.current = body.revision;
          setUser(body.user);
          setMode("cloud");
        }
      }
      setLoadFailure(null);
    } catch {
      setMode("error");
      setLoadFailure({
        original,
        message: configured
          ? message
          : original === null
            ? "This browser's storage could not be read. Check its storage settings and retry."
            : "The original browser data is still in storage. Download a copy from Account & data before repairing it.",
      });
    } finally {
      loading.current = false;
      setPending(false);
      setReady(true);
    }
  }, [configured]);
  useEffect(() => {
    const timer = setTimeout(() => void reload(), 0);
    return () => clearTimeout(timer);
  }, [reload]);
  useEffect(() => {
    if (!ready || mode === "error") return;
    const media = matchMedia("(prefers-color-scheme: dark)");
    const preference = state.settings.theme;
    const apply = () => {
      document.documentElement.dataset.theme =
        preference === "system"
          ? media.matches
            ? "dark"
            : "light"
          : preference;
    };
    apply();
    try {
      localStorage.setItem("engineer-theme", preference);
    } catch {}
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [ready, mode, state.settings.theme]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), toast.error ? 14000 : 8000);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    const offline = () =>
      notify(
        "You are offline. Existing progress is safe; cloud changes cannot save until you reconnect.",
        true,
      );
    window.addEventListener("offline", offline);
    return () => window.removeEventListener("offline", offline);
  }, [notify]);
  const mutate = useCallback(
    async (fn: (s: LearningState) => LearningState, message?: string) => {
      if (!ready || lock.current || loading.current) return false;
      if (mode === "guest") {
        notify("Sign in to save your learning progress.", true);
        router.push("/auth/sign-in");
        return false;
      }
      if (mode === "error") {
        notify("Reload your saved data before making changes.", true);
        return false;
      }
      const before = ref.current;
      let proposed: LearningState;
      try {
        proposed = fn(before);
      } catch (error) {
        notify(
          error instanceof Error ? error.message : "The change is invalid.",
          true,
        );
        return false;
      }
      const result = stateSchema.safeParse(preservePlanner(before, proposed));
      if (!result.success) {
        notify(result.error.issues[0]?.message ?? "Invalid change.", true);
        return false;
      }
      lock.current = true;
      setPending(true);
      ref.current = result.data;
      setState(result.data);
      try {
        if (mode === "preview") {
          const save = () => {
            if (localStorage.getItem(LOCAL_KEY) !== previewRaw.current) {
              throw new Error(
                "Saved data changed in another tab. Reload before saving again.",
              );
            }
            const next = JSON.stringify(result.data);
            localStorage.setItem(LOCAL_KEY, next);
            previewRaw.current = next;
          };
          if (navigator.locks) await navigator.locks.request(LOCAL_KEY, save);
          else save();
        } else {
          const response = await fetch("/api/state", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              data: result.data,
              revision: revision.current,
            }),
          });
          const body = await response.json();
          if (!response.ok)
            throw new Error(body.error || "Could not save your change.");
          revision.current = body.revision;
        }
        if (message) setToast({ message });
        return true;
      } catch (error) {
        ref.current = before;
        setState(before);
        notify(
          error instanceof Error
            ? error.message
            : "Could not save. Your change was rolled back.",
          true,
        );
        return false;
      } finally {
        lock.current = false;
        setPending(false);
      }
    },
    [ready, mode, notify, router],
  );
  const setStatus = useCallback(
    async (id: string, status: Status) => {
      const before = ref.current.progress[id] ?? {
        status: "not_started" as const,
        completedAt: null,
      };
      const saved = await mutate((s) => ({
        ...s,
        progress: {
          ...s.progress,
          [id]: {
            status,
            completedAt:
              status === "completed" ? new Date().toISOString() : null,
          },
        },
      }));
      if (saved)
        setToast({
          message: id.startsWith("evidence:")
            ? status === "completed"
              ? "Topic practice recorded."
              : "Topic practice reopened."
            : id.startsWith("job-ready:")
              ? "Checkpoint evidence updated."
              : status === "completed"
                ? "Lesson completed. One step closer."
                : "Learning status updated.",
          undo: () => {
            void mutate(
              (s) => ({ ...s, progress: { ...s.progress, [id]: before } }),
              "Change undone.",
            );
          },
        });
    },
    [mutate],
  );
  const bookmark = useCallback(
    async (key: string) => {
      await mutate(
        (s) => ({
          ...s,
          bookmarks: s.bookmarks.includes(key)
            ? s.bookmarks.filter((x) => x !== key)
            : [...s.bookmarks, key],
        }),
        "Saved items updated.",
      );
    },
    [mutate],
  );
  const setTheme = useCallback(
    async (theme: LearningState["settings"]["theme"]) => {
      if (mode === "guest") {
        const next = {
          ...ref.current,
          settings: { ...ref.current.settings, theme },
        };
        ref.current = next;
        setState(next);
        try {
          localStorage.setItem("engineer-theme", theme);
        } catch {}
        return;
      }
      await mutate((s) => ({ ...s, settings: { ...s.settings, theme } }));
    },
    [mode, mutate],
  );
  return (
    <LearningContext.Provider
      value={{
        state,
        ready,
        pending,
        mode,
        user,
        toast,
        loadFailure,
        notify,
        mutate,
        setStatus,
        bookmark,
        setTheme,
        reload,
        dismiss: () => setToast(null),
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}
export function useLearning() {
  const c = useContext(LearningContext);
  if (!c) throw new Error("LearningProvider missing");
  return c;
}
