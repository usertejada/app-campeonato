// /app/formularios/partida-aleatoria/page.tsx

"use client";

import { ArrowLeft, Zap, Calendar, Clock, MapPin, Trophy, Hash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";

type DuracaoOpcao = { label: string; sublabel: string; valor: number };

const DURACAO_OPCOES: DuracaoOpcao[] = [
  { label: "45/45", sublabel: "Campo grande", valor: 45 },
  { label: "20/20", sublabel: "Society / Futsal", valor: 20 },
  { label: "15/15", sublabel: "Torneio rápido", valor: 15 },
];

const CAMPEONATOS_MOCK = [
  "Copa Verão 2025", "Liga Empresarial", "Torneio Municipal",
];

export default function PartidaAleatoriaPage() {
  const router = useRouter();

  const [campeonato, setCampeonato] = useState("");
  const [dataJogo, setDataJogo] = useState("");
  const [local, setLocal] = useState("");
  const [duracaoSelecionada, setDuracaoSelecionada] = useState<DuracaoOpcao | null>(null);
  const [horaInicial, setHoraInicial] = useState("");
  const [numPartidas, setNumPartidas] = useState(4);
  const [intervalo, setIntervalo] = useState(10);
  const [erro, setErro] = useState("");

  function gerar() {
    setErro("");
    if (!campeonato) { setErro("Selecione o campeonato."); return; }
    if (!dataJogo) { setErro("Informe a data do jogo."); return; }
    if (!duracaoSelecionada) { setErro("Escolha o tempo de jogo."); return; }
    if (!horaInicial) { setErro("Informe a hora inicial."); return; }
    // TODO: integrar com Supabase
    router.push("/partidas");
  }

  return (
    <div className="min-h-screen w-full bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Partida Automática"
        description="O sistema monta os confrontos e os horários automaticamente"
      />

      <button
        onClick={() => router.push("/partidas")}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Voltar para Partidas
      </button>

      {/* Conteúdo centralizado */}
      <div className="max-w-[740px] mx-auto pb-10 flex flex-col gap-4">

        {/* Título */}
        <div className="bg-white border border-[#E5E7EB] rounded-[14px] px-6 py-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-[10px] bg-[#EEF1FD] flex items-center justify-center">
            <Zap size={18} className="text-[#4F6BED]" />
          </div>
          <div>
            <p className="text-[16px] font-bold text-[#1E293B]">Gerar Jogos Automáticos</p>
            <p className="text-[12px] text-[#94A3B8] mt-0.5">O sistema monta os confrontos e os horários automaticamente</p>
          </div>
        </div>

        {/* Configurações */}
        <div className="bg-white border border-[#E5E7EB] rounded-[14px] px-6 py-5 flex flex-col gap-5">

          {/* Campeonato */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Trophy size={13} className="text-[#4F6BED]" />
              <label className="text-[12px] font-semibold text-[#1E293B]">Campeonato</label>
            </div>
            <div className="relative">
              <select
                value={campeonato}
                onChange={(e) => setCampeonato(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-[8px] px-4 py-2.5 text-[13px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4F6BED]/30 appearance-none"
              >
                <option value="">Selecione...</option>
                {CAMPEONATOS_MOCK.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">▾</span>
            </div>
          </div>

          {/* Data + Local */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Calendar size={13} className="text-[#4F6BED]" />
                <label className="text-[12px] font-semibold text-[#1E293B]">Data do Jogo</label>
              </div>
              <input
                type="date"
                value={dataJogo}
                onChange={(e) => setDataJogo(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-[8px] px-3 py-2.5 text-[13px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4F6BED]/30"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <MapPin size={13} className="text-[#4F6BED]" />
                <label className="text-[12px] font-semibold text-[#1E293B]">
                  Local / Campo{" "}
                  <span className="text-[#94A3B8] font-normal">(opcional)</span>
                </label>
              </div>
              <input
                type="text"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                placeholder="Ex: Campo Principal"
                className="w-full bg-white border border-[#E5E7EB] rounded-[8px] px-3 py-2.5 text-[13px] text-[#1E293B] placeholder-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4F6BED]/30"
              />
            </div>
          </div>

          {/* Tempo de jogo */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Clock size={13} className="text-[#4F6BED]" />
              <label className="text-[12px] font-semibold text-[#1E293B]">Tempo de Jogo</label>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {DURACAO_OPCOES.map((op) => {
                const ativo = duracaoSelecionada?.valor === op.valor;
                return (
                  <button
                    key={op.valor}
                    onClick={() => setDuracaoSelecionada(op)}
                    className={`flex flex-col items-center py-3 px-4 rounded-[10px] border-2 transition-colors ${
                      ativo
                        ? "border-[#4F6BED] bg-[#EEF1FD]"
                        : "border-[#E5E7EB] bg-[#F8FAFC] hover:border-[#4F6BED]/40"
                    }`}
                  >
                    <span className={`text-[16px] font-bold ${ativo ? "text-[#4F6BED]" : "text-[#1E293B]"}`}>
                      {op.label}
                    </span>
                    <span className="text-[11px] text-[#94A3B8] mt-0.5">{op.sublabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hora + Nº Partidas + Intervalo */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Clock size={13} className="text-[#4F6BED]" />
                <label className="text-[12px] font-semibold text-[#1E293B]">Hora Inicial</label>
              </div>
              <input
                type="time"
                value={horaInicial}
                onChange={(e) => setHoraInicial(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-[8px] px-3 py-2.5 text-[13px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4F6BED]/30"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Hash size={13} className="text-[#4F6BED]" />
                <label className="text-[12px] font-semibold text-[#1E293B]">Nº de Partidas</label>
              </div>
              <input
                type="number"
                min={1}
                max={20}
                value={numPartidas}
                onChange={(e) => setNumPartidas(Number(e.target.value))}
                className="w-full bg-white border border-[#E5E7EB] rounded-[8px] px-3 py-2.5 text-[13px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4F6BED]/30"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Clock size={13} className="text-[#4F6BED]" />
                <label className="text-[12px] font-semibold text-[#1E293B]">Intervalo entre jogos</label>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  value={intervalo}
                  onChange={(e) => setIntervalo(Number(e.target.value))}
                  className="w-full bg-white border border-[#E5E7EB] rounded-[8px] px-3 py-2.5 pr-10 text-[13px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4F6BED]/30"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#94A3B8]">min</span>
              </div>
            </div>
          </div>

        </div>

        {/* Erro */}
        {erro && (
          <p className="text-[12px] text-[#EF4444] font-medium -mt-1">{erro}</p>
        )}

        {/* Botões */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => router.push("/partidas")}
            className="bg-white border border-[#E5E7EB] hover:bg-[#F8FAFC] text-[#1E293B] text-[14px] font-semibold py-3 rounded-[10px] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={gerar}
            className="flex items-center justify-center gap-2 bg-[#4F6BED] hover:bg-[#3D56C4] text-white text-[14px] font-semibold py-3 rounded-[10px] transition-colors"
          >
            <Zap size={15} />
            Gerar Partidas
          </button>
        </div>

      </div>
    </div>
  );
}