import { create } from "zustand";
import type { CapitalGains, Holding } from "./types";

interface TLHState {
  selected: Record<string, boolean>;
  toggle: (coin: string) => void;
  setMany: (next: Record<string, boolean>) => void;
  clear: () => void;
}

export const useTLHStore = create<TLHState>((set) => ({
  selected: {},
  toggle: (coin) =>
    set((s) => ({ selected: { ...s.selected, [coin]: !s.selected[coin] } })),
  setMany: (next) => set({ selected: next }),
  clear: () => set({ selected: {} }),
}));

export function computeAfter(
  pre: CapitalGains,
  holdings: Holding[],
  selected: Record<string, boolean>,
): CapitalGains {
  const after: CapitalGains = {
    stcg: { profits: pre.stcg.profits, losses: pre.stcg.losses },
    ltcg: { profits: pre.ltcg.profits, losses: pre.ltcg.losses },
  };
  for (const h of holdings) {
    if (!selected[h.coin]) continue;
    if (h.stcg.gain >= 0) after.stcg.profits += h.stcg.gain;
    else after.stcg.losses += Math.abs(h.stcg.gain);
    if (h.ltcg.gain >= 0) after.ltcg.profits += h.ltcg.gain;
    else after.ltcg.losses += Math.abs(h.ltcg.gain);
  }
  return after;
}

export const netGain = (g: { profits: number; losses: number }) =>
  g.profits - g.losses;
export const realised = (c: CapitalGains) => netGain(c.stcg) + netGain(c.ltcg);