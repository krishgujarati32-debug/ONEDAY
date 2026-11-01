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
import { emptyState, stateSchema, type LearningState } from "@/lib/state";
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
  const [ready, setReady] = useState(false),
    [pending, setPending] = useState(false),
    [mode, setMode] = useState<Context["mode"]>(
      configured ? "guest" : "preview",
    ),
    [user, setUser] = useState<Context["user"]>(null),
    [toast, setToast] = useState<Toast | null>(null);
  const router = useRouter();
  const notify = useCallback(
    (message: string, error = false) => setToast({ message, error }),
    [],
  );
  const reload = useCallback(async () => {
    try {
      if (!configured) {
        const raw = localStorage.getItem(LOCAL_KEY);
        const next = raw ? stateSchema.parse(JSON.parse(raw)) : emptyState();
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
          if (!response.ok) throw new Error(body.error);
          const next = stateSchema.parse(body.data);
          ref.current = next;
          setState(next);
          revision.current = body.revision;
          setUser(body.user);
          setMode("cloud");
        }
      }
    } catch (error) {
      setMode("error");
      notify(
        error instanceof Error
          ? error.message
          : "Could not load your saved data.",
        true,
      );
    } finally {
      setReady(true);
    }
  }, [configured, notify]);
  useEffect(() => {
    const timer = setTimeout(() => void reload(), 0);
    return () => clearTimeout(timer);
  }, [reload]);
  useEffect(() => {
    if (!ready) return;
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
  }, [ready, state.settings.theme]);
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
      if (!ready || lock.current) return false;
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
      const result = stateSchema.safeParse(proposed);
      if (!result.success) {
        notify(result.error.issues[0]?.message ?? "Invalid change.", true);
        return false;
      }
      lock.current = true;
      setPending(true);
      ref.current = result.data;
      setState(result.data);
      try {
        if (mode === "preview")
          localStorage.setItem(LOCAL_KEY, JSON.stringify(result.data));
        else {
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
          message:
            status === "completed"
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
