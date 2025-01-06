export function formatCurrency(quantity: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(quantity);
}

export function formatCurrencyLocal(quantity: number) {
  return new Intl.NumberFormat('ve-VE', {
    style: 'currency',
    currency: 'VEF'
  }).format(quantity);
}