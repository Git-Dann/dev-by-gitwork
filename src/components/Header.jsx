import { Bell, Menu } from "lucide-react";
import { plans } from "../data/plans";
import Pill from "./Pill";

export default function Header({ signedIn, setSignedIn, setAuthOpen, setMobileOpen, selectedPlan }) {
  const planName = plans.find((plan) => plan.id === selectedPlan)?.name ?? selectedPlan;

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/75 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <button
            className="rounded-xl border border-white/10 p-2 text-slate-300 lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </button>
          <div>
            <p className="text-sm font-medium text-white">Dev by Gitwork</p>
            <p className="text-xs text-slate-400">Subscription platform shell</p>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Pill tone="cyan">Plan: {planName}</Pill>
          <button className="rounded-xl border border-white/10 p-2 text-slate-300 hover:bg-white/5">
            <Bell className="h-4 w-4" />
          </button>
          {signedIn ? (
            <button
              onClick={() => setSignedIn(false)}
              className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/5"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:opacity-90"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
