import { motion } from "framer-motion";
import SectionHead from "../components/common/SectionHead";
import Counter from "../components/common/Counter";
import CompanyLogo from "../components/common/CompanyLogo";
import { profile, stats, experience } from "../data";

export default function About({ id }) {
  const now = experience.find((e) => e.current) || experience[0];
  const tile = (i) => ({
    initial: { opacity: 0, y: 30, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  });
  return (
    <section id={id} className="section">
      <SectionHead kicker="01 · Who I am" title="About me" />
      <div className="ab-bento">
        <motion.div className="glass ab-tile ab-intro" {...tile(0)}>
          <div className="ab-av">
            <img src={profile.avatar} alt="Praveen" />
          </div>
          <div>
            <span className="ab-kick">Hello 👋</span>
            <h3>I&apos;m {profile.name}</h3>
            <p>{profile.intro}</p>
          </div>
        </motion.div>

        <motion.div className="glass ab-tile ab-now" {...tile(1)}>
          <span className="ab-kick">
            <span className="dot" /> Currently
          </span>
          <b>{now.role}</b>
          <span className="ab-co">
            <CompanyLogo job={now} className="ab-logo" />
            {now.company}
          </span>
          <span className="ab-muted">{now.period}</span>
          <span className="ab-muted">📍 {now.place}</span>
        </motion.div>

        {stats.map((s, i) => (
          <motion.div key={s.label} className="glass ab-tile ab-stat" {...tile(2 + i)}>
            <strong>
              <Counter value={s.value} suffix={s.suffix} />
            </strong>
            <span>{s.label}</span>
          </motion.div>
        ))}

        <motion.div className="glass ab-tile ab-loc" {...tile(5)}>
          <div className="ab-globe" aria-hidden="true">
            <div className="ab-globe-grid" />
            <span className="ab-pin" />
          </div>
          <span className="ab-kick">Based in</span>
          <b>{profile.location}</b>
          <span className="ab-muted">Open to work · On-site / Remote</span>
        </motion.div>
      </div>
    </section>
  );
}
