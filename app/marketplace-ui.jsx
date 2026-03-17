"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  LayoutDashboard,
  MapPin,
  Menu,
  PoundSterling,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Users,
  X,
} from "lucide-react";

export const developers = [
  { id: 1, name: "Amara Singh", role: "Senior Full Stack Developer", location: "London, UK", timezone: "GMT", availability: "Available next week", seniority: "Senior", rate: 650, bookingType: "Day rate", rating: 4.9, years: 9, skills: ["React", "Node.js", "TypeScript", "PostgreSQL"], domains: ["SaaS", "Internal Tools", "Operations"], summary: "Strong product engineer for SaaS platforms, internal tools, and fast-moving startups." },
  { id: 2, name: "Mateo Alvarez", role: "Frontend Developer", location: "Madrid, ES", timezone: "CET", availability: "Available in 3 days", seniority: "Midweight", rate: 420, bookingType: "Day rate", rating: 4.7, years: 6, skills: ["Vue", "Nuxt", "Tailwind", "JavaScript"], domains: ["Marketing Sites", "Design Systems", "Startups"], summary: "Frontend specialist focused on polished interfaces, component systems, and fast delivery." },
  { id: 3, name: "Priya Raman", role: "Backend Engineer", location: "Bangalore, IN", timezone: "IST", availability: "Available tomorrow", seniority: "Senior", rate: 560, bookingType: "Day rate", rating: 4.8, years: 8, skills: ["Python", "Django", "AWS", "PostgreSQL"], domains: ["APIs", "Data Systems", "Scale-ups"], summary: "Builds APIs, data-heavy systems, and robust backend services for scale-ups." },
  { id: 4, name: "Jordan Blake", role: "Mobile Developer", location: "Manchester, UK", timezone: "GMT", availability: "Booked for 2 weeks", seniority: "Senior", rate: 600, bookingType: "Day rate", rating: 4.9, years: 10, skills: ["React Native", "Swift", "Kotlin", "Firebase"], domains: ["Mobile Apps", "Consumer Products", "Subscriptions"], summary: "Cross-platform mobile engineer with solid app store release and product experience." },
  { id: 5, name: "Lina Petrov", role: "DevOps Engineer", location: "Sofia, BG", timezone: "EET", availability: "Available this week", seniority: "Midweight", rate: 510, bookingType: "Day rate", rating: 4.6, years: 7, skills: ["AWS", "Docker", "Terraform", "Kubernetes"], domains: ["Infrastructure", "CI/CD", "Cloud Cost"], summary: "Infrastructure, CI/CD, observability, and cloud cost control without the usual smoke machine." },
  { id: 6, name: "Noah Carter", role: "AI Engineer", location: "Dublin, IE", timezone: "GMT", availability: "Available next week", seniority: "Senior", rate: 720, bookingType: "Day rate", rating: 4.8, years: 8, skills: ["Python", "LLMs", "FastAPI", "Vector DB"], domains: ["AI Products", "RAG", "Automation"], summary: "Ships production AI features, retrieval pipelines, and evaluation workflows." },
  { id: 7, name: "Ella Morgan", role: "Product Engineer", location: "Bristol, UK", timezone: "GMT", availability: "Available this week", seniority: "Senior", rate: 590, bookingType: "Day rate", rating: 4.9, years: 8, skills: ["React", "Next.js", "Node.js", "Supabase"], domains: ["MVPs", "B2B Platforms", "Marketplaces"], summary: "Excellent at turning loose product briefs into shipped MVPs with clean user journeys." },
  { id: 8, name: "Tariq Hussain", role: "Data + Backend Engineer", location: "Leeds, UK", timezone: "GMT", availability: "Available next week", seniority: "Senior", rate: 610, bookingType: "Day rate", rating: 4.7, years: 9, skills: ["Python", "Node.js", "PostgreSQL", "AWS"], domains: ["Dashboards", "Analytics", "Logistics"], summary: "Builds backend and analytics foundations for operational platforms and reporting-heavy products." }
];

const stackOptions = ["All stacks", "React", "Next.js", "Vue", "Node.js", "Python", "AWS", "React Native", "LLMs"];
const availabilityOptions = ["Any availability", "Available tomorrow", "Available this week", "Available next week"];
export const examplePrompts = [
  "We need a senior React and Node developer to build an internal dashboard in 6 weeks. Budget is around £650 a day.",
  "Looking for a Python engineer for an AI workflow platform with FastAPI and vector search.",
  "Need a mobile developer for a React Native app MVP over 3 months."
];

const promptIdeas = [
  {
    id: "internal-systems",
    label: "Internal systems",
    description: "Senior React + Node team for a 6-week dashboard sprint with clear budget control.",
    prompt: examplePrompts[0]
  },
  {
    id: "ai-workflow",
    label: "AI workflow",
    description: "Python engineer for FastAPI, retrieval, and production AI delivery instead of a prototype.",
    prompt: examplePrompts[1]
  },
  {
    id: "mobile-mvp",
    label: "Mobile MVP",
    description: "React Native product push with enough runway to ship, test, and iterate in market.",
    prompt: examplePrompts[2]
  }
];

const defaultBookings = [
  { id: "acme-amara", client: "Acme SaaS", developer: "Amara Singh", stack: "React + Node.js", dates: "17 Mar to 28 Mar", status: "Confirmed", value: "£6,500" },
  { id: "northstar-priya", client: "Northstar Health", developer: "Priya Raman", stack: "Python + AWS", dates: "19 Mar to 2 Apr", status: "Pending", value: "£7,840" },
  { id: "orbit-ella", client: "Orbit Commerce", developer: "Ella Morgan", stack: "Next.js + Node.js", dates: "24 Mar to 4 Apr", status: "Shortlisted", value: "£5,900" }
];

function cn(...parts) { return parts.filter(Boolean).join(" "); }

function formatCurrency(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(value);
}

function parseDateInput(value) {
  return value ? new Date(`${value}T12:00:00`) : null;
}

function formatDateWindow(startDate, endDate) {
  if (!startDate || !endDate) return "Dates to confirm";
  const formatter = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });
  return `${formatter.format(parseDateInput(startDate))} to ${formatter.format(parseDateInput(endDate))}`;
}

function estimateBookingDays(startDate, endDate, daysPerWeek) {
  if (!startDate || !endDate) return 0;
  const start = parseDateInput(startDate);
  const end = parseDateInput(endDate);
  const diff = end.getTime() - start.getTime();
  if (Number.isNaN(diff) || diff < 0) return 0;
  const weeks = Math.max(1, Math.ceil((diff + 86400000) / (1000 * 60 * 60 * 24 * 7)));
  return weeks * Number(daysPerWeek || 1);
}

function relativeDateValue(days) {
  const value = new Date();
  value.setDate(value.getDate() + days);
  return value.toISOString().slice(0, 10);
}

const primaryButtonClass = "inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300";
const secondaryButtonClass = "inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200";
const iconButtonClass = "inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200";
const selectInputClass = "h-12 w-full cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-14 text-sm font-medium text-slate-900 outline-none transition focus:border-slate-400";

function parsePrompt(prompt) {
  const lower = prompt.toLowerCase();
  const stackKeywords = {
    "React": ["react"],
    "Next.js": ["next", "next.js"],
    "Vue": ["vue", "nuxt"],
    "Node.js": ["node", "node.js"],
    "Python": ["python", "django", "fastapi"],
    "AWS": ["aws", "cloud", "infrastructure"],
    "React Native": ["react native", "mobile app", "mobile"],
    "LLMs": ["llm", "ai", "openai", "rag", "vector", "embeddings"]
  };
  const matchedStacks = Object.entries(stackKeywords).filter(([, keys]) => keys.some((k) => lower.includes(k))).map(([stack]) => stack);
  const seniority = lower.includes("senior") ? "Senior" : lower.includes("mid") ? "Midweight" : "Any";
  const dayRateMatch = lower.match(/£\s?(\d{3,4})/) || lower.match(/(\d{3,4})\s?(per day|a day|day rate|\/day)/);
  const budget = dayRateMatch ? Number(dayRateMatch[1]) : 900;
  let availability = "Any availability";
  if (lower.includes("tomorrow")) availability = "Available tomorrow";
  else if (lower.includes("this week")) availability = "Available this week";
  else if (lower.includes("next week")) availability = "Available next week";
  let duration = null;
  const weekMatch = lower.match(/(\d+)\s?weeks?/);
  const monthMatch = lower.match(/(\d+)\s?months?/);
  if (weekMatch) duration = `${weekMatch[1]} weeks`;
  if (monthMatch) duration = `${monthMatch[1]} months`;
  const projectType = lower.includes("dashboard") ? "Dashboard" : lower.includes("marketplace") ? "Marketplace" : lower.includes("mvp") ? "MVP" : lower.includes("app") ? "App" : lower.includes("platform") ? "Platform" : "Product build";
  return { matchedStacks, seniority, budget, availability, duration, projectType };
}

function buildReasons(dev, parsed) {
  const reasons = [];
  if (parsed.matchedStacks.length) {
    const overlap = dev.skills.filter((s) => parsed.matchedStacks.includes(s));
    if (overlap.length) reasons.push(`Strong match for ${overlap.join(" + ")}`);
  }
  if (parsed.seniority !== "Any" && dev.seniority === parsed.seniority) reasons.push(`${dev.seniority} profile matches your brief`);
  if (dev.rate <= parsed.budget) reasons.push("Within your stated budget");
  else if (dev.rate <= parsed.budget + 80) reasons.push("Close to your stated budget");
  if (parsed.availability !== "Any availability" && dev.availability === parsed.availability) reasons.push("Availability fits your timeline");
  else if (parsed.availability === "Any availability" && !dev.availability.includes("Booked")) reasons.push("Availability looks workable");
  if (!reasons.length) reasons.push("Relevant profile based on your project brief");
  return reasons.slice(0, 3);
}

function rankDevelopers(prompt, filters) {
  const parsed = parsePrompt(prompt);
  const ranked = developers.map((dev) => {
    let score = 0;
    const stackMatches = dev.skills.filter((s) => parsed.matchedStacks.includes(s));
    score += stackMatches.length * 30;
    if (parsed.seniority !== "Any" && dev.seniority === parsed.seniority) score += 16;
    if (dev.rate <= parsed.budget) score += 14;
    else if (dev.rate <= parsed.budget + 80) score += 6;
    if (parsed.availability !== "Any availability" && dev.availability === parsed.availability) score += 14;
    else if (parsed.availability === "Any availability" && !dev.availability.includes("Booked")) score += 8;
    if (filters.stack !== "All stacks" && dev.skills.includes(filters.stack)) score += 12;
    if (filters.availability !== "Any availability" && dev.availability === filters.availability) score += 10;
    if (dev.rate <= filters.maxRate) score += 8; else score -= 25;
    const haystack = `${dev.name} ${dev.role} ${dev.skills.join(" ")} ${dev.summary} ${dev.domains.join(" ")}`.toLowerCase();
    if (filters.query && haystack.includes(filters.query.toLowerCase())) score += 10;
    return { ...dev, score, reasons: buildReasons(dev, parsed) };
  }).filter((dev) => {
    const matchesStack = filters.stack === "All stacks" || dev.skills.includes(filters.stack);
    const matchesAvailability = filters.availability === "Any availability" || dev.availability === filters.availability;
    const matchesBudget = dev.rate <= filters.maxRate;
    const haystack = `${dev.name} ${dev.role} ${dev.skills.join(" ")} ${dev.summary} ${dev.domains.join(" ")}`.toLowerCase();
    const matchesQuery = !filters.query || haystack.includes(filters.query.toLowerCase());
    return matchesStack && matchesAvailability && matchesBudget && matchesQuery;
  }).sort((a, b) => b.score - a.score || b.rating - a.rating);
  return { parsed, ranked };
}

function Pill({ children, tone = "default" }) {
  const styles = {
    default: "bg-white text-slate-600 border-slate-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    slate: "bg-slate-50 text-slate-700 border-slate-200",
    dark: "bg-slate-900 text-white border-slate-900"
  };
  return <span className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium", styles[tone])}>{children}</span>;
}

function StatCard({ label, value, hint, icon: Icon, compact = false }) {
  return (
    <div className={cn("rounded-3xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]", compact ? "p-4 xl:p-4" : "p-5")}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className={cn("font-semibold tracking-tight text-slate-900", compact ? "text-2xl xl:text-[1.8rem]" : "text-3xl")}>{value}</p>
          <p className="mt-1 text-sm font-medium text-slate-700">{label}</p>
          <p className="mt-2 text-xs text-slate-500">{hint}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700"><Icon className="h-5 w-5" /></div>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, body, action }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">{title}</h2>
        <p className="mt-4 text-base leading-7 text-slate-600">{body}</p>
      </div>
      {action}
    </div>
  );
}

function AppHeader({ setMobileOpen, shortlistCount = 0, onOpenShortlist }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6 xl:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button type="button" className={cn(iconButtonClass, "lg:hidden")} onClick={() => setMobileOpen(true)}><Menu className="h-5 w-5" /></button>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">Dev by Gitwork</p>
            <p className="hidden text-xs text-slate-500 sm:block">AI-first developer matching for project briefs</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenShortlist ? (
            <button type="button" onClick={onOpenShortlist} className={cn(secondaryButtonClass, "h-10 rounded-full px-3 sm:px-4")}>
              <span>Shortlist</span>
              <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">{shortlistCount}</span>
            </button>
          ) : null}
          <div className="hidden items-center gap-3 md:flex">
            <Pill tone="slate">1,000 developer library</Pill>
            <button type="button" className={primaryButtonClass}>Post requirement</button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ page, onSelectPage, mobileOpen, setMobileOpen }) {
  const nav = [
    { id: "marketplace", label: "Marketplace", icon: Search },
    { id: "bookings", label: "Bookings", icon: CalendarDays },
    { id: "developers", label: "Developers", icon: Users },
    { id: "admin", label: "Admin", icon: LayoutDashboard }
  ];
  const content = (
    <div className="flex h-full flex-col justify-between gap-8 overflow-y-auto">
      <div>
        <div className="mb-8 flex items-center justify-between lg:block">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Dev by Gitwork</p>
            <h1 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">Developer marketplace</h1>
          </div>
          <button type="button" className={cn(iconButtonClass, "lg:hidden")} onClick={() => setMobileOpen(false)}><X className="h-5 w-5" /></button>
        </div>
        <nav className="space-y-1.5">
          {nav.map(({ id, label, icon: Icon }) => (
            <button type="button" key={id} onClick={() => { onSelectPage(id); setMobileOpen(false); }} className={cn("flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition", page === id ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950")}>
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <Pill tone="green">AI matching flow</Pill>
        <p className="mt-3 text-sm leading-6 text-slate-600">Clients describe what they want to build. The platform parses the brief, ranks developer fit, and then lets them refine results.</p>
      </div>
    </div>
  );
  return (
    <>
      <aside className="hidden w-[280px] border-r border-slate-200 bg-white p-6 lg:block">{content}</aside>
      <AnimatePresence>
        {mobileOpen ? <>
          <motion.div className="fixed inset-0 z-40 bg-slate-950/20 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
          <motion.aside className="fixed inset-y-0 left-0 z-50 w-[280px] max-w-[calc(100vw-1rem)] border-r border-slate-200 bg-white p-6 lg:hidden" initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: "spring", stiffness: 280, damping: 28 }}>{content}</motion.aside>
        </> : null}
      </AnimatePresence>
    </>
  );
}

export function AppShell({ page, onSelectPage, mobileOpen, setMobileOpen, mainClassName, shortlistCount, onOpenShortlist, children }) {
  return (
    <div className="min-h-screen bg-[#f6f6f3] text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar page={page} onSelectPage={onSelectPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="min-w-0 flex-1">
          <AppHeader setMobileOpen={setMobileOpen} shortlistCount={shortlistCount} onOpenShortlist={onOpenShortlist} />
          <main className={cn("mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 xl:py-8", mainClassName)}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function useLockBodyScroll(active) {
  useEffect(() => {
    if (!active) return undefined;

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [active]);
}

function NativeSelect({ id, value, options, onChange, className }) {
  return (
    <div className="relative">
      <select id={id} value={value} onChange={onChange} className={cn(selectInputClass, className)}>
        {options.map((option) => {
          if (typeof option === "string") return <option key={option}>{option}</option>;
          return <option key={option.value} value={option.value}>{option.label}</option>;
        })}
      </select>
      <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </div>
  );
}

function SelectField({ value, options, onChange }) {
  return <NativeSelect value={value} options={options} onChange={onChange} />;
}

function PromptIdeaCard({ label, description, prompt, onSelect }) {
  return (
    <button type="button" onClick={() => onSelect(prompt)} className="group w-full rounded-[24px] border border-white/80 bg-white/82 p-4 text-left shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">{label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}

function HeroMetric({ label, value }) {
  return (
    <div className="rounded-[28px] border border-white/80 bg-white/76 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)] backdrop-blur sm:p-5">
      <p className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-[2rem]">{value}</p>
      <p className="mt-2 text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
}

function AIPromptHero({ prompt, setPrompt, onSubmit, compact = false }) {
  const promptWordCount = prompt.trim() ? prompt.trim().split(/\s+/).length : 0;
  const leadPoints = [
    { label: "Less setup", value: "Describe the product once instead of stitching filters together." },
    { label: "Live structure", value: "Stack, budget, and timing become usable signals while the brief is still being written." },
    { label: "Sharper matching", value: "Shortlists start ranked before the client ever touches the refinement layer." }
  ];
  const heroMetrics = [
    { label: "Developer pool", value: "1,000+" },
    { label: "Average fill time", value: "48h" },
    { label: "Bookings managed", value: "2.4k" },
    { label: "Platform margin", value: "18%" }
  ];

  return (
    <section className={cn("relative overflow-hidden rounded-[36px] border border-white/80 bg-[linear-gradient(135deg,#fbfaf5_0%,#f6f0e7_38%,#edf2eb_100%)] shadow-[0_20px_70px_rgba(15,23,42,0.08)]", compact ? "p-5 sm:p-6 xl:p-7" : "p-6 sm:p-8 xl:p-10")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.18),transparent_42%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.14),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.08),transparent_30%)]" />
      <div className="relative">
        <div className={cn("grid items-start gap-6", compact ? "xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] xl:gap-8" : "xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] xl:gap-10")}>
          <div>
            <h1 className={cn("max-w-4xl font-[family:var(--font-sora)] font-semibold leading-[0.96] tracking-[-0.06em] text-slate-950", compact ? "text-4xl sm:text-[3.5rem] xl:text-[4.2rem]" : "text-4xl sm:text-5xl xl:text-[5.1rem]")}>
              Write the brief once. Get a sharper shortlist back.
            </h1>
            <p className={cn("max-w-2xl text-slate-600", compact ? "mt-4 text-base leading-7" : "mt-6 text-lg leading-8")}>
              Drop a real project outline, not a grid of filters. The platform interprets stack, budget, and timing in one pass, then returns the developers most likely to fit.
            </p>
            {!compact ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {leadPoints.map((item) => (
                  <div key={item.label} className="border-l border-slate-300/70 pl-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{item.value}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:self-center">
            {heroMetrics.map((item) => (
              <HeroMetric key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </div>

        <div className={cn(compact ? "mt-6" : "mt-8")}>
          <div className={cn("rounded-[32px] border border-white/80 bg-white/70 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur", compact ? "p-4 sm:p-5" : "p-5 sm:p-6")}>
            <div className={cn("flex flex-col", compact ? "gap-4" : "gap-6")}>
              <div className="rounded-[30px] border border-slate-200/80 bg-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_30px_rgba(15,23,42,0.04)] sm:p-5">
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="We need a senior React and Node developer to build an internal dashboard for a logistics team over 6 weeks. Budget is around £650 a day." className={cn("w-full bg-transparent text-[17px] text-slate-900 outline-none transition placeholder:text-slate-400", compact ? "min-h-[180px] leading-7 xl:min-h-[160px]" : "min-h-[210px] leading-8")} />

                <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                    <span>{promptWordCount} words</span>
                    <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
                    <span>Include stack, timing, and budget</span>
                  </div>

                  <button type="button" onClick={onSubmit} className={cn("group inline-flex w-full items-center justify-center gap-3 rounded-full bg-slate-950 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(15,23,42,0.16)] transition hover:bg-slate-900 sm:w-auto", compact ? "px-5 py-3" : "px-5 py-3.5")}>
                    <span>Find matching developers</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-2">
                <div className="px-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Starting points</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Not templates. Just enough structure to get moving faster.</p>
                </div>
                <div className="mt-4 grid gap-3 lg:grid-cols-3">
                  {promptIdeas.map((item) => <PromptIdeaCard key={item.id} {...item} onSelect={setPrompt} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MatchSummary({ parsed, count }) {
  if (!parsed) return null;
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Top matches for your brief</p>
          <p className="mt-1 text-sm text-slate-600">Parsed as a {parsed.projectType.toLowerCase()} brief with {parsed.matchedStacks.length ? parsed.matchedStacks.join(", ") : "generalist"} requirements and a budget around £{parsed.budget}.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2"><Pill tone="green">{count} matches ranked</Pill><Pill tone="slate">AI parse demo</Pill></div>
      </div>
    </div>
  );
}

function ResultsFilterSidebar({ parsed, filters, setFilters, resultCount }) {
  const activeFilterCount = (filters.query ? 1 : 0) + (filters.stack !== "All stacks" ? 1 : 0) + (filters.availability !== "Any availability" ? 1 : 0) + (filters.maxRate !== 900 ? 1 : 0);
  const reset = () => setFilters({ query: "", stack: "All stacks", availability: "Any availability", maxRate: 900 });
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] xl:sticky xl:top-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Refine results</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">Filter developers</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Once the brief has been parsed, classic filters become the second pass.</p>
        </div>
        {activeFilterCount ? <Pill tone="slate">{activeFilterCount} active</Pill> : null}
      </div>
      <div className="mt-6 space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={filters.query} onChange={(e) => setFilters((s) => ({ ...s, query: e.target.value }))} placeholder="Refine by keyword, stack, domain, or developer" className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400" />
        </div>
        <SelectField value={filters.stack} options={stackOptions} onChange={(e) => setFilters((s) => ({ ...s, stack: e.target.value }))} />
        <SelectField value={filters.availability} options={availabilityOptions} onChange={(e) => setFilters((s) => ({ ...s, availability: e.target.value }))} />
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-slate-700">Max day rate</span>
            <span className="font-semibold text-slate-900">£{filters.maxRate}</span>
          </div>
          <input type="range" min="300" max="900" step="10" value={filters.maxRate} onChange={(e) => setFilters((s) => ({ ...s, maxRate: Number(e.target.value) }))} className="mt-3 w-full accent-slate-900" />
        </div>
      </div>
      <div className="mt-6 rounded-[24px] bg-slate-950 p-4 text-white">
        <p className="text-sm font-semibold">{resultCount} matches ranked</p>
        <p className="mt-2 text-sm leading-6 text-white/72">
          Parsed as a {parsed.projectType.toLowerCase()} brief with {parsed.matchedStacks.length ? parsed.matchedStacks.join(", ") : "generalist"} requirements and a budget around £{parsed.budget}.
        </p>
      </div>
      <button type="button" onClick={reset} className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
        Reset filters
      </button>
    </div>
  );
}

export function MarketplaceLanding({ prompt, setPrompt, onGenerate }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <AIPromptHero prompt={prompt} setPrompt={setPrompt} onSubmit={onGenerate} compact />
    </div>
  );
}

export function MarketplaceResults({
  prompt,
  filters,
  setFilters,
  onOpen,
  shortlistIds,
  onToggleShortlist,
  onRequestBooking
}) {
  const { parsed, ranked } = useMemo(() => rankDevelopers(prompt, filters), [prompt, filters]);
  return (
    <div className="space-y-6">
      <MatchSummary parsed={parsed} count={ranked.length} />
      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <ResultsFilterSidebar parsed={parsed} filters={filters} setFilters={setFilters} resultCount={ranked.length} />
        <div className="grid gap-5 sm:[grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          {ranked.map((developer) => (
            <DeveloperCard
              key={developer.id}
              developer={developer}
              isShortlisted={shortlistIds.includes(developer.id)}
              onOpen={onOpen}
              onToggleShortlist={onToggleShortlist}
              onRequestBooking={onRequestBooking}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DeveloperCard({ developer, isShortlisted, onOpen, onToggleShortlist, onRequestBooking }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-6 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">{developer.name}</h3>
            <Pill tone={developer.availability.includes("Booked") ? "slate" : "green"}>{developer.availability}</Pill>
          </div>
          <p className="mt-2 text-sm font-medium text-slate-600">{developer.role}</p>
        </div>
        <div className="shrink-0 sm:text-right">
          <p className="text-2xl font-semibold tracking-tight text-slate-950">£{developer.rate}</p>
          <p className="text-xs font-medium text-slate-500">{developer.bookingType}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{developer.skills.map((skill) => <Pill key={skill}>{skill}</Pill>)}</div>
      <div className="mt-4 flex flex-col gap-2">{developer.reasons?.map((reason) => <div key={reason} className="inline-flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /><span>{reason}</span></div>)}</div>
      <p className="mt-4 text-sm leading-7 text-slate-600">{developer.summary}</p>
      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
        <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 shrink-0" />{developer.location}</span>
        <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4 shrink-0" />{developer.timezone}</span>
        <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 shrink-0" />{developer.rating}</span>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => onOpen(developer)} className={cn(secondaryButtonClass, "flex-1 rounded-full px-4 py-3")}>
          View profile
        </button>
        <button type="button" onClick={() => onToggleShortlist(developer.id)} className={cn(isShortlisted ? primaryButtonClass : secondaryButtonClass, "flex-1 rounded-full px-4 py-3")}>
          {isShortlisted ? "Shortlisted" : "Add to shortlist"}
        </button>
        <button type="button" onClick={() => onRequestBooking(developer)} className={cn(primaryButtonClass, "sm:col-span-2 rounded-full px-4 py-3")}>
          Request booking
        </button>
      </div>
    </motion.div>
  );
}

export function BookingsPage({ requests = [] }) {
  const bookings = [...requests, ...defaultBookings];
  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Bookings" title="Track requests, confirms, and engagement value" body="This area is for booking requests, contract windows, extensions, and delivery status." />
      {requests.length ? (
        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <p className="text-sm font-semibold text-emerald-900">Latest booking request sent</p>
          <p className="mt-2 text-sm leading-6 text-emerald-800">New booking requests now land here so ops can review dates, budgets, and project timing in one queue.</p>
        </div>
      ) : null}
      <div className="grid gap-4">
        {bookings.map((item) => <div key={`${item.id ?? item.client}-${item.developer}`} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><h3 className="text-lg font-semibold tracking-tight text-slate-950">{item.client} to {item.developer}</h3><p className="mt-1 text-sm text-slate-600">{item.stack} · {item.dates}</p></div><div className="flex flex-wrap items-center gap-3"><Pill tone={item.status === "Confirmed" || item.status === "Requested" ? "green" : "slate"}>{item.status}</Pill><span className="text-sm font-semibold text-slate-900">{item.value}</span></div></div></div>)}
      </div>
    </div>
  );
}

export function DevelopersPage() {
  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Developer supply" title="Manage talent inventory" body="Admin can review profiles, stack coverage, rates, and supply gaps across the developer bench." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active this week" value="684" hint="Currently bookable" icon={CalendarDays} />
        <StatCard label="Top stack gap" value="Go" hint="Demand exceeds supply" icon={Code2} />
        <StatCard label="Average day rate" value="£545" hint="Across active profiles" icon={PoundSterling} />
        <StatCard label="Vetted profiles" value="91%" hint="Completed screening" icon={ShieldCheck} />
      </div>
    </div>
  );
}

export function AdminPage() {
  const metrics = [
    { label: "Gross booking value", value: "£182k" },
    { label: "Platform revenue", value: "£32.7k" },
    { label: "Fill rate", value: "73%" },
    { label: "Average booking length", value: "11 days" }
  ];
  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Admin" title="Control margin, payouts, and marketplace operations" body="This is where your ops team manages fees, ranking, supply gaps, cancellations, and booking performance." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric) => <StatCard key={metric.label} label={metric.label} value={metric.value} hint="Demo metric" icon={LayoutDashboard} />)}</div>
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-3 text-slate-900"><SlidersHorizontal className="h-5 w-5" /><p className="font-semibold">Admin controls to wire next</p></div>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
          <li>Prompt parsing service and structured brief extraction</li>
          <li>Vector search and ranking service for developer fit</li>
          <li>Availability sync and booking approvals</li>
          <li>Client invoicing, deposits, refunds, and extensions</li>
        </ul>
      </div>
    </div>
  );
}

export function ShortlistReviewModal({ open, developers: shortlistedDevelopers, notes, onClose, onToggleShortlist, onUpdateNote, onRequestBooking }) {
  if (!open) return null;

  const averageRate = shortlistedDevelopers.length ? Math.round(shortlistedDevelopers.reduce((total, developer) => total + developer.rate, 0) / shortlistedDevelopers.length) : 0;

  return (
    <AnimatePresence>
      <>
        <motion.div className="fixed inset-0 z-40 bg-slate-950/25 backdrop-blur-[1px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
        <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center p-3 pt-6 sm:p-6">
          <motion.div className="pointer-events-auto max-h-full w-full max-w-6xl overflow-y-auto rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:p-7" initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: 0.98 }} transition={{ duration: 0.18 }}>
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Shortlist review</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Saved for later outreach or booking</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Treat this like a cart. Compare candidates, keep message notes, and spin any developer into a booking request when the timing is right.</p>
              </div>
              <button type="button" onClick={onClose} className={cn(iconButtonClass, "self-end sm:self-start")}><X className="h-5 w-5" /></button>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                {shortlistedDevelopers.length ? (
                  shortlistedDevelopers.map((developer) => (
                    <div key={developer.id} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-xl font-semibold tracking-tight text-slate-950">{developer.name}</h3>
                            <Pill tone={developer.availability.includes("Booked") ? "slate" : "green"}>{developer.availability}</Pill>
                            <Pill>{developer.seniority}</Pill>
                          </div>
                          <p className="mt-2 text-sm font-medium text-slate-600">{developer.role}</p>
                          <p className="mt-3 text-sm leading-6 text-slate-600">{developer.summary}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {developer.skills.slice(0, 4).map((skill) => <Pill key={skill}>{skill}</Pill>)}
                          </div>
                        </div>
                        <div className="shrink-0 rounded-[24px] border border-slate-200 bg-white p-4 lg:w-[220px]">
                          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Day rate</p>
                          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{formatCurrency(developer.rate)}</p>
                          <p className="mt-1 text-sm text-slate-500">{developer.bookingType}</p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500" htmlFor={`shortlist-note-${developer.id}`}>Message prep</label>
                          <textarea id={`shortlist-note-${developer.id}`} value={notes[developer.id] || ""} onChange={(e) => onUpdateNote(developer.id, e.target.value)} placeholder="Save context for later outreach: project angle, concerns, who should speak to them, or why they made the shortlist." className="mt-3 min-h-[120px] w-full rounded-[24px] border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400" />
                        </div>
                        <div className="flex flex-col gap-3">
                          <button type="button" onClick={() => onRequestBooking(developer)} className={cn(primaryButtonClass, "w-full rounded-full px-4 py-3")}>
                            Request booking
                          </button>
                          <button type="button" onClick={() => onToggleShortlist(developer.id)} className={cn(secondaryButtonClass, "w-full rounded-full px-4 py-3")}>
                            Remove from shortlist
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-6">
                    <p className="text-lg font-semibold tracking-tight text-slate-950">No developers saved yet</p>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">Use the shortlist action on a developer card to save candidates here. This review space is where message notes and booking decisions should happen, not inside the results grid.</p>
                  </div>
                )}
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] xl:sticky xl:top-24">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Summary</p>
                <div className="mt-5 space-y-4">
                  <div className="rounded-[24px] bg-slate-950 p-4 text-white">
                    <p className="text-sm font-semibold">{shortlistedDevelopers.length} developers saved</p>
                    <p className="mt-2 text-sm text-white/72">{shortlistedDevelopers.length ? `Average rate ${formatCurrency(averageRate)}. Use the notes field to keep outreach context with the shortlist.` : "Your shortlist count lives in the header so the results page can stay focused on ranking and filtering."}</p>
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">Recommended next step</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Keep the shortlist narrow, add the message angle for each developer, then move only the strongest fit into a booking request.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </>
    </AnimatePresence>
  );
}

export function BookingFlowModal({ developer, prompt, onClose, onSubmit }) {
  useLockBodyScroll(Boolean(developer));

  const [form, setForm] = useState({
    clientName: "New client",
    engagementType: "Sprint",
    startDate: relativeDateValue(7),
    endDate: relativeDateValue(35),
    daysPerWeek: 4,
    kickoff: "Flexible within window",
    budgetCap: developer?.rate ?? 650,
    goals: prompt || "",
    notes: ""
  });

  useEffect(() => {
    if (!developer) return;
    setForm({
      clientName: "New client",
      engagementType: "Sprint",
      startDate: relativeDateValue(7),
      endDate: relativeDateValue(35),
      daysPerWeek: 4,
      kickoff: "Flexible within window",
      budgetCap: developer.rate,
      goals: prompt || "",
      notes: ""
    });
  }, [developer, prompt]);

  if (!developer) return null;

  const estimatedDays = estimateBookingDays(form.startDate, form.endDate, form.daysPerWeek);
  const estimatedValue = estimatedDays * developer.rate;

  const handleChange = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const handleSubmit = () => {
    onSubmit({
      id: `request-${Date.now()}`,
      client: form.clientName,
      developer: developer.name,
      developerId: developer.id,
      stack: developer.skills.slice(0, 2).join(" + "),
      dates: formatDateWindow(form.startDate, form.endDate),
      status: "Requested",
      value: estimatedValue ? formatCurrency(estimatedValue) : `${formatCurrency(developer.rate)} / day`,
      engagementType: form.engagementType,
      goals: form.goals,
      notes: form.notes,
      daysPerWeek: form.daysPerWeek
    });
  };

  return (
    <AnimatePresence>
      <>
        <motion.div className="fixed inset-0 z-40 bg-slate-950/25 backdrop-blur-[1px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
        <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center p-3 pt-6 sm:p-6">
          <motion.div className="pointer-events-auto max-h-full w-full max-w-5xl overflow-y-auto rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:p-7" initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: 0.98 }} transition={{ duration: 0.18 }}>
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Booking request</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Build the booking around real dates and scope</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">This is the handoff step from shortlist to ops. Set the window, weekly commitment, and delivery goals so the request has enough shape to schedule properly.</p>
              </div>
              <button type="button" onClick={onClose} className={cn(iconButtonClass, "self-end sm:self-start")}><X className="h-5 w-5" /></button>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-5">
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <Pill tone={developer.availability.includes("Booked") ? "slate" : "green"}>{developer.availability}</Pill>
                        <Pill>{developer.seniority}</Pill>
                      </div>
                      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">{developer.name}</h3>
                      <p className="mt-2 text-sm font-medium text-slate-600">{developer.role}</p>
                    </div>
                    <div className="rounded-[24px] border border-slate-200 bg-white p-4">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Rate</p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{formatCurrency(developer.rate)}</p>
                      <p className="mt-1 text-sm text-slate-500">{developer.bookingType}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500" htmlFor="client-name">Client</label>
                    <input id="client-name" value={form.clientName} onChange={(e) => handleChange("clientName", e.target.value)} className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500" htmlFor="engagement-type">Engagement</label>
                    <NativeSelect id="engagement-type" value={form.engagementType} onChange={(e) => handleChange("engagementType", e.target.value)} options={["Sprint", "Trial", "Fractional", "Retained"]} className="mt-3" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500" htmlFor="start-date">Start date</label>
                    <input id="start-date" type="date" value={form.startDate} onChange={(e) => handleChange("startDate", e.target.value)} className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500" htmlFor="end-date">End date</label>
                    <input id="end-date" type="date" value={form.endDate} onChange={(e) => handleChange("endDate", e.target.value)} className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500" htmlFor="days-per-week">Days per week</label>
                    <NativeSelect id="days-per-week" value={form.daysPerWeek} onChange={(e) => handleChange("daysPerWeek", Number(e.target.value))} options={[{ value: 1, label: "1 day" }, { value: 2, label: "2 days" }, { value: 3, label: "3 days" }, { value: 4, label: "4 days" }, { value: 5, label: "5 days" }]} className="mt-3" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500" htmlFor="kickoff-window">Kickoff preference</label>
                    <NativeSelect id="kickoff-window" value={form.kickoff} onChange={(e) => handleChange("kickoff", e.target.value)} options={["Flexible within window", "Start on selected date", "Need confirmation this week"]} className="mt-3" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500" htmlFor="budget-cap">Budget cap per day</label>
                  <input id="budget-cap" type="number" min="300" step="10" value={form.budgetCap} onChange={(e) => handleChange("budgetCap", Number(e.target.value))} className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400" />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500" htmlFor="booking-goals">Delivery goals</label>
                  <textarea id="booking-goals" value={form.goals} onChange={(e) => handleChange("goals", e.target.value)} className="mt-3 min-h-[140px] w-full rounded-[24px] border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-900 outline-none transition focus:border-slate-400" />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500" htmlFor="booking-notes">Ops notes</label>
                  <textarea id="booking-notes" value={form.notes} onChange={(e) => handleChange("notes", e.target.value)} placeholder="Dependencies, onboarding constraints, interview steps, or anything ops should know before confirming." className="mt-3 min-h-[120px] w-full rounded-[24px] border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400" />
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 xl:sticky xl:top-24">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Request summary</p>
                <div className="mt-5 rounded-[24px] bg-slate-950 p-4 text-white">
                  <p className="text-sm font-semibold">{form.engagementType} booking for {developer.name}</p>
                  <p className="mt-2 text-sm text-white/72">{formatDateWindow(form.startDate, form.endDate)} · {form.daysPerWeek} days per week</p>
                </div>
                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between gap-4"><span>Estimated days</span><span className="font-semibold text-slate-900">{estimatedDays || "TBC"}</span></div>
                  <div className="flex items-center justify-between gap-4"><span>Estimated value</span><span className="font-semibold text-slate-900">{estimatedValue ? formatCurrency(estimatedValue) : "TBC"}</span></div>
                  <div className="flex items-center justify-between gap-4"><span>Budget cap</span><span className="font-semibold text-slate-900">{formatCurrency(form.budgetCap || 0)}</span></div>
                </div>
                <button type="button" onClick={handleSubmit} className={cn(primaryButtonClass, "mt-6 w-full rounded-full px-4 py-3")}>
                  Send booking request
                </button>
                <button type="button" onClick={onClose} className={cn(secondaryButtonClass, "mt-3 w-full rounded-full px-4 py-3")}>
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </>
    </AnimatePresence>
  );
}

export function ProfileModal({ developer, onClose, isShortlisted = false, onToggleShortlist, onRequestBooking }) {
  if (!developer) return null;
  return (
    <AnimatePresence>
      <>
        <motion.div className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[1px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
        <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center p-3 pt-6 sm:items-center sm:p-6">
          <motion.div className="pointer-events-auto max-h-full w-full max-w-3xl overflow-y-auto rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:p-7" initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: 0.98 }} transition={{ duration: 0.18 }}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap gap-2"><Pill tone={developer.availability.includes("Booked") ? "slate" : "green"}>{developer.availability}</Pill><Pill>{developer.seniority}</Pill></div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">{developer.name}</h2>
                <p className="mt-2 text-sm font-medium text-slate-600">{developer.role}</p>
              </div>
              <button type="button" onClick={onClose} className={cn(iconButtonClass, "self-end sm:self-start")}><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-7 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-sm leading-7 text-slate-600">{developer.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">{developer.skills.map((skill) => <Pill key={skill}>{skill}</Pill>)}</div>
                <div className="mt-5 flex flex-col gap-2">{developer.reasons?.map((reason) => <div key={reason} className="inline-flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /><span>{reason}</span></div>)}</div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Location</p><p className="mt-2 text-sm font-semibold text-slate-900">{developer.location}</p></div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Timezone</p><p className="mt-2 text-sm font-semibold text-slate-900">{developer.timezone}</p></div>
                </div>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Commercials</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">£{developer.rate}</p>
                <p className="text-sm text-slate-500">{developer.bookingType}</p>
                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between gap-4"><span>Rating</span><span className="font-semibold text-slate-900">{developer.rating}</span></div>
                  <div className="flex items-center justify-between gap-4"><span>Experience</span><span className="font-semibold text-slate-900">{developer.years} years</span></div>
                  <div className="flex items-center justify-between gap-4"><span>Availability</span><span className="text-right font-semibold text-slate-900">{developer.availability}</span></div>
                </div>
                <button type="button" onClick={() => onRequestBooking?.(developer)} className={cn(primaryButtonClass, "mt-6 w-full px-5 py-3")}>Request booking</button>
                <button type="button" onClick={() => onToggleShortlist?.(developer.id)} className={cn(isShortlisted ? primaryButtonClass : secondaryButtonClass, "mt-3 w-full px-5 py-3")}>{isShortlisted ? "Shortlisted" : "Shortlist developer"}</button>
              </div>
            </div>
          </motion.div>
        </div>
      </>
    </AnimatePresence>
  );
}
