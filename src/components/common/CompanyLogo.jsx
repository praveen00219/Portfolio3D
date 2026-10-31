import { useState } from "react";

// Company logo tile; falls back to the initials (job.logo) if the image is missing or fails to load.
// With `href` it becomes a mouse-only link: callers keep the company name as the accessible link.
export default function CompanyLogo({ job, className, href }) {
  const [ok, setOk] = useState(true);
  const showImg = job.logoImg && ok;
  const Tag = href ? "a" : "div";
  return (
    <Tag className={`${className}${showImg ? " has-img" : ""}`} {...(href ? { href, target: "_blank", rel: "noreferrer", tabIndex: -1, "aria-hidden": true } : {})}>
      {showImg ? <img src={job.logoImg} alt="" onError={() => setOk(false)} /> : job.logo}
    </Tag>
  );
}
