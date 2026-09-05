import { PaymentMethod } from '../payments.service';

/** Formats a monetary amount using the row's specified currency */
export function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency.toUpperCase()} ${amount.toFixed(2)}`;
  }
}

/** Formats an ISO date string to a human-readable format e.g. "31 Aug 2026" */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

/** Formats payment method identifiers (ach -> ACH, wire -> Wire, card -> Card, check -> Check) */
export function getMethodLabel(method: PaymentMethod): string {
  const methodMap: Record<PaymentMethod, string> = {
    ach: 'ACH',
    wire: 'Wire',
    card: 'Card',
    check: 'Check',
  };
  return methodMap[method] ?? method.toUpperCase();
}
