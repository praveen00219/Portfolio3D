import { useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "../components/common/Typewriter";
import SocialLinks from "../components/common/SocialLinks";
import FloatCard from "../components/hero/FloatCard";
import { profile } from "../data";

export default function Hero({ id }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    if (window.innerWidth < 760) return;
    setMouse({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
  };
  const words = [
    ["I build ", false],
    ["secure", true],
    [" & ", false],
    ["scalable", true],
    [" web apps.", false],
  ];
  return (
    <section className="hero" id={id} onMouseMove={onMove}>
      <div className="hero-grid">
        <div className="hero-txt">
          <motion.div className="badge" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <span className="dot" /> Open to work · {profile.location}
          </motion.div>
          <h1 className="hero-h1">
            {words.map(([w, g], i) => (
              <motion.span key={i} className={g ? "grad-word" : ""} initial={{ opacity: 0, y: 40, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.35 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.p className="hero-lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}>
            Hi, I&apos;m <b>{profile.name}</b> — <Typewriter words={profile.roles} />
          </motion.p>
          <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}>
            Working with React, TypeScript, Node.js and .NET — from clean UIs to APIs, databases and payments.
          </motion.p>
          <motion.div className="cta-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }}>
            <a href="#projects" className="btn primary">
              View my work
            </a>
            <a href="#contact" className="btn ghost">
              Let&apos;s talk
            </a>
          </motion.div>
          <motion.div className="social-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
            <SocialLinks />
          </motion.div>
        </div>

        <motion.div className="hero-photo" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <motion.div className="photo-frame" style={{ rotateY: mouse.x * 3, rotateX: -mouse.y * 3 }}>
            <img src={profile.avatar} alt="Praveen" />
          </motion.div>

          <FloatCard className="fc1" delay={0} depth={1.6} mouse={mouse}>
            <b className="fc-big">{profile.years} yrs</b>
            <span>Experience</span>
          </FloatCard>
        </motion.div>
      </div>
      <a href="#about" className="scroll-hint" aria-label="Scroll down">
        <span />
        Scroll to explore
      </a>
    </section>
  );
}
