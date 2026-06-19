"use client";

import { useParams, useRouter } from "next/navigation";
import { Trophy, Users, MapPin, Award, UserPlus, ArrowLeft, Eye, Pencil, Trash2 } from "lucide-react";
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

        {/* Card do time */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-4 md:p-6">
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="w-[64px] h-[64px] md:w-[80px] md:h-[80px] rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] flex items-center justify-center shrink-0 overflow-hidden">
              {time.logoUrl ? (
                <img src={time.logoUrl} alt={time.nome} className="w-full h-full object-cover" />
              ) : (
                <Trophy size={28} className="text-[#4F6BED] md:hidden" />
              )}
              {!time.logoUrl && <Trophy size={32} className="text-[#4F6BED] hidden md:block" />}
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-[16px] md:text-[18px] font-extrabold text-[#1E293B] leading-tight">{time.nome}</h1>

              {/* Cidade e campeonato — empilhados no mobile, lado a lado no md+ */}
              <div className="flex flex-col gap-0.5 mt-1.5 md:flex-row md:gap-4">
                <span className="flex items-center gap-1 text-[12px] md:text-[13px] text-[#64748B]">
                  <MapPin size={12} className="text-[#94A3B8] shrink-0" />
                  <span className="truncate">{time.cidade}</span>
                </span>
                <span className="flex items-center gap-1 text-[12px] md:text-[13px] text-[#64748B]">
                  <Award size={12} className="text-[#94A3B8] shrink-0" />
                  <span className="truncate">{time.campeonato}</span>
                </span>
              </div>

              {/* Stats — grid 2x2 no mobile, linha no md+ */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 md:flex md:gap-5">
                <StatItem label="Jogadores" value={jogadores.length} />
                <StatItem label="Vitórias" value={time.vitorias} />
                <StatItem label="Empates" value={time.empates} />
                <StatItem label="Derrotas" value={time.derrotas} />
              </div>
            </div>
          </div>
        </div>

        {/* Seção elenco */}
        <div>
          {/* Header elenco — empilha no mobile */}
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

          <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden">
            {/* Sub-header */}
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

            {/* Lista ou empty state */}
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
                    onEditar={() => router.push(`/formularios/jogador?jogadorId=${jogador.id}&timeId=${time.id}`)}
                    onExcluir={() => handleExcluir(jogador.id)}
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
  onEditar,
  onExcluir,
}: {
  jogador: Jogador;
  onVer: () => void;
  onEditar: () => void;
  onExcluir: () => void;
}) {
  const idade = calcularIdade(jogador.dataNascimento);

  return (
    <div className="px-4 py-3 md:px-5 md:py-3.5">
      {/* Linha superior: foto + nome + (botões no md+) */}
      <div className="flex items-center gap-3">
        {/* Foto */}
        <div className="w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0 overflow-hidden border border-[#E5E7EB]">
          {jogador.foto ? (
            <img src={jogador.foto} alt={jogador.nome} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#4F6BED] text-[13px] font-bold">
              {jogador.nome.charAt(0)}
            </span>
          )}
        </div>

        {/* Nome + info */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-[#1E293B] truncate">{jogador.nome}</p>
          <p className="text-[11px] text-[#94A3B8]">
            #{jogador.numeroCamisa} · {jogador.posicao} · {idade} anos
          </p>
        </div>

        {/* Botões — apenas no md+ ficam na mesma linha */}
        <div className="hidden md:flex items-center gap-1.5 shrink-0">
          <ActionBtn onClick={onVer} color="border-[#4F6BED] text-[#4F6BED] hover:bg-[#EEF2FF]">
            <Eye size={13} />
          </ActionBtn>
          <ActionBtn onClick={onEditar} color="border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]">
            <Pencil size={13} />
          </ActionBtn>
          <ActionBtn onClick={onExcluir} color="border-red-400 text-red-400 hover:bg-red-50">
            <Trash2 size={13} />
          </ActionBtn>
        </div>
      </div>

      {/* Botões no mobile — linha separada abaixo, alinhada à direita */}
      <div className="flex items-center justify-end gap-1.5 mt-2.5 md:hidden">
        <ActionBtn onClick={onVer} color="border-[#4F6BED] text-[#4F6BED] hover:bg-[#EEF2FF]">
          <Eye size={13} />
        </ActionBtn>
        <ActionBtn onClick={onEditar} color="border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]">
          <Pencil size={13} />
        </ActionBtn>
        <ActionBtn onClick={onExcluir} color="border-red-400 text-red-400 hover:bg-red-50">
          <Trash2 size={13} />
        </ActionBtn>
      </div>
    </div>
  );
}

function ActionBtn({ onClick, color, children }: { onClick: () => void; color: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`w-[30px] h-[30px] flex items-center justify-center rounded-[7px] border transition-colors ${color}`}
    >
      {children}
    </button>
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

function calcularIdade(dataNascimento: string): number {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
  return idade;
}