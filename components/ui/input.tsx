import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export function Input({ label, error, leftIcon, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[#1E293B] text-[13px] font-medium"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            "w-full h-[38px] px-3 rounded-[8px] border bg-white text-[#1E293B] text-[13px] placeholder:text-[#94A3B8] outline-none transition-all",
            error
              ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200"
              : "border-[#D1D5DB] focus:border-[#4F6BED] focus:ring-2 focus:ring-[rgba(79,107,237,0.2)]",
            leftIcon && "pl-9",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-500 text-[11px]">{error}</p>
      )}
    </div>
  );
}
