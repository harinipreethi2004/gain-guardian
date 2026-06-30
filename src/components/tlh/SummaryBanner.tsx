import { motion, AnimatePresence } from "framer-motion";
import { formatINR } from "@/lib/tlh/format";

export function SummaryBanner({ savings }: { savings: number }) {
  return (
    <AnimatePresence>
      {savings > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="relative overflow-hidden rounded-2xl bg-[image:var(--gradient-success)] p-4 text-white shadow-[var(--shadow-glow)]"
        >
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/20 text-xl">🎉</div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-wider text-white/80">Tax Savings</div>
              <div className="truncate text-lg font-bold tabular-nums">
                You're going to save {formatINR(savings)}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}