import { Check } from "lucide-react";
import Pill from "./Pill";

export default function PricingCard({ plan, currentPlan, onSelect }) {
  const isCurrent = currentPlan === plan.id;

  return (
    <div
      className={`rounded-[28px] border p-6 ${
        plan.featured
          ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]"
          : "border-white/10 bg-slate-950/60"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
          <p className="mt-2 text-sm text-slate-300">{plan.description}</p>
        </div>
        {plan.featured ? <Pill tone="cyan">Most popular</Pill> : null}
      </div>

      <div className="mt-8 flex items-end gap-2">
        <span className="text-5xl font-bold text-white">{plan.price === 0 ? "£0" : `£${plan.price}`}</span>
        <span className="pb-1 text-slate-400">{plan.billing}</span>
      </div>

      <ul className="mt-6 space-y-3 text-sm text-slate-200">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="mt-0.5 h-4 w-4 text-cyan-300" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan.id)}
        className={`mt-8 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${
          isCurrent
            ? "border border-white/15 bg-transparent text-white"
            : plan.featured
              ? "bg-white text-slate-950 hover:opacity-90"
              : "bg-white/5 text-white hover:bg-white/10"
        }`}
      >
        {isCurrent ? "Current plan" : plan.cta}
      </button>
    </div>
  );
}
