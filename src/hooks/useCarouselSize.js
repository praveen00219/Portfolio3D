import { useEffect, useState } from "react";

export function useCarouselSize() {
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
