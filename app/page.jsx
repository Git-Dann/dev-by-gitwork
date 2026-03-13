"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
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
  Wallet,
  X,
} from "lucide-react";

const developers = [
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
const examplePrompts = [
  "We need a senior React and Node developer to build an internal dashboard in 6 weeks. Budget is around £650 a day.",
  "Looking for a Python engineer for an AI workflow platform with FastAPI and vector search.",
  "Need a mobile developer for a React Native app MVP over 3 months."
];

function cn(...parts) { return parts.filter(Boolean).join(" "); }

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
  return <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium", styles[tone])}>{children}</span>;
}

function StatCard({ label, value, hint, icon: Icon }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
          <p className="mt-1 text-sm font-medium text-slate-700">{label}</p>
          <p className="mt-2 text-xs text-slate-500">{hint}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700"><Icon className="h-5 w-5" /></div>
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

function AppHeader({ setMobileOpen }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6 xl:px-8">
        <div className="flex items-center gap-3">
          <button className="inline-flex rounded-2xl border border-slate-200 p-2 text-slate-700 lg:hidden" onClick={() => setMobileOpen(true)}><Menu className="h-5 w-5" /></button>
          <div>
            <p className="text-sm font-semibold text-slate-900">Dev by Gitwork</p>
            <p className="text-xs text-slate-500">AI-first developer matching for project briefs</p>
          </div>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Pill tone="slate">1,000 developer library</Pill>
          <button className="rounded-2xl border border-slate-300 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">Post requirement</button>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ page, setPage, mobileOpen, setMobileOpen }) {
  const nav = [
    { id: "marketplace", label: "Marketplace", icon: Search },
    { id: "bookings", label: "Bookings", icon: CalendarDays },
    { id: "developers", label: "Developers", icon: Users },
    { id: "admin", label: "Admin", icon: LayoutDashboard }
  ];
  const content = (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="mb-8 flex items-center justify-between lg:block">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Dev by Gitwork</p>
            <h1 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">Developer marketplace</h1>
          </div>
          <button className="rounded-2xl border border-slate-200 p-2 text-slate-600 lg:hidden" onClick={() => setMobileOpen(false)}><X className="h-5 w-5" /></button>
        </div>
        <nav className="space-y-1.5">
          {nav.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => { setPage(id); setMobileOpen(false); }} className={cn("flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition", page === id ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950")}>
              <Icon className="h-4 w-4" />
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
          <motion.aside className="fixed inset-y-0 left-0 z-50 w-[280px] border-r border-slate-200 bg-white p-6 lg:hidden" initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: "spring", stiffness: 280, damping: 28 }}>{content}</motion.aside>
        </> : null}
      </AnimatePresence>
    </>
  );
}

function SelectField({ value, options, onChange }) {
  return (
    <div className="relative">
      <select value={value} onChange={onChange} className="h-11 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-900 outline-none transition focus:border-slate-400">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </div>
  );
}

function AIPromptHero({ prompt, setPrompt, onSubmit, parsed }) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-8 xl:p-10">
      <SectionHeading eyebrow="AI project matching" title="What do you want to build?" body="Describe the project, stack, timeline, and budget. We will parse the brief and return the developers most likely to fit." action={<div className="flex items-center gap-2"><Pill tone="green">Natural language search</Pill><Pill tone="slate">Budget-aware ranking</Pill></div>} />
      <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.06)]"><BrainCircuit className="h-5 w-5" /></div>
          <div className="min-w-0 flex-1">
            <label className="text-sm font-semibold text-slate-900">Project brief</label>
            <p className="mt-1 text-sm text-slate-500">Try a plain-English brief, not a filter salad. The machine can cope.</p>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="We need a senior React and Node developer to build an internal dashboard for a logistics team over 6 weeks. Budget is around £650 a day." className="mt-4 min-h-[140px] w-full rounded-3xl border border-slate-200 bg-white px-4 py-4 text-[15px] leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400" />
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((item) => <button key={item} onClick={() => setPrompt(item)} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900">{item.length > 54 ? `${item.slice(0, 54)}...` : item}</button>)}
              </div>
              <button onClick={onSubmit} className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">Find matching developers<ArrowRight className="ml-2 h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
      {parsed ? <div className="mt-6 flex flex-wrap gap-2"><Pill tone="dark">{parsed.projectType}</Pill>{parsed.matchedStacks.map((s) => <Pill key={s}>{s}</Pill>)}{parsed.seniority !== "Any" ? <Pill>{parsed.seniority}</Pill> : null}{parsed.duration ? <Pill>{parsed.duration}</Pill> : null}{parsed.availability !== "Any availability" ? <Pill>{parsed.availability}</Pill> : null}<Pill>Up to £{parsed.budget}</Pill></div> : null}
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
        <div className="flex items-center gap-2"><Pill tone="green">{count} matches ranked</Pill><Pill tone="slate">AI parse demo</Pill></div>
      </div>
    </div>
  );
}

function SearchToolbar({ filters, setFilters, resultCount }) {
  const activeFilterCount = (filters.query ? 1 : 0) + (filters.stack !== "All stacks" ? 1 : 0) + (filters.availability !== "Any availability" ? 1 : 0) + (filters.maxRate !== 900 ? 1 : 0);
  const reset = () => setFilters({ query: "", stack: "All stacks", availability: "Any availability", maxRate: 900 });
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-4">
        <div className="grid gap-3 xl:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={filters.query} onChange={(e) => setFilters((s) => ({ ...s, query: e.target.value }))} placeholder="Refine by keyword, stack, domain, or developer" className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400" />
          </div>
          <SelectField value={filters.stack} options={stackOptions} onChange={(e) => setFilters((s) => ({ ...s, stack: e.target.value }))} />
          <SelectField value={filters.availability} options={availabilityOptions} onChange={(e) => setFilters((s) => ({ ...s, availability: e.target.value }))} />
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center justify-between gap-3 text-sm"><span className="font-medium text-slate-700">Max day rate</span><span className="font-semibold text-slate-900">£{filters.maxRate}</span></div>
            <input type="range" min="300" max="900" step="10" value={filters.maxRate} onChange={(e) => setFilters((s) => ({ ...s, maxRate: Number(e.target.value) }))} className="mt-3 w-full accent-slate-900" />
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600"><span className="font-medium text-slate-900">{resultCount} developers</span><span className="text-slate-300">•</span><span>{activeFilterCount} active filters</span></div>
          <button onClick={reset} className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">Reset filters</button>
        </div>
      </div>
    </div>
  );
}

function DeveloperCard({ developer, onOpen }) {
  return (
    <motion.button whileHover={{ y: -2 }} onClick={() => onOpen(developer)} className="w-full rounded-[28px] border border-slate-200 bg-white p-6 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">{developer.name}</h3>
            <Pill tone={developer.availability.includes("Booked") ? "slate" : "green"}>{developer.availability}</Pill>
          </div>
          <p className="mt-2 text-sm font-medium text-slate-600">{developer.role}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold tracking-tight text-slate-950">£{developer.rate}</p>
          <p className="text-xs font-medium text-slate-500">{developer.bookingType}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{developer.skills.map((skill) => <Pill key={skill}>{skill}</Pill>)}</div>
      <div className="mt-4 flex flex-col gap-2">{developer.reasons?.map((reason) => <div key={reason} className="inline-flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>{reason}</span></div>)}</div>
      <p className="mt-4 text-sm leading-7 text-slate-600">{developer.summary}</p>
      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
        <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{developer.location}</span>
        <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4" />{developer.timezone}</span>
        <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4" />{developer.rating}</span>
      </div>
    </motion.button>
  );
}

function MarketplacePage({ prompt, setPrompt, filters, setFilters, submittedPrompt, onGenerate, onOpen }) {
  const { parsed, ranked } = useMemo(() => rankDevelopers(submittedPrompt || prompt, filters), [submittedPrompt, prompt, filters]);
  return (
    <div className="space-y-8">
      <AIPromptHero prompt={prompt} setPrompt={setPrompt} onSubmit={onGenerate} parsed={submittedPrompt ? parsed : null} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Developer pool" value="1,000+" hint="Frontend, backend, mobile, AI, DevOps" icon={Users} />
        <StatCard label="Average fill time" value="48h" hint="For common stacks and shortlists" icon={Clock3} />
        <StatCard label="Bookings managed" value="2.4k" hint="Across trial, project, and retained work" icon={CalendarDays} />
        <StatCard label="Platform margin" value="18%" hint="Placeholder admin margin control" icon={Wallet} />
      </div>
      {submittedPrompt ? <MatchSummary parsed={parsed} count={ranked.length} /> : null}
      <section className="space-y-5">
        <SectionHeading eyebrow="Refine results" title="Filter the AI-ranked shortlist" body="Once the brief has been parsed, classic filters become the second pass. Much saner than making users do all the thinking upfront." action={<Pill tone="slate">Secondary filter layer</Pill>} />
        <SearchToolbar filters={filters} setFilters={setFilters} resultCount={ranked.length} />
        <div className="grid gap-5 xl:grid-cols-2">{ranked.map((developer) => <DeveloperCard key={developer.id} developer={developer} onOpen={onOpen} />)}</div>
      </section>
    </div>
  );
}

function BookingsPage() {
  const bookings = [
    { client: "Acme SaaS", developer: "Amara Singh", stack: "React + Node.js", dates: "17 Mar to 28 Mar", status: "Confirmed", value: "£6,500" },
    { client: "Northstar Health", developer: "Priya Raman", stack: "Python + AWS", dates: "19 Mar to 2 Apr", status: "Pending", value: "£7,840" },
    { client: "Orbit Commerce", developer: "Ella Morgan", stack: "Next.js + Node.js", dates: "24 Mar to 4 Apr", status: "Shortlisted", value: "£5,900" }
  ];
  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Bookings" title="Track requests, confirms, and engagement value" body="This area is for booking requests, contract windows, extensions, and delivery status." />
      <div className="grid gap-4">
        {bookings.map((item) => <div key={`${item.client}-${item.developer}`} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><h3 className="text-lg font-semibold tracking-tight text-slate-950">{item.client} to {item.developer}</h3><p className="mt-1 text-sm text-slate-600">{item.stack} · {item.dates}</p></div><div className="flex flex-wrap items-center gap-3"><Pill tone={item.status === "Confirmed" ? "green" : "slate"}>{item.status}</Pill><span className="text-sm font-semibold text-slate-900">{item.value}</span></div></div></div>)}
      </div>
    </div>
  );
}

function DevelopersPage() {
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

function AdminPage() {
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

function ProfileModal({ developer, onClose }) {
  if (!developer) return null;
  return (
    <AnimatePresence>
      <>
        <motion.div className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[1px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
        <motion.div className="fixed left-1/2 top-1/2 z-50 w-[94vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:p-7" initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: 0.98 }} transition={{ duration: 0.18 }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap gap-2"><Pill tone={developer.availability.includes("Booked") ? "slate" : "green"}>{developer.availability}</Pill><Pill>{developer.seniority}</Pill></div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">{developer.name}</h2>
              <p className="mt-2 text-sm font-medium text-slate-600">{developer.role}</p>
            </div>
            <button onClick={onClose} className="rounded-2xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50"><X className="h-5 w-5" /></button>
          </div>
          <div className="mt-7 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm leading-7 text-slate-600">{developer.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">{developer.skills.map((skill) => <Pill key={skill}>{skill}</Pill>)}</div>
              <div className="mt-5 flex flex-col gap-2">{developer.reasons?.map((reason) => <div key={reason} className="inline-flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>{reason}</span></div>)}</div>
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
                <div className="flex items-center justify-between"><span>Rating</span><span className="font-semibold text-slate-900">{developer.rating}</span></div>
                <div className="flex items-center justify-between"><span>Experience</span><span className="font-semibold text-slate-900">{developer.years} years</span></div>
                <div className="flex items-center justify-between"><span>Availability</span><span className="font-semibold text-slate-900">{developer.availability}</span></div>
              </div>
              <button className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">Request booking</button>
              <button className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50">Shortlist developer</button>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}

export default function HomePage() {
  const [page, setPage] = useState("marketplace");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDeveloper, setActiveDeveloper] = useState(null);
  const [prompt, setPrompt] = useState(examplePrompts[0]);
  const [submittedPrompt, setSubmittedPrompt] = useState(examplePrompts[0]);
  const [filters, setFilters] = useState({ query: "", stack: "All stacks", availability: "Any availability", maxRate: 900 });

  return (
    <div className="min-h-screen bg-[#f6f6f3] text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="min-w-0 flex-1">
          <AppHeader setMobileOpen={setMobileOpen} />
          <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 xl:py-8">
            {page === "marketplace" ? <MarketplacePage prompt={prompt} setPrompt={setPrompt} filters={filters} setFilters={setFilters} submittedPrompt={submittedPrompt} onGenerate={() => setSubmittedPrompt(prompt)} onOpen={setActiveDeveloper} /> : null}
            {page === "bookings" ? <BookingsPage /> : null}
            {page === "developers" ? <DevelopersPage /> : null}
            {page === "admin" ? <AdminPage /> : null}
          </main>
        </div>
      </div>
      <ProfileModal developer={activeDeveloper} onClose={() => setActiveDeveloper(null)} />
    </div>
  );
}
