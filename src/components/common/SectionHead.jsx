import { motion } from "framer-motion";
import { reveal } from "../../lib/motion";

export default function SectionHead({ kicker, title }) {
  return (
    <motion.header className="section-head" {...reveal}>
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
    </motion.header>
  );
}
