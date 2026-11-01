"use client";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  X,
} from "lucide-react";
import { useLearning } from "./learning-provider";
import { formatPercent, progress } from "@/lib/progress";
export function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: string;
}) {
  return <span className={`pill pill-${tone}`}>{children}</span>;
}
export function ProgressBar({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Number(value.toFixed(1))}
    >
      <div style={{ width: `${value}%` }} />
    </div>
  );
}
export function LiveProgress({
  items,
  compact = false,
}: {
  items: { id: string }[];
  compact?: boolean;
}) {
  const { state, ready } = useLearning();
  const p = progress(items, state);
  return (
    <div className="live-progress">
      <div className="between">
        <span>
          {compact
            ? "Progress"
            : `${p.completed} of ${p.total} lessons completed`}
        </span>
        <strong>{ready ? formatPercent(p.percent) : "…"}</strong>
      </div>
      <ProgressBar value={p.percent} label="Lesson completion" />
    </div>
  );
}
export function BookmarkButton({
  itemKey,
  small = false,
}: {
  itemKey: string;
  small?: boolean;
}) {
  const { state, bookmark, pending, ready } = useLearning();
  const saved = state.bookmarks.includes(itemKey);
  return (
    <button
      className={
        small ? "icon-button bookmark-button" : "button button-secondary"
      }
      disabled={pending || !ready}
      aria-label={saved ? "Remove bookmark" : "Bookmark this item"}
      aria-pressed={saved}
      onClick={() => void bookmark(itemKey)}
    >
      <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
      {!small && (saved ? "Bookmarked" : "Bookmark")}
    </button>
  );
}
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const d = ref.current;
    if (open && !d?.open) d?.showModal();
    else if (!open && d?.open) d.close();
  }, [open]);
  return (
    <dialog
      className="modal"
      ref={ref}
      aria-labelledby={id}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-head">
        <h2 id={id}>{title}</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>
      </div>
      {open && children}
    </dialog>
  );
}
export function NotesEditor({
  itemKey,
  label = "Personal notes",
}: {
  itemKey: string;
  label?: string;
}) {
  const { state, user, mutate, pending, ready } = useLearning();
  const [draft, setDraft] = useState(state.notes[itemKey] ?? ""),
    [saved, setSaved] = useState(state.notes[itemKey] ?? "");
  const initialized = useRef(false);
  const dirty = draft !== saved;
  const draftKey = `engineer-note-draft:${user?.id ?? "preview"}:${itemKey}`;
  useEffect(() => {
    if (!ready) return;
    const remote = state.notes[itemKey] ?? "";
    if (!initialized.current) {
      let recovered: string | null = null;
      try {
        recovered = sessionStorage.getItem(draftKey);
      } catch {}
      queueMicrotask(() => {
        setDraft(recovered ?? remote);
        setSaved(remote);
        initialized.current = true;
      });
    } else if (!dirty) {
      queueMicrotask(() => {
        setDraft(remote);
        setSaved(remote);
      });
    }
  }, [ready, state.notes, itemKey, dirty, draftKey]);
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    const guard = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target || target.target === "_blank") return;
      const destination = new URL(target.href);
      if (
        destination.origin === location.origin &&
        destination.pathname === location.pathname &&
        destination.search === location.search
      )
        return;
      if (
        !window.confirm(
          "Your note has unsaved changes. Leave this page? A draft will stay in this browser tab.",
        )
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", handler);
    document.addEventListener("click", guard, true);
    return () => {
      window.removeEventListener("beforeunload", handler);
      document.removeEventListener("click", guard, true);
    };
  }, [dirty]);
  return (
    <section className="notes-editor">
      <div className="between">
        <h3>{label}</h3>
        <small>
          {dirty
            ? "Unsaved changes · draft kept in this tab"
            : "All notes saved"}
        </small>
      </div>
      <label className="sr-only" htmlFor={`note-${itemKey}`}>
        {label}
      </label>
      <textarea
        id={`note-${itemKey}`}
        value={draft}
        maxLength={30000}
        onChange={(e) => {
          setDraft(e.target.value);
          try {
            sessionStorage.setItem(draftKey, e.target.value);
          } catch {}
        }}
        placeholder="Explain it in your own words. Capture a question, an example, or a useful connection…"
        rows={5}
      />
      <div className="between">
        <small>
          Private to your learning space · {draft.length.toLocaleString()} /
          30,000
        </small>
        <button
          className="button button-primary button-small"
          disabled={!dirty || pending || !ready}
          onClick={async () => {
            const ok = await mutate(
              (s) => ({ ...s, notes: { ...s.notes, [itemKey]: draft } }),
              "Note saved.",
            );
            if (ok) {
              setSaved(draft);
              try {
                sessionStorage.removeItem(draftKey);
              } catch {}
            }
          }}
        >
          <Check size={14} />
          {pending ? "Saving…" : "Save note"}
        </button>
      </div>
    </section>
  );
}
export function ResourceCard({
  resource,
}: {
  resource: {
    id: string;
    title: string;
    provider: string;
    description: string;
    url: string;
    type: string;
  };
}) {
  return (
    <article className="resource-card">
      <div className="between">
        <span className="eyebrow">{resource.provider}</span>
        <BookmarkButton itemKey={"resource:" + resource.id} small />
      </div>
      <h3>
        <a href={resource.url} target="_blank" rel="noreferrer">
          {resource.title}
          <ArrowUpRight size={17} />
        </a>
      </h3>
      <p>{resource.description}</p>
      <div className="resource-meta">
        <Pill tone="green">Free to read</Pill>
        <span>
          {resource.type === "course" ? "Course" : "Official documentation"}
        </span>
      </div>
    </article>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
export function Empty({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <CheckCircle2 size={24} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {href && (
        <Link className="text-link" href={href}>
          {label || "Explore the roadmap"}
          <ChevronRight size={15} />
        </Link>
      )}
    </div>
  );
}
export function Time({ hours }: { hours: number }) {
  return (
    <span className="inline-meta">
      <Clock3 size={14} />
      {Number(hours.toFixed(1))}h suggested
    </span>
  );
}
