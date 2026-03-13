export default function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-300">{label}</p>
      <p className="mt-2 text-xs text-slate-400">{hint}</p>
    </div>
  );
}
