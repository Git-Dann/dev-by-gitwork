import { Lock, Star } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Pill from "../components/Pill";
import SectionHeading from "../components/SectionHeading";
import StatCard from "../components/StatCard";
import { plans } from "../data/plans";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { signedIn, selectedPlan } = useOutletContext();

  if (!signedIn) {
    return (
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center">
        <Lock className="mx-auto h-10 w-10 text-cyan-300" />
        <h2 className="mt-4 text-2xl font-semibold text-white">Dashboard locked</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-300">Sign in to test the member dashboard state.</p>
        <button onClick={() => navigate("/")} className="mt-6 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950">
          Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Dashboard"
        title="A member and revenue snapshot for Dev by Gitwork"
        body="Wire this into auth, billing, analytics, and your backend when ready."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Current plan" value={plans.find((plan) => plan.id === selectedPlan)?.name || "Starter"} hint="Mock account state" />
        <StatCard label="Saved resources" value="28" hint="Per-member content bookmarks" />
        <StatCard label="Open invoices" value="2" hint="Placeholder billing widgets" />
        <StatCard label="Community score" value="94" hint="Demo engagement metric" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Activity</p>
              <h3 className="text-xl font-semibold text-white">Recent account events</h3>
            </div>
            <Pill tone="cyan">Demo data</Pill>
          </div>
          <div className="mt-6 space-y-4">
            {[
              "Upgraded from Starter to Pro",
              "Saved React Performance Playbook",
              "Joined private Slack community",
              "Viewed 3 new job listings",
            ].map((event) => (
              <div key={event} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
                {event}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
          <p className="text-sm text-slate-400">Next steps</p>
          <h3 className="mt-1 text-xl font-semibold text-white">What to wire next</h3>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            {[
              "Authentication provider",
              "Stripe subscriptions",
              "CMS or database for resources",
              "Jobs data source",
              "Analytics and feature flags",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <Star className="mt-0.5 h-4 w-4 text-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
