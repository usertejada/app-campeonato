// /app/formularios/nova-partida/page.tsx

"use client";

import { ArrowLeft, Plus, Trash2, Check, Calendar, Clock, MapPin, Trophy, Users, Swords } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";

type DuracaoOpcao = { label: string; sublabel: string; valor: number };
type Confronto = { id: string; timeA: string; timeB: string };

const DURACAO_OPCOES: DuracaoOpcao[] = [
  { label: "45/45", sublabel: "Campo grande", valor: 45 },
  { label: "20/20", sublabel: "Futsal / Society", valor: 20 },
  { label: "15/15", sublabel: "Torneio rápido", valor: 15 },
];

const TIMES_MOCK = [
  "Flamengo", "Palmeiras", "Corinthians", "Santos",
  "São Paulo", "Grêmio", "Internacional", "Atlético-MG",
];

const CAMPEONATOS_MOCK = [
  "Copa Verão 2025", "Liga Empresarial", "Torneio Municipal",
];

export default function NovaPartidaPage() {
  const router = useRouter();

  const [duracaoSelecionada, setDuracaoSelecionada] = useState<DuracaoOpcao | null>(null);
  const [intervalo, setIntervalo] = useState(10);
  const [local, setLocal] = useState("");
  const [dataJogo, setDataJogo] = useState("");
  const [horaJogo, setHoraJogo] = useState("08:00");
  const [campeonato, setCampeonato] = useState("");
  const [confrontos, setConfrontos] = useState<Confronto[]>([{ id: crypto.randomUUID(), timeA: "", timeB: "" }]);
  const [erro, setErro] = useState("");

  function atualizarConfronto(id: string, campo: "timeA" | "timeB", valor: string) {
    setConfrontos((prev) => prev.map((c) => c.id === id ? { ...c, [campo]: valor } : c));
  }

  function adicionarConfronto() {
    setConfrontos((prev) => [...prev, { id: crypto.randomUUID(), timeA: "", timeB: "" }]);
  }

  function remover(id: string) {
    if (confrontos.length === 1) return;
    setConfrontos((prev) => prev.filter((c) => c.id !== id));
  }

  const jogosValidos = confrontos.filter((c) => c.timeA && c.timeB && c.timeA !== c.timeB).length;

  function salvar() {
    setErro("");
    if (!dataJogo) { setErro("Informe a data do jogo."); return; }
    if (!campeonato) { setErro("Selecione o campeonato."); return; }
    if (!duracaoSelecionada) { setErro("Escolha o tempo de jogo."); return; }
    if (jogosValidos === 0) { setErro("Adicione ao menos um confronto válido."); return; }
    router.push("/partidas");
  }

  return (
    <div className="min-h-screen w-full bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Nova Partida"
        description="Configure e monte os confrontos manualmente"
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

        {/* Informações do dia */}
        <div className="bg-white border border-[#E5E7EB] rounded-[14px] px-6 py-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={15} className="text-[#4F6BED]" />
            <p className="text-[14px] font-bold text-[#1E293B]">Informações do Dia</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-[#64748B] mb-1.5">
                Data do jogo <span className="text-[#EF4444]">*</span>
              </label>
              <input
                type="date"
                value={dataJogo}
                onChange={(e) => setDataJogo(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-[8px] px-3 py-2.5 text-[13px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4F6BED]/30"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#64748B] mb-1.5">
                Hora do 1º jogo <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <Clock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="time"
                  value={horaJogo}
                  onChange={(e) => setHoraJogo(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-[8px] pl-8 pr-3 py-2.5 text-[13px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4F6BED]/30"
                />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#64748B] mb-1.5">
                Campeonato <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <Trophy size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <select
                  value={campeonato}
                  onChange={(e) => setCampeonato(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-[8px] pl-8 pr-3 py-2.5 text-[13px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4F6BED]/30 appearance-none"
                >
                  <option value="">Selecionar campeonato</option>
                  {CAMPEONATOS_MOCK.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#64748B] mb-1.5">
                Local / Campo <span className="text-[#94A3B8] font-normal">(opcional)</span>
              </label>
              <div className="relative">
                <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  placeholder="Ex: Campo Principal"
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-[8px] pl-8 pr-3 py-2.5 text-[13px] text-[#1E293B] placeholder-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4F6BED]/30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tempo de jogo */}
        <div className="bg-white border border-[#E5E7EB] rounded-[14px] px-6 py-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={15} className="text-[#4F6BED]" />
            <p className="text-[14px] font-bold text-[#1E293B]">Tempo de Jogo</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
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

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-medium text-[#1E293B]">Intervalo entre jogos</p>
              <p className="text-[11px] text-[#94A3B8] mt-0.5">Tempo de descanso entre uma partida e outra</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIntervalo((v) => Math.max(0, v - 5))}
                className="w-7 h-7 rounded-full border border-[#E5E7EB] bg-[#F8FAFC] text-[#64748B] flex items-center justify-center hover:border-[#4F6BED] transition-colors text-[16px] leading-none"
              >
                −
              </button>
              <span className="text-[13px] font-semibold text-[#1E293B] w-12 text-center">{intervalo}min</span>
              <button
                onClick={() => setIntervalo((v) => v + 5)}
                className="w-7 h-7 rounded-full border border-[#E5E7EB] bg-[#F8FAFC] text-[#64748B] flex items-center justify-center hover:border-[#4F6BED] transition-colors text-[16px] leading-none"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Confrontos */}
        <div className="bg-white border border-[#E5E7EB] rounded-[14px] px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={15} className="text-[#4F6BED]" />
              <p className="text-[14px] font-bold text-[#1E293B]">Confrontos</p>
            </div>
            <span className="text-[12px] text-[#94A3B8]">
              {jogosValidos} {jogosValidos === 1 ? "jogo pronto" : "jogos prontos"}
            </span>
          </div>

          <div className="flex flex-col gap-3 mb-3">
            {confrontos.map((c, i) => (
              <div key={c.id} className="border border-[#E5E7EB] rounded-[10px] overflow-hidden">
                <div className="bg-[#F8FAFC] px-4 py-2 border-b border-[#E5E7EB]">
                  <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide">
                    Jogo {i + 1}
                  </span>
                </div>
                <div className="px-4 py-3 flex items-center gap-3">
                  <select
                    value={c.timeA}
                    onChange={(e) => atualizarConfronto(c.id, "timeA", e.target.value)}
                    className="flex-1 bg-white border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-[13px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4F6BED]/30 appearance-none"
                  >
                    <option value="">Time A</option>
                    {TIMES_MOCK.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>

                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F1F3F7]">
                    <Swords size={13} className="text-[#94A3B8]" />
                  </div>

                  <select
                    value={c.timeB}
                    onChange={(e) => atualizarConfronto(c.id, "timeB", e.target.value)}
                    className="flex-1 bg-white border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-[13px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4F6BED]/30 appearance-none"
                  >
                    <option value="">Time B</option>
                    {TIMES_MOCK.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>

                  {confrontos.length > 1 && (
                    <button
                      onClick={() => remover(c.id)}
                      className="text-[#CBD5E1] hover:text-[#EF4444] transition-colors ml-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={adicionarConfronto}
            className="w-full border border-dashed border-[#CBD5E1] hover:border-[#4F6BED] text-[#94A3B8] hover:text-[#4F6BED] text-[13px] font-medium py-2.5 rounded-[10px] transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={14} />
            Adicionar confronto
          </button>
        </div>

        {/* Erro */}
        {erro && (
          <p className="text-[12px] text-[#EF4444] font-medium -mt-1">{erro}</p>
        )}

        {/* Botões finais */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => router.push("/partidas")}
            className="bg-white border border-[#E5E7EB] hover:bg-[#F8FAFC] text-[#1E293B] text-[14px] font-semibold py-3 rounded-[10px] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={salvar}
            disabled={jogosValidos === 0}
            className="flex items-center justify-center gap-2 bg-[#4F6BED] hover:bg-[#3D56C4] disabled:bg-[#E5E7EB] disabled:text-[#94A3B8] text-white text-[14px] font-semibold py-3 rounded-[10px] transition-colors"
          >
            <Swords size={15} />
            Gerar partidas
          </button>
        </div>

      </div>
    </div>
  );
}