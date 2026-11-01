import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reveal } from "../../lib/motion";
import CompanyLogo from "../common/CompanyLogo";
import { periodDuration } from "../../lib/duration";

export default function JobCard({ job, index }) {
  const [open, setOpen] = useState(false);
  const SHOW = 3;
  const visible = open ? job.points : job.points.slice(0, SHOW);
  const hidden = job.points.length - SHOW;
  const dur = periodDuration(job.period);
  return (
    <motion.article className={`job-card${job.current ? " current" : ""}`} {...reveal} transition={{ ...reveal.transition, delay: index * 0.1 }}>
      <span className="tl-node">
        <span />
      </span>
      <div className="job-inner">
        <header className="jc-head">
          <CompanyLogo job={job} className="jc-logo" href={job.website} />
          <div className="jc-title">
            <h3>{job.role}</h3>
            <p className="jc-company">
              {job.website ? (
                <a href={job.website} target="_blank" rel="noreferrer">
                  {job.company} <span className="jc-ext">↗</span>
                </a>
              ) : (
                job.company
              )}
            </p>
            {job.project && <p className="jc-project">{job.project}</p>}
          </div>
          <div className="jc-when">
            {job.current && (
              <span className="live">
                <span className="dot" /> Current
              </span>
            )}
            <span className="jc-period">
              {job.period}
              {dur && <span className="jc-dur"> · {dur}</span>}
            </span>
          </div>
        </header>

        <div className="jc-tags">
          <span className="tag">📍 {job.place}</span>
          <span className="tag">{job.type === "Remote" ? "🌐" : "🏢"} {job.type}</span>
        </div>

        {job.metrics && (
          <div className="jc-metrics">
            {job.metrics.map((m) => (
              <div key={m.label} className="metric">
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        )}

        <ul className="jc-points">
          <AnimatePresence initial={false}>
            {visible.map((p) => (
              <motion.li key={p} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                {p}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {hidden > 0 && (
          <button className="jc-more" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? "Show less" : `Show ${hidden} more`}
            <span className={open ? "arrow up" : "arrow"}>⌄</span>
          </button>
        )}

        <div className="jc-stack">
          {job.stack.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
