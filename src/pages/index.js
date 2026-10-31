import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Education from "./Education";
import Contact from "./Contact";

// Page order on screen. `id` is the section's anchor; entries with a `label` also appear in the nav.
export const SECTIONS = [
  { id: "top", Component: Hero },
  { id: "about", label: "About", Component: About },
  { id: "experience", label: "Experience", Component: Experience },
  { id: "projects", label: "Projects", Component: Projects },
  { id: "skills", label: "Skills", Component: Skills },
  { id: "education", label: "Education", Component: Education },
  { id: "contact", label: "Contact", Component: Contact },
];

export const NAV = SECTIONS.filter((s) => s.label);
