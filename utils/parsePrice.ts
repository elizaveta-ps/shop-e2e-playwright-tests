// $23.99 (type string) → 23.99 (type number)

export function parsePrice(priceText: string): number {
  const value = Number.parseFloat(
    priceText.replace(/[^0-9.,]/g, '').replace(',', '.')
  );

  if (Number.isNaN(value)) {
    throw new Error(`Invalid price: ${priceText}`);
  }

  return value;
}