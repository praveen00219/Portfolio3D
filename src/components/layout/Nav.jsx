import { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { useActiveSection } from "../../hooks/useActiveSection";
import { profile } from "../../data";

export default function Nav({ links, theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(links);
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
        {links.map((n) => (
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
