export function formatINR(value: number, opts: { decimals?: number; sign?: boolean } = {}) {
  const { decimals = 2, sign = false } = opts;
  const abs = Math.abs(value);
  const fixed = abs.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const prefix = value < 0 ? "-₹" : sign && value > 0 ? "+₹" : "₹";
  return `${prefix}${fixed}`;
}

export function formatNumber(value: number, decimals = 4) {
  if (value === 0) return "0";
  if (Math.abs(value) < 0.0001) return value.toExponential(2);
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}