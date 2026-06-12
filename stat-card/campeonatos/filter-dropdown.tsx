"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}

export function FilterDropdown({ value, onChange, options }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={[
          "h-[36px] px-3 flex items-center gap-2 rounded-[8px] border text-[13px] font-medium transition-colors",
          open
            ? "border-[#4F6BED] bg-[#EEF2FF] text-[#4F6BED]"
            : "border-[#E5E7EB] bg-white text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B]",
        ].join(" ")}
      >
        <span>{value}</span>
        <ChevronDown
          size={13}
          className={[
            "transition-transform duration-200",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-20 bg-white border border-[#E5E7EB] rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.10)] overflow-hidden min-w-[160px]">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between gap-3 px-3 py-2 text-[13px] text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
            >
              <span className={value === option ? "font-medium text-[#4F6BED]" : ""}>
                {option}
              </span>
              {value === option && <Check size={13} color="#4F6BED" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}