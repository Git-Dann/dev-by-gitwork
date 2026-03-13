export default function Pill({ children, tone = "default" }) {
  const tones = {
    default: "bg-white/5 text-slate-300 border-white/10",
    cyan: "bg-cyan-400/10 text-cyan-200 border-cyan-400/20",
    green: "bg-emerald-400/10 text-emerald-200 border-emerald-400/20",
    amber: "bg-amber-400/10 text-amber-200 border-amber-400/20",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${tones[tone]}`}>
      {children}
    </span>
  );
}
