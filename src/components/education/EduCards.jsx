import { motion } from "framer-motion";

const eduIcon = (t) => (t.includes("MSc") ? "🎓" : t.includes("BSc") ? "📐" : t.includes("12th") ? "🏫" : t.includes("10th") ? "📘" : "💻");

const pop = (i) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
});

export function EduFeatured({ edu }) {
  return (
    <motion.article className="glass edu-feat" {...pop(0)}>
      <span className="edu-ic">{eduIcon(edu.title)}</span>
      <div className="edu-feat-body">
        <div className="edu-feat-top">
          <div>
            <h3>{edu.title}</h3>
            <p className="ab-muted">{edu.place}</p>
          </div>
          <span className="pill">{edu.period}</span>
        </div>
        <ul className="points">
          {edu.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        {edu.link && (
          <a className="text-link" href={edu.link} target="_blank" rel="noreferrer">
            View certificate ↗
          </a>
        )}
      </div>
    </motion.article>
  );
}

export function EduCard({ edu, index }) {
  return (
    <motion.article className="glass edu-card" {...pop(index)}>
      <span className="edu-ic sm">{eduIcon(edu.title)}</span>
      <h3>{edu.title}</h3>
      <p className="ab-muted">{edu.place}</p>
      <span className="pill">{edu.period}</span>
    </motion.article>
  );
}
