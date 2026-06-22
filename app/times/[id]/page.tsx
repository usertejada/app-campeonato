"use client";

import { useParams, useRouter } from "next/navigation";
import { Trophy, Users, MapPin, Award, UserPlus, ArrowLeft, Eye } from "lucide-react";
import { timesMock } from "@/lib/constants/time";
import { useJogadores } from "@/hooks/use-jogadores";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import type { Jogador } from "@/types/jogador";

export default function TimeDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const time = timesMock.find((t) => t.id === Number(id));
  const { jogadores, loading, handleExcluir } = useJogadores(Number(id));

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

        {/* Card do time — DESKTOP (md+) */}
        <div className="hidden md:block bg-white border border-[#bdd6d2] rounded-[12px] p-6">
          <div className="flex items-start gap-4">
            <div className="w-[80px] h-[80px] rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] flex items-center justify-center shrink-0 overflow-hidden">
              {time.logoUrl ? (
                <img src={time.logoUrl} alt={time.nome} className="w-full h-full object-cover" />
              ) : (
                <Trophy size={32} className="text-[#4F6BED]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-[18px] font-extrabold text-[#1E293B] leading-tight">{time.nome}</h1>
              <div className="flex flex-row flex-wrap gap-4 mt-1.5">
                <span className="flex items-center gap-1 text-[13px] text-[#64748B]">
                  <MapPin size={12} className="text-[#94A3B8] shrink-0" />
                  <span className="truncate">{time.cidade}</span>
                </span>
                <span className="flex items-center gap-1 text-[13px] text-[#64748B]">
                  <Award size={12} className="text-[#94A3B8] shrink-0" />
                  <span className="truncate">{time.campeonato}</span>
                </span>
                <span className="flex items-center gap-1 text-[13px] text-[#64748B]">
                  <Award size={12} className="text-[#94A3B8] shrink-0" />
                  <span className="truncate">{time.tecnico}</span>
                </span>
                <span className="flex items-center gap-1 text-[13px] text-[#64748B]">
                  <Award size={12} className="text-[#94A3B8] shrink-0" />
                  <span className="truncate">{time.telefone}</span>
                </span>
              </div>
              <div className="flex gap-5 mt-3">
                <StatItem label="Jogadores" value={jogadores.length} />
                <StatItem label="Vitórias" value={time.vitorias} />
                <StatItem label="Empates" value={time.empates} />
                <StatItem label="Derrotas" value={time.derrotas} />
              </div>
            </div>
          </div>
        </div>

        {/* Card do time — MOBILE (< md) */}
        <div className="md:hidden bg-white border border-[#bdd6d2] rounded-[12px] overflow-hidden">

          {/* Topo: logo + nome + cidade + campeonato */}
          <div className="flex items-start gap-3 px-4 pt-4 pb-3">
            <div className="w-[48px] h-[48px] rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] flex items-center justify-center shrink-0 overflow-hidden">
              {time.logoUrl ? (
                <img src={time.logoUrl} alt={time.nome} className="w-full h-full object-cover" />
              ) : (
                <Trophy size={22} className="text-[#4F6BED]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-[15px] font-extrabold text-[#1E293B] leading-tight">{time.nome}</h1>
              <span className="flex items-center gap-1 text-[12px] text-[#64748B] mt-0.5">
                <MapPin size={11} className="text-[#94A3B8] shrink-0" />
                <span className="truncate">{time.cidade}</span>
              </span>
              <span className="flex items-center gap-1 text-[12px] text-[#64748B] mt-0.5">
                <Award size={11} className="text-[#94A3B8] shrink-0" />
                <span className="truncate">{time.campeonato}</span>
              </span>
            </div>
          </div>

          {/* Linha técnico | telefone — borda a borda */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-b border-[#F1F5F9]">
            <span className="flex items-center gap-1.5 text-[12px] text-[#64748B]">
              <Users size={11} className="text-[#94A3B8] shrink-0" />
              {time.tecnico}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-[#64748B]">
              <Award size={11} className="text-[#94A3B8] shrink-0" />
              {time.telefone}
            </span>
          </div>

          {/* Stats — 4 colunas borda a borda */}
          <div className="grid grid-cols-4 divide-x divide-[#F1F5F9] px-0">
            <StatItem label="Jogadores" value={jogadores.length} padded />
            <StatItem label="Vitórias" value={time.vitorias} padded />
            <StatItem label="Empates" value={time.empates} padded />
            <StatItem label="Derrotas" value={time.derrotas} padded />
          </div>

        </div>

        {/* Seção elenco */}
        <div>
          <div className="flex flex-col gap-2 mb-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[15px] font-extrabold text-[#1E293B]">Elenco</h2>
              <p className="text-[13px] text-[#94A3B8]">Gerencie os jogadores deste time</p>
            </div>
            <button
              onClick={() => router.push(`/formularios/jogador?timeId=${time.id}`)}
              className="flex items-center justify-center gap-1.5 bg-[#4F6BED] hover:bg-[#3D5BD9] text-white rounded-[8px] h-[38px] px-5 text-[13px] font-medium transition-colors w-full sm:w-auto"
            >
              <UserPlus size={14} />
              Adicionar Jogador
            </button>
          </div>

          <div className="bg-white border border-[#bdd6d2] rounded-[12px] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#F1F5F9] md:px-5">
              <div className="flex items-center gap-2">
                <Users size={15} className="text-[#64748B]" />
                <span className="text-[13px] font-semibold text-[#1E293B]">Jogadores</span>
                <span className="bg-[#EEF2FF] text-[#4F6BED] text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {jogadores.length}
                </span>
              </div>
              <button
                onClick={() => router.push(`/formularios/jogador?timeId=${time.id}`)}
                className="flex items-center gap-1 text-[#4F6BED] hover:text-[#3D5BD9] text-[13px] font-medium transition-colors"
              >
                <UserPlus size={13} />
                Adicionar
              </button>
            </div>

            {loading ? (
              <div className="py-12 flex items-center justify-center">
                <p className="text-[#94A3B8] text-[13px]">Carregando...</p>
              </div>
            ) : jogadores.length === 0 ? (
              <div className="py-12 flex flex-col items-center gap-3 px-4">
                <div className="w-[48px] h-[48px] rounded-full bg-[#F1F5F9] flex items-center justify-center">
                  <Users size={22} className="text-[#94A3B8]" />
                </div>
                <p className="text-[13px] text-[#94A3B8] text-center">Nenhum jogador cadastrado ainda.</p>
                <button
                  onClick={() => router.push(`/formularios/jogador?timeId=${time.id}`)}
                  className="flex items-center gap-1.5 bg-[#4F6BED] hover:bg-[#3D5BD9] text-white rounded-[8px] h-[36px] px-5 text-[13px] font-medium transition-colors"
                >
                  <UserPlus size={13} />
                  Cadastrar primeiro jogador
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#F1F5F9]">
                {jogadores.map((jogador) => (
                  <JogadorRow
                    key={jogador.id}
                    jogador={jogador}
                    onVer={() => router.push(`/jogador?jogadorId=${jogador.id}&timeId=${time.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function JogadorRow({
  jogador,
  onVer,
}: {
  jogador: Jogador;
  onVer: () => void;
}) {
  const idade = calcularIdade(jogador.dataNascimento);

  return (
    <div className="px-4 py-3 md:px-5 md:py-3.5 flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0 overflow-hidden border border-[#E5E7EB]">
        {jogador.foto ? (
          <img src={jogador.foto} alt={jogador.nome} className="w-full h-full object-cover" />
        ) : (
          <span className="text-[#4F6BED] text-[13px] font-bold">
            {jogador.nome.charAt(0)}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#1E293B] truncate">{jogador.nome}</p>
        <p className="text-[11px] text-[#94A3B8]">
          #{jogador.numeroCamisa} · {jogador.posicao} · {idade} anos
        </p>
      </div>
      <button
        onClick={onVer}
        className="flex items-center justify-center gap-1.5 text-[#4F6BED] border border-[#4F6BED]/30 rounded-[8px] w-[34px] h-[34px] sm:w-auto sm:px-3 sm:py-1.5 text-[12px] font-medium hover:bg-[#EEF2FF] transition-colors shrink-0"
      >
        <Eye size={13} />
        <span className="hidden sm:inline">Ver Jogador</span>
      </button>
    </div>
  );
}

function StatItem({
  label,
  value,
  align = "left",
  padded = false,
}: {
  label: string;
  value: number;
  align?: string;
  padded?: boolean;
}) {
  return (
    <div className={padded ? "px-4 py-3" : ""}>
      <p className={`text-[15px] font-extrabold text-[#1E293B] text-${align}`}>{value}</p>
      <p className={`text-[12px] text-[#94A3B8] text-${align}`}>{label}</p>
    </div>
  );
}

function calcularIdade(dataNascimento: string): number {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
  return idade;
}