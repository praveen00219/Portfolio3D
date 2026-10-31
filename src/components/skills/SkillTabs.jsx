import { motion } from "framer-motion";
import { skills } from "../../data";

export default function SkillTabs({ tab, setTab }) {
  return (
    <div className="sk-tabs" role="tablist">
      {skills.map((g, i) => (
        <button key={g.group} role="tab" aria-selected={tab === i} className={tab === i ? "on" : ""} onClick={() => setTab(i)}>
          {tab === i && <motion.span layoutId="sk-pill" className="sk-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
          <span className="sk-label">{g.group}</span>
          <span className="sk-count">{g.items.length}</span>
        </button>
      ))}
    </div>
  );
}
