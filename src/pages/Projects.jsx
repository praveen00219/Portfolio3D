import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHead from "../components/common/SectionHead";
import ProjectFilters from "../components/projects/ProjectFilters";
import ProjectCard from "../components/projects/ProjectCard";
import CarouselControls from "../components/projects/CarouselControls";
import { useCarouselSize } from "../hooks/useCarouselSize";
import { reveal } from "../lib/motion";
import { projects } from "../data";

export default function Projects({ id }) {
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
    <section id={id} className="section">
      <SectionHead kicker="03 · Things I built" title="Projects" />
      <ProjectFilters filter={filter} setFilter={setFilter} />

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
              return <ProjectCard key={p.name} p={p} off={off} side={side} card={card} step={step} number={projects.indexOf(p) + 1} onSelect={() => setActive(i)} />;
            })}
          </motion.div>
        </div>

        <CarouselControls list={list} active={active} count={count} paused={paused} inView={inView} go={go} setActive={setActive} />
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
