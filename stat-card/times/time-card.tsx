import { MapPin, User, Trophy, Eye, Pencil, Trash2 } from "lucide-react";
import type { Time } from "@/types/time";

interface TimeCardProps {
  time: Time;
  onVer: () => void;
  onEditar: () => void;
  onExcluir: () => void;
}

export function TimeCard({ time, onVer, onEditar, onExcluir }: TimeCardProps) {
  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)] transition-all hover:-translate-y-[1px] flex flex-col gap-3">

      {/* Header: logo + nome */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-[10px] bg-[#EEF2FF] flex items-center justify-center shrink-0 overflow-hidden">
          {time.logoUrl ? (
            <img src={time.logoUrl} alt={time.nome} className="w-full h-full object-cover" />
          ) : (
            <Trophy size={20} color="#4F6BED" />
          )}
        </div>
        <h3 className="text-[#1E293B] font-semibold text-[14px] leading-snug truncate">
          {time.nome}
        </h3>
      </div>

      {/* Cidade */}
      <div className="border-t border-[#F1F5F9] pt-2">
        <span className="flex items-center gap-1.5 text-[#94A3B8] text-[12px] truncate">
          <MapPin size={11} color="#94A3B8" />
          {time.cidade}
        </span>
      </div>

      {/* Stats: V E D */}
      <div className="grid grid-cols-3 gap-2 bg-[#F8FAFC] rounded-[8px] border border-[#F1F5F9] px-2 py-2.5">
        {[
          { label: "V", value: time.vitorias },
          { label: "E", value: time.empates },
          { label: "D", value: time.derrotas },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <span className="text-[#1E293B] font-bold text-[16px] leading-none">
              {value > 0 ? value : "—"}
            </span>
            <span className="text-[#94A3B8] text-[11px] font-medium">{label}</span>
          </div>
        ))}
      </div>

      {/* Campeonato */}
      <span className="flex items-center gap-1.5 text-[#64748B] text-[12px]">
        <User size={12} color="#94A3B8" />
        {time.campeonato}
      </span>

      <div className="border-t border-[#F1F5F9]" />

      {/* Ações */}
      <div className="flex items-center gap-2">
        <button
          onClick={onVer}
          className="flex-1 h-[34px] flex items-center justify-center gap-1.5 rounded-[8px] border border-[#4F6BED] text-[#4F6BED] text-[12px] font-medium hover:bg-[#EEF2FF] transition-colors min-w-0"
        >
          <Eye size={13} className="shrink-0" />
          <span className="truncate hidden min-[200px]:inline">Ver Time</span>
        </button>
        <button
          onClick={onEditar}
          className="w-[34px] h-[34px] flex items-center justify-center rounded-[8px] border border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5] transition-colors shrink-0"
        >
          <Pencil size={13} />
        </button>
        <button
          onClick={onExcluir}
          className="w-[34px] h-[34px] flex items-center justify-center rounded-[8px] border border-red-400 text-red-400 hover:bg-red-50 transition-colors shrink-0"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}