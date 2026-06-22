// app/jogador/_components/ficha-jogador-content.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Phone,
  Flag,
  Pencil,
  ArrowRightLeft,
  Trash2,
  User,
  Globe,
  Goal,
  Star,
  Activity,
  Check,
  X,
  Cake,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { getJogadorById } from "@/services/jogadores-service";
import { getTimes } from "@/services/times-service";
import type { Jogador } from "@/types/jogador";
import type { Time } from "@/types/time";

const CODIGO_PAIS: Record<string, string> = {
  Brasileiro: "BR",
  Argentino: "AR",
  Uruguaio: "UY",
  Paraguaio: "PY",
  Colombiano: "CO",
  Chileno: "CL",
  Boliviano: "BO",
  Peruano: "PE",
  Venezuelano: "VE",
  Equatoriano: "EC",
  Português: "PT",
};

function calcularIdade(dataNascimento: string): number {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
  return idade;
}

function formatarData(data: string): string {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

export function FichaJogadorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jogadorId = Number(searchParams.get("jogadorId"));
  const timeId = searchParams.get("timeId");

  const [jogador, setJogador] = useState<Jogador | null>(null);
  const [time, setTime] = useState<Time | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getJogadorById(jogadorId), getTimes()])
      .then(([j, times]) => {
        setJogador(j ?? null);
        if (j) {
          setTime(times.find((t) => t.id === j.timeId) ?? null);
        }
      })
      .finally(() => setLoading(false));
  }, [jogadorId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F3F7] flex items-center justify-center">
        <p className="text-[#94A3B8] text-[13px]">Carregando...</p>
      </div>
    );
  }

  if (!jogador) {
    return (
      <div className="min-h-screen bg-[#F1F3F7] flex items-center justify-center">
        <p className="text-[#94A3B8] text-[13px]">Jogador não encontrado.</p>
      </div>
    );
  }

  const idade = calcularIdade(jogador.dataNascimento);
  const codigoPais = jogador.nacionalidade ? CODIGO_PAIS[jogador.nacionalidade] : undefined;

  const jogos = 0;
  const mediaGols = jogos > 0 ? (jogador.gols / jogos).toFixed(1) : "0";

  return (
    <div className="min-h-screen bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">

      <PageHeader
        title="Ficha do Jogador"
        description="Dados do jogador"
      />

      <button
        onClick={() => router.push(`/times/${timeId}`)}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Voltar para o time
      </button>

      <div className="max-w-[700px] mx-auto">

        <div className="bg-white border border-[#bdd6d2] rounded-[12px] overflow-hidden">

          <div className="h-[3px] bg-gradient-to-r from-[#6366F1] to-[#A78BFA]" />

          <div className="p-6">
            {/* Nome — aparece acima no mobile, escondido aqui no desktop */}
            <h1 className="md:hidden text-[19px] font-extrabold text-[#1E293B] leading-tight mb-3 truncate">
              {jogador.nome}
            </h1>

            <div className="flex items-start gap-3">

              {/* Foto */}
              <div className="w-[88px] h-[104px] rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] flex items-center justify-center shrink-0 overflow-hidden">
                {jogador.foto ? (
                  <img src={jogador.foto} alt={jogador.nome} className="w-full h-full object-cover" />
                ) : (
                  <User size={32} className="text-[#4F6BED]" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                {/* Nome — escondido no mobile (já aparece acima), visível no desktop */}
                <h1 className="hidden md:block text-[19px] font-extrabold text-[#1E293B] leading-tight truncate">
                  {jogador.nome}
                </h1>

                <div className="flex items-center gap-1.5 mt-1 text-[13px] font-semibold text-[#4F6BED] flex-wrap">
                  {codigoPais && (
                    <span className="border border-[#4F6BED]/30 rounded-[4px] px-1 text-[10px] font-bold leading-[15px]">
                      {codigoPais}
                    </span>
                  )}
                  {jogador.nacionalidade && <span>{jogador.nacionalidade}</span>}
                  {jogador.nacionalidade && time && <span className="text-[#CBD5E1]">·</span>}
                  {time && <span>{time.nome}</span>}
                </div>

                <div className="mt-3 space-y-1.5">
                  {jogador.cpf && (
                    <div className="flex items-center gap-2 text-[13px] text-[#64748B]">
                      <FileText size={13} className="text-[#94A3B8]" />
                      <span>CPF: {jogador.cpf}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[13px] text-[#64748B]">
                    <Calendar size={13} className="text-[#94A3B8]" />
                    <span>Nascimento: {formatarData(jogador.dataNascimento)} </span>
                  </div>

                  <div className="flex items-center gap-2 text-[13px] text-[#64748B]">
                    <Cake size={13} className="text-[#94A3B8]" />
                    <span>Idade: ({idade} anos)</span>
                  </div>

                  {jogador.telefone && (
                    <div className="flex items-center gap-2 text-[13px] text-[#4F6BED] font-medium">
                      <Phone size={13} />
                      <span>{jogador.telefone}</span>
                    </div>
                  )}

                  {jogador.nacionalidade && (
                    <div className="flex items-center gap-2 text-[13px] text-[#64748B]">
                      <Flag size={13} className="text-[#94A3B8]" />
                      <span>Nacionalidade: {jogador.nacionalidade}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Ações */}
            <div className="border-t border-[#E5E7EB] px-4 py-3 min-[480px]:px-6 min-[480px]:py-4 flex items-center gap-2 min-[480px]:gap-3">
            <button
                title="Editar"
                onClick={() => router.push(`/formularios/jogador?jogadorId=${jogador.id}&timeId=${timeId}`)}
                className="flex items-center justify-center gap-1.5 text-[13px] font-semibold text-[#10B981] border border-[#10B981]/30 rounded-[8px] px-3.5 py-2 hover:bg-[#10B981]/5 transition-colors"
            >
                <Pencil size={14} />
                <span>Editar</span>
            </button>

            <button
                title="Excluir"
                className="flex items-center justify-center gap-1.5 text-[13px] font-semibold text-[#EF4444] border border-[#EF4444]/30 rounded-[8px] px-2.5 py-2 min-[480px]:px-3.5 hover:bg-[#EF4444]/5 transition-colors ml-auto"
            >
                <Trash2 size={14} />
                <span>Excluir</span>
            </button>
            </div>
        </div>

        {/* Estatísticas na Temporada */}
        <div className="bg-white border border-[#bdd6d2] rounded-[12px] p-6 mt-5">
          <h2 className="text-[15px] font-extrabold text-[#1E293B] mb-4">Estatísticas na Temporada</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

            <div className="bg-[#EEF2FF] rounded-[12px] p-4 flex flex-col items-center gap-1.5">
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Globe size={16} className="text-[#6366F1]" />
                </div>
                <span className="text-[22px] font-extrabold text-[#4F46E5] leading-none">{jogos}</span>
              </div>
              <span className="text-[12px] text-[#64748B] font-medium">Jogos</span>
            </div>

            <div className="bg-[#F0FDF4] rounded-[12px] p-4 flex flex-col items-center gap-1.5">
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Goal size={16} className="text-[#10B981]" />
                </div>
                <span className="text-[22px] font-extrabold text-[#10B981] leading-none">{jogador.gols}</span>
              </div>
              <span className="text-[12px] text-[#64748B] font-medium">Gols</span>
            </div>

            <div className="bg-[#EEF2FF] rounded-[12px] p-4 flex flex-col items-center gap-1.5">
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Star size={16} className="text-[#6366F1]" />
                </div>
                <span className="text-[22px] font-extrabold text-[#4F46E5] leading-none">{jogador.assistencias}</span>
              </div>
              <span className="text-[12px] text-[#64748B] font-medium">Assistências</span>
            </div>

            <div className="bg-[#FEFCE8] rounded-[12px] p-4 flex flex-col items-center gap-1.5">
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-7 rounded-[4px] bg-[#FACC15] shrink-0" />
                <span className="text-[22px] font-extrabold text-[#F59E0B] leading-none">{jogador.cartoesAmarelos}</span>
              </div>
              <span className="text-[12px] text-[#64748B] font-medium">Cartões Amarelos</span>
            </div>

            <div className="bg-[#FEF2F2] rounded-[12px] p-4 flex flex-col items-center gap-1.5">
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-7 rounded-[4px] bg-[#EF4444] shrink-0" />
                <span className="text-[22px] font-extrabold text-[#EF4444] leading-none">{jogador.cartoesVermelhos}</span>
              </div>
              <span className="text-[12px] text-[#64748B] font-medium">Cartões Vermelhos</span>
            </div>

            <div className="bg-[#ECFEFF] rounded-[12px] p-4 flex flex-col items-center gap-1.5">
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Activity size={16} className="text-[#0EA5E9]" />
                </div>
                <span className="text-[22px] font-extrabold text-[#0EA5E9] leading-none">{mediaGols}</span>
              </div>
              <span className="text-[12px] text-[#64748B] font-medium">Média de Gols</span>
            </div>

          </div>
        </div>

        {/* Situação Disciplinar */}
        <div className="bg-white border border-[#bdd6d2] rounded-[12px] p-6 mt-5">
          <h2 className="text-[15px] font-extrabold text-[#1E293B] mb-4">Situação Disciplinar</h2>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-5 rounded-[3px] bg-[#FACC15]" />
              <span className="text-[13px] font-semibold text-[#1E293B]">Cartões Amarelos</span>
            </div>
            <span className="text-[13px] font-extrabold text-[#F59E0B]">{jogador.cartoesAmarelos} / 5</span>
          </div>

          <div className="w-full h-2 bg-[#FEF9C3] rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-[#FACC15] rounded-full"
              style={{ width: `${Math.min((jogador.cartoesAmarelos / 5) * 100, 100)}%` }}
            />
          </div>

          <p className="text-[12px] text-[#94A3B8] mb-4">5 cartão(ões) para suspensão</p>

          {jogador.cartoesVermelhos === 0 ? (
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[10px] p-3 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#10B981] flex items-center justify-center shrink-0">
                <Check size={14} className="text-white" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#10B981]">Apto para jogar</p>
                <p className="text-[12px] text-[#94A3B8]">Nenhum cartão vermelho na temporada</p>
              </div>
            </div>
          ) : (
            <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[10px] p-3 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#EF4444] flex items-center justify-center shrink-0">
                <X size={14} className="text-white" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#EF4444]">Suspenso</p>
                <p className="text-[12px] text-[#94A3B8]">{jogador.cartoesVermelhos} cartão(ões) vermelho(s) na temporada</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}