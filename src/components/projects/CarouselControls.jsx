import { motion } from "framer-motion";

export default function CarouselControls({ list, active, count, paused, inView, go, setActive }) {
  return (
    <div className="cr-controls">
      <button className="cr-arrow" onClick={() => go(-1)} aria-label="Previous project">
        ←
      </button>
      <div className="cr-dots">
        {list.map((p, i) => (
          <button key={p.name} className={i === active ? "on" : ""} onClick={() => setActive(i)} aria-label={`Go to ${p.name}`}>
            {i === active && !paused && inView && <motion.span key={active} className="cr-fill" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 4.5, ease: "linear" }} />}
          </button>
        ))}
      </div>
      <span className="cr-counter">
        <b>{String(active + 1).padStart(2, "0")}</b> / {String(count).padStart(2, "0")}
      </span>
      <button className="cr-arrow" onClick={() => go(1)} aria-label="Next project">
        →
      </button>
    </div>
  );
}
