import { motion } from "framer-motion";

// `off` is this card's signed distance from the active card; `number` is its position in the full (unfiltered) list.
export default function ProjectCard({ p, off, side, card, step, number, onSelect }) {
  const abs = Math.abs(off);
  const hidden = abs > side;
  const isActive = off === 0;
  return (
    <motion.article
      className={`cr-card glass${isActive ? " active" : ""}`}
      aria-hidden={!isActive}
      onClick={() => !isActive && onSelect()}
      initial={false}
      animate={{
        x: Math.max(-side - 1, Math.min(side + 1, off)) * card * step,
        z: -abs * 180,
        rotateY: off * -32,
        scale: isActive ? 1 : 0.86,
        opacity: hidden ? 0 : 1,
        filter: isActive ? "brightness(1)" : abs === 1 ? "brightness(0.5)" : "brightness(0.28)",
      }}
      transition={{ type: "spring", stiffness: 170, damping: 24 }}
      style={{ zIndex: 20 - abs, pointerEvents: hidden ? "none" : "auto" }}
    >
      <div className="cr-img">
        {p.img ? <img src={p.img} alt={p.name} draggable={false} /> : <div className="img-fallback">{p.name.split(" ")[0]}</div>}
        <span className="pill type">{p.type}</span>
        <span className="cr-num">{String(number).padStart(2, "0")}</span>
      </div>
      <div className="cr-body">
        <h3>{p.name}</h3>
        <p>{p.desc}</p>
        <div className="project-links">
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noreferrer" tabIndex={isActive ? 0 : -1}>
              Live demo ↗
            </a>
          )}
          <a href={p.code} target="_blank" rel="noreferrer" tabIndex={isActive ? 0 : -1}>
            Code ↗
          </a>
        </div>
      </div>
    </motion.article>
  );
}
