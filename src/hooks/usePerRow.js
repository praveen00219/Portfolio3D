import { useEffect, useState } from "react";

export function usePerRow() {
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
