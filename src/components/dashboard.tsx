"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Flag,
  Layers3,
  Plus,
  RotateCcw,
  Target,
} from "lucide-react";
import { useLearning } from "./learning-provider";
import {
  continueTopic,
  formatPercent,
  phaseIndex,
  progress,
  recommend,
  subtopicIndex,
  topicIndex,
  topicStatus,
  weeklyActivity,
} from "@/lib/progress";
import { dateKey } from "@/lib/state";
import { Empty, Modal, ProgressBar } from "./ui";
export function StudyLog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { state, mutate, pending } = useLearning();
  const [topicId, setTopicId] = useState(state.lastTopic ?? topicIndex[0].id),
    [minutes, setMinutes] = useState(30),
    [date, setDate] = useState(dateKey()),
    [notes, setNotes] = useState("");
  return (
    <Modal title="Make your study time count" open={open} onClose={onClose}>
      <p>
        Log time you actually spent learning or practicing. These sessions power
        your dashboard.
      </p>
      <form
        className="form-stack"
        onSubmit={async (e) => {
          e.preventDefault();
          const ok = await mutate(
            (s) => ({
              ...s,
              sessions: [
                ...s.sessions,
                { id: crypto.randomUUID(), topicId, minutes, date, notes },
              ],
            }),
            "Study session logged. Keep showing up.",
          );
          if (ok) onClose();
        }}
      >
        <label>
          What did you study?
          <select value={topicId} onChange={(e) => setTopicId(e.target.value)}>
            {topicIndex.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </label>
        <div className="two-columns">
          <label>
            Time spent (minutes)
            <input
              type="number"
              min={1}
              max={1440}
              required
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
          </label>
          <label>
            Study date
            <input
              type="date"
              required
              max={dateKey()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        <label>
          What did you work on?
          <textarea
            maxLength={2000}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="A concept you understood, an exercise you solved, or a question to revisit…"
            rows={3}
          />
        </label>
        <div className="modal-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="button button-primary" disabled={pending}>
            {pending ? "Saving…" : "Log study session"}
            <Check size={15} />
          </button>
        </div>
      </form>
    </Modal>
  );
}
export function Dashboard() {
  const { state, ready } = useLearning();
  const [log, setLog] = useState(false),
    [metric, setMetric] = useState<"minutes" | "completed">("minutes");
  const overall = progress(subtopicIndex, state),
    core = progress(
      subtopicIndex.filter((s) => s.priority === "core"),
      state,
    ),
    optional = progress(
      subtopicIndex.filter((s) => s.priority !== "core"),
      state,
    );
  const next = continueTopic(state),
    recommended = recommend(state),
    current = phaseIndex.find((p) => p.number === (next?.phase ?? 0));
  const recent = topicIndex
    .filter((t) => topicStatus(t.subtopics, state) === "completed")
    .sort(
      (a, b) =>
        Math.max(
          ...b.subtopics.map((s) =>
            new Date(state.progress[s.id]?.completedAt ?? 0).getTime(),
          ),
        ) -
        Math.max(
          ...a.subtopics.map((s) =>
            new Date(state.progress[s.id]?.completedAt ?? 0).getTime(),
          ),
        ),
    )
    .slice(0, 4);
  const revisions = topicIndex.filter((t) =>
    t.subtopics.some((s) => state.progress[s.id]?.status === "needs_revision"),
  );
  const inProgress = topicIndex.filter(
    (t) => topicStatus(t.subtopics, state) === "in_progress",
  ).length;
  const completedTopics = topicIndex.filter(
    (t) => topicStatus(t.subtopics, state) === "completed",
  ).length;
  const totalMinutes = state.sessions.reduce((n, s) => n + s.minutes, 0);
  const week = weeklyActivity(state),
    weekMinutes = week.reduce((n, d) => n + d.minutes, 0),
    weekGoal = state.settings.dailyGoal * 7;
  const weeklyPercent = Math.min(100, (weekMinutes / weekGoal) * 100);
  const max = Math.max(
    metric === "minutes" ? 60 : 1,
    ...week.map((d) => d[metric]),
  );
  const last = topicIndex.find((t) => t.id === state.lastTopic);
  const remainingCoreMinutes = subtopicIndex
    .filter(
      (s) =>
        s.priority === "core" && state.progress[s.id]?.status !== "completed",
    )
    .reduce((n, s) => n + s.minutes, 0);
  if (!ready)
    return (
      <div className="loading-screen" role="status">
        <div className="skeleton skeleton-title" />
        <div className="stats-grid">
          {[1, 2, 3, 4].map((i) => (
            <div className="skeleton skeleton-card" key={i} />
          ))}
        </div>
        <div className="skeleton skeleton-large" />
        <span className="sr-only">Loading your learning progress</span>
      </div>
    );
  return (
    <>
      <div className="dashboard-heading">
        <div>
          <span className="eyebrow">YOUR PERSONAL LEARNING SPACE</span>
          <h1>
            {state.settings.name
              ? `Keep going, ${state.settings.name.split(" ")[0]}.`
              : "Big ambitions. Small, steady steps."}
          </h1>
          <p>
            {overall.completed
              ? "Every concept you practice is another piece of the system."
              : "Your journey starts with a little curiosity and your first lesson."}
          </p>
        </div>
        <button
          className="button button-secondary"
          onClick={() => setLog(true)}
        >
          <Plus size={15} />
          Log study time
        </button>
      </div>
      <div className="stats-grid">
        {[
          {
            label: "Overall completion",
            value: formatPercent(overall.percent),
            detail: `${overall.completed} of ${overall.total.toLocaleString()} lessons`,
            icon: Layers3,
            tone: "purple",
          },
          {
            label: "Topics completed",
            value: String(completedTopics).padStart(2, "0"),
            detail: `${inProgress} topics in progress`,
            icon: CheckCircle2,
            tone: "green",
          },
          {
            label: "Study time",
            value: (totalMinutes / 60).toFixed(1) + "h",
            detail: `${weekMinutes} minutes this week`,
            icon: Clock3,
            tone: "blue",
          },
          {
            label: "Lessons remaining",
            value: overall.remaining.toLocaleString(),
            detail: `${overall.revision} lessons need revision`,
            icon: BookOpen,
            tone: "amber",
          },
        ].map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="between">
              <span>{s.label}</span>
              <span className={"stat-icon stat-" + s.tone}>
                <s.icon size={16} />
              </span>
            </div>
            <strong>{s.value}</strong>
            <small>{s.detail}</small>
          </div>
        ))}
      </div>
      <div className="dashboard-layout">
        <div className="dashboard-main">
          <section className="continue-card">
            <div className="continue-content">
              <span className="continue-eyebrow">
                <span />
                YOUR NEXT CHAPTER
              </span>
              <span className="continue-phase">
                PHASE {String(current?.number ?? 0).padStart(2, "0")} ·{" "}
                {current?.shortTitle}
              </span>
              <h2>{next?.title ?? "You’ve completed the entire roadmap."}</h2>
              <p>
                {next
                  ? "Pick up one concept. Put it into practice. Come back a little more capable."
                  : "Keep your understanding fresh through revision and the capstone projects."}
              </p>
              <Link
                className="button"
                href={next ? "/learn/" + next.slug : "/projects"}
              >
                {overall.completed ? "Continue learning" : "Start learning"}
                <ArrowRight size={16} />
              </Link>
              <span className="continue-meta">
                {next
                  ? next.subtopics.length +
                    " lessons · " +
                    next.hours.toFixed(1) +
                    "h suggested"
                  : "Explore your next project"}
              </span>
            </div>
            <div className="continue-art" aria-hidden="true">
              <div className="art-grid" />
              <div className="art-square square-one" />
              <div className="art-square square-two" />
              <div className="art-square square-three" />
              <div className="art-spark">✳</div>
            </div>
          </section>
          <section className="dashboard-card activity-card">
            <div className="card-heading">
              <div>
                <h2>A little progress, every week.</h2>
                <p>
                  {metric === "minutes"
                    ? "Your actual logged study minutes"
                    : "Lessons completed during this week"}
                </p>
              </div>
              <div className="view-tabs">
                <button
                  className={metric === "minutes" ? "active" : ""}
                  onClick={() => setMetric("minutes")}
                >
                  Study time
                </button>
                <button
                  className={metric === "completed" ? "active" : ""}
                  onClick={() => setMetric("completed")}
                >
                  Lessons
                </button>
              </div>
            </div>
            <div
              className="activity-chart"
              role="img"
              aria-label={week
                .map(
                  (d) =>
                    `${d.label}: ${d[metric]} ${metric === "minutes" ? "minutes" : "lessons"}`,
                )
                .join(", ")}
            >
              <div className="chart-gridlines">
                <span>{max}</span>
                <span>{Math.round(max / 2)}</span>
                <span>0</span>
              </div>
              <div className="chart-bars">
                {week.map((d) => (
                  <div className="chart-column" key={d.date}>
                    <div className="chart-bar-space">
                      <div
                        className={
                          d[metric] ? "chart-bar" : "chart-bar chart-bar-empty"
                        }
                        style={{
                          height: d[metric]
                            ? `${(d[metric] / max) * 100}%`
                            : "3px",
                        }}
                      >
                        <span>
                          {d[metric]}
                          {metric === "minutes" ? "m" : ""}
                        </span>
                      </div>
                    </div>
                    <span>{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {week.every((d) => !d[metric]) && (
              <div className="chart-empty-note">
                {metric === "minutes"
                  ? "No study sessions logged this week. Your first one starts the story."
                  : "Your completed lessons will appear here. No activity is assumed."}
              </div>
            )}
          </section>
          <section className="dashboard-card">
            <div className="card-heading">
              <div>
                <h2>The bigger picture</h2>
                <p>Your progress through each connected phase</p>
              </div>
              <Link className="text-link" href="/roadmap">
                Full roadmap
                <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="phase-progress-list">
              {phaseIndex.map((p) => {
                const data = progress(
                  p.topics.flatMap((t) => t.subtopics),
                  state,
                );
                return (
                  <Link href={"/roadmap/" + p.slug} key={p.id}>
                    <span
                      className="phase-progress-number"
                      style={{ color: p.color, background: p.color + "14" }}
                    >
                      {String(p.number).padStart(2, "0")}
                    </span>
                    <div>
                      <strong>{p.shortTitle}</strong>
                      <span>
                        {data.completed}/{data.total} lessons
                        {p.priority === "advanced"
                          ? " · Advanced optional"
                          : ""}
                      </span>
                    </div>
                    <div className="phase-progress-bar">
                      <ProgressBar value={data.percent} label={p.shortTitle} />
                    </div>
                    <b>{formatPercent(data.percent)}</b>
                    <ChevronRight size={14} />
                  </Link>
                );
              })}
            </div>
          </section>
          <section className="dashboard-card">
            <div className="card-heading">
              <div>
                <h2>Recent study sessions</h2>
                <p>Practice is part of the progress.</p>
              </div>
              <button className="text-link" onClick={() => setLog(true)}>
                Log a session
                <Plus size={14} />
              </button>
            </div>
            {state.sessions.length ? (
              <div className="session-list">
                {[...state.sessions]
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .slice(0, 5)
                  .map((s) => (
                    <div key={s.id}>
                      <span className="session-icon">
                        <Clock3 size={16} />
                      </span>
                      <div>
                        <Link
                          href={
                            "/learn/" +
                            topicIndex.find((t) => t.id === s.topicId)!.slug
                          }
                        >
                          {topicIndex.find((t) => t.id === s.topicId)!.title}
                        </Link>
                        <p>{s.notes || "Focused study session"}</p>
                      </div>
                      <span>
                        <b>{s.minutes}m</b>
                        <small>
                          {new Date(s.date + "T12:00:00").toLocaleDateString(
                            undefined,
                            { month: "short", day: "numeric" },
                          )}
                        </small>
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <Empty
                title="A blank page, full of possibility."
                description="Log a session after you study. Your time and learning activity will appear here."
              />
            )}
          </section>
        </div>
        <aside className="dashboard-right">
          <section className="dashboard-card goal-card">
            <div className="card-heading">
              <h2>Your weekly intention</h2>
              <Target size={17} />
            </div>
            <div className="goal-ring">
              <svg
                viewBox="0 0 140 140"
                role="img"
                aria-label={`${weekMinutes} of ${weekGoal} weekly goal minutes`}
              >
                <circle
                  cx="70"
                  cy="70"
                  r="57"
                  fill="none"
                  stroke="var(--surface3)"
                  strokeWidth="8"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="57"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="8"
                  strokeDasharray={`${(weeklyPercent / 100) * 358.14} 358.14`}
                  strokeLinecap="round"
                  transform="rotate(-90 70 70)"
                />
              </svg>
              <div>
                <strong>
                  {(weekMinutes / 60).toFixed(1)}
                  <small> / {(weekGoal / 60).toFixed(1)}h</small>
                </strong>
                <span>this week</span>
              </div>
            </div>
            <div className="goal-days">
              {week.map((d) => (
                <span
                  title={`${d.date}: ${d.minutes} minutes`}
                  className={
                    d.minutes >= state.settings.dailyGoal
                      ? "day-met"
                      : d.minutes
                        ? "day-active"
                        : ""
                  }
                  key={d.date}
                >
                  {d.minutes >= state.settings.dailyGoal ? (
                    <Check size={11} />
                  ) : (
                    d.label[0]
                  )}
                </span>
              ))}
            </div>
            <p>
              {state.settings.dailyGoal} minutes a day.
              <br />A sustainable pace, a lasting skill.
            </p>
            <Link href="/settings#study-goal" className="text-link">
              Adjust your study goal
              <ArrowUpRight size={13} />
            </Link>
          </section>
          <section className="dashboard-card track-card">
            <div className="card-heading">
              <h2>Your learning tracks</h2>
              <Layers3 size={16} />
            </div>
            {[
              ["Core foundations", core, "Core only"],
              ["Optional & advanced", optional, "Excludes core"],
            ].map(([label, data, desc]) => {
              const d = data as typeof core;
              return (
                <div className="track-progress" key={String(label)}>
                  <div className="between">
                    <span>{String(label)}</span>
                    <b>{formatPercent(d.percent)}</b>
                  </div>
                  <ProgressBar value={d.percent} label={String(label)} />
                  <small>
                    {d.completed} of {d.total} lessons · {String(desc)}
                  </small>
                </div>
              );
            })}
            <small>
              Overall progress includes both tracks. Optional lessons never
              reduce the core percentage.
            </small>
            <div className="timeline-estimate">
              <Clock3 size={16} />
              <p>
                About{" "}
                <strong>
                  {Math.ceil(remainingCoreMinutes / state.settings.dailyGoal)}{" "}
                  study days
                </strong>{" "}
                for remaining core lesson estimates at your goal.
                <small>
                  Planning aid only; project practice and revision add time.
                </small>
              </p>
            </div>
          </section>
          <section className="dashboard-card">
            <div className="card-heading">
              <h2>A second look</h2>
              <RotateCcw size={16} />
            </div>
            {revisions.length ? (
              <div className="mini-topic-list">
                {revisions.slice(0, 5).map((t) => (
                  <Link href={"/learn/" + t.slug} key={t.id}>
                    <span>
                      {t.title}
                      <small>
                        {
                          t.subtopics.filter(
                            (s) =>
                              state.progress[s.id]?.status === "needs_revision",
                          ).length
                        }{" "}
                        lessons to revisit
                      </small>
                    </span>
                    <ChevronRight size={14} />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mini-empty">
                Nothing marked for revision. When a concept needs another pass,
                save it here.
              </p>
            )}
          </section>
          <section className="dashboard-card">
            <div className="card-heading">
              <h2>Recent wins</h2>
              <Flag size={16} />
            </div>
            {recent.length ? (
              <div className="mini-topic-list">
                {recent.map((t) => (
                  <Link href={"/learn/" + t.slug} key={t.id}>
                    <span>
                      {t.title}
                      <small>All {t.subtopics.length} lessons complete</small>
                    </span>
                    <CheckCircle2 size={16} />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mini-empty">
                Completed topics will appear here. Your first win is ahead of
                you.
              </p>
            )}
          </section>
          {last && (
            <section className="dashboard-card">
              <span className="eyebrow">LAST VISITED</span>
              <Link className="last-visited" href={"/learn/" + last.slug}>
                {last.title}
                <ArrowRight size={15} />
              </Link>
              {recommended && recommended.id !== last.id && (
                <small>
                  Next core recommendation:{" "}
                  <Link href={"/learn/" + recommended.slug}>
                    {recommended.title}
                  </Link>
                </small>
              )}
            </section>
          )}
          <div className="learning-note">
            <span>✳</span>
            <p>
              “Understand before memorizing.
              <br />
              Build before moving on.”
            </p>
            <small>YOUR LEARNING PHILOSOPHY</small>
          </div>
        </aside>
      </div>
      <StudyLog key={String(log)} open={log} onClose={() => setLog(false)} />
    </>
  );
}
