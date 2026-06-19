import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  children?: React.ReactNode; // botão de ação
}

export function EmptyState({ icon: Icon, title, description, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-4">
        <Icon size={24} color="#4F6BED" />
      </div>
      <h3 className="text-[#1E293B] font-semibold text-[15px] mb-1">{title}</h3>
      {description && (
        <p className="text-[#94A3B8] text-[13px] max-w-xs">{description}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
