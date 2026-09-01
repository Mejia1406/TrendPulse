// Sara Hurtado y Samuel Moncada

export class FormatNumber {
  static numberWithSeparatorsFormatter = new Intl.NumberFormat('es-CO');

  static format(value: number): string {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    }
  
    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`;
    }
    return value.toString();
  }

  static formatWithSeparators(value: number): string {
    return FormatNumber.numberWithSeparatorsFormatter.format(value);
  }
}
