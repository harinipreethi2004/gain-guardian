import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCapitalGains, fetchHoldings } from "@/lib/tlh/api";
import { CapitalGainsCard } from "@/components/tlh/CapitalGainsCard";
import { HoldingsTable } from "@/components/tlh/HoldingsTable";
import { SummaryBanner } from "@/components/tlh/SummaryBanner";
import { computeAfter, realised, useTLHStore } from "@/lib/tlh/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tax Loss Harvesting" },
      { name: "description", content: "Optimize your crypto capital gains tax with intelligent tax-loss harvesting." },
      { property: "og:title", content: "Tax Loss Harvesting" },
      { property: "og:description", content: "Optimize your crypto capital gains tax with intelligent tax-loss harvesting." },
    ],
  }),
  component: Index,
});

function Index() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const cgQuery = useQuery({ queryKey: ["capital-gains"], queryFn: fetchCapitalGains });
  const hQuery = useQuery({ queryKey: ["holdings"], queryFn: fetchHoldings });

  const selected = useTLHStore((s) => s.selected);

  const after = useMemo(() => {
    if (!cgQuery.data || !hQuery.data) return undefined;
    return computeAfter(cgQuery.data.capitalGains, hQuery.data, selected);
  }, [cgQuery.data, hQuery.data, selected]);

  const savings = useMemo(() => {
    if (!cgQuery.data || !after) return 0;
    return realised(cgQuery.data.capitalGains) - realised(after);
  }, [cgQuery.data, after]);

  const hasError = cgQuery.isError || hQuery.isError;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">Tax Loss Harvesting</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Reduce your capital gains tax by strategically realising losses.
            </p>
          </div>
          <button
            onClick={() => setDark((d) => !d)}
            className="shrink-0 rounded-lg border border-border bg-card px-3 py-2 text-sm transition-colors hover:bg-muted"
            aria-label="Toggle dark mode"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </header>

        {hasError ? (
          <div className="rounded-2xl border border-[color:var(--color-loss)]/30 bg-[color:var(--color-loss)]/5 p-6 text-center">
            <p className="text-sm font-medium text-[color:var(--color-loss)]">
              Failed to load data. Please refresh and try again.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <CapitalGainsCard
                variant="pre"
                data={cgQuery.data?.capitalGains}
                loading={cgQuery.isLoading}
              />
              <CapitalGainsCard variant="after" data={after} loading={cgQuery.isLoading} />
            </div>

            <SummaryBanner savings={savings} />

            <HoldingsTable holdings={hQuery.data ?? []} loading={hQuery.isLoading} />
          </div>
        )}
      </div>
    </div>
  );
}
