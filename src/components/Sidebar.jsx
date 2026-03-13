import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  CreditCard,
  LayoutDashboard,
  Sparkles,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Pill from "./Pill";

export default function Sidebar({ mobileOpen, setMobileOpen, signedIn }) {
  const nav = [
    { id: "/", label: "Home", icon: Sparkles },
    { id: "/pricing", label: "Pricing", icon: CreditCard },
    { id: "/resources", label: "Resources", icon: BookOpen },
    { id: "/jobs", label: "Jobs", icon: Briefcase },
    { id: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  const content = (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="mb-8 flex items-center justify-between lg:block">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Dev by Gitwork</p>
            <h1 className="mt-2 text-lg font-semibold text-white">Developer subscriptions</h1>
          </div>
          <button
            className="rounded-xl border border-white/10 p-2 text-slate-300 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="space-y-2">
          {nav.map(({ id, label, icon: Icon }) => (
            <NavLink
              key={id}
              to={id}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-cyan-400/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <Pill tone={signedIn ? "green" : "amber"}>{signedIn ? "Signed in" : "Guest mode"}</Pill>
        <p className="mt-3 text-sm text-slate-300">
          {signedIn
            ? "Your account is active. Explore the member area and upgrade paths."
            : "Browse the shell first. Sign in to test upgrade and member interactions."}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/70 lg:hidden"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              className="fixed inset-y-0 left-0 z-50 w-80 border-r border-white/10 bg-slate-950 p-6 lg:hidden"
            >
              {content}
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
