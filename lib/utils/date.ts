// Formata: 25 de jan. de 2025
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

// Formata: 25/01/2025
export function formatDateShort(date: string | Date): string {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
}

// Formata: Jan–Mar 2025
export function formatDateRange(start: string | Date, end: string | Date): string {
  const fmt = (d: string | Date) =>
    new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric" }).format(new Date(d));
  return `${fmt(start)} – ${fmt(end)}`;
}

// Formata: Hoje, 19h / Amanhã, 15h / 25 jan, 10h
export function formatGameTime(date: string | Date): string {
  const d = new Date(date);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const sameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const time = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(d);

  if (sameDay(d, today)) return `Hoje, ${time}`;
  if (sameDay(d, tomorrow)) return `Amanhã, ${time}`;

  const dateStr = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(d);
  return `${dateStr}, ${time}`;
}
