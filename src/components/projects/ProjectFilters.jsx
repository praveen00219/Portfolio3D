import { motion } from "framer-motion";
import { reveal } from "../../lib/motion";
import { CATEGORIES, inCategory } from "../../lib/projects";
import { projects } from "../../data";

export default function ProjectFilters({ filter, setFilter }) {
  return (
    <motion.div className="filters" {...reveal}>
      {CATEGORIES.map((f) => (
        <button key={f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
          {f}
          <span className="f-count">{projects.filter((p) => inCategory(p, f)).length}</span>
        </button>
      ))}
    </motion.div>
  );
}
