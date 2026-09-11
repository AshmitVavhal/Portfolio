"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, CheckCircle, Flame, ExternalLink, Code2, Clock } from "lucide-react";

interface LeetCodeData {
  profile: {
    username: string;
    name: string;
    avatar: string | null;
    ranking: number | null;
  };
  solved: {
    solvedProblem: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    acSubmissionNum: Array<{ difficulty: string; count: number; submissions: number }>;
  };
  calendar: {
    streak: number;
    totalActiveDays: number;
    submissionCalendar: string;
  } | null;
  submissions: Array<{
    title: string;
    titleSlug: string;
    timestamp: string;
    statusDisplay: string;
    lang: string;
  }>;
}

interface CalendarDay {
  date: string;
  count: number;
}

const CACHE_KEY = "ashmit-leetcode-cache-v1";
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour

// Total problems on LeetCode platform
const TOTAL_EASY = 963;
const TOTAL_MEDIUM = 2111;
const TOTAL_HARD = 973;

const LANG_DISPLAY: Record<string, string> = {
  cpp: "C++",
  python3: "Python",
  python: "Python",
  java: "Java",
  javascript: "JavaScript",
  typescript: "TypeScript",
  c: "C",
  csharp: "C#",
  go: "Go",
  rust: "Rust",
  kotlin: "Kotlin",
  swift: "Swift",
};

export default function LeetcodeShowcase() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<{
    count: number;
    date: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check localStorage cache
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data: cachedData, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_EXPIRY) {
            setData(cachedData);
            setLoading(false);
            return;
          }
        }

        const res = await fetch("/api/leetcode");
        if (!res.ok) throw new Error("API error");

        const json: LeetCodeData = await res.json();
        if (json.profile) {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data: json, timestamp: Date.now() })
          );
          setData(json);
        } else {
          setError(true);
        }
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Parse submissionCalendar JSON string into CalendarDay array
  const buildCalendarGrid = (
    calendarStr: string,
    rows = 7,
    cols = 40
  ): CalendarDay[][] => {
    const total = rows * cols;
    const calendarMap: Record<string, number> = {};

    try {
      const parsed = JSON.parse(calendarStr);
      for (const [ts, count] of Object.entries(parsed)) {
        const d = new Date(Number(ts) * 1000);
        const key = d.toISOString().split("T")[0];
        calendarMap[key] = count as number;
      }
    } catch {
      // ignore parse errors
    }

    // Generate date-stamped cells for the last (rows*cols) days
    const today = new Date();
    const source: CalendarDay[] = Array.from({ length: total }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (total - 1 - i));
      const key = d.toISOString().split("T")[0];
      return { date: key, count: calendarMap[key] || 0 };
    });

    // Build grid[row][col] where col = week, row = day-of-week
    const grid: CalendarDay[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ date: "", count: 0 }))
    );
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const idx = col * rows + row;
        if (idx < source.length) {
          grid[row][col] = source[idx];
        }
      }
    }
    return grid;
  };

  const getCellColor = (count: number) => {
    if (count === 0) return "bg-slate-200/60 border border-slate-300/40";
    if (count <= 2) return "bg-amber-200 border border-amber-300";
    if (count <= 5) return "bg-amber-400 border border-amber-500";
    if (count <= 10) return "bg-orange-400 border border-orange-500";
    return "bg-purple-primary border border-emerald-600 shadow-[0_0_8px_rgba(0,178,137,0.4)]";
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Unknown date";
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTimestamp = (ts: string) => {
    const d = new Date(Number(ts) * 1000);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const calendarGrid =
    data?.calendar?.submissionCalendar
      ? buildCalendarGrid(data.calendar.submissionCalendar)
      : null;

  const totalCalendarSubmissions =
    calendarGrid
      ? calendarGrid.flat().reduce((sum, cell) => sum + cell.count, 0)
      : 0;

  return (
    <section className="relative py-24 bg-navy-dark overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-amber-500/8 rounded-full glow-orb animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col mb-16 items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold tracking-widest text-purple-light uppercase mb-2"
          >
            07. Competitive Coding
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900"
          >
            LeetCode Activity
          </motion.h2>
          <div className="w-20 h-1 bg-purple-primary rounded-full mt-3" />
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            // Skeleton Loader — matches GitHub section skeleton
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-8 space-y-6">
                <div className="h-48 bg-slate-200/40 border border-slate-300/40 rounded-2xl animate-pulse" />
                <div className="h-40 bg-slate-200/40 border border-slate-300/40 rounded-2xl animate-pulse" />
              </div>
              <div className="lg:col-span-4 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="h-24 bg-slate-200/40 border border-slate-300/40 rounded-2xl animate-pulse"
                    />
                  ))}
                </div>
                <div className="h-48 bg-slate-200/40 border border-slate-300/40 rounded-2xl animate-pulse" />
              </div>
            </motion.div>
          ) : error ? (
            // Error Fallback
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glassmorphism-card p-8 rounded-2xl border border-slate-200/80 text-center"
            >
              <p className="text-sm text-slate-600 font-mono mb-4">
                LeetCode stats unavailable
              </p>
              <a
                href="https://leetcode.com/u/C9C5aZjk2l/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-primary text-white rounded-lg text-sm font-bold hover:bg-purple-light transition-colors duration-300"
              >
                View Profile
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column */}
              <div className="lg:col-span-8 space-y-6">
                {/* Submission Activity Calendar */}
                {calendarGrid && (
                  <div className="glassmorphism-card p-6 rounded-2xl border border-purple-primary/15 text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <Code2 className="w-4 h-4 text-purple-light" />
                        <span className="font-bold text-slate-900">
                          ashz_why / submissions
                        </span>
                      </div>
                      <div className="text-xs font-mono text-purple-light font-bold">
                        {totalCalendarSubmissions} submissions this year
                      </div>
                    </div>

                    {/* Calendar Grid */}
                    <div
                      className="overflow-x-auto pb-4"
                      onMouseLeave={() => setTooltip(null)}
                    >
                      <div className="min-w-[620px] flex flex-col gap-1">
                        {calendarGrid.map((row, rIdx) => (
                          <div key={rIdx} className="flex gap-1">
                            {row.map((cell, cIdx) => (
                              <div
                                key={cIdx}
                                className={`w-3.5 h-3.5 rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 hover:ring-1 hover:ring-purple-primary/60 ${getCellColor(cell.count)}`}
                                onMouseEnter={(e) => {
                                  const rect = (
                                    e.currentTarget as HTMLElement
                                  ).getBoundingClientRect();
                                  setTooltip({
                                    count: cell.count,
                                    date: cell.date,
                                    x: rect.left + rect.width / 2,
                                    y: rect.top,
                                  });
                                }}
                                onMouseLeave={() => setTooltip(null)}
                                onClick={(e) => {
                                  const rect = (
                                    e.currentTarget as HTMLElement
                                  ).getBoundingClientRect();
                                  setTooltip((prev) =>
                                    prev && prev.date === cell.date
                                      ? null
                                      : {
                                          count: cell.count,
                                          date: cell.date,
                                          x: rect.left + rect.width / 2,
                                          y: rect.top,
                                        }
                                  );
                                }}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pt-2 border-t border-slate-200/60">
                      <span>Hover for details</span>
                      <div className="flex items-center gap-1.5">
                        <span>Less</span>
                        <div className="w-2.5 h-2.5 rounded-sm bg-slate-200/60 border border-slate-300/40" />
                        <div className="w-2.5 h-2.5 rounded-sm bg-amber-200" />
                        <div className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
                        <div className="w-2.5 h-2.5 rounded-sm bg-orange-400" />
                        <div className="w-2.5 h-2.5 rounded-sm bg-purple-primary" />
                        <span>More</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Problems Solved Breakdown */}
                <div className="glassmorphism-card p-6 rounded-2xl border border-purple-primary/15 text-left">
                  <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-purple-light" />
                    Problems Solved
                  </h3>

                  {/* Difficulty Breakdown */}
                  <div className="space-y-4">
                    {/* Easy */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                        <span className="text-green-600 font-bold">Easy</span>
                        <span className="text-slate-700">
                          <span className="font-bold text-slate-900">
                            {data?.solved.easySolved}
                          </span>
                          <span className="text-slate-500">
                            {" "}
                            / {TOTAL_EASY}
                          </span>
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all duration-700"
                          style={{
                            width: `${Math.max(((data?.solved.easySolved ?? 0) / TOTAL_EASY) * 100, 0.5)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Medium */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                        <span className="text-amber-600 font-bold">Medium</span>
                        <span className="text-slate-700">
                          <span className="font-bold text-slate-900">
                            {data?.solved.mediumSolved}
                          </span>
                          <span className="text-slate-500">
                            {" "}
                            / {TOTAL_MEDIUM}
                          </span>
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all duration-700"
                          style={{
                            width: `${Math.max(((data?.solved.mediumSolved ?? 0) / TOTAL_MEDIUM) * 100, 0.5)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Hard */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                        <span className="text-red-600 font-bold">Hard</span>
                        <span className="text-slate-700">
                          <span className="font-bold text-slate-900">
                            {data?.solved.hardSolved}
                          </span>
                          <span className="text-slate-500">
                            {" "}
                            / {TOTAL_HARD}
                          </span>
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full transition-all duration-700"
                          style={{
                            width: `${Math.max(((data?.solved.hardSolved ?? 0) / TOTAL_HARD) * 100, 0.5)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Submissions */}
                {data?.submissions && data.submissions.length > 0 && (
                  <div className="glassmorphism-card p-5 rounded-2xl border border-slate-200/80 text-left shadow-sm">
                    <div className="flex items-center gap-2 font-mono text-xs mb-4 border-b border-slate-200/60 pb-2">
                      <Clock className="w-4 h-4 text-purple-light" />
                      <span className="font-bold text-slate-900">
                        Recent Submissions
                      </span>
                    </div>
                    <div className="space-y-3">
                      {data.submissions.slice(0, 5).map((sub, idx) => (
                        <a
                          key={idx}
                          href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group"
                        >
                          <div className="flex justify-between items-baseline text-slate-900 mb-0.5">
                            <span className="font-bold text-purple-light text-[11px] font-mono truncate max-w-[250px] group-hover:text-purple-primary transition-colors">
                              {sub.title}
                            </span>
                            <span className="text-[8px] text-slate-500 font-semibold font-mono flex-shrink-0 ml-2">
                              {formatTimestamp(sub.timestamp)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                            <span
                              className={`font-semibold ${sub.statusDisplay === "Accepted" ? "text-green-600" : "text-red-500"}`}
                            >
                              {sub.statusDisplay}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span>{LANG_DISPLAY[sub.lang] || sub.lang}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="lg:col-span-4 space-y-6">
                {/* Stats Cards Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Total Solved */}
                  <div className="glassmorphism-card p-4 rounded-2xl border border-slate-200/80 flex flex-col justify-between items-start h-24 text-left shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-purple-light" />
                    </div>
                    <div>
                      <div className="text-lg font-extrabold text-slate-900 font-mono">
                        {data?.solved.solvedProblem}
                      </div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
                        Total Solved
                      </div>
                    </div>
                  </div>

                  {/* Streak */}
                  <div className="glassmorphism-card p-4 rounded-2xl border border-slate-200/80 flex flex-col justify-between items-start h-24 text-left shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center">
                      <Flame className="w-4 h-4 text-purple-light" />
                    </div>
                    <div>
                      <div className="text-lg font-extrabold text-slate-900 font-mono">
                        {data?.calendar?.streak ?? 0}
                      </div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
                        Day Streak
                      </div>
                    </div>
                  </div>

                  {/* Active Days */}
                  <div className="glassmorphism-card p-4 rounded-2xl border border-slate-200/80 flex flex-col justify-between items-start h-24 text-left shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center">
                      <Code2 className="w-4 h-4 text-purple-light" />
                    </div>
                    <div>
                      <div className="text-lg font-extrabold text-slate-900 font-mono">
                        {data?.calendar?.totalActiveDays ?? 0}
                      </div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
                        Active Days
                      </div>
                    </div>
                  </div>

                  {/* Ranking */}
                  <div className="glassmorphism-card p-4 rounded-2xl border border-slate-200/80 flex flex-col justify-between items-start h-24 text-left shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-purple-light" />
                    </div>
                    <div>
                      <div className="text-lg font-extrabold text-slate-900 font-mono">
                        {data?.profile.ranking
                          ? data.profile.ranking.toLocaleString()
                          : "—"}
                      </div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
                        Global Rank
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Card */}
                <div className="glassmorphism-card p-6 rounded-2xl border border-purple-primary/15 text-left">
                  <div className="flex items-center gap-3 mb-5">
                    {data?.profile.avatar && (
                      <img
                        src={data.profile.avatar}
                        alt={data.profile.name}
                        className="w-10 h-10 rounded-xl border border-purple-primary/20"
                      />
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-mono">
                        {data?.profile.name}
                      </h3>
                      <p className="text-[10px] font-mono text-slate-500">
                        LeetCode • {data?.profile.username}
                      </p>
                    </div>
                  </div>

                  {/* Primary Language */}
                  {data?.submissions && data.submissions.length > 0 && (
                    <div className="mb-5 pb-4 border-b border-slate-200/60">
                      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-semibold mb-1.5">
                        Primary Language
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-900">
                        {LANG_DISPLAY[data.submissions[0].lang] ||
                          data.submissions[0].lang}
                      </div>
                    </div>
                  )}

                  <a
                    href="https://leetcode.com/u/C9C5aZjk2l/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-purple-primary text-white rounded-xl text-xs font-bold font-mono hover:bg-purple-light transition-colors duration-300"
                  >
                    View LeetCode Profile
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Glassmorphism submission tooltip */}
      {tooltip && (
        <div
          className="fixed z-[100] glassmorphism px-3 py-1.5 rounded-lg pointer-events-none shadow-md border border-purple-primary/20"
          style={{
            left: tooltip.x,
            top: tooltip.y - 10,
            transform: "translate(-50%, -100%)",
          }}
        >
          <p className="text-[11px] font-mono text-slate-700 whitespace-nowrap">
            <span className="font-bold text-purple-primary">
              {tooltip.count}
            </span>
            {` submission${tooltip.count !== 1 ? "s" : ""} on ${formatDate(tooltip.date)}`}
          </p>
        </div>
      )}
    </section>
  );
}
