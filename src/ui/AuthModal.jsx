import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import Pill from "../components/Pill";

export default function AuthModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "Dan Lindsay",
    email: "dan@gitwork.co.uk",
    password: "",
  });

  return (
    <AnimatePresence>
      {open ? (
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
            className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/10 bg-slate-950 p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <Pill tone="cyan">Member auth</Pill>
                <h2 className="mt-4 text-2xl font-semibold text-white">Sign in to Dev by Gitwork</h2>
                <p className="mt-2 text-sm text-slate-300">This is a UI-only auth flow for the prototype.</p>
              </div>
              <button onClick={onClose} className="rounded-xl border border-white/10 p-2 text-slate-400 hover:bg-white/5">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <input
                value={form.name}
                onChange={(event) => setForm((state) => ({ ...state, name: event.target.value }))}
                placeholder="Your name"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />
              <input
                value={form.email}
                onChange={(event) => setForm((state) => ({ ...state, email: event.target.value }))}
                placeholder="Email"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((state) => ({ ...state, password: event.target.value }))}
                placeholder="Password"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>

            <button
              onClick={() => onSubmit(form)}
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:opacity-90"
            >
              Continue
            </button>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
