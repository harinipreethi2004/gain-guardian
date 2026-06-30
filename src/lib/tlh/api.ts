import type { CapitalGainsResponse, Holding } from "./types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchCapitalGains(): Promise<CapitalGainsResponse> {
  await delay(900);
  return {
    capitalGains: {
      stcg: { profits: 70200.88, losses: 1548.53 },
      ltcg: { profits: 5020, losses: 3050 },
    },
  };
}

const logo = (sym: string) =>
  `https://assets.coincap.io/assets/icons/${sym.toLowerCase()}@2x.png`;

export async function fetchHoldings(): Promise<Holding[]> {
  await delay(1200);
  const raw: Holding[] = [
    { coin: "USDC", coinName: "USD Coin", logo: logo("usdc"), currentPrice: 83.2, totalHolding: 1240.553201, averageBuyPrice: 82.91, stcg: { balance: 320.12, gain: 412.55 }, ltcg: { balance: 0, gain: 0 } },
    { coin: "WETH", coinName: "Wrapped Ether", logo: logo("eth"), currentPrice: 312450.55, totalHolding: 0.04821, averageBuyPrice: 280120.1, stcg: { balance: 0.02, gain: 1560.22 }, ltcg: { balance: 0.028, gain: 904.41 } },
    { coin: "SOL", coinName: "Solana", logo: logo("sol"), currentPrice: 14250.4, totalHolding: 12.4501, averageBuyPrice: 15820.7, stcg: { balance: 6.2, gain: -9760.43 }, ltcg: { balance: 6.25, gain: -2140.12 } },
    { coin: "WPOL", coinName: "Wrapped Polygon", logo: logo("matic"), currentPrice: 40.18, totalHolding: 2540.821, averageBuyPrice: 62.4, stcg: { balance: 1200, gain: -28902.55 }, ltcg: { balance: 1340.821, gain: -14502.7 } },
    { coin: "MATIC", coinName: "Polygon", logo: logo("matic"), currentPrice: 41.02, totalHolding: 5821.4, averageBuyPrice: 38.5, stcg: { balance: 2500, gain: 6203.21 }, ltcg: { balance: 3321.4, gain: 8420.55 } },
    { coin: "ETH", coinName: "Ethereum", logo: logo("eth"), currentPrice: 312560.5, totalHolding: 0.31021, averageBuyPrice: 250100.4, stcg: { balance: 0.1, gain: 15402.12 }, ltcg: { balance: 0.21021, gain: 12450.8 } },
    { coin: "LINK", coinName: "Chainlink", logo: logo("link"), currentPrice: 1240.7, totalHolding: 32.42, averageBuyPrice: 1450.2, stcg: { balance: 15, gain: -3140.55 }, ltcg: { balance: 17.42, gain: -1240.2 } },
    { coin: "UNI", coinName: "Uniswap", logo: logo("uni"), currentPrice: 820.3, totalHolding: 18.502, averageBuyPrice: 720.5, stcg: { balance: 8, gain: 802.41 }, ltcg: { balance: 10.502, gain: 1040.22 } },
    { coin: "AVAX", coinName: "Avalanche", logo: logo("avax"), currentPrice: 2840.5, totalHolding: 4.812, averageBuyPrice: 3120.6, stcg: { balance: 2, gain: -560.21 }, ltcg: { balance: 2.812, gain: -120.45 } },
    { coin: "DOT", coinName: "Polkadot", logo: logo("dot"), currentPrice: 540.2, totalHolding: 124.5, averageBuyPrice: 620.3, stcg: { balance: 50, gain: -4005.21 }, ltcg: { balance: 74.5, gain: -2120.42 } },
    { coin: "ADA", coinName: "Cardano", logo: logo("ada"), currentPrice: 32.4, totalHolding: 4820.21, averageBuyPrice: 28.1, stcg: { balance: 2000, gain: 8602.4 }, ltcg: { balance: 2820.21, gain: 12042.55 } },
    { coin: "DOGE", coinName: "Dogecoin", logo: logo("doge"), currentPrice: 12.8, totalHolding: 18200.5, averageBuyPrice: 10.4, stcg: { balance: 8000, gain: 19204.4 }, ltcg: { balance: 10200.5, gain: 24508.7 } },
    { coin: "SHIB", coinName: "Shiba Inu", logo: logo("shib"), currentPrice: 0.00185, totalHolding: 12500000, averageBuyPrice: 0.00221, stcg: { balance: 5000000, gain: -1800.55 }, ltcg: { balance: 7500000, gain: -2700.42 } },
    { coin: "ATOM", coinName: "Cosmos", logo: logo("atom"), currentPrice: 720.5, totalHolding: 24.802, averageBuyPrice: 850.1, stcg: { balance: 10, gain: -1296.41 }, ltcg: { balance: 14.802, gain: -1920.22 } },
    { coin: "NEAR", coinName: "Near Protocol", logo: logo("near"), currentPrice: 420.8, totalHolding: 62.501, averageBuyPrice: 380.4, stcg: { balance: 30, gain: 1212.42 }, ltcg: { balance: 32.501, gain: 1320.55 } },
    { coin: "ARB", coinName: "Arbitrum", logo: logo("arb"), currentPrice: 102.5, totalHolding: 320.42, averageBuyPrice: 145.2, stcg: { balance: 150, gain: -6405.21 }, ltcg: { balance: 170.42, gain: -7282.55 } },
    { coin: "OP", coinName: "Optimism", logo: logo("op"), currentPrice: 198.4, totalHolding: 142.502, averageBuyPrice: 220.1, stcg: { balance: 60, gain: -1302.55 }, ltcg: { balance: 82.502, gain: -1790.42 } },
    { coin: "USDT", coinName: "Tether", logo: logo("usdt"), currentPrice: 83.4, totalHolding: 0.000812, averageBuyPrice: 82.9, stcg: { balance: 0.0004, gain: 0.0002 }, ltcg: { balance: 0.000412, gain: 0.0002 } },
    { coin: "BTC", coinName: "Bitcoin", logo: logo("btc"), currentPrice: 5240500.4, totalHolding: 0.012502, averageBuyPrice: 4820000.1, stcg: { balance: 0.005, gain: 21025.5 }, ltcg: { balance: 0.007502, gain: 31540.85 } },
    { coin: "LDO", coinName: "Lido DAO", logo: logo("ldo"), currentPrice: 180.4, totalHolding: 82.401, averageBuyPrice: 220.5, stcg: { balance: 40, gain: -1604.21 }, ltcg: { balance: 42.401, gain: -1700.55 } },
    { coin: "AAVE", coinName: "Aave", logo: logo("aave"), currentPrice: 12500.4, totalHolding: 1.421, averageBuyPrice: 14200.5, stcg: { balance: 0.5, gain: -850.05 }, ltcg: { balance: 0.921, gain: -1565.55 } },
    { coin: "MKR", coinName: "Maker", logo: logo("mkr"), currentPrice: 198400.4, totalHolding: 0.0421, averageBuyPrice: 215000.2, stcg: { balance: 0.02, gain: -332.0 }, ltcg: { balance: 0.0221, gain: -366.85 } },
    { coin: "SAND", coinName: "The Sandbox", logo: logo("sand"), currentPrice: 38.4, totalHolding: 1420.21, averageBuyPrice: 42.1, stcg: { balance: 600, gain: -2220.55 }, ltcg: { balance: 820.21, gain: -3036.42 } },
    { coin: "MANA", coinName: "Decentraland", logo: logo("mana"), currentPrice: 36.4, totalHolding: 1240.5, averageBuyPrice: 38.2, stcg: { balance: 500, gain: -900.42 }, ltcg: { balance: 740.5, gain: -1332.55 } },
    { coin: "APE", coinName: "ApeCoin", logo: logo("ape"), currentPrice: 102.5, totalHolding: 82.402, averageBuyPrice: 120.4, stcg: { balance: 40, gain: -716.21 }, ltcg: { balance: 42.402, gain: -758.55 } },
  ];
  return raw;
}