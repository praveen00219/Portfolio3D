import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { themes, getTheme } from "../../themes";

export default function ThemeSwitcher({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);
  const cur = getTheme(theme);
  return (
    <div className="theme-sw" ref={ref}>
      <button className="theme-btn" aria-label="Change theme" aria-expanded={open} onClick={() => setOpen((o) => !o)} title="Change theme">
        <span className="theme-dot" style={{ background: `linear-gradient(135deg, ${cur.swatch.join(", ")})` }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="theme-pop glass" role="menu" initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.96 }} transition={{ duration: 0.18 }}>
            <span className="theme-title">Theme</span>
            {themes.map((t) => (
              <button
                key={t.id}
                role="menuitemradio"
                aria-checked={t.id === theme}
                className={`theme-opt${t.id === theme ? " on" : ""}`}
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
              >
                <span className="theme-chip" style={{ background: t.scene.bg }}>
                  {t.swatch.map((c) => (
                    <i key={c} style={{ background: c }} />
                  ))}
                </span>
                <span className="theme-name">{t.name}</span>
                {t.id === theme && <span className="theme-check">✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
