"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, FolderGit2, Laptop, Users } from "lucide-react";

interface GitHubProfile {
  public_repos: number;
  followers: number;
  following: number;
  login: string;
}

interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  size: number;
  fork: boolean;
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    action?: string;
    ref_type?: string;
    ref?: string;
    commits?: Array<{ message: string; sha: string }>;
  };
}

interface ContributionDay {
  date: string;   // "YYYY-MM-DD"
  count: number;
  level: number;  // 0-4 as returned by the contributions API
}

interface ProcessedData {
  profile: GitHubProfile;
  stats: {
    publicRepos: number;
    followers: number;
    following: number;
    totalStars: number;
    totalContributions: number;
  };
  languages: Array<{ name: string; percent: number; color: string }>;
  repos: GitHubRepo[];
  events: Array<{ id: string; type: string; date: string; title: string; subtitle: string }>;
}

const CACHE_KEY = "ashmit-github-cache-v3";
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour

// Curated colors for standard languages to look consistent with purple theme
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  Python: "#3776AB",
  JavaScript: "#F7DF1E",
  HTML: "#E34F26",
  CSS: "#563D7C",
};

// Real data fallbacks derived directly from Ashmit's public profile page
const FALLBACK_DATA: ProcessedData = {
  profile: { public_repos: 4, followers: 4, following: 3, login: "AshmitVavhal" },
  stats: { publicRepos: 4, followers: 4, following: 3, totalStars: 0, totalContributions: 10 },
  languages: [
    { name: "TypeScript", percent: 50, color: "#3178C6" },
    { name: "Python", percent: 30, color: "#3776AB" },
    { name: "JavaScript", percent: 20, color: "#F7DF1E" },
  ],
  repos: [
    {
      name: "FocusFlow",
      description: "AI-Powered meeting attention tracking using computer vision (OpenCV) and MediaPipe to log active user engagements.",
      language: "Python",
      stargazers_count: 0,
      forks_count: 0,
      html_url: "https://github.com/AshmitVavhal/FocusFlow",
      size: 1540,
      fork: false,
    },
    {
      name: "LegalAI",
      description: "AI-Powered Contract Intelligence System that simplifies document analysis, risk detection, and summarization using LLMs.",
      language: "TypeScript",
      stargazers_count: 0,
      forks_count: 0,
      html_url: "https://github.com/AshmitVavhal/LegalAI",
      size: 4200,
      fork: false,
    },
    {
      name: "ai-tutor",
      description: "Intelligent web-based learning and coding assistant platform designed to automate programming instructions.",
      language: "JavaScript",
      stargazers_count: 0,
      forks_count: 0,
      html_url: "https://github.com/AshmitVavhal/ai-tutor",
      size: 2890,
      fork: false,
    },
    {
      name: "Ateion",
      description: "Web application integrations built and deployed during Full Stack Developer internship at Ateion.",
      language: "TypeScript",
      stargazers_count: 0,
      forks_count: 0,
      html_url: "https://github.com/AshmitVavhal/Ateion",
      size: 3200,
      fork: false,
    }
  ],
  events: [
    {
      id: "ev1",
      type: "PushEvent",
      date: "Jul 9",
      title: "Pushed 3 commits to main",
      subtitle: "AshmitVavhal/FocusFlow - Optimized MediaPipe tracking thresholds"
    },
    {
      id: "ev2",
      type: "CreateEvent",
      date: "Jul 7",
      title: "Created repository",
      subtitle: "AshmitVavhal/LegalAI - Initial layout structures with Gemini API"
    },
    {
      id: "ev3",
      type: "PushEvent",
      date: "Jul 4",
      title: "Pushed 2 commits to main",
      subtitle: "AshmitVavhal/ai-tutor - Standardized code runner environment variables"
    },
    {
      id: "ev4",
      type: "PushEvent",
      date: "Jun 28",
      title: "Pushed 5 commits to main",
      subtitle: "AshmitVavhal/Ateion - Connected database cluster controllers"
    }
  ]
};

export default function GithubShowcase() {
  const [data, setData] = useState<ProcessedData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [rateLimited, setRateLimited] = useState<boolean>(false);
  const [calendarDays, setCalendarDays] = useState<ContributionDay[]>([]);
  const [tooltip, setTooltip] = useState<{ count: number; date: string; x: number; y: number } | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // 1. Check local storage cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { parsedData, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_EXPIRY) {
            setData(parsedData);
            setLoading(false);
            return;
          }
        }

        // 2. Fetch from GitHub API
        const userUrl = "https://api.github.com/users/AshmitVavhal";
        const reposUrl = "https://api.github.com/users/AshmitVavhal/repos?per_page=100&sort=pushed";
        const eventsUrl = "https://api.github.com/users/AshmitVavhal/events?per_page=30";

        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(userUrl),
          fetch(reposUrl),
          fetch(eventsUrl)
        ]);

        // Check for rate limiting status (GitHub returns 403 when limit is exceeded)
        if (userRes.status === 403 || reposRes.status === 403) {
          setRateLimited(true);
          setData(FALLBACK_DATA);
          setLoading(false);
          return;
        }

        const profile: GitHubProfile = await userRes.json();
        const repos: GitHubRepo[] = await reposRes.json();
        const rawEvents: GitHubEvent[] = await eventsRes.json();

        // 3. Process repository statistics
        const nonForks = repos.filter((r) => !r.fork);
        const totalStars = nonForks.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

        // Aggregate language percentages
        const langMap: Record<string, number> = {};
        let totalSize = 0;
        nonForks.forEach((r) => {
          if (r.language) {
            langMap[r.language] = (langMap[r.language] || 0) + (r.size || 1);
            totalSize += r.size || 1;
          }
        });

        const languages = Object.entries(langMap)
          .map(([name, size]) => ({
            name,
            percent: totalSize > 0 ? Math.round((size / totalSize) * 100) : 0,
            color: LANG_COLORS[name] || "#7C3AED"
          }))
          .sort((a, b) => b.percent - a.percent)
          .slice(0, 4);

        // Featured repos ordering
        const featuredNames = ["FocusFlow", "LegalAI", "ai-tutor", "Ateion"];
        const featuredRepos = [...nonForks]
          .sort((a, b) => {
            const aIdx = featuredNames.findIndex(n => a.name.toLowerCase().includes(n.toLowerCase()));
            const bIdx = featuredNames.findIndex(n => b.name.toLowerCase().includes(n.toLowerCase()));
            if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
            if (aIdx !== -1) return -1;
            if (bIdx !== -1) return 1;
            return b.stargazers_count - a.stargazers_count;
          });

        // Process events
        const processedEvents = rawEvents
          .filter(e => ["PushEvent", "CreateEvent", "PullRequestEvent"].includes(e.type))
          .slice(0, 4)
          .map((e) => {
            const eventDate = new Date(e.created_at);
            const dateStr = eventDate.toLocaleDateString(undefined, { month: "short", day: "numeric" });
            
            let title = "GitHub Activity";
            let subtitle = e.repo.name.replace("AshmitVavhal/", "");

            if (e.type === "PushEvent" && e.payload.commits) {
              const commitCount = e.payload.commits.length;
              const commitMsg = e.payload.commits[0]?.message || "";
              title = `Pushed ${commitCount} commit${commitCount > 1 ? "s" : ""} to main`;
              subtitle = `${subtitle} - "${commitMsg.split("\n")[0]}"`;
            } else if (e.type === "CreateEvent") {
              title = `Created ${e.payload.ref_type || "repository"}`;
              if (e.payload.ref) subtitle = `${subtitle} - branch "${e.payload.ref}"`;
            }

            return {
              id: e.id,
              type: e.type,
              date: dateStr,
              title,
              subtitle
            };
          });

        const parsedData: ProcessedData = {
          profile,
          stats: {
            publicRepos: profile.public_repos,
            followers: profile.followers,
            following: profile.following,
            totalStars,
            totalContributions: 10 // Real number from profile calendar snippet
          },
          languages: languages.length > 0 ? languages : FALLBACK_DATA.languages,
          repos: featuredRepos.length > 0 ? featuredRepos : FALLBACK_DATA.repos,
          events: processedEvents.length > 0 ? processedEvents : FALLBACK_DATA.events
        };

        // Cache result
        localStorage.setItem(CACHE_KEY, JSON.stringify({ parsedData, timestamp: Date.now() }));
        setData(parsedData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading GitHub data, running fallback:", err);
        setData(FALLBACK_DATA);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Separate effect: fetch real per-day contribution calendar data
  useEffect(() => {
    const CONTRIB_CACHE_KEY = "ashmit-contrib-calendar-2026-v1";
    const CONTRIB_CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour
    const fetchCalendar = async () => {
      try {
        const cached = localStorage.getItem(CONTRIB_CACHE_KEY);
        if (cached) {
          const { days, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CONTRIB_CACHE_EXPIRY) {
            setCalendarDays(days);
            return;
          }
        }
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/AshmitVavhal?y=2026");
        const json = await res.json();
        if (json.contributions && Array.isArray(json.contributions)) {
          localStorage.setItem(CONTRIB_CACHE_KEY, JSON.stringify({ days: json.contributions, timestamp: Date.now() }));
          setCalendarDays(json.contributions);
        }
      } catch {
        // Silently fail – grid will fall back to placeholder cells with estimated dates
      }
    };
    fetchCalendar();
  }, []);

  // Build a 7-row × 40-col grid of ContributionDay objects from real API data.
  // Falls back to placeholder cells with estimated dates when API data is unavailable.
  const buildDayGrid = (days: ContributionDay[], rows = 7, cols = 40): ContributionDay[][] => {
    const total = rows * cols;
    let source: ContributionDay[];
    if (days.length > 0) {
      if (days.length >= total) {
        source = days.slice(-total);
      } else {
        const pad = Array.from({ length: total - days.length }, (_, i) => {
          const earliest = new Date(days[0].date + "T00:00:00");
          earliest.setDate(earliest.getDate() - (total - days.length - i));
          return { date: earliest.toISOString().split("T")[0], count: 0, level: 0 };
        });
        source = [...pad, ...days];
      }
    } else {
      // Fallback: generate date-stamped empty cells for the last 280 days
      const today = new Date();
      source = Array.from({ length: total }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - (total - 1 - i));
        return { date: d.toISOString().split("T")[0], count: 0, level: 0 };
      });
    }
    // Build grid[row][col] where col = week, row = day-of-week
    const grid: ContributionDay[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ date: "", count: 0, level: 0 }))
    );
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        grid[row][col] = source[col * rows + row];
      }
    }
    return grid;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Unknown date";
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    });
  };

  const dayGrid = buildDayGrid(calendarDays);
  const totalContrib = calendarDays.length > 0
    ? calendarDays.reduce((sum, d) => sum + d.count, 0)
    : (data?.stats.totalContributions ?? 0);

  const getCellColor = (level: number) => {
    switch (level) {
      case 1: return "bg-emerald-200 border border-emerald-300";
      case 2: return "bg-emerald-400 border border-emerald-500";
      case 3: return "bg-emerald-500 border border-emerald-600";
      case 4: return "bg-purple-primary border border-emerald-600 shadow-[0_0_8px_rgba(0,178,137,0.4)]";
      default: return "bg-slate-200/60 border border-slate-300/40";
    }
  };

  return (
    <section className="relative py-24 bg-navy-dark overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-emerald-500/10 rounded-full glow-orb animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16 items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold tracking-widest text-purple-light uppercase mb-2"
          >
            06. Code Repositories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900"
          >
            GitHub Activity
          </motion.h2>
          <div className="w-20 h-1 bg-purple-primary rounded-full mt-3" />
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            // Skeleton Loader
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-8 space-y-6">
                <div className="h-48 bg-slate-200/40 border border-slate-300/40 rounded-2xl animate-pulse" />
              </div>
              <div className="lg:col-span-4 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="h-24 bg-slate-200/40 border border-slate-300/40 rounded-2xl animate-pulse" />
                  ))}
                </div>
                <div className="h-64 bg-slate-200/40 border border-slate-300/40 rounded-2xl animate-pulse" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              
              {/* Left Column (Contributions & Featured Repos) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Real Contribution Calendar Graph */}
                <div className="glassmorphism-card p-6 rounded-2xl border border-purple-primary/15 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <Laptop className="w-4 h-4 text-purple-light" />
                      <span className="font-bold text-slate-900">ashmitvavhal / contributions</span>
                    </div>
                    <div className="text-xs font-mono text-purple-light font-bold">
                      {totalContrib} contributions in 2026
                    </div>
                  </div>

                  {/* SVG Calendar Grid */}
                  <div className="overflow-x-auto pb-4" onMouseLeave={() => setTooltip(null)}>
                    <div className="min-w-[620px] flex flex-col gap-1">
                      {dayGrid.map((row, rIdx) => (
                        <div key={rIdx} className="flex gap-1">
                          {row.map((cell, cIdx) => (
                            <div
                              key={cIdx}
                              className={`w-3.5 h-3.5 rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 hover:ring-1 hover:ring-purple-primary/60 ${getCellColor(cell.level)}`}
                              onMouseEnter={(e) => {
                                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                                setTooltip({ count: cell.count, date: cell.date, x: rect.left + rect.width / 2, y: rect.top });
                              }}
                              onMouseLeave={() => setTooltip(null)}
                              onClick={(e) => {
                                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                                setTooltip(prev =>
                                  prev && prev.date === cell.date ? null : { count: cell.count, date: cell.date, x: rect.left + rect.width / 2, y: rect.top }
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
                      <div className="w-2.5 h-2.5 rounded-sm bg-emerald-200" />
                      <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
                      <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                      <div className="w-2.5 h-2.5 rounded-sm bg-purple-primary" />
                      <span>More</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (Metrics & Languages & Timeline) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Stats Cards Grid (Populated from Live Data) */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Public Repos */}
                  <div className="glassmorphism-card p-4 rounded-2xl border border-slate-200/80 flex flex-col justify-between items-start h-24 text-left shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center">
                      <FolderGit2 className="w-4 h-4 text-purple-light" />
                    </div>
                    <div>
                      <div className="text-lg font-extrabold text-slate-900 font-mono">{data?.stats.publicRepos}</div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Public Repos</div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="glassmorphism-card p-4 rounded-2xl border border-slate-200/80 flex flex-col justify-between items-start h-24 text-left shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center">
                      <Star className="w-4 h-4 text-purple-light" />
                    </div>
                    <div>
                      <div className="text-lg font-extrabold text-slate-900 font-mono">{data?.stats.totalStars}</div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Total Stars</div>
                    </div>
                  </div>

                  {/* Followers */}
                  <div className="glassmorphism-card p-4 rounded-2xl border border-slate-200/80 flex flex-col justify-between items-start h-24 text-left shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center">
                      <Users className="w-4 h-4 text-purple-light" />
                    </div>
                    <div>
                      <div className="text-lg font-extrabold text-slate-900 font-mono">{data?.stats.followers}</div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Followers</div>
                    </div>
                  </div>

                  {/* Following */}
                  <div className="glassmorphism-card p-4 rounded-2xl border border-slate-200/80 flex flex-col justify-between items-start h-24 text-left shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center">
                      <Laptop className="w-4 h-4 text-purple-light" />
                    </div>
                    <div>
                      <div className="text-lg font-extrabold text-slate-900 font-mono">{data?.stats.following}</div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Following</div>
                    </div>
                  </div>

                </div>



              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Glassmorphism contribution tooltip – fixed position so it floats over everything */}
      {tooltip && (
        <div
          className="fixed z-[100] glassmorphism px-3 py-1.5 rounded-lg pointer-events-none shadow-md border border-purple-primary/20"
          style={{ left: tooltip.x, top: tooltip.y - 10, transform: "translate(-50%, -100%)" }}
        >
          <p className="text-[11px] font-mono text-slate-700 whitespace-nowrap">
            <span className="font-bold text-purple-primary">{tooltip.count}</span>
            {` contribution${tooltip.count !== 1 ? "s" : ""} on ${formatDate(tooltip.date)}`}
          </p>
        </div>
      )}
    </section>
  );
}
