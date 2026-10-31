import { motion } from "framer-motion";

export default function FloatCard({ className, delay = 0, depth = 1, mouse, children }) {
  return (
    <motion.div
      className={`fc ${className}`}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1, x: mouse.x * depth * 14, y: mouse.y * depth * 10 }}
      transition={{ opacity: { delay: 1 + delay }, scale: { delay: 1 + delay, type: "spring", stiffness: 160, damping: 16 }, x: { type: "spring", stiffness: 60, damping: 15 }, y: { type: "spring", stiffness: 60, damping: 15 } }}
    >
      <motion.div className="fc-in" animate={{ y: [0, -8, 0] }} transition={{ duration: 4 + delay * 2, repeat: Infinity, ease: "easeInOut" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
