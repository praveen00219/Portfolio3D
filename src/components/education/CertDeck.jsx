import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { reveal } from "../../lib/motion";
import { certificates } from "../../data";

export default function CertDeck() {
  const n = certificates.length;
  const [order, setOrder] = useState(() => certificates.map((_, i) => i));
  const [leaving, setLeaving] = useState(null); // { id, dir }
  const busy = useRef(false);
  const top = order[0];

  const next = (dir = 1) => {
    if (busy.current) return;
    busy.current = true;
    setLeaving({ id: top, dir });
    setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setLeaving(null);
      busy.current = false;
    }, 320);
  };
  const prev = () => {
    if (busy.current) return;
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  };
  const onKey = (e) => {
    if (e.key === "ArrowRight") next(1);
    if (e.key === "ArrowLeft") prev();
  };
  const current = certificates[top];

  return (
    <motion.div className="deck-wrap" tabIndex={0} onKeyDown={onKey} aria-roledescription="carousel" aria-label="Certificates" {...reveal}>
      <div className="deck-meta">
        <span>
          <b>{String((top % n) + 1).padStart(2, "0")}</b> / {String(n).padStart(2, "0")}
        </span>
        <span className="deck-tip">Swipe or click the card</span>
      </div>
      <div className="deck">
        {certificates.map((c, i) => {
          const depth = order.indexOf(i);
          const isTop = depth === 0;
          const isLeaving = leaving?.id === i;
          const shown = Math.min(depth, 3);
          const anim = isLeaving
            ? { x: leaving.dir * 420, y: -30, rotate: leaving.dir * 22, opacity: 0, scale: 1 }
            : { x: shown * 12, y: shown * 14, rotate: shown * 3.2, scale: 1 - shown * 0.045, opacity: depth > 3 ? 0 : 1 };
          return (
            <motion.article
              key={c.title + c.by + c.date}
              className={`glass deck-card${isTop ? " top" : ""}`}
              style={{ zIndex: n - depth + (isLeaving ? n : 0), pointerEvents: isTop ? "auto" : "none" }}
              initial={false}
              animate={anim}
              transition={isLeaving ? { duration: 0.32, ease: "easeIn" } : { type: "spring", stiffness: 260, damping: 26 }}
              drag={isTop && !leaving ? true : false}
              dragSnapToOrigin
              dragElastic={0.6}
              whileDrag={{ scale: 1.03, cursor: "grabbing" }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500) next(info.offset.x > 0 ? 1 : -1);
              }}
              onTap={(e) => {
                if (isTop && !e.target.closest("a")) next(1);
              }}
              aria-hidden={!isTop}
            >
              <div className="deck-img" style={{ filter: isTop ? "none" : `brightness(${1 - shown * 0.18})` }}>
                <img src={c.img} alt={isTop ? `${c.title} certificate` : ""} draggable={false} loading="lazy" />
              </div>
              <div className="deck-info">
                <div className="deck-by">
                  <img src={c.logo} alt="" className="deck-logo" draggable={false} />
                  <span className="cert-by">{c.by}</span>
                  <span className="ab-muted">· {c.date}</span>
                </div>
                <h3>{c.title}</h3>
                <div className="deck-row">
                  <div className="deck-tags">
                    {c.skills.slice(0, 3).map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                  <a href={c.url} target="_blank" rel="noreferrer" className="deck-view" tabIndex={isTop ? 0 : -1}>
                    View ↗
                  </a>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
      <div className="deck-ctl">
        <button className="cr-arrow" onClick={prev} aria-label="Previous certificate">
          ←
        </button>
        <button className="deck-shuffle" onClick={() => next(1)}>
          <span>⟳</span> Next card
        </button>
        <button className="cr-arrow" onClick={() => next(1)} aria-label="Next certificate">
          →
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {current.title} by {current.by}
      </span>
    </motion.div>
  );
}
