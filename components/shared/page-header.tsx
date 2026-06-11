// components/shared/page-header.tsx
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  buttonLabel?: string;
  buttonIcon?: LucideIcon;
  onButtonClick?: () => void;
}

export function PageHeader({
  title,
  description,
  buttonLabel,
  buttonIcon: Icon,
  onButtonClick,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 mb-6 min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-between">
      <div className="min-w-0">
        <h1 className="text-[#1E293B] font-extrabold text-[22px] lg:text-[28px] leading-tight truncate">
          {title}
        </h1>
        {description && (
          <p className="text-[#94A3B8] text-[14px] font-normal mt-1">
            {description}
          </p>
        )}
      </div>

      {buttonLabel && (
        <button
          onClick={onButtonClick}
          className="flex items-center gap-2 px-4 h-[38px] bg-[#4F6BED] hover:bg-[#3D5BD9] text-white text-[13px] font-medium rounded-[8px] transition-colors shrink-0 self-start min-[640px]:self-auto whitespace-nowrap"
        >
          {Icon && <Icon size={15} />}
          {buttonLabel}
        </button>
      )}
    </div>
  );
}