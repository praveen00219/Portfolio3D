import { useState } from "react";
import { motion } from "framer-motion";
import { reveal } from "../../lib/motion";
import SocialLinks from "../common/SocialLinks";
import { profile, socials } from "../../data";

export default function ContactInfo() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const linkedin = socials.find((s) => s.name === "LinkedIn");
  const rows = [
    { ic: "✉️", k: "Email", v: profile.email, href: `mailto:${profile.email}`, copy: true },
    { ic: "📞", k: "Phone", v: profile.phone, href: `tel:${profile.phone.replace(/-/g, "")}` },
    { ic: "📍", k: "Location", v: profile.location },
    { ic: "💼", k: "LinkedIn", v: "in/praveen219", href: linkedin?.href, ext: true },
  ];

  return (
    <motion.div className="ct-left" {...reveal}>
      <h3 className="ct-title">
        Let&apos;s build <span className="grad-word">something</span> great.
      </h3>
      <p className="ct-lead">Open to full-time roles and freelance work. I usually reply within a day.</p>
      <div className="ct-rows">
        {rows.map((r, i) => {
          const Tag = r.href ? "a" : "div";
          return (
            <motion.div key={r.k} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
              <Tag className={`glass ct-row${r.href ? " link" : ""}`} {...(r.href ? { href: r.href, ...(r.ext ? { target: "_blank", rel: "noreferrer" } : {}) } : {})}>
                <span className="ct-ic">{r.ic}</span>
                <span className="ct-txt">
                  <span className="ct-k">{r.k}</span>
                  <b>{r.v}</b>
                </span>
                {r.copy ? (
                  <button type="button" className={`ct-copy${copied ? " done" : ""}`} onClick={copyEmail}>
                    {copied ? "Copied ✓" : "Copy"}
                  </button>
                ) : r.href ? (
                  <span className="ct-arr">↗</span>
                ) : null}
              </Tag>
            </motion.div>
          );
        })}
      </div>
      <div className="social-row left">
        <SocialLinks exclude="LinkedIn" />
      </div>
    </motion.div>
  );
}
