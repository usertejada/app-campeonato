// /app/classificacao/page.tsx

"use client";

import { Trophy, ChevronDown, ChevronUp, Minus } from "lucide-react";

type Trend = "up" | "down" | "same";

interface TimeClassificacao {
  posicao: number;
  nome: string;
  emoji: string;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golsPro: number;
  golsContra: number;
  pontos: number;
  trend: Trend;
}

const TIMES_MOCK: TimeClassificacao[] = [
  { posicao: 1, nome: "Aguias SC", emoji: "🦅", jogos: 8, vitorias: 7, empates: 1, derrotas: 0, golsPro: 20, golsContra: 6, pontos: 22, trend: "up" },
  { posicao: 2, nome: "Tubaroes FC", emoji: "🦈", jogos: 8, vitorias: 6, empates: 0, derrotas: 2, golsPro: 15, golsContra: 9, pontos: 18, trend: "up" },
  { posicao: 3, nome: "Leoes FC", emoji: "🦁", jogos: 8, vitorias: 4, empates: 2, derrotas: 2, golsPro: 12, golsContra: 10, pontos: 14, trend: "same" },
  { posicao: 4, nome: "Panteras FC", emoji: "🐆", jogos: 8, vitorias: 3, empates: 2, derrotas: 3, golsPro: 10, golsContra: 11, pontos: 11, trend: "down" },
  { posicao: 5, nome: "Dragoes SC", emoji: "🐉", jogos: 8, vitorias: 2, empates: 2, derrotas: 4, golsPro: 8, golsContra: 13, pontos: 8, trend: "down" },
  { posicao: 6, nome: "Trovoes EC", emoji: "⚡", jogos: 8, vitorias: 1, empates: 3, derrotas: 4, golsPro: 7, golsContra: 14, pontos: 6, trend: "same" },
  { posicao: 7, nome: "Falcoes EC", emoji: "🐓", jogos: 8, vitorias: 1, empates: 1, derrotas: 6, golsPro: 5, golsContra: 18, pontos: 4, trend: "down" },
  { posicao: 8, nome: "Lobos SC", emoji: "🐺", jogos: 8, vitorias: 0, empates: 2, derrotas: 6, golsPro: 4, golsContra: 20, pontos: 2, trend: "down" },
];

function badgeClasses(posicao: number) {
  if (posicao === 1) return "bg-[#FEF3C7] text-[#CA8A04]";
  if (posicao === 2) return "bg-[#F1F3F7] text-[#64748B]";
  if (posicao === 3) return "bg-[#FFEDD5] text-[#C2640A]";
  return "bg-transparent text-[#94A3B8]";
}

function TrendIcon({ trend }: { trend: Trend }) {
  if (trend === "up") return <ChevronUp size={14} className="text-[#16A34A]" />;
  if (trend === "down") return <ChevronDown size={14} className="text-[#DC2626]" />;
  return <Minus size={14} className="text-[#94A3B8]" />;
}

export default function ClassificacaoPage() {
  const podio = TIMES_MOCK.slice(0, 3);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[28px] font-bold text-[#1E293B]">Classificação</h1>
          <p className="text-[13px] text-[#94A3B8] mt-1">Tabela de pontos por campeonato</p>
        </div>

        <button className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-[13px] font-medium text-[#1E293B] hover:bg-[#FAFAFA] transition-colors">
          <Trophy size={16} className="text-[#94A3B8]" />
          Copa Verão 2025
          <ChevronDown size={14} className="text-[#94A3B8]" />
        </button>
      </div>

      {/* Pódio (top 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {podio.map((time) => (
          <div
            key={time.posicao}
            className={`rounded-[12px] border p-4 flex items-center justify-between ${
              time.posicao === 1 ? "border-[#FACC15] bg-[#FEFEF0]" : "border-[#E5E7EB] bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold ${badgeClasses(time.posicao)}`}>
                {time.posicao}
              </div>
              <div className="w-9 h-9 rounded-full bg-[#F1F3F7] flex items-center justify-center text-[16px]">
                {time.emoji}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#1E293B]">{time.nome}</p>
                <p className="text-[11px] text-[#94A3B8]">
                  {time.jogos} jogos · {time.vitorias}V {time.empates}E {time.derrotas}D
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[20px] font-bold text-[#4F6BED]">{time.pontos}</p>
              <p className="text-[10px] text-[#94A3B8]">pts</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabela completa */}
      <div className="bg-white rounded-[12px] border border-[#E5E7EB] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="text-left text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-5 py-3">Time</th>
              <th className="text-right text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-3 py-3">PG</th>
              <th className="text-right text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-3 py-3">J</th>
              <th className="text-right text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-3 py-3">V</th>
              <th className="text-right text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-3 py-3">E</th>
              <th className="text-right text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-3 py-3">D</th>
              <th className="text-right text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-3 py-3">GP</th>
              <th className="text-right text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-3 py-3">GC</th>
              <th className="text-right text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-5 py-3">SG</th>
            </tr>
          </thead>
          <tbody>
            {TIMES_MOCK.map((time) => {
              const saldo = time.golsPro - time.golsContra;
              return (
                <tr
                  key={time.posicao}
                  className={`border-b border-[#E5E7EB] last:border-0 hover:bg-[#FAFAFA] transition-colors ${
                    time.posicao === 1 ? "bg-[#FEFEF0]" : ""
                  }`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold ${badgeClasses(time.posicao)}`}>
                        {time.posicao}
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[#F1F3F7] flex items-center justify-center text-[14px]">
                        {time.emoji}
                      </div>
                      <span className="text-[13px] font-medium text-[#1E293B]">{time.nome}</span>
                      <TrendIcon trend={time.trend} />
                    </div>
                  </td>
                  <td className="text-right px-3 text-[13px] font-bold text-[#4F6BED]">{time.pontos}</td>
                  <td className="text-right px-3 text-[13px] text-[#475569]">{time.jogos}</td>
                  <td className="text-right px-3 text-[13px] font-medium text-[#16A34A]">{time.vitorias}</td>
                  <td className="text-right px-3 text-[13px] font-medium text-[#CA8A04]">{time.empates}</td>
                  <td className="text-right px-3 text-[13px] font-medium text-[#DC2626]">{time.derrotas}</td>
                  <td className="text-right px-3 text-[13px] text-[#475569]">{time.golsPro}</td>
                  <td className="text-right px-3 text-[13px] text-[#475569]">{time.golsContra}</td>
                  <td className={`text-right px-5 text-[13px] font-semibold ${saldo >= 0 ? "text-[#16A34A]" : "text-[#DC2626]"}`}>
                    {saldo >= 0 ? "+" : ""}
                    {saldo}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legenda */}
      <div className="flex items-center gap-6 mt-4 px-1">
        <div className="flex items-center gap-1.5 text-[12px] text-[#94A3B8]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FACC15]" />
          Líder
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-[#94A3B8]">
          <ChevronUp size={12} className="text-[#16A34A]" />
          Subiu
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-[#94A3B8]">
          <Minus size={12} className="text-[#94A3B8]" />
          Manteve
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-[#94A3B8]">
          <ChevronDown size={12} className="text-[#DC2626]" />
          Caiu
        </div>
      </div>
    </div>
  );
}