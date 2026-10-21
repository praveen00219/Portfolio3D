import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion, AnimatePresence, useInView, useScroll, useSpring } from "framer-motion";
import { scrollState } from "./scroll";
import { SkillIcon, getIcon } from "./skillIcons";
import { themes, getTheme, DEFAULT_THEME } from "./themes";
import { profile, socials, stats, experience, projects, skills, education, certificates } from "./data";

const Scene = lazy(() => import("./Scene"));

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

function SectionHead({ kicker, title }) {
  return (
    <motion.header className="section-head" {...reveal}>
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
    </motion.header>
  );
}

function Typewriter({ words }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del && text === word) return setDel(true);
        if (del && text === "") {
          setDel(false);
          return setI((v) => v + 1);
        }
        setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      },
      !del && text === word ? 1600 : del ? 35 : 70
    );
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return (
    <span className="typer">
      {text}
      <span className="caret">|</span>
    </span>
  );
}

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let id;
    const tick = (now) => {
      const p = Math.min((now - start) / 1600, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 4))));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

const THEME_KEY = "praveen-portfolio-theme";

function readTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved && themes.some((t) => t.id === saved)) return saved;
  } catch {
    /* storage blocked: fall back to default */
  }
  return DEFAULT_THEME;
}

function ThemeSwitcher({ theme, setTheme }) {
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

function Nav({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <nav className="nav">
      <a href="#top" className="logo" onClick={() => setOpen(false)}>
        P<span>.</span>
      </a>
      <div className="nav-right">
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
        <button className="menu-btn" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
        </button>
      </div>
      <ul className={open ? "open" : ""}>
        {NAV.map((n) => (
          <li key={n.id}>
            <a href={`#${n.id}`} className={active === n.id ? "active" : ""} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          </li>
        ))}
        <li>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="nav-cta">
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}

const HERO_STACK = ["React.js", "TypeScript", "Node.js", ".NET 8", "MongoDB"];

function FloatCard({ className, delay = 0, depth = 1, mouse, children }) {
  return (
    <motion.div
      className={`fc ${className}`}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1, x: mouse.x * depth * 14, y: mouse.y * depth * 10 }}
      transition={{ opacity: { delay: 1 + delay }, scale: { delay: 1 + delay, type: "spring", stiffness: 160, damping: 16 }, x: { type: "spring", stiffness: 60, damping: 15 }, y: { type: "spring", stiffness: 60, damping: 15 } }}
    >
      <motion.div className="fc-in" animate={{ y: [0, -8, 0] }} transition={{ duration: 4 + delay * 2, repeat: Infinity, ease: "easeInOut" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const now = experience.find((e) => e.current) || experience[0];
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
    <section className="hero" id="top" onMouseMove={onMove}>
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
            {socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name} style={{ "--c": getIcon(s.name).color }}>
                <SkillIcon name={s.name} size={20} />
              </a>
            ))}
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

function About() {
  const now = experience.find((e) => e.current) || experience[0];
  const tile = (i) => ({
    initial: { opacity: 0, y: 30, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  });
  return (
    <section id="about" className="section">
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
          <span className="ab-co">@ {now.company}</span>
          <span className="ab-muted">{now.period}</span>
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

function JobCard({ job, index }) {
  const [open, setOpen] = useState(false);
  const SHOW = 3;
  const visible = open ? job.points : job.points.slice(0, SHOW);
  const hidden = job.points.length - SHOW;
  return (
    <motion.article className={`job-card${job.current ? " current" : ""}`} {...reveal} transition={{ ...reveal.transition, delay: index * 0.1 }}>
      <span className="tl-node">
        <span />
      </span>
      <div className="job-inner">
        <header className="jc-head">
          <div className="jc-logo">{job.logo}</div>
          <div className="jc-title">
            <h3>{job.role}</h3>
            <p className="jc-company">{job.company}</p>
            {job.project && <p className="jc-project">{job.project}</p>}
          </div>
          <div className="jc-when">
            {job.current && (
              <span className="live">
                <span className="dot" /> Current
              </span>
            )}
            <span className="jc-period">{job.period}</span>
          </div>
        </header>

        <div className="jc-tags">
          <span className="tag">📍 {job.place}</span>
          <span className="tag">{job.type === "Remote" ? "🌐" : "🏢"} {job.type}</span>
        </div>

        {job.metrics && (
          <div className="jc-metrics">
            {job.metrics.map((m) => (
              <div key={m.label} className="metric">
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        )}

        <ul className="jc-points">
          <AnimatePresence initial={false}>
            {visible.map((p) => (
              <motion.li key={p} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                {p}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {hidden > 0 && (
          <button className="jc-more" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? "Show less" : `Show ${hidden} more`}
            <span className={open ? "arrow up" : "arrow"}>⌄</span>
          </button>
        )}

        <div className="jc-stack">
          {job.stack.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHead kicker="02 · Work history" title="Experience" />
      <div className="exp-list">
        {experience.map((job, i) => (
          <JobCard key={job.company} job={job} index={i} />
        ))}
      </div>
    </section>
  );
}

function useCarouselSize() {
  const [w, setW] = useState(typeof window === "undefined" ? 1200 : window.innerWidth);
  useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  if (w < 560) return { card: Math.min(w - 64, 300), step: 0.62, side: 1 };
  if (w < 960) return { card: 340, step: 0.68, side: 2 };
  return { card: 400, step: 0.72, side: 2 };
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const list = projects.filter((p) => filter === "All" || p.type === filter);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { card, step, side } = useCarouselSize();
  const stageRef = useRef(null);
  const inView = useInView(stageRef, { amount: 0.4 });
  const count = list.length;

  const go = (d) => setActive((a) => (a + d + count) % count);

  useEffect(() => setActive(0), [filter]);

  // Auto-play while visible; pause on hover / after user interaction.
  useEffect(() => {
    if (paused || !inView || count < 2) return;
    const t = setInterval(() => setActive((a) => (a + 1) % count), 4500);
    return () => clearInterval(t);
  }, [paused, inView, count]);

  const onKey = (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <section id="projects" className="section">
      <SectionHead kicker="03 · Things I built" title="Projects" />
      <motion.div className="filters" {...reveal}>
        {["All", "MERN", "React"].map((f) => (
          <button key={f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
            {f}
            <span className="f-count">{f === "All" ? projects.length : projects.filter((p) => p.type === f).length}</span>
          </button>
        ))}
      </motion.div>

      <motion.div
        ref={stageRef}
        className="carousel"
        tabIndex={0}
        onKeyDown={onKey}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
        aria-label="Projects"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="cr-stage-wrap">
        <motion.div
          className="cr-stage"
          style={{ "--card": `${card}px` }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragStart={() => setPaused(true)}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60 || info.velocity.x < -400) go(1);
            else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
          }}
        >
          {list.map((p, i) => {
            let off = i - active;
            if (off > count / 2) off -= count;
            if (off < -count / 2) off += count;
            const abs = Math.abs(off);
            const hidden = abs > side;
            const isActive = off === 0;
            return (
              <motion.article
                key={p.name}
                className={`cr-card glass${isActive ? " active" : ""}`}
                aria-hidden={!isActive}
                onClick={() => !isActive && setActive(i)}
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
                  <span className="cr-num">{String(projects.indexOf(p) + 1).padStart(2, "0")}</span>
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
          })}
        </motion.div>
        </div>

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
      </motion.div>

      <motion.p className="more" {...reveal}>
        Drag, swipe or use ← → keys · 60+ more projects on{" "}
        <a href="https://github.com/praveen00219" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </motion.p>
    </section>
  );
}

function usePerRow() {
  const [n, setN] = useState(6);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setN(w >= 1120 ? 7 : w >= 940 ? 6 : w >= 760 ? 5 : w >= 420 ? 4 : 3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return n;
}

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

function Skills() {
  const [tab, setTab] = useState(0);
  const perRow = usePerRow();
  const group = skills[tab];
  const rows = toRows(group.items, perRow);
  let n = 0;
  return (
    <section id="skills" className="section">
      <SectionHead kicker="04 · My toolbox" title="Skills" />
      <motion.div className="glass skills-box" {...reveal}>
        <div className="sk-tabs" role="tablist">
          {skills.map((g, i) => (
            <button key={g.group} role="tab" aria-selected={tab === i} className={tab === i ? "on" : ""} onClick={() => setTab(i)}>
              {tab === i && <motion.span layoutId="sk-pill" className="sk-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="sk-label">{g.group}</span>
              <span className="sk-count">{g.items.length}</span>
            </button>
          ))}
        </div>

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
      </motion.div>
    </section>
  );
}

function CertDeck() {
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

const eduIcon = (t) => (t.includes("MSc") ? "🎓" : t.includes("BSc") ? "📐" : t.includes("12th") ? "🏫" : t.includes("10th") ? "📘" : "💻");

function Education() {
  const [feat, ...degrees] = education;
  const pop = (i) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  });
  return (
    <section id="education" className="section">
      <SectionHead kicker="05 · Learning journey" title="Education" />
      <div className="edu-split">
        <div className="edu-left">
          <h4 className="col-head">Education</h4>
          <motion.article className="glass edu-feat" {...pop(0)}>
            <span className="edu-ic">{eduIcon(feat.title)}</span>
            <div className="edu-feat-body">
              <div className="edu-feat-top">
                <div>
                  <h3>{feat.title}</h3>
                  <p className="ab-muted">{feat.place}</p>
                </div>
                <span className="pill">{feat.period}</span>
              </div>
              <ul className="points">
                {feat.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {feat.link && (
                <a className="text-link" href={feat.link} target="_blank" rel="noreferrer">
                  View certificate ↗
                </a>
              )}
            </div>
          </motion.article>
          <div className="edu-grid">
            {degrees.map((d, i) => (
              <motion.article key={d.title} className="glass edu-card" {...pop(i + 1)}>
                <span className="edu-ic sm">{eduIcon(d.title)}</span>
                <h3>{d.title}</h3>
                <p className="ab-muted">{d.place}</p>
                <span className="pill">{d.period}</span>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="edu-right">
          <h4 className="col-head">
            Certificates
          </h4>
          <CertDeck />
        </div>
      </div>
    </section>
  );
}

const INTERESTS = ["Full-time role", "Freelance project", "Just saying hi"];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", interest: INTERESTS[0], message: "" });
  const [touched, setTouched] = useState(false);
  const [copied, setCopied] = useState(false);
  const errors = {
    name: !form.name.trim() && "Please enter your name",
    email: !/\S+@\S+\.\S+/.test(form.email) && "Please enter a valid email",
    message: form.message.trim().length < 10 && "Message should be at least 10 characters",
  };
  const ok = !errors.name && !errors.email && !errors.message;

  const send = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!ok) return;
    const subject = encodeURIComponent(`[${form.interest}] Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})\nInterested in: ${form.interest}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const copyEmail = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const linkedin = socials.find((s) => s.name === "LinkedIn");
  const rows = [
    { ic: "✉️", k: "Email", v: profile.email, href: `mailto:${profile.email}`, copy: true },
    { ic: "📞", k: "Phone", v: profile.phone, href: `tel:${profile.phone.replace(/-/g, "")}` },
    { ic: "📍", k: "Location", v: profile.location },
    { ic: "💼", k: "LinkedIn", v: "in/praveen219", href: linkedin?.href, ext: true },
  ];

  const field = (name) => (touched && errors[name] ? "invalid" : "");

  return (
    <section id="contact" className="section contact">
      <SectionHead kicker="06 · Say hello" title="Get in touch" />
      <div className="ct-grid">
        <motion.div className="ct-left" {...reveal}>
          <h3 className="ct-title">
            Let&apos;s build <span className="grad-word">something</span> great.
          </h3>
          <p className="ct-lead">Open to full-time roles and freelance work. I usually reply within a day.</p>
          <div className="ct-rows">
            {rows.map((r, i) => {
              const Tag = r.href ? "a" : "div";
              return (
                <motion.div key={r.k} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
                  <Tag className={`glass ct-row${r.href ? " link" : ""}`} {...(r.href ? { href: r.href, ...(r.ext ? { target: "_blank", rel: "noreferrer" } : {}) } : {})}>
                    <span className="ct-ic">{r.ic}</span>
                    <span className="ct-txt">
                      <span className="ct-k">{r.k}</span>
                      <b>{r.v}</b>
                    </span>
                    {r.copy ? (
                      <button type="button" className={`ct-copy${copied ? " done" : ""}`} onClick={copyEmail}>
                        {copied ? "Copied ✓" : "Copy"}
                      </button>
                    ) : r.href ? (
                      <span className="ct-arr">↗</span>
                    ) : null}
                  </Tag>
                </motion.div>
              );
            })}
          </div>
          <div className="social-row left">
            {socials
              .filter((s) => s.name !== "LinkedIn")
              .map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name} style={{ "--c": getIcon(s.name).color }}>
                  <SkillIcon name={s.name} size={20} />
                </a>
              ))}
          </div>
        </motion.div>

        <motion.form className="glass ct-form" onSubmit={send} noValidate {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
          <div className="ct-two">
            <label className={field("name")}>
              Name
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" autoComplete="name" />
              {touched && errors.name && <span className="err">{errors.name}</span>}
            </label>
            <label className={field("email")}>
              Email
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" autoComplete="email" />
              {touched && errors.email && <span className="err">{errors.email}</span>}
            </label>
          </div>
          <div className="ct-field">
            <span className="ct-label">I&apos;m interested in</span>
            <div className="ct-chips" role="radiogroup">
              {INTERESTS.map((it) => (
                <button type="button" key={it} role="radio" aria-checked={form.interest === it} className={form.interest === it ? "on" : ""} onClick={() => setForm({ ...form, interest: it })}>
                  {it}
                </button>
              ))}
            </div>
          </div>
          <label className={field("message")}>
            Message
            <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={form.interest === "Full-time role" ? "Tell me about the role, team and location" : form.interest === "Freelance project" ? "Tell me about your project, timeline and budget" : "Say hello!"} />
            {touched && errors.message && <span className="err">{errors.message}</span>}
          </label>
          <button className="btn primary ct-send" type="submit">
            Send message <span>→</span>
          </button>
          <p className="ct-note">Opens your email app with the message ready to send.</p>
        </motion.form>
      </div>
      <footer className="footer">
        © {new Date().getFullYear()} Praveen · Built with React & Three.js
      </footer>
    </section>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => scrollYProgress.on("change", (v) => (scrollState.progress = v)), [scrollYProgress]);

  const [theme, setTheme] = useState(readTheme);
  useEffect(() => {
    const t = getTheme(theme);
    document.documentElement.dataset.theme = t.id;
    document.documentElement.style.colorScheme = t.dark ? "dark" : "light";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", t.scene.bg);
    try {
      localStorage.setItem(THEME_KEY, t.id);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return (
    <>
      <Suspense fallback={<div className="scene" />}>
        <Scene theme={getTheme(theme)} />
      </Suspense>
      <motion.div className="progress" style={{ scaleX: bar }} />
      <Nav theme={theme} setTheme={setTheme} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  );
}
