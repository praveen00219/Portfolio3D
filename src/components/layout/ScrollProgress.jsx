import { motion } from "framer-motion";

export default function ScrollProgress({ bar }) {
  return <motion.div className="progress" style={{ scaleX: bar }} />;
}
