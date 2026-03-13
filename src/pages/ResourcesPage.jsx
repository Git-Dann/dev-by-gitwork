import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import Pill from "../components/Pill";
import ResourceCard from "../components/ResourceCard";
import SectionHeading from "../components/SectionHeading";
import { plans } from "../data/plans";
import { resources } from "../data/resources";

export default function ResourcesPage() {
  const { selectedPlan, signedIn, setActiveResource } = useOutletContext();
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    return resources.filter((item) => {
      const text = `${item.title} ${item.description} ${item.type} ${item.category}`.toLowerCase();
      return text.includes(query.toLowerCase());
    });
  }, [query]);

  return (
    <div>
      <SectionHeading
        eyebrow="Resources"
        title="A member library with upgrade paths built in"
        body="Search, gate premium content, and guide free users toward the paid plans."
      />

      <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search guides, templates, workshops"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill tone="green">Signed in: {signedIn ? "Yes" : "No"}</Pill>
          <Pill tone="cyan">Plan: {plans.find((plan) => plan.id === selectedPlan)?.name}</Pill>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {visible.map((item) => {
          const locked = item.access === "Pro" && selectedPlan === "starter";
          return <ResourceCard key={item.id} item={item} locked={locked} onOpen={setActiveResource} />;
        })}
      </div>
    </div>
  );
}
