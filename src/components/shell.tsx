"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  ChevronRight,
  Command,
  GraduationCap,
  Layers3,
  LayoutDashboard,
  Map,
  Menu,
  Monitor,
  Search,
  Settings2,
  Sun,
  WifiOff,
  X,
} from "lucide-react";
import { useLearning } from "./learning-provider";
import { Modal, ProgressBar } from "./ui";
import {
  formatPercent,
  progress,
  subtopicIndex,
  phaseIndex,
} from "@/lib/progress";
const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/roadmap", label: "Learning roadmap", icon: Map },
  { href: "/projects", label: "Projects", icon: Layers3 },
  { href: "/technology-stack", label: "Technology Stack", icon: Boxes },
];
type SearchResult = {
  label: string;
  type: string;
  description: string;
  href: string;
};
function SearchPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState(""),
    [results, setResults] = useState<SearchResult[]>([]),
    [loading, setLoading] = useState(false),
    [error, setError] = useState("");
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          "/api/search?q=" + encodeURIComponent(query),
          { signal: controller.signal },
        );
        if (!response.ok)
          throw new Error("Search is unavailable. Please try again.");
        setResults((await response.json()).results);
      } catch (e) {
        if (!controller.signal.aborted)
          setError(e instanceof Error ? e.message : "Search failed.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 180);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [open, query]);
  return (
    <Modal open={open} onClose={onClose} title="Find your next idea">
      <div className="palette-input">
        <Search size={20} />
        <input
          aria-label="Search all learning content"
          autoFocus
          placeholder="Topics, concepts, projects, tools…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              document
                .querySelector<HTMLAnchorElement>(".search-result")
                ?.focus();
            }
          }}
        />
        <kbd>esc</kbd>
      </div>
      <p className="search-hint">
        {query ? "Search results" : "A good place to start"}{" "}
        {loading && "· Searching…"}
      </p>
      <div
        className="search-results"
        onKeyDown={(e) => {
          const links = [
            ...e.currentTarget.querySelectorAll<HTMLAnchorElement>("a"),
          ];
          const i = links.indexOf(document.activeElement as HTMLAnchorElement);
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            links[
              (i + (e.key === "ArrowDown" ? 1 : -1) + links.length) %
                links.length
            ]?.focus();
          }
        }}
      >
        {error ? (
          <p role="alert">{error}</p>
        ) : (
          results.map((r) => (
            <Link
              key={r.href + r.label}
              className="search-result"
              href={r.href}
              onClick={onClose}
            >
              <div>
                <span className="eyebrow">{r.type}</span>
                <strong>{r.label}</strong>
                <small>{r.description}</small>
              </div>
              <ChevronRight size={17} />
            </Link>
          ))
        )}
        {!loading && !error && results.length === 0 && (
          <p className="empty-state">
            No matches. Try a broader term such as “Python” or “retrieval”.
          </p>
        )}
      </div>
      <div className="palette-footer">
        <span>↑ ↓ to navigate</span>
        <span>↵ to open · esc to close</span>
      </div>
    </Modal>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const {
    state,
    mode,
    user,
    ready,
    toast,
    pending,
    setTheme,
    reload,
    loadFailure,
    dismiss,
  } = useLearning();
  const [search, setSearch] = useState(false),
    [mobile, setMobile] = useState(false);
  const p = progress(subtopicIndex, state);
  const name =
    state.settings.name || user?.email?.split("@")[0] || "Your learning space";
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((s) => !s);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    if (!mobile) return;
    const prior = document.activeElement as HTMLElement | null;
    const drawer = document.querySelector<HTMLElement>(".sidebar");
    drawer?.querySelector<HTMLElement>("a,button")?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMobile(false);
      }
      if (e.key === "Tab") {
        const focusable = [
          ...drawer!.querySelectorAll<HTMLElement>(
            "a[href],button:not([disabled]),select",
          ),
        ];
        const first = focusable[0],
          last = focusable.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      prior?.focus();
    };
  }, [mobile]);
  const current = nav.find((n) =>
    n.href === "/" ? path === "/" : path.startsWith(n.href),
  );
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {mobile && (
        <button
          className="drawer-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobile(false)}
        />
      )}
      <aside
        role={mobile ? "dialog" : undefined}
        aria-modal={mobile || undefined}
        aria-label="Workspace navigation"
        className={`sidebar ${mobile ? "sidebar-open" : ""}`}
      >
        <Link href="/" className="brand" onClick={() => setMobile(false)}>
          <span className="brand-mark">
            <Command size={21} />
          </span>
          <span>
            engineer<span className="brand-dot">.</span>
            <small>AI SYSTEMS LEARNING OS</small>
          </span>
        </Link>
        <button
          className="mobile-close icon-button"
          aria-label="Close navigation"
          onClick={() => setMobile(false)}
        >
          <X size={20} />
        </button>
        <div className="workspace-badge">
          <span className="workspace-icon">
            <GraduationCap size={18} />
          </span>
          <div>
            <strong>Personal workspace</strong>
            <small>Your path to AI engineering</small>
          </div>
          <ChevronRight size={14} />
        </div>
        <span className="sidebar-label">WORKSPACE</span>
        <nav aria-label="Main navigation">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`nav-item ${(href === "/" ? path === href : path.startsWith(href)) ? "active" : ""}`}
              aria-current={
                (href === "/" ? path === href : path.startsWith(href))
                  ? "page"
                  : undefined
              }
              onClick={() => setMobile(false)}
            >
              <Icon size={18} />
              <span>{label}</span>
              {href === "/roadmap" && <small>{phaseIndex.length}</small>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="journey-card">
            <div className="between">
              <span className="journey-icon">
                <BookOpen size={17} />
              </span>
              <span className="tiny-dot" />
            </div>
            <strong>A little better, every day.</strong>
            <p>Great engineers are built one concept at a time.</p>
            <div className="between">
              <small>LEARNING PROGRESS</small>
              <b>{ready ? formatPercent(p.percent) : "…"}</b>
            </div>
            <ProgressBar value={p.percent} label="Curriculum progress" />
            <Link href="/roadmap">
              Keep exploring
              <ArrowUpRight size={15} />
            </Link>
          </div>
          <Link
            href="/settings"
            className={`nav-item ${path === "/settings" ? "active" : ""}`}
            onClick={() => setMobile(false)}
          >
            <Settings2 size={18} />
            Account & data
          </Link>
          <Link
            href={mode === "cloud" ? "/settings" : "/auth/sign-in"}
            className="profile"
            onClick={() => setMobile(false)}
          >
            <span className="avatar">{name[0].toUpperCase()}</span>
            <span>
              <strong>{name}</strong>
              <small>
                {mode === "cloud" ? "Personal account" : "Preview workspace"}
              </small>
            </span>
            <ChevronRight size={15} />
          </Link>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button mobile-menu"
              aria-label="Open navigation"
              aria-expanded={mobile}
              onClick={() => setMobile(true)}
            >
              <Menu size={20} />
            </button>
            <span className="breadcrumb">
              <span>Workspace</span>
              <ChevronRight size={13} />
              <strong>
                {current?.label ??
                  (path.startsWith("/learn")
                    ? "Learning room"
                    : path.startsWith("/settings")
                      ? "Account & data"
                      : path.startsWith("/auth")
                        ? "Account"
                        : "Learning roadmap")}
              </strong>
            </span>
          </div>
          <div className="topbar-actions">
            <button
              className="search-trigger"
              onClick={() => setSearch(true)}
              aria-label="Open global search"
            >
              <Search size={16} />
              <span>Search anything…</span>
              <kbd>Ctrl K</kbd>
            </button>
            <label className="theme-control" title="Appearance">
              <Sun size={17} />
              <span className="sr-only">Theme</span>
              <select
                aria-label="Theme"
                value={state.settings.theme}
                disabled={pending || !ready}
                onChange={(e) => {
                  const theme = e.target.value as "light" | "dark" | "system";
                  void setTheme(theme);
                }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </label>
            <Link
              className="topbar-avatar"
              href={user ? "/settings" : "/auth/sign-in"}
              aria-label={user ? "Account settings" : "Sign in"}
            >
              {user ? name[0].toUpperCase() : <Monitor size={17} />}
            </Link>
          </div>
        </header>
        {mode === "error" ? (
          <div className="notice notice-error">
            <WifiOff size={15} />
            <span>We couldn’t load your saved data. Changes are paused.</span>
            {loadFailure && <span>{loadFailure.message}</span>}
            {loadFailure?.original != null && (
              <Link href="/settings#data">Account &amp; data</Link>
            )}
            <button disabled={pending} onClick={() => void reload()}>
              {pending ? "Retrying…" : "Retry"}
            </button>
          </div>
        ) : mode === "preview" ? (
          <div className="notice">
            <span className="status-dot" />
            <strong>Preview mode</strong>
            <span>Progress is saved on this device only.</span>
            <Link href="/settings#cloud">
              Set up cloud sync
              <ArrowUpRight size={12} />
            </Link>
          </div>
        ) : mode === "guest" ? (
          <div className="notice">
            <span className="status-dot" />
            <span>
              Your curriculum is open. Sign in to save your progress across
              devices.
            </span>
            <Link href="/auth/sign-in">
              Sign in
              <ArrowRight size={12} />
            </Link>
          </div>
        ) : null}
        <main id="main" className="main-content">
          {children}
        </main>
        <footer className="app-footer">
          <span>
            engineer.{" "}
            <span className="muted">
              Build understanding. Build real things.
            </span>
          </span>
          <span>
            Made for the long run <span className="footer-dot">✳</span>
          </span>
        </footer>
      </div>
      <SearchPalette open={search} onClose={() => setSearch(false)} />
      {toast && (
        <div
          className={`toast ${toast.error ? "toast-error" : ""}`}
          role={toast.error ? "alert" : "status"}
        >
          <span>{toast.message}</span>
          {toast.undo && <button onClick={toast.undo}>Undo</button>}
          <button
            className="icon-button"
            aria-label="Dismiss notification"
            onClick={dismiss}
          >
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
