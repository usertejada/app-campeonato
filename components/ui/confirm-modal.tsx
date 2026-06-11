"use client";

import { AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  variant = "danger",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  const isDanger = variant === "danger";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onCancel}
      />

      {/* Card */}
      <div className="relative w-full max-w-sm bg-white rounded-[12px] shadow-xl border border-[#E5E7EB] p-6">
        {/* Ícone */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: isDanger ? "#FEE2E2" : "#FEF3C7" }}
        >
          {isDanger
            ? <Trash2 size={20} color="#991B1B" />
            : <AlertTriangle size={20} color="#92400E" />
          }
        </div>

        <h2 className="text-[#1E293B] font-bold text-[16px] mb-1">{title}</h2>
        <p className="text-[#94A3B8] text-[13px] mb-6">{description}</p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 h-[38px] text-[13px]"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <button
            className="flex-1 h-[38px] rounded-[8px] text-[13px] font-medium text-white transition-colors disabled:opacity-50"
            style={{ backgroundColor: isDanger ? "#EF4444" : "#F97316" }}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Aguarde..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
