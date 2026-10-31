import { SkillIcon, getIcon } from "../../skillIcons";
import { socials } from "../../data";

// Just the icon links; callers supply the `.social-row` wrapper.
export default function SocialLinks({ exclude }) {
  return (
    <>
      {socials
        .filter((s) => s.name !== exclude)
        .map((s) => (
          <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name} style={{ "--c": getIcon(s.name).color }}>
            <SkillIcon name={s.name} size={20} />
          </a>
        ))}
    </>
  );
}
