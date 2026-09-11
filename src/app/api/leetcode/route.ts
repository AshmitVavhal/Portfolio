const LEETCODE_API_BASE = "https://alfa-leetcode-api.onrender.com";
const USERNAME = "C9C5aZjk2l";

export async function GET() {
  try {
    const [profileRes, solvedRes, calendarRes, submissionRes] =
      await Promise.all([
        fetch(`${LEETCODE_API_BASE}/${USERNAME}`, { next: { revalidate: 3600 } }),
        fetch(`${LEETCODE_API_BASE}/${USERNAME}/solved`, { next: { revalidate: 3600 } }),
        fetch(`${LEETCODE_API_BASE}/${USERNAME}/calendar`, { next: { revalidate: 3600 } }),
        fetch(`${LEETCODE_API_BASE}/${USERNAME}/submission`, { next: { revalidate: 3600 } }),
      ]);

    if (!profileRes.ok || !solvedRes.ok) {
      return Response.json(
        { error: "Failed to fetch LeetCode data" },
        { status: 502 }
      );
    }

    const [profile, solved, calendar, submission] = await Promise.all([
      profileRes.json(),
      solvedRes.json(),
      calendarRes.ok ? calendarRes.json() : null,
      submissionRes.ok ? submissionRes.json() : null,
    ]);

    return Response.json({
      profile: {
        username: profile.username ?? USERNAME,
        name: profile.name ?? "ashz_why",
        avatar: profile.avatar ?? null,
        ranking: profile.ranking ?? null,
      },
      solved: {
        solvedProblem: solved.solvedProblem ?? 0,
        easySolved: solved.easySolved ?? 0,
        mediumSolved: solved.mediumSolved ?? 0,
        hardSolved: solved.hardSolved ?? 0,
        acSubmissionNum: solved.acSubmissionNum ?? [],
      },
      calendar: calendar
        ? {
            streak: calendar.streak ?? 0,
            totalActiveDays: calendar.totalActiveDays ?? 0,
            submissionCalendar: calendar.submissionCalendar ?? "{}",
          }
        : null,
      submissions: submission?.submission ?? [],
    });
  } catch {
    return Response.json(
      { error: "Failed to fetch LeetCode data" },
      { status: 500 }
    );
  }
}
