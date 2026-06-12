"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface DropdownMenuItem {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: "default" | "danger";
  dividerBefore?: boolean;
}

interface DropdownMenuProps {
  items: DropdownMenuItem[];
}

export function DropdownMenu({ items }: DropdownMenuProps) {
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

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="w-7 h-7 flex items-center justify-center rounded-[6px] text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors"
      >
        <MoreVertical size={15} />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+4px)] z-50 bg-white border border-[#E5E7EB] rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] min-w-[150px] py-1 overflow-hidden">
          {items.map((item, index) => (
            <div key={index}>
              {item.dividerBefore && (
                <div className="border-t border-[#F1F5F9] my-1" />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  item.onClick();
                  setOpen(false);
                }}
                className={[
                  "w-full flex items-center gap-2.5 px-3 py-2 text-[13px] transition-colors",
                  item.variant === "danger"
                    ? "text-red-500 hover:bg-red-50"
                    : "text-[#1E293B] hover:bg-[#F8FAFC]",
                ].join(" ")}
              >
                <item.icon
                  size={13}
                  color={item.variant === "danger" ? "#EF4444" : "#94A3B8"}
                />
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}