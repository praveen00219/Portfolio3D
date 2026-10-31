import { motion } from "framer-motion";
import { reveal } from "../../lib/motion";
import { projects } from "../../data";

export default function ProjectFilters({ filter, setFilter }) {
  return (
    <motion.div className="filters" {...reveal}>
      {["All", "MERN", "React"].map((f) => (
        <button key={f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
          {f}
          <span className="f-count">{f === "All" ? projects.length : projects.filter((p) => p.type === f).length}</span>
        </button>
      ))}
    </motion.div>
  );
}
