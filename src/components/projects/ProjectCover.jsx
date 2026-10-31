import { SkillIcon } from "../../skillIcons";

// Generated cover for projects without a screenshot: name, tagline and stack icons on the theme gradient.
export default function ProjectCover({ p }) {
  return (
    <div className="img-fallback cr-cover">
      <div className="cr-cover-in">
        <strong>{p.name}</strong>
        {p.tagline && <span className="cr-cover-tag">{p.tagline}</span>}
        {p.stack && (
          <div className="cr-cover-stack">
            {p.stack.slice(0, 5).map((s) => (
              <span key={s} title={s}>
                <SkillIcon name={s} size={18} />
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
