import { motion } from "framer-motion";

export default function FeatureCard({ icon: Icon, title, body }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{body}</p>
    </motion.div>
  );
}
