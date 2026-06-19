"use client";

import { useState, useEffect } from "react";
import { Trophy, X, AlertTriangle, CheckCircle } from "lucide-react";
import type { Campeonato } from "@/types/campeonato";

interface FinalizarModalProps {
  campeonato: Campeonato;
  onConfirmar: (campeao: string) => void;
  onCancelar: () => void;
}

export function FinalizarModal({ campeonato, onConfirmar, onCancelar }: FinalizarModalProps) {
  const [campeao, setCampeao] = useState("");

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancelar();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onCancelar]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.45)", backdropFilter: "blur(2px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancelar();
      }}
    >
      <div className="bg-white rounded-[16px] shadow-[0_24px_48px_rgba(0,0,0,0.18)] w-full max-w-[420px] overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
              <AlertTriangle size={16} color="#F59E0B" />
            </div>
            <h2 className="text-[#1E293B] font-semibold text-[15px]">Finalizar campeonato</h2>
          </div>
          <button
            onClick={onCancelar}
            className="w-7 h-7 flex items-center justify-center rounded-[6px] text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <div className="border-t border-[#F1F5F9]" />

        <div className="px-5 py-4 flex flex-col gap-4">
          <div className="bg-[#F8FAFC] rounded-[10px] border border-[#E5E7EB] px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
              <Trophy size={14} color="#4F6BED" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[#1E293B] font-semibold text-[13px] truncate">
                {campeonato.nome}
              </span>
              <span className="text-[#94A3B8] text-[11px]">
                {campeonato.times} · {campeonato.formato}
              </span>
            </div>
          </div>

          <p className="text-[#64748B] text-[13px] leading-relaxed">
            Esta ação irá marcar o campeonato como{" "}
            <span className="font-semibold text-[#1E293B]">Finalizado</span>.
            Informe o campeão antes de confirmar.
          </p>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#1E293B] text-[13px] font-medium">
              Campeão do torneio
              <span className="text-red-400 ml-0.5">*</span>
            </label>
            <input
              type="text"
              placeholder="Ex: FC Estrela, Departamento TI..."
              value={campeao}
              onChange={(e) => setCampeao(e.target.value)}
              className="w-full h-[38px] px-3 rounded-[8px] border border-[#D1D5DB] bg-white text-[#1E293B] text-[13px] placeholder:text-[#94A3B8] outline-none focus:border-[#4F6BED] focus:ring-2 focus:ring-[rgba(79,107,237,0.2)] transition-all"
              autoFocus
            />
          </div>
        </div>

        <div className="px-5 pb-5 flex gap-2 justify-end">
          <button
            onClick={onCancelar}
            className="h-[36px] px-4 rounded-[8px] border border-[#E5E7EB] bg-white text-[#64748B] text-[13px] font-medium hover:bg-[#F8FAFC] hover:text-[#1E293B] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              if (campeao.trim()) onConfirmar(campeao.trim());
            }}
            disabled={!campeao.trim()}
            className={[
              "h-[36px] px-4 rounded-[8px] text-[13px] font-medium transition-colors flex items-center gap-2",
              campeao.trim()
                ? "bg-[#4F6BED] text-white hover:bg-[#3D5BD9]"
                : "bg-[#E5E7EB] text-[#94A3B8] cursor-not-allowed",
            ].join(" ")}
          >
            <CheckCircle size={14} />
            Confirmar finalização
          </button>
        </div>
      </div>
    </div>
  );
}