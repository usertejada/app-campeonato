"use client";

import { Pencil, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export function PartidaHeader() {
  const router = useRouter();

  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-[22px] font-bold text-[#1E293B]">Partidas</h1>
        <p className="text-[13px] text-[#94A3B8] mt-0.5">Gerencie e acompanhe todos os jogos</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.push("/formularios/nova-partida")}
          className="flex items-center gap-2 bg-white border border-[#E5E7EB] hover:bg-[#F8FAFC] text-[#1E293B] text-[13px] font-medium px-4 py-2 rounded-[10px] transition-colors"
        >
          <Pencil size={14} />
          Manual
        </button>
        <button
          onClick={() => router.push("/formularios/partida-aleatoria")}
          className="flex items-center gap-2 bg-[#4F6BED] hover:bg-[#3D56C4] text-white text-[13px] font-medium px-4 py-2 rounded-[10px] transition-colors"
        >
          <Zap size={14} />
          Automático
        </button>
      </div>
    </div>
  );
}