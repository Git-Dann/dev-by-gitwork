import { motion } from "framer-motion";
import { ChevronRight, Lock } from "lucide-react";
import Pill from "./Pill";

export default function ResourceCard({ item, locked, onOpen }) {
  return (
    <motion.button
      whileHover={{ y: -3 }}
      onClick={() => onOpen(item)}
      className="w-full rounded-3xl border border-white/10 bg-slate-950/60 p-5 text-left"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Pill>{item.type}</Pill>
          <Pill tone={item.access === "Free" ? "green" : "cyan"}>{item.access}</Pill>
        </div>
        {locked ? <Lock className="h-4 w-4 text-slate-500" /> : <ChevronRight className="h-4 w-4 text-slate-500" />}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
      <p className="mt-2 text-sm text-slate-300">{item.description}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">{item.category}</p>
    </motion.button>
  );
}
