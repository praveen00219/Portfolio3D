import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function Counter({ value, suffix }) {
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
