export interface GainBreakdown {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  stcg: GainBreakdown;
  ltcg: GainBreakdown;
}

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: { balance: number; gain: number };
  ltcg: { balance: number; gain: number };
}

export interface CapitalGainsResponse {
  capitalGains: CapitalGains;
}