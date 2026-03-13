"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
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
import { availabilityOptions, bookings, developers, stacks } from "@/data/developers";
import { adminMetrics, stats } from "@/lib/marketplace-data";

function Pill({ children, tone = "default" }) {
  const tones = {
    default: "bg-white/5 text-slate-300 border-white/10",
    cyan: "bg-cyan-400/10 text-cyan-200 border-cyan-400/20",
    green: "bg-emerald-400/10 text-emerald-200 border-emerald-400/20",
    amber: "bg-amber-400/10 text-amber-200 border-amber-400/20",
  };

  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${tones[tone]}`}>{children}</span>;
}

function SectionHeading({ eyebrow, title, body }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
      <p className="mt-4 text-slate-300">{body}</p>
    </div>
  );
}

function StatCard({ label, value, hint, icon: Icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-3xl font-bold text-white">{value}</p>
          <p className="mt-1 text-sm text-slate-300">{label}</p>
          <p className="mt-2 text-xs text-slate-400">{hint}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function Sidebar({ mobileOpen, setMobileOpen, page, setPage }) {
  const nav = [
    { id: "marketplace", label: "Marketplace", icon: Search },
    { id: "bookings", label: "Bookings", icon: CalendarDays },
    { id: "developers", label: "Developers", icon: Users },
    { id: "admin", label: "Admin", icon: LayoutDashboard },
  ];

  const content = (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="mb-8 flex items-center justify-between lg:block">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Dev by Gitwork</p>
            <h1 className="mt-2 text-lg font-semibold text-white">Developer marketplace</h1>
          </div>
          <button className="rounded-xl border border-white/10 p-2 text-slate-300 lg:hidden" onClick={() => setMobileOpen(false)}>
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="space-y-2">
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setPage(id);
                setMobileOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${page === id ? "bg-cyan-400/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <Pill tone="green">Marketplace model</Pill>
        <p className="mt-3 text-sm text-slate-300">
          Clients browse developers by stack, rate, and availability, then request or book engagements.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-80 border-r border-white/10 bg-slate-950/90 p-6 lg:block">{content}</aside>
      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-slate-950/70 lg:hidden" />
            <motion.aside initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: "spring", stiffness: 240, damping: 26 }} className="fixed inset-y-0 left-0 z-50 w-80 border-r border-white/10 bg-slate-950 p-6 lg:hidden">
              {content}
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Header({ setMobileOpen }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/75 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <button className="rounded-xl border border-white/10 p-2 text-slate-300 lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="h-4 w-4" />
          </button>
          <div>
            <p className="text-sm font-medium text-white">Hire vetted developers</p>
            <p className="text-xs text-slate-400">Filter by stack, time, availability, and cost</p>
          </div>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Pill tone="cyan">1,000 developer library</Pill>
          <button className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:opacity-90">Post requirement</button>
        </div>
      </div>
    </header>
  );
}

function MarketplacePage({ filters, setFilters, onOpenProfile }) {
  const filtered = useMemo(() => {
    return developers.filter((dev) => {
      const q = filters.query.toLowerCase();
      const text = `${dev.name} ${dev.role} ${dev.skills.join(" ")} ${dev.summary}`.toLowerCase();
      const matchesQuery = text.includes(q);
      const matchesStack = filters.stack === "All" || dev.skills.includes(filters.stack);
      const matchesAvailability = filters.availability === "Any" || dev.availability === filters.availability;
      const matchesBudget = dev.rate <= filters.maxRate;
      return matchesQuery && matchesStack && matchesAvailability && matchesBudget;
    });
  }, [filters]);

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-8 md:p-10">
        <Pill tone="cyan">Marketplace rebuilt for client hiring</Pill>
        <h2 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">Book the right developer by stack, time, and cost.</h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Clients search your talent pool, check availability, compare rates, and request or book developers for the time they need.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Developer pool" value={stats.developerPool} hint="Across frontend, backend, AI, mobile, DevOps" icon={Users} />
          <StatCard label="Average fill time" value={stats.averageFillTime} hint="For common stacks and shortlists" icon={Clock3} />
          <StatCard label="Bookings managed" value={stats.bookingsManaged} hint="Across trial, project, and retained engagements" icon={CalendarDays} />
          <StatCard label="Platform margin" value={stats.platformMargin} hint="Placeholder admin margin control" icon={Wallet} />
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Search and filter" title="Find developers fast" body="This replaces the subscription flow with a marketplace search experience built around hiring." />
        <div className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-5 md:p-6">
          <div className="grid gap-4 xl:grid-cols-[1.6fr_0.9fr_0.9fr_1fr]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={filters.query}
                onChange={(e) => setFilters((s) => ({ ...s, query: e.target.value }))}
                placeholder="Search by name, stack, role, or keyword"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
            <select value={filters.stack} onChange={(e) => setFilters((s) => ({ ...s, stack: e.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none">
              {stacks.map((stack) => <option key={stack}>{stack}</option>)}
            </select>
            <select value={filters.availability} onChange={(e) => setFilters((s) => ({ ...s, availability: e.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none">
              {availabilityOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
              <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
                <span>Max day rate</span>
                <span>£{filters.maxRate}</span>
              </div>
              <input type="range" min="300" max="900" step="10" value={filters.maxRate} onChange={(e) => setFilters((s) => ({ ...s, maxRate: Number(e.target.value) }))} className="mt-3 w-full" />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-2">
          {filtered.map((dev) => (
            <motion.button key={dev.id} whileHover={{ y: -3 }} onClick={() => onOpenProfile(dev)} className="w-full rounded-[28px] border border-white/10 bg-slate-950/60 p-6 text-left">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-white">{dev.name}</h3>
                    <Pill tone="green">{dev.availability}</Pill>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{dev.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white">£{dev.rate}</p>
                  <p className="text-xs text-slate-400">{dev.bookingType}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {dev.skills.map((skill) => <Pill key={skill}>{skill}</Pill>)}
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{dev.summary}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" />{dev.location}</span>
                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{dev.timezone}</span>
                <span className="inline-flex items-center gap-2"><Star className="h-4 w-4" />{dev.rating}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}

function BookingsPage() {
  return (
    <div>
      <SectionHeading eyebrow="Bookings" title="Track requests, confirms, and engagement value" body="This area is for client bookings, start dates, contract windows, and extensions." />
      <div className="mt-8 grid gap-4">
        {bookings.map((item) => (
          <div key={`${item.client}-${item.developer}`} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{item.client} → {item.developer}</h3>
                <p className="mt-1 text-sm text-slate-300">{item.stack} · {item.dates}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Pill tone={item.status === "Confirmed" ? "green" : item.status === "Pending" ? "amber" : "cyan"}>{item.status}</Pill>
                <span className="text-sm font-semibold text-white">{item.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DevelopersPage() {
  return (
    <div>
      <SectionHeading eyebrow="Developer supply" title="Manage your talent inventory" body="Admin can review profiles, rates, availability, and stack coverage across the whole bench." />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active this week" value="684" hint="Currently bookable" icon={CalendarDays} />
        <StatCard label="Top stack gap" value="Go" hint="Demand exceeds supply" icon={Code2} />
        <StatCard label="Avg day rate" value="£545" hint="Across active profiles" icon={PoundSterling} />
        <StatCard label="Vetted profiles" value="91%" hint="Completed screening" icon={ShieldCheck} />
      </div>
    </div>
  );
}

function AdminPage() {
  return (
    <div>
      <SectionHeading eyebrow="Admin" title="Control pricing, margin, and marketplace operations" body="This is where your ops team manages fees, ranking, supply gaps, cancellations, and performance." />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminMetrics.map((metric) => <StatCard key={metric.label} label={metric.label} value={metric.value} hint={metric.hint} icon={LayoutDashboard} />)}
      </div>
      <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-6">
        <div className="flex items-center gap-3 text-cyan-300"><SlidersHorizontal className="h-5 w-5" /><p className="font-medium">Admin controls to wire next</p></div>
        <ul className="mt-4 space-y-3 text-sm text-slate-300">
          <li>Platform fee rules and Stripe Connect payouts</li>
          <li>Developer ranking and featured placement</li>
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-slate-950/75" onClick={onClose} />
        <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 16 }} className="fixed left-1/2 top-1/2 z-50 w-[94vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/10 bg-slate-950 p-6 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap gap-2">
                <Pill tone="green">{developer.availability}</Pill>
                <Pill>{developer.seniority}</Pill>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-white">{developer.name}</h2>
              <p className="mt-2 text-sm text-slate-300">{developer.role}</p>
            </div>
            <button onClick={onClose} className="rounded-xl border border-white/10 p-2 text-slate-400 hover:bg-white/5"><X className="h-4 w-4" /></button>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm leading-7 text-slate-300">{developer.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {developer.skills.map((skill) => <Pill key={skill}>{skill}</Pill>)}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  <p className="text-slate-400">Location</p>
                  <p className="mt-1 text-white">{developer.location}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  <p className="text-slate-400">Timezone</p>
                  <p className="mt-1 text-white">{developer.timezone}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  <p className="text-slate-400">Experience</p>
                  <p className="mt-1 text-white">{developer.experience}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  <p className="text-slate-400">Engagement</p>
                  <p className="mt-1 text-white">{developer.engagement}</p>
                </div>
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Commercials</p>
              <p className="mt-2 text-3xl font-bold text-white">£{developer.rate}</p>
              <p className="text-sm text-slate-400">{developer.bookingType}</p>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between"><span>Rating</span><span className="text-white">{developer.rating}</span></div>
                <div className="flex items-center justify-between"><span>Availability</span><span className="text-white">{developer.availability}</span></div>
              </div>
              <button className="mt-6 w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:opacity-90">Request booking</button>
              <button className="mt-3 w-full rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5">Shortlist developer</button>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}

export default function MarketplaceClient() {
  const [page, setPage] = useState("marketplace");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filters, setFilters] = useState({ query: "", stack: "All", availability: "Any", maxRate: 900 });
  const [activeDeveloper, setActiveDeveloper] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} page={page} setPage={setPage} />
        <div className="min-w-0 flex-1">
          <Header setMobileOpen={setMobileOpen} />
          <main className="px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
            {page === "marketplace" ? <MarketplacePage filters={filters} setFilters={setFilters} onOpenProfile={setActiveDeveloper} /> : null}
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
