import { AnimatePresence, motion } from "framer-motion";
import { Lock, X } from "lucide-react";
import Pill from "../components/Pill";

export default function ResourceModal({ item, selectedPlan, onClose }) {
  if (!item) return null;
  const locked = item.access === "Pro" && selectedPlan === "starter";

  return (
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-slate-950/75"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/10 bg-slate-950 p-6 shadow-2xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap gap-2">
                <Pill>{item.type}</Pill>
                <Pill tone={item.access === "Free" ? "green" : "cyan"}>{item.access}</Pill>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
            </div>
            <button onClick={onClose} className="rounded-xl border border-white/10 p-2 text-slate-400 hover:bg-white/5">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
            {locked ? (
              <>
                <div className="flex items-center gap-3 text-cyan-300">
                  <Lock className="h-4 w-4" />
                  <p className="text-sm font-medium">This resource is locked on Starter</p>
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  Upgrade to Pro to access premium guides, workshops, and templates.
                </p>
                <button className="mt-5 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:opacity-90">
                  Upgrade to unlock
                </button>
              </>
            ) : (
              <>
                <p className="text-sm text-slate-300">
                  Preview area: this is where the full content view, embedded video, download link, or CMS-rendered body would appear.
                </p>
                <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm leading-7 text-slate-300">
                  You are looking at a frontend prototype. Wire this section to your backend or CMS and it becomes real product behaviour.
                </div>
              </>
            )}
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
