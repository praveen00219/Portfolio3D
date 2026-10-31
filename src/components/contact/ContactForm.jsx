import { useState } from "react";
import { motion } from "framer-motion";
import { reveal } from "../../lib/motion";
import { profile } from "../../data";

const INTERESTS = ["Full-time role", "Freelance project", "Just saying hi"];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", interest: INTERESTS[0], message: "" });
  const [touched, setTouched] = useState(false);
  const errors = {
    name: !form.name.trim() && "Please enter your name",
    email: !/\S+@\S+\.\S+/.test(form.email) && "Please enter a valid email",
    message: form.message.trim().length < 10 && "Message should be at least 10 characters",
  };
  const ok = !errors.name && !errors.email && !errors.message;

  const send = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!ok) return;
    const subject = encodeURIComponent(`[${form.interest}] Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})\nInterested in: ${form.interest}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const field = (name) => (touched && errors[name] ? "invalid" : "");

  return (
    <motion.form className="glass ct-form" onSubmit={send} noValidate {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
      <div className="ct-two">
        <label className={field("name")}>
          Name
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" autoComplete="name" />
          {touched && errors.name && <span className="err">{errors.name}</span>}
        </label>
        <label className={field("email")}>
          Email
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" autoComplete="email" />
          {touched && errors.email && <span className="err">{errors.email}</span>}
        </label>
      </div>
      <div className="ct-field">
        <span className="ct-label">I&apos;m interested in</span>
        <div className="ct-chips" role="radiogroup">
          {INTERESTS.map((it) => (
            <button type="button" key={it} role="radio" aria-checked={form.interest === it} className={form.interest === it ? "on" : ""} onClick={() => setForm({ ...form, interest: it })}>
              {it}
            </button>
          ))}
        </div>
      </div>
      <label className={field("message")}>
        Message
        <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={form.interest === "Full-time role" ? "Tell me about the role, team and location" : form.interest === "Freelance project" ? "Tell me about your project, timeline and budget" : "Say hello!"} />
        {touched && errors.message && <span className="err">{errors.message}</span>}
      </label>
      <button className="btn primary ct-send" type="submit">
        Send message <span>→</span>
      </button>
      <p className="ct-note">Opens your email app with the message ready to send.</p>
    </motion.form>
  );
}
