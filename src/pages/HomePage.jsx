import { BookOpen, Briefcase, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import SectionHeading from "../components/SectionHeading";
import StatCard from "../components/StatCard";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-8 md:p-10">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
          Sell memberships, ship premium content, and grow Dev by Gitwork.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          A clean product shell for pricing, resources, jobs, and account access.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button onClick={() => navigate("/pricing")} className="rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950">
            View plans
          </button>
          <button onClick={() => navigate("/resources")} className="rounded-2xl border border-white/10 px-6 py-3 font-semibold text-white">
            Browse resources
          </button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Active members" value="12.4k" hint="Across free and paid accounts" />
          <StatCard label="Monthly recurring revenue" value="£24.8k" hint="Mock revenue snapshot" />
          <StatCard label="Resource library" value="250+" hint="Guides, templates, workshops" />
          <StatCard label="Events this month" value="18" hint="Workshops, AMAs, live sessions" />
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Features"
          title="Built around the parts that make a paid developer platform work"
          body="You get the key surfaces: acquisition, pricing, content access, jobs, and account management."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <FeatureCard icon={Users} title="Memberships" body="Plan tiers, upgrade paths, and account states." />
          <FeatureCard icon={BookOpen} title="Content hub" body="Gated resources, category filters, and saved items." />
          <FeatureCard icon={Briefcase} title="Jobs board" body="Hiring partner roles and member-only opportunities." />
          <FeatureCard icon={Shield} title="Admin tools" body="Space for billing, churn, growth, and member analytics." />
        </div>
      </section>
    </div>
  );
}
