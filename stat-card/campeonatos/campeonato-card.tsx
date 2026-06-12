import { Trophy, Calendar, Users, Pencil, CheckCircle, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu } from "@/components/shared/dropdown-menu";
import type { Campeonato } from "@/types/campeonato";

interface CampeonatoCardProps {
  campeonato: Campeonato;
  onEditar: () => void;
  onFinalizar: () => void;
  onExcluir: () => void;
}

export function CampeonatoCard({ campeonato, onEditar, onFinalizar, onExcluir }: CampeonatoCardProps) {
  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)] transition-all hover:-translate-y-[1px] cursor-pointer flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
          <Trophy size={17} color="#4F6BED" />
        </div>
        <div className="flex items-center gap-2">
          <Badge label={campeonato.status} />
          <DropdownMenu
            items={[
              { label: "Editar", icon: Pencil, onClick: onEditar },
              { label: "Finalizar", icon: CheckCircle, onClick: onFinalizar },
              { label: "Excluir", icon: Trash2, onClick: onExcluir, variant: "danger", dividerBefore: true },
            ]}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-[#1E293B] font-semibold text-[14px] leading-snug line-clamp-2">
          {campeonato.nome}
        </h3>
        <p className="text-[#94A3B8] text-[12px] line-clamp-2 leading-relaxed">
          {campeonato.descricao}
        </p>
      </div>

      <div className="border-t border-[#F1F5F9]" />

      <div className="flex flex-col gap-1.5">
        <span className="flex items-center gap-1.5 text-[#94A3B8] text-[12px]">
          <Calendar size={12} color="#94A3B8" />
          {campeonato.data}
        </span>
        <span className="flex items-center gap-1.5 text-[#94A3B8] text-[12px]">
          <Users size={12} color="#94A3B8" />
          {campeonato.times}
        </span>
        <span className="flex items-center gap-1.5 text-[#94A3B8] text-[12px]">
          <Trophy size={12} color="#94A3B8" />
          {campeonato.formato}
        </span>
      </div>
    </div>
  );
}