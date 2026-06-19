"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const SIZE = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function Modal({ open, onClose, title, description, children, size = "md" }: ModalProps) {
  // Bloqueia scroll do body quando modal está aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Conteúdo */}
      <div
        className={cn(
          "relative w-full bg-white rounded-[12px] shadow-xl border border-[#E5E7EB] flex flex-col max-h-[90vh]",
          SIZE[size]
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-[#E5E7EB] shrink-0">
          <div>
            <h2 className="text-[#1E293B] font-bold text-[16px] leading-tight">{title}</h2>
            {description && (
              <p className="text-[#94A3B8] text-[13px] mt-0.5">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded-[6px] hover:bg-[#F1F5F9] transition-colors text-[#94A3B8] hover:text-[#1E293B] shrink-0 ml-3"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body — com scroll se necessário */}
        <div className="overflow-y-auto px-5 py-4 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
