// Formata: R$ 1.500,00
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

// Formata: 1.500
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}
