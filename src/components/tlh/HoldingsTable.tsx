import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Holding } from "@/lib/tlh/types";
import { useTLHStore } from "@/lib/tlh/store";
import { formatINR, formatNumber } from "@/lib/tlh/format";

type SortKey = "coin" | "currentPrice" | "stcg" | "ltcg" | null;
type SortDir = "asc" | "desc";

function GainCell({ gain, balance, symbol }: { gain: number; balance: number; symbol: string }) {
  const color = gain >= 0 ? "text-[color:var(--color-gain)]" : "text-[color:var(--color-loss)]";
  return (
    <div className="flex flex-col">
      <span className={`text-sm font-semibold tabular-nums ${color}`}>{formatINR(gain)}</span>
      <span className="text-xs text-muted-foreground tabular-nums">
        {formatNumber(balance)} {symbol}
      </span>
    </div>
  );
}

export function HoldingsTable({ holdings, loading }: { holdings: Holding[]; loading: boolean }) {
  const { selected, toggle, setMany, clear } = useTLHStore();
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [showAll, setShowAll] = useState(false);

  const sorted = useMemo(() => {
    if (!sortKey) return holdings;
    const arr = [...holdings];
    arr.sort((a, b) => {
      const get = (h: Holding): number | string => {
        if (sortKey === "coin") return h.coin;
        if (sortKey === "currentPrice") return h.currentPrice;
        if (sortKey === "stcg") return h.stcg.gain;
        if (sortKey === "ltcg") return h.ltcg.gain;
        return 0;
      };
      const av = get(a);
      const bv = get(b);
      const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [holdings, sortKey, sortDir]);

  const visible = showAll ? sorted : sorted.slice(0, 10);
  const allSelected = holdings.length > 0 && holdings.every((h) => selected[h.coin]);
  const someSelected = holdings.some((h) => selected[h.coin]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const toggleAll = () => {
    if (allSelected) clear();
    else setMany(Object.fromEntries(holdings.map((h) => [h.coin, true])));
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex animate-pulse items-center gap-4">
              <div className="h-4 w-4 rounded bg-muted" />
              <div className="h-10 w-10 rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 rounded bg-muted" />
                <div className="h-3 w-24 rounded bg-muted" />
              </div>
              <div className="h-8 w-24 rounded bg-muted" />
              <div className="h-8 w-24 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const Th = ({ children, k, className = "" }: { children: React.ReactNode; k?: SortKey; className?: string }) => (
    <th
      onClick={k ? () => handleSort(k) : undefined}
      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground ${k ? "cursor-pointer select-none hover:text-foreground" : ""} ${className}`}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {k && sortKey === k && <span>{sortDir === "asc" ? "▲" : "▼"}</span>}
      </span>
    </th>
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h3 className="text-base font-semibold">Holdings</h3>
          <p className="text-xs text-muted-foreground">
            {someSelected ? `${holdings.filter((h) => selected[h.coin]).length} selected` : "Select holdings to harvest losses"}
          </p>
        </div>
        {holdings.length > 10 && (
          <button
            onClick={() => setShowAll((s) => !s)}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
          >
            {showAll ? "Show Less" : `View All (${holdings.length})`}
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse">
          <thead className="bg-muted/40">
            <tr>
              <th className="sticky left-0 z-10 bg-muted/40 px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected && !allSelected;
                  }}
                  onChange={toggleAll}
                  className="h-4 w-4 cursor-pointer accent-[color:var(--color-primary)]"
                />
              </th>
              <Th k="coin" className="sticky left-10 z-10 bg-muted/40">Asset</Th>
              <Th>Holdings / Avg Buy</Th>
              <Th k="currentPrice">Current Price</Th>
              <Th k="stcg">Short-Term Gain</Th>
              <Th k="ltcg">Long-Term Gain</Th>
              <Th>Amount to Sell</Th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {visible.map((h) => {
                const isSel = !!selected[h.coin];
                return (
                  <motion.tr
                    key={h.coin}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => toggle(h.coin)}
                    className={`group cursor-pointer border-t border-border transition-colors ${isSel ? "bg-[color:var(--color-primary)]/5" : "hover:bg-muted/40"}`}
                  >
                    <td className={`sticky left-0 z-10 px-4 py-3 ${isSel ? "bg-[color:var(--color-primary)]/5" : "bg-card group-hover:bg-muted/40"}`}>
                      <input
                        type="checkbox"
                        checked={isSel}
                        onChange={() => toggle(h.coin)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4 cursor-pointer accent-[color:var(--color-primary)]"
                      />
                    </td>
                    <td className={`sticky left-10 z-10 px-4 py-3 ${isSel ? "bg-[color:var(--color-primary)]/5" : "bg-card group-hover:bg-muted/40"}`}>
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          src={h.logo}
                          alt={h.coin}
                          className="h-8 w-8 shrink-0 rounded-full bg-muted"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                          }}
                        />
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold">{h.coin}</div>
                          <div className="truncate text-xs text-muted-foreground">{h.coinName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium tabular-nums">{formatNumber(h.totalHolding)}</div>
                      <div className="text-xs text-muted-foreground tabular-nums">Avg {formatINR(h.averageBuyPrice)}</div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium tabular-nums">{formatINR(h.currentPrice)}</td>
                    <td className="px-4 py-3"><GainCell gain={h.stcg.gain} balance={h.stcg.balance} symbol={h.coin} /></td>
                    <td className="px-4 py-3"><GainCell gain={h.ltcg.gain} balance={h.ltcg.balance} symbol={h.coin} /></td>
                    <td className="px-4 py-3">
                      {isSel ? (
                        <motion.div
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm font-semibold tabular-nums text-[color:var(--color-primary)]"
                        >
                          {formatNumber(h.totalHolding)} {h.coin}
                        </motion.div>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}