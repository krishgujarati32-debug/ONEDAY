"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cloud,
  LockKeyhole,
} from "lucide-react";
import { safeNextPath } from "@/lib/slug";
import { createClient } from "@/lib/supabase/client";
import { useLearning } from "./learning-provider";
const titles: Record<string, string> = {
  "sign-in": "Welcome back to your journey.",
  "sign-up": "A big ambition starts here.",
  "reset-password": "Let’s get you back in.",
  "update-password": "A fresh start, securely.",
};
export function AuthForm({
  mode,
  configured,
}: {
  mode: string;
  configured: boolean;
}) {
  const router = useRouter();
  const { reload } = useLearning();
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirm, setConfirm] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [message, setMessage] = useState("");
  useEffect(() => {
    const message = new URLSearchParams(location.search).get("error");
    if (message) queueMicrotask(() => setError(message.slice(0, 400)));
  }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!configured) return;
    if (
      (mode === "sign-up" || mode === "update-password") &&
      password !== confirm
    ) {
      setError("The passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const db = createClient();
      const callback = location.origin + "/auth/callback";
      if (mode === "sign-in") {
        const { error } = await db.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await reload();
        const next = new URLSearchParams(location.search).get("next");
        router.replace(safeNextPath(next));
        router.refresh();
      } else if (mode === "sign-up") {
        const { data, error } = await db.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: callback },
        });
        if (error) throw error;
        if (data.session) {
          await reload();
          router.replace("/dashboard");
          router.refresh();
        } else
          setMessage(
            "Check your email for a confirmation link. Once confirmed, return here to sign in.",
          );
      } else if (mode === "reset-password") {
        const { error } = await db.auth.resetPasswordForEmail(email, {
          redirectTo: callback + "?next=/auth/update-password",
        });
        if (error) throw error;
        setMessage(
          "If an account exists for this email, a password reset link has been sent. Check your inbox.",
        );
      } else {
        const { error } = await db.auth.updateUser({ password });
        if (error) throw error;
        setMessage("Your password has been updated.");
        await reload();
        router.replace("/dashboard");
        router.refresh();
      }
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "The request could not be completed. Try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="auth-layout">
      <div className="auth-story">
        <span className="eyebrow">YOUR NEXT CHAPTER</span>
        <h1>
          Learn deeply.
          <br />
          Build confidently.
          <br />
          <span>Keep becoming.</span>
        </h1>
        <p>
          Your personal roadmap from programming foundations to intelligent,
          scalable AI systems.
        </p>
        <ul className="check-list">
          <li>
            <CheckCircle2 size={16} />
            <span>A complete curriculum, at your pace.</span>
          </li>
          <li>
            <CheckCircle2 size={16} />
            <span>Private notes and honest progress.</span>
          </li>
          <li>
            <CheckCircle2 size={16} />
            <span>Real projects that connect the concepts.</span>
          </li>
        </ul>
        <Link href="/roadmap" className="text-link">
          Explore the open curriculum
          <ArrowRight size={15} />
        </Link>
      </div>
      <div className="auth-card">
        <span className="phase-icon">
          <LockKeyhole size={24} />
        </span>
        <h2>{titles[mode]}</h2>
        <p>
          {mode === "reset-password"
            ? "Enter the email associated with your account."
            : mode === "update-password"
              ? "Choose a strong, unique password for your account."
              : "Your learning belongs to you. Keep it connected across devices."}
        </p>
        {!configured ? (
          <div className="auth-preview">
            <Cloud size={23} />
            <h3>You’re in local preview mode.</h3>
            <p>
              Account services become available after you connect a Supabase
              project. You can explore every lesson and save preview progress on
              this device now.
            </p>
            <Link href="/dashboard" className="button button-primary">
              Explore your workspace
              <ArrowRight size={15} />
            </Link>
            <Link href="/settings#cloud" className="text-link">
              View cloud setup steps
              <ArrowRight size={13} />
            </Link>
          </div>
        ) : (
          <form className="form-stack" onSubmit={submit}>
            {mode !== "update-password" && (
              <label>
                Email address
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  required
                  maxLength={254}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </label>
            )}
            {mode !== "reset-password" && (
              <label>
                {mode === "update-password" ? "New password" : "Password"}
                <input
                  type="password"
                  autoComplete={
                    mode === "sign-in" ? "current-password" : "new-password"
                  }
                  required
                  minLength={mode === "sign-in" ? 1 : 12}
                  maxLength={128}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    mode === "sign-in"
                      ? "Your password"
                      : "At least 12 characters"
                  }
                />
              </label>
            )}
            {["sign-up", "update-password"].includes(mode) && (
              <label>
                Confirm password
                <input
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={12}
                  maxLength={128}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </label>
            )}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            {message && (
              <p className="form-success" role="status">
                {message}
              </p>
            )}
            <button
              className="button button-primary full-width"
              disabled={busy}
            >
              {busy
                ? "One moment…"
                : mode === "sign-in"
                  ? "Sign in"
                  : mode === "sign-up"
                    ? "Create your account"
                    : mode === "reset-password"
                      ? "Send reset link"
                      : "Update password"}
              <ArrowRight size={15} />
            </button>
          </form>
        )}
        {configured && (
          <div className="auth-links">
            {mode === "sign-in" ? (
              <>
                <Link href="/auth/reset-password">Forgot your password?</Link>
                <span>
                  New here? <Link href="/auth/sign-up">Create an account</Link>
                </span>
              </>
            ) : (
              <Link href="/auth/sign-in">
                <ArrowLeft size={12} />
                Back to sign in
              </Link>
            )}
          </div>
        )}
        <small className="auth-footnote">
          {configured
            ? "Your progress is private to your account."
            : "Preview progress stays in this browser and can be exported from Settings."}
        </small>
      </div>
    </div>
  );
}
