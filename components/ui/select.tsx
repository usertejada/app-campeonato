import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.ComponentProps<"select"> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export function Select({ label, error, options, placeholder, className, id, ...props }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="text-[#1E293B] text-[13px] font-medium"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            "w-full h-[38px] px-3 pr-9 rounded-[8px] border bg-white text-[#1E293B] text-[13px] outline-none appearance-none transition-all cursor-pointer",
            error
              ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200"
              : "border-[#D1D5DB] focus:border-[#4F6BED] focus:ring-2 focus:ring-[rgba(79,107,237,0.2)]",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
        />
      </div>
      {error && (
        <p className="text-red-500 text-[11px]">{error}</p>
      )}
    </div>
  );
}
