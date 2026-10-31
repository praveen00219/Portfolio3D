import { projects } from "../data";

export const inCategory = (p, f) => f === "All" || p.type === f || !!p.tags?.includes(f);

// Filter buttons in a fixed order, skipping categories with no projects.
export const CATEGORIES = ["All", ...["AI", "Full Stack", "Frontend", "Mobile"].filter((c) => projects.some((p) => inCategory(p, c)))];
