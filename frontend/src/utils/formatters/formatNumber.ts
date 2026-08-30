const numberWithSeparatorsFormatter = new Intl.NumberFormat('es-CO');

export function formatNumber(value: number): string {
  if (value >= 1_000_000) {

    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {

    return `${Math.round(value / 1_000)}K`;
  }

  return value.toString();
}

export function formatNumberWithSeparators(
  value: number,
): string {
  return numberWithSeparatorsFormatter.format(
    value,
  );
}