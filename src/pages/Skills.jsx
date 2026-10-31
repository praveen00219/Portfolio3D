import { useState } from "react";
import { motion } from "framer-motion";
import SectionHead from "../components/common/SectionHead";
import SkillTabs from "../components/skills/SkillTabs";
import Honeycomb from "../components/skills/Honeycomb";
import { usePerRow } from "../hooks/usePerRow";
import { reveal } from "../lib/motion";
import { skills } from "../data";

export default function Skills({ id }) {
  const [tab, setTab] = useState(0);
  const perRow = usePerRow();
  return (
    <section id={id} className="section">
      <SectionHead kicker="04 · My toolbox" title="Skills" />
      <motion.div className="glass skills-box" {...reveal}>
        <SkillTabs tab={tab} setTab={setTab} />
        <Honeycomb group={skills[tab]} perRow={perRow} />
      </motion.div>
    </section>
  );
}
