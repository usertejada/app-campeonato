// /app/times/[id]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import { Trophy, Users, MapPin, Award, UserPlus, ArrowLeft } from "lucide-react";
import { timesMock } from "@/lib/constants/time";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export default function TimeDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const time = timesMock.find((t) => t.id === Number(id));

  if (!time) {
    return (
      <div className="min-h-screen bg-[#F1F3F7] flex items-center justify-center">
        <EmptyState
          icon={Trophy}
          title="Time não encontrado"
          description="O time que você está procurando não existe ou foi removido."
        />
      </div>
    );
  }

  const totalJogos = time.vitorias + time.empates + time.derrotas;

  return (
    <div className="min-h-screen bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">

      <PageHeader
        title={time.nome}
        description="Detalhes e elenco do time"
      />

      <button
        onClick={() => router.push("/times")}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Voltar para times
      </button>

      <div className="max-w-[700px] mx-auto space-y-5">

        {/* Card do time */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-6">
          <div className="flex items-center gap-5">
            {/* Logo */}
            <div className="w-[80px] h-[80px] rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] flex items-center justify-center shrink-0 overflow-hidden">
              {time.logoUrl ? (
                <img src={time.logoUrl} alt={time.nome} className="w-full h-full object-cover" />
              ) : (
                <Trophy size={32} className="text-[#4F6BED]" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-[18px] font-extrabold text-[#1E293B] leading-tight">{time.nome}</h1>
              <div className="flex items-center gap-4 mt-1.5">
                <span className="flex items-center gap-1 text-[13px] text-[#64748B]">
                  <MapPin size={13} className="text-[#94A3B8]" />
                  {time.cidade}
                </span>
                <span className="flex items-center gap-1 text-[13px] text-[#64748B]">
                  <Award size={13} className="text-[#94A3B8]" />
                  {time.campeonato}
                </span>
              </div>

              {/* Stats inline */}
              <div className="flex gap-5 mt-3">
                <StatItem label="Jogadores" value={totalJogos} />
                <StatItem label="Vitórias" value={time.vitorias} />
                <StatItem label="Empates" value={time.empates} />
                <StatItem label="Derrotas" value={time.derrotas} />
              </div>
            </div>
          </div>
        </div>

        {/* Seção elenco */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-[15px] font-extrabold text-[#1E293B]">Elenco</h2>
              <p className="text-[13px] text-[#94A3B8]">Gerencie os jogadores deste time</p>
            </div>
            <button
              onClick={() => console.log("Adicionar jogador ao time", time.id)}
              className="flex items-center gap-1.5 bg-[#4F6BED] hover:bg-[#3D5BD9] text-white rounded-[8px] h-[38px] px-5 text-[13px] font-medium transition-colors"
            >
              <UserPlus size={14} />
              Adicionar Jogador
            </button>
          </div>

          {/* Card lista jogadores */}
          <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden">
            {/* Sub-header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <Users size={15} className="text-[#64748B]" />
                <span className="text-[13px] font-semibold text-[#1E293B]">Jogadores</span>
                <span className="bg-[#EEF2FF] text-[#4F6BED] text-[11px] font-bold px-2 py-0.5 rounded-full">0</span>
              </div>
              <button
                onClick={() => console.log("Adicionar jogador ao time", time.id)}
                className="flex items-center gap-1 text-[#4F6BED] hover:text-[#3D5BD9] text-[13px] font-medium transition-colors"
              >
                <UserPlus size={13} />
                Adicionar
              </button>
            </div>

            {/* Empty state */}
            <div className="py-12 flex flex-col items-center gap-3">
              <div className="w-[48px] h-[48px] rounded-full bg-[#F1F5F9] flex items-center justify-center">
                <Users size={22} className="text-[#94A3B8]" />
              </div>
              <p className="text-[13px] text-[#94A3B8]">Nenhum jogador cadastrado ainda.</p>
              <button
                onClick={() => console.log("Adicionar jogador ao time", time.id)}
                className="flex items-center gap-1.5 bg-[#4F6BED] hover:bg-[#3D5BD9] text-white rounded-[8px] h-[36px] px-5 text-[13px] font-medium transition-colors"
              >
                <UserPlus size={13} />
                Cadastrar primeiro jogador
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-[15px] font-extrabold text-[#1E293B]">{value}</p>
      <p className="text-[12px] text-[#94A3B8]">{label}</p>
    </div>
  );
}