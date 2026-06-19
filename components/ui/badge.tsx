import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "info";

// Mapeamento de strings comuns do projeto para variantes
const STATUS_MAP: Record<string, BadgeVariant> = {
  "Em Andamento": "success",
  "Ativo":        "success",
  "Pendente":     "warning",
  "Suspenso":     "danger",
  "Expulso":      "danger",
  "Finalizado":   "neutral",
  "Encerrado":    "neutral",
  "Agendado":     "info",
};

const VARIANT_STYLES: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: "#D1FAE5", text: "#065F46" },
  warning: { bg: "#FEF3C7", text: "#92400E" },
  danger:  { bg: "#FEE2E2", text: "#991B1B" },
  neutral: { bg: "#F3F4F6", text: "#6B7280" },
  info:    { bg: "#EEF2FF", text: "#3730A3" },
};

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ label, variant, className }: BadgeProps) {
  const resolvedVariant = variant ?? STATUS_MAP[label] ?? "neutral";
  const { bg, text } = VARIANT_STYLES[resolvedVariant];

  return (
    <span
      className={cn(
        "inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap",
        className
      )}
      style={{ backgroundColor: bg, color: text }}
    >
      {label}
    </span>
  );
}
