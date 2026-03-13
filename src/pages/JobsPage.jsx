import Pill from "../components/Pill";
import SectionHeading from "../components/SectionHeading";
import { jobs } from "../data/jobs";

export default function JobsPage() {
  return (
    <div>
      <SectionHeading
        eyebrow="Jobs"
        title="A compact jobs board for members and partners"
        body="A simple route for hiring partners, sponsorships, and member-only roles."
      />

      <div className="mt-8 grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{job.title}</h3>
              <p className="mt-1 text-sm text-slate-300">{job.company}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill>{job.type}</Pill>
              <Pill tone="cyan">{job.level}</Pill>
              <button className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950">
                View role
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
