export function formatMoney(value: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}

export function titleFromHandle(handle = '') {
  return handle.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}
