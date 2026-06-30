import { motion, AnimatePresence } from "framer-motion";

export function AnimatedNumber({ value, className }: { value: string; className?: string }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -6, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className={className}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}