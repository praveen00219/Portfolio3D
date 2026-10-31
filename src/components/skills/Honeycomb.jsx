import { motion, AnimatePresence } from "framer-motion";
import { SkillIcon, getIcon } from "../../skillIcons";

// Split items into honeycomb rows: full row, then one less, then full...
function toRows(items, perRow) {
  const rows = [];
  let i = 0;
  let r = 0;
  while (i < items.length) {
    const size = r % 2 === 0 ? perRow : perRow - 1;
    rows.push(items.slice(i, i + size));
    i += size;
    r++;
  }
  return rows;
}

export default function Honeycomb({ group, perRow }) {
  const rows = toRows(group.items, perRow);
  let n = 0;
  return (
    <AnimatePresence mode="wait">
      <motion.div key={group.group} className="honeycomb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
        {rows.map((row, ri) => (
          // A partial last row with the same parity as the row above would sit straight under it; nudge it half a cell
          <div key={ri} className={`hc-row${ri > 0 && row.length % 2 === rows[ri - 1].length % 2 ? " hc-shift" : ""}`}>
            {row.map((s) => {
              const ic = getIcon(s);
              const d = n++ * 0.035;
              return (
                <motion.div key={s} className="hex" style={{ "--c": ic.color }} initial={{ opacity: 0, scale: 0.4, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: d }}>
                  <div className="hex-in">
                    <span className="hex-icon">
                      <SkillIcon name={s} size={34} />
                    </span>
                    <span className="hex-name">{s}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
