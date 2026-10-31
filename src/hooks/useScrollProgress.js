import { useEffect } from "react";
import { useScroll, useSpring } from "framer-motion";
import { scrollState } from "../scroll";

// Page scroll progress as a smoothed motion value; also feeds the 3D scene via scrollState.
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useEffect(() => scrollYProgress.on("change", (v) => (scrollState.progress = v)), [scrollYProgress]);
  return bar;
}
