export function convertToRankedObject(gain: {
  [key: string]: string;
}): { gain: number; rank: number }[] {
  return Object.keys(gain).map((_, index) => ({
    // Use only index
    gain: parseFloat(gain[_]), // Access value using index
    rank: index + 1,
  }));
}

export function sortByGain(
  input: { gain: number; rank: number }[]
): { gain: number; rank: number }[] {
  return input.slice().sort((a, b) => {
    // Sort primarily by gain in descending order
    if (a.gain !== b.gain) {
      return b.gain - a.gain;
    }
    // If gains are equal, use original rank for stability
    return a.rank - b.rank;
  });
}

export function getNdcg(gain: number, rank: number): number {
  if (Math.log(rank) !== 0) {
    return parseFloat((gain / Math.log(rank)).toFixed(2));
  } else {
    const test = gain / rank;
    return test; // Convert rank to string for consistent output
  }
}

export function getTotalNDCG(input: { gain: number; rank: number }[]): number {
  const totalNdcg = input.reduce((acc, item) => {
    const ndcgValue = getNdcg(item.gain, item.rank); // Call getNdcg with the entire item
    return ndcgValue ? acc + ndcgValue : acc; // Add valid ndcg values
  }, 0);

  return totalNdcg;
}
