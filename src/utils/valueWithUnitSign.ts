import { Currency } from 'src/components';

export function valueWithUnitSign(value: number, currency: Currency): string {
  return { USD: `$${value}`, EUR: `€${value}`, GBP: `£${value}` }[currency];
}
