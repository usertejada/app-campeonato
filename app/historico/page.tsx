"use client";

import { Calendar, Clock, MapPin, Trophy, Zap, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";

type Resultado = "vitoria" | "empate" | "derrota";

interface Jogo {
  id: number;
  horario: string;
  timeCasa: { nome: string; emoji: string; placar: number };
  timeVisitante: { nome: string; emoji: string; placar: number };
  campeonato: string;
  local: string;
  resultado: Resultado;
}

interface GrupoData {
  data: string;
  jogos: Jogo[];
}

const MOCK_HISTORICO: GrupoData[] = [
  {
    data: "Domingo, 01 De Junho De 2025",
    jogos: [
      {
        id: 1,
        horario: "08:00",
        timeCasa: { nome: "Águias SC", emoji: "🦅", placar: 3 },
        timeVisitante: { nome: "Leões FC", emoji: "🦁", placar: 1 },
        campeonato: "Copa Verão 2025",
        local: "Arena Central",
        resultado: "vitoria",
      },
      {
        id: 2,
        horario: "08:50",
        timeCasa: { nome: "Panteras FC", emoji: "🐆", placar: 2 },
        timeVisitante: { nome: "Dragões SC", emoji: "🐉", placar: 2 },
        campeonato: "Copa Verão 2025",
        local: "Arena Central",
        resultado: "empate",
      },
      {
        id: 3,
        horario: "09:40",
        timeCasa: { nome: "Falcões EC", emoji: "🦆", placar: 1 },
        timeVisitante: { nome: "Tubarões FC", emoji: "🦈", placar: 4 },
        campeonato: "Copa Verão 2025",
        local: "Arena Central",
        resultado: "vitoria",
      },
    ],
  },
  {
    data: "Quarta-Feira, 28 De Maio De 2025",
    jogos: [
      {
        id: 4,
        horario: "09:00",
        timeCasa: { nome: "Lobos SC", emoji: "🐺", placar: 0 },
        timeVisitante: { nome: "Trovões EC", emoji: "⚡", placar: 2 },
        campeonato: "Liga Empresarial",
        local: "Quadra Norte",
        resultado: "derrota",
      },
      {
        id: 5,
        horario: "09:50",
        timeCasa: { nome: "Leões FC", emoji: "🦁", placar: 3 },
        timeVisitante: { nome: "Falcões EC", emoji: "🦆", placar: 3 },
        campeonato: "Liga Empresarial",
        local: "Quadra Norte",
        resultado: "empate",
      },
    ],
  },
  {
    data: "Terça-Feira, 20 De Maio De 2025",
    jogos: [
      {
        id: 6,
        horario: "08:00",
        timeCasa: { nome: "Dragões SC", emoji: "🐉", placar: 1 },
        timeVisitante: { nome: "Águias SC", emoji: "🦅", placar: 2 },
        campeonato: "Torneio Relâmpago",
        local: "Campo Sul",
        resultado: "vitoria",
      },
      {
        id: 7,
        horario: "08:40",
        timeCasa: { nome: "Tubarões FC", emoji: "🦈", placar: 5 },
        timeVisitante: { nome: "Panteras FC", emoji: "🐆", placar: 2 },
        campeonato: "Torneio Relâmpago",
        local: "Campo Sul",
        resultado: "vitoria",
      },
      {
        id: 8,
        horario: "09:20",
        timeCasa: { nome: "Trovões EC", emoji: "⚡", placar: 3 },
        timeVisitante: { nome: "Lobos SC", emoji: "🐺", placar: 1 },
        campeonato: "Torneio Relâmpago",
        local: "Campo Sul",
        resultado: "vitoria",
      },
    ],
  },
];

const ITENS_POR_PAGINA = 2;

function BadgeResultado({ resultado }: { resultado: Resultado }) {
  if (resultado === "vitoria") {
    return (
      <span className="flex items-center gap-1 text-[12px] font-semibold text-[#16A34A] bg-[#DCFCE7] px-2.5 py-1 rounded-full">
        <Trophy size={11} />
        Vitória
      </span>
    );
  }
  if (resultado === "empate") {
    return (
      <span className="flex items-center gap-1 text-[12px] font-semibold text-[#D97706] bg-[#FEF3C7] px-2.5 py-1 rounded-full">
        <Minus size={11} />
        Empate
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-[12px] font-semibold text-[#DC2626] bg-[#FEE2E2] px-2.5 py-1 rounded-full">
      <Zap size={11} />
      Derrota
    </span>
  );
}

function CardJogo({ jogo }: { jogo: Jogo }) {
  const corPlacarCasa =
    jogo.timeCasa.placar > jogo.timeVisitante.placar
      ? "#16A34A"
      : jogo.timeCasa.placar === jogo.timeVisitante.placar
      ? "#D97706"
      : "#DC2626";

  const corPlacarVisitante =
    jogo.timeVisitante.placar > jogo.timeCasa.placar
      ? "#16A34A"
      : jogo.timeVisitante.placar === jogo.timeCasa.placar
      ? "#D97706"
      : "#DC2626";

  return (
    <div className="bg-white border border-[#bdd6d2] rounded-[12px] p-4 flex flex-col gap-3">
      {/* Topo */}
      <div className="flex items-center justify-between">
        <BadgeResultado resultado={jogo.resultado} />
        <span className="flex items-center gap-1 text-[12px] text-[#94A3B8]">
          <Clock size={12} />
          {jogo.horario}
        </span>
      </div>

      {/* Placar */}
      <div className="flex items-center justify-between px-2">
        {/* Time Casa */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <div className="w-10 h-10 rounded-full bg-[#F1F3F7] flex items-center justify-center text-[20px]">
            {jogo.timeCasa.emoji}
          </div>
          <span className="text-[13px] font-medium text-[#1E293B] text-center leading-tight">
            {jogo.timeCasa.nome}
          </span>
          <span className="text-[28px] font-bold" style={{ color: corPlacarCasa }}>
            {jogo.timeCasa.placar}
          </span>
        </div>

        {/* X */}
        <span className="text-[16px] text-[#CBD5E1] font-light mb-6">×</span>

        {/* Time Visitante */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <div className="w-10 h-10 rounded-full bg-[#F1F3F7] flex items-center justify-center text-[20px]">
            {jogo.timeVisitante.emoji}
          </div>
          <span className="text-[13px] font-medium text-[#1E293B] text-center leading-tight">
            {jogo.timeVisitante.nome}
          </span>
          <span className="text-[28px] font-bold" style={{ color: corPlacarVisitante }}>
            {jogo.timeVisitante.placar}
          </span>
        </div>
      </div>

      {/* Rodapé */}
      <div className="flex items-center gap-3 pt-1 border-t border-[#F1F3F7]">
        <span className="flex items-center gap-1 text-[11px] text-[#94A3B8]">
          <Trophy size={11} />
          {jogo.campeonato}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-[#94A3B8]">
          <MapPin size={11} />
          {jogo.local}
        </span>
      </div>
    </div>
  );
}

export default function HistoricoPage() {
  const router = useRouter();
  const [pagina, setPagina] = useState(1);
  const [filtroData, setFiltroData] = useState("");

  const historicoFiltrado = filtroData
    ? MOCK_HISTORICO.filter((g) => {
        const [ano, mes, dia] = filtroData.split("-");
        return g.data.includes(`${dia}`) && g.data.includes(`${mes}`) && g.data.includes(`${ano}`);
      })
    : MOCK_HISTORICO;

  const totalPaginas = Math.ceil(historicoFiltrado.length / ITENS_POR_PAGINA);
  const gruposPagina = historicoFiltrado.slice(
    (pagina - 1) * ITENS_POR_PAGINA,
    pagina * ITENS_POR_PAGINA
  );

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#1E293B]">Histórico</h1>
          <p className="text-[13px] text-[#94A3B8] mt-0.5">
            Todos os jogos finalizados, organizados por data
          </p>
        </div>
        <input
          type="date"
          value={filtroData}
          onChange={(e) => { setFiltroData(e.target.value); setPagina(1); }}
          className="border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-[13px] text-[#64748B] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F6BED]"
        />
      </div>

      {/* Grupos por data */}
      <div className="flex flex-col gap-6">
        {gruposPagina.length === 0 ? (
          <p className="text-[14px] text-[#94A3B8] text-center py-10">
            Nenhum jogo encontrado.
          </p>
        ) : (
          gruposPagina.map((grupo) => (
            <div key={grupo.data}>
              {/* Label da data */}
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 text-[13px] font-medium text-[#1E293B]">
                  <Calendar size={13} className="text-[#4F6BED]" />
                  {grupo.data}
                </span>
                <span className="text-[12px] text-[#94A3B8]">
                  {grupo.jogos.length} {grupo.jogos.length === 1 ? "jogo" : "jogos"}
                </span>
              </div>

              {/* Grid de jogos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {grupo.jogos.map((jogo) => (
                  <CardJogo key={jogo.id} jogo={jogo} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Paginação */}
      {totalPaginas > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
            className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-[#E5E7EB] bg-white text-[#64748B] hover:bg-[#F1F3F7] disabled:opacity-40 disabled:cursor-not-allowed text-[13px]"
          >
            ‹
          </button>
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPagina(n)}
              className={`w-8 h-8 flex items-center justify-center rounded-[8px] text-[13px] font-medium transition-colors ${
                pagina === n
                  ? "bg-[#4F6BED] text-white"
                  : "border border-[#E5E7EB] bg-white text-[#64748B] hover:bg-[#F1F3F7]"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas}
            className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-[#E5E7EB] bg-white text-[#64748B] hover:bg-[#F1F3F7] disabled:opacity-40 disabled:cursor-not-allowed text-[13px]"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}