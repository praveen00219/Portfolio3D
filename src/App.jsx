import { lazy, Suspense } from "react";
import { getTheme } from "./themes";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useTheme } from "./hooks/useTheme";
import Nav from "./components/layout/Nav";
import ScrollProgress from "./components/layout/ScrollProgress";
import { SECTIONS, NAV } from "./pages";

const Scene = lazy(() => import("./Scene"));

export default function App() {
  const bar = useScrollProgress();
  const [theme, setTheme] = useTheme();

  return (
    <>
      <Suspense fallback={<div className="scene" />}>
        <Scene theme={getTheme(theme)} />
      </Suspense>
      <ScrollProgress bar={bar} />
      <Nav links={NAV} theme={theme} setTheme={setTheme} />
      <main>
        {SECTIONS.map(({ id, Component }) => (
          <Component key={id} id={id} />
        ))}
      </main>
    </>
  );
}
