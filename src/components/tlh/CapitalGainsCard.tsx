import type { CapitalGains } from "@/lib/tlh/types";
import { netGain, realised } from "@/lib/tlh/store";
import { formatINR } from "@/lib/tlh/format";
import { AnimatedNumber } from "./AnimatedNumber";

type Variant = "pre" | "after";

function Row({ label, value, tone }: { label: string; value: number; tone?: "gain" | "loss" | "neutral" }) {
  const color =
    tone === "gain"
      ? "text-[color:var(--color-gain)]"
      : tone === "loss"
        ? "text-[color:var(--color-loss)]"
        : "text-white/90";
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-white/60">{label}</span>
      <AnimatedNumber value={formatINR(value)} className={`font-semibold tabular-nums ${color}`} />
    </div>
  );
}

function Column({ title, data }: { title: string; data: { profits: number; losses: number } }) {
  const net = netGain(data);
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">{title}</h4>
      <Row label="Profits" value={data.profits} tone="gain" />
      <Row label="Losses" value={data.losses} tone="loss" />
      <div className="my-1 h-px bg-white/10" />
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/70">Net Capital Gains</span>
        <AnimatedNumber
          value={formatINR(net)}
          className={`font-semibold tabular-nums ${net >= 0 ? "text-[color:var(--color-gain)]" : "text-[color:var(--color-loss)]"}`}
        />
      </div>
    </div>
  );
}

export function CapitalGainsCard({
  variant,
  data,
  loading,
}: {
  variant: Variant;
  data?: CapitalGains;
  loading?: boolean;
}) {
  const bg =
    variant === "pre"
      ? "bg-[image:var(--gradient-dark)]"
      : "bg-[image:var(--gradient-blue)]";
  const title = variant === "pre" ? "Pre-Harvesting" : "After Harvesting";

  if (loading || !data) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${bg} p-6 shadow-[var(--shadow-card)] backdrop-blur-xl`}> 
        <div className="absolute inset-0 bg-white/[0.03]" />
        <div className="relative animate-pulse space-y-4">
          <div className="h-5 w-40 rounded bg-white/10" />
          <div className="grid grid-cols-2 gap-6">
            {[0, 1].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-3 w-20 rounded bg-white/10" />
                <div className="h-4 rounded bg-white/10" />
                <div className="h-4 rounded bg-white/10" />
                <div className="h-4 rounded bg-white/10" />
              </div>
            ))}
          </div>
          <div className="h-12 rounded bg-white/10" />
        </div>
      </div>
    );
  }

  const total = realised(data);
  return (
    <div className={`relative overflow-hidden rounded-2xl ${bg} p-6 shadow-[var(--shadow-card)] text-white backdrop-blur-xl`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent" />
      <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
      <div className="relative space-y-5">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <div className="grid grid-cols-2 gap-6">
          <Column title="Short-term" data={data.stcg} />
          <Column title="Long-term" data={data.ltcg} />
        </div>
        <div className="mt-2 flex items-center justify-between rounded-xl bg-black/25 px-4 py-3 ring-1 ring-white/10">
          <span className="text-sm font-medium text-white/80">Realised Capital Gains</span>
          <AnimatedNumber
            value={formatINR(total)}
            className={`text-lg font-bold tabular-nums ${total >= 0 ? "text-[color:var(--color-gain)]" : "text-[color:var(--color-loss)]"}`}
          />
        </div>
      </div>
    </div>
  );
}