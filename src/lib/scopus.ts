export function getQuartileFromPercentile(
  percentile?: number | null
): "Q1" | "Q2" | "Q3" | "Q4" | null {
  if (percentile === null || percentile === undefined) return null;

  if (percentile > 75) return "Q1";
  if (percentile >= 50) return "Q2";
  if (percentile >= 25) return "Q3";
  return "Q4";
}