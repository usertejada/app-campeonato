// /app/artilheiro/page.tsx
"use client";

import { useState } from "react";
import {
  Trophy,
  ChevronDown,
  Target,
  Medal,
  Flame,
  ChevronLeft,
  ChevronRight,
  ChevronDown as AccordionIcon,
} from "lucide-react";

interface Artilheiro {
  posicao: number;
  nome: string;
  time: string;
  emoji: string;
  gols: number;
  jogos: number;
  assistencias: number;
  media: number;
}

const ARTILHEIROS_MOCK: Artilheiro[] = [
  { posicao: 1, nome: "Carlos Henrique", time: "Aguias SC", emoji: "🦅", gols: 18, jogos: 10, assistencias: 5, media: 1.8 },
  { posicao: 2, nome: "Rafael Souza", time: "Tubaroes FC", emoji: "🦈", gols: 15, jogos: 10, assistencias: 3, media: 1.5 },
  { posicao: 3, nome: "Diego Martins", time: "Trovoes EC", emoji: "⚡", gols: 14, jogos: 9, assistencias: 7, media: 1.6 },
  { posicao: 4, nome: "Lucas Ferreira", time: "Panteras FC", emoji: "🐆", gols: 13, jogos: 10, assistencias: 2, media: 1.3 },
  { posicao: 5, nome: "Andre Lima", time: "Leoes FC", emoji: "🦁", gols: 12, jogos: 8, assistencias: 4, media: 1.5 },
  { posicao: 6, nome: "Marcos Oliveira", time: "Dragoes SC", emoji: "🐉", gols: 11, jogos: 10, assistencias: 6, media: 1.1 },
  { posicao: 7, nome: "Bruno Santos", time: "Falcoes EC", emoji: "🐓", gols: 10, jogos: 9, assistencias: 1, media: 1.1 },
  { posicao: 8, nome: "Thiago Alves", time: "Lobos SC", emoji: "🐺", gols: 10, jogos: 10, assistencias: 3, media: 1.0 },
  { posicao: 9, nome: "Felipe Costa", time: "Aguias SC", emoji: "🦅", gols: 9, jogos: 8, assistencias: 5, media: 1.1 },
  { posicao: 10, nome: "Rodrigo Nunes", time: "Tubaroes FC", emoji: "🦈", gols: 9, jogos: 9, assistencias: 2, media: 1.0 },
  { posicao: 11, nome: "Gabriel Souza", time: "Leoes FC", emoji: "🦁", gols: 8, jogos: 9, assistencias: 3, media: 0.9 },
  { posicao: 12, nome: "Eduardo Silva", time: "Dragoes SC", emoji: "🐉", gols: 7, jogos: 8, assistencias: 2, media: 0.9 },
];

const CAMPEONATOS = ["Todos", "Copa Verão 2025", "Liga Empresarial", "Torneio Relâmpago", "Copa da Cidade"];
const PAGE_SIZE = 10;

function podioVariant(posicao: number) {
  if (posicao === 1) return { card: "bg-[#FEF9C3] border-[#FACC15]", badge: "bg-[#CA8A04]", gol: "text-[#CA8A04]" };
  if (posicao === 2) return { card: "bg-[#F1F3F7] border-[#E5E7EB]", badge: "bg-[#64748B]", gol: "text-[#64748B]" };
  return { card: "bg-[#FFEDD5] border-[#FDBA74]", badge: "bg-[#C2410C]", gol: "text-[#C2410C]" };
}

function medalColor(posicao: number) {
  if (posicao === 1) return "text-[#CA8A04]";
  if (posicao === 2) return "text-[#64748B]";
  return "text-[#C2410C]";
}

// Accordion row for mobile
function AccordionRow({ a, maxGols }: { a: Artilheiro; maxGols: number }) {
  const [open, setOpen] = useState(false);
  const isPodio = a.posicao <= 3;

  return (
    <div
      className={`border-b border-[#E5E7EB] last:border-0 transition-colors ${
        a.posicao === 1 ? "bg-[#FEF9C3]/40" : ""
      }`}
    >
      {/* Header row */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        {/* Posição */}
        <div className="w-6 flex-shrink-0 flex justify-center">
          {isPodio ? (
            <Medal size={16} className={medalColor(a.posicao)} />
          ) : (
            <span className="text-[13px] text-[#94A3B8] font-medium">{a.posicao}</span>
          )}
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-[#F1F3F7] border border-[#E5E7EB] flex items-center justify-center text-[16px] flex-shrink-0">
          {a.emoji}
        </div>

        {/* Nome + time */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-[#1E293B] flex items-center gap-1 truncate">
            {a.nome}
            {a.posicao === 1 && <Flame size={12} className="text-[#F97316] flex-shrink-0" />}
          </p>
          <p className="text-[11px] text-[#94A3B8] truncate">{a.time}</p>
        </div>

        {/* Gols destaque */}
        <div className="flex items-center gap-1 bg-[#4F6BED]/10 rounded-full px-2.5 py-1 flex-shrink-0">
          <Target size={11} className="text-[#4F6BED]" />
          <span className="text-[13px] font-bold text-[#4F6BED]">{a.gols}</span>
        </div>

        {/* Chevron */}
        <ChevronDown
          size={14}
          className={`text-[#94A3B8] flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expanded details */}
      {open && (
        <div className="px-4 pb-4">
          {/* Barra de progresso */}
          <div className="mb-3">
            <div className="flex justify-between text-[11px] text-[#94A3B8] mb-1">
              <span>Progresso</span>
              <span>{Math.round((a.gols / maxGols) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#4F6BED] rounded-full transition-all duration-500"
                style={{ width: `${(a.gols / maxGols) * 100}%` }}
              />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Jogos", value: a.jogos },
              { label: "Assistências", value: a.assistencias },
              { label: "Média/jogo", value: a.media },
            ].map(stat => (
              <div
                key={stat.label}
                className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[8px] py-2 px-3 text-center"
              >
                <p className="text-[14px] font-bold text-[#1E293B]">{stat.value}</p>
                <p className="text-[10px] text-[#94A3B8] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ArtilheiroPage() {
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtro, setFiltro] = useState("Todos");
  const [pagina, setPagina] = useState(1);

  const totalPaginas = Math.ceil(ARTILHEIROS_MOCK.length / PAGE_SIZE);
  const lista = ARTILHEIROS_MOCK.slice((pagina - 1) * PAGE_SIZE, pagina * PAGE_SIZE);
  const maxGols = ARTILHEIROS_MOCK[0].gols;
  const podio = [ARTILHEIROS_MOCK[1], ARTILHEIROS_MOCK[0], ARTILHEIROS_MOCK[2]];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">

      {/* Header */}
      <div className="flex items-start justify-between mb-6 md:mb-8">
        <div>
          <h1 className="text-[22px] md:text-[28px] font-bold text-[#1E293B]">Artilheiros</h1>
          <p className="text-[12px] md:text-[13px] text-[#94A3B8] mt-1">Ranking de goleadores por campeonato</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setFiltroAberto((v) => !v)}
            className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-[12px] px-3 md:px-4 py-2 md:py-2.5 text-[12px] md:text-[13px] font-medium text-[#1E293B] hover:bg-[#FAFAFA] transition-colors"
          >
            <Trophy size={14} className="text-[#94A3B8]" />
            <span className="hidden sm:inline">{filtro}</span>
            <span className="sm:hidden">Filtrar</span>
            <ChevronDown size={13} className="text-[#94A3B8]" />
          </button>

          {filtroAberto && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-[#E5E7EB] rounded-[12px] shadow-lg overflow-hidden z-10">
              {CAMPEONATOS.map((c) => (
                <button
                  key={c}
                  onClick={() => { setFiltro(c); setFiltroAberto(false); setPagina(1); }}
                  className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors ${
                    c === filtro ? "bg-[#4F6BED] text-white font-medium" : "text-[#1E293B] hover:bg-[#FAFAFA]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== PAGINAÇÃO (acima dos cards, alinhada à direita) ===== */}
      {totalPaginas > 1 && (
        <div className="flex items-center justify-end gap-2 mb-4 md:mb-5">
          <button
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
            className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-[#E5E7EB] bg-white text-[#94A3B8] disabled:opacity-50 hover:bg-[#FAFAFA] transition-colors"
          >
            <ChevronLeft size={14} />
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPagina(p)}
              className={`w-8 h-8 flex items-center justify-center rounded-[8px] text-[13px] font-medium transition-colors ${
                p === pagina ? "bg-[#4F6BED] text-white" : "bg-white border border-[#E5E7EB] text-[#1E293B] hover:bg-[#FAFAFA]"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas}
            className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-[#E5E7EB] bg-white text-[#94A3B8] disabled:opacity-50 hover:bg-[#FAFAFA] transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* ===== PÓDIO ===== */}

      {/* Mobile: pódio em coluna (1°, 2°, 3°) */}
      <div className="flex sm:hidden flex-col gap-3 mb-6">
        {[ARTILHEIROS_MOCK[0], ARTILHEIROS_MOCK[1], ARTILHEIROS_MOCK[2]].map((a) => {
          const v = podioVariant(a.posicao);
          return (
            <div
              key={a.posicao}
              className={`flex items-center gap-4 rounded-[12px] border px-4 py-3 ${v.card}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0 ${v.badge}`}>
                {a.posicao}
              </div>
              <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-[24px] flex-shrink-0">
                {a.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-[#1E293B] truncate">{a.nome}</p>
                <p className="text-[11px] text-[#94A3B8]">{a.time}</p>
              </div>
              <div className={`flex items-center gap-1 flex-shrink-0`}>
                <Target size={13} className="text-[#4F6BED]" />
                <span className="text-[18px] font-bold text-[#4F6BED]">{a.gols}</span>
                <span className="text-[11px] text-[#94A3B8]">gols</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tablet: pódio 3 colunas sem altura variável */}
      <div className="hidden sm:grid md:hidden grid-cols-3 gap-3 mb-6">
        {podio.map((a) => {
          const v = podioVariant(a.posicao);
          return (
            <div
              key={a.posicao}
              className={`relative rounded-[12px] border pt-7 pb-4 px-3 flex flex-col items-center text-center ${v.card}`}
            >
              <div className={`absolute -top-3 w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold ${v.badge}`}>
                {a.posicao}
              </div>
              <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-[22px] mb-2">
                {a.emoji}
              </div>
              <p className="text-[13px] font-bold text-[#1E293B] leading-tight">{a.nome}</p>
              <p className="text-[10px] text-[#94A3B8] mb-2">{a.time}</p>
              <div className="flex items-center gap-1 bg-white rounded-full px-2.5 py-1 border border-[#E5E7EB]">
                <Target size={10} className="text-[#4F6BED]" />
                <span className="text-[13px] font-bold text-[#4F6BED]">{a.gols}</span>
                <span className="text-[10px] text-[#94A3B8]">gols</span>
              </div>
              <div className="flex items-center gap-2 pt-2 mt-2 border-t border-[#E5E7EB] w-full justify-center">
                <div className="text-center">
                  <p className="text-[12px] font-semibold text-[#1E293B]">{a.jogos}</p>
                  <p className="text-[9px] text-[#94A3B8]">J</p>
                </div>
                <div className="w-px h-5 bg-[#E5E7EB]" />
                <div className="text-center">
                  <p className="text-[12px] font-semibold text-[#1E293B]">{a.assistencias}</p>
                  <p className="text-[9px] text-[#94A3B8]">Ast</p>
                </div>
                <div className="w-px h-5 bg-[#E5E7EB]" />
                <div className="text-center">
                  <p className="text-[12px] font-semibold text-[#1E293B]">{a.media}</p>
                  <p className="text-[9px] text-[#94A3B8]">Méd</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: pódio com altura variável (1° mais alto) */}
      <div className="hidden md:grid grid-cols-3 gap-4 mb-8 items-end">
        {podio.map((a) => {
          const v = podioVariant(a.posicao);
          return (
            <div
              key={a.posicao}
              className={`relative rounded-[12px] border pt-8 pb-5 px-4 flex flex-col items-center text-center ${v.card} ${
                a.posicao === 1 ? "-mt-4" : ""
              }`}
            >
              <div className={`absolute -top-3 w-7 h-7 rounded-full flex items-center justify-center text-white text-[12px] font-bold ${v.badge}`}>
                {a.posicao}
              </div>
              <div className="w-16 h-16 rounded-full bg-[#F1F3F7] border-4 border-white shadow flex items-center justify-center text-[28px] mb-2">
                {a.emoji}
              </div>
              <p className="text-[14px] font-bold text-[#1E293B]">{a.nome}</p>
              <p className="text-[11px] text-[#94A3B8] mb-3">{a.time}</p>
              <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1 mb-3 border border-[#E5E7EB]">
                <Target size={12} className="text-[#4F6BED]" />
                <span className="text-[13px] font-bold text-[#4F6BED]">{a.gols}</span>
                <span className="text-[11px] text-[#94A3B8]">gols</span>
              </div>
              <div className="flex items-center gap-4 pt-3 border-t border-[#E5E7EB] w-full justify-center">
                <div className="text-center">
                  <p className="text-[13px] font-semibold text-[#1E293B]">{a.jogos}</p>
                  <p className="text-[10px] text-[#94A3B8]">jogos</p>
                </div>
                <div className="w-px h-6 bg-[#E5E7EB]" />
                <div className="text-center">
                  <p className="text-[13px] font-semibold text-[#1E293B]">{a.assistencias}</p>
                  <p className="text-[10px] text-[#94A3B8]">assist.</p>
                </div>
                <div className="w-px h-6 bg-[#E5E7EB]" />
                <div className="text-center">
                  <p className="text-[13px] font-semibold text-[#1E293B]">{a.media}</p>
                  <p className="text-[10px] text-[#94A3B8]">média</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== LISTA ===== */}

      {/* Mobile: sanfona (accordion) */}
      <div className="sm:hidden bg-white rounded-[12px] border border-[#bdd6d2] overflow-hidden">
        {lista.map((a) => (
          <AccordionRow key={a.posicao} a={a} maxGols={maxGols} />
        ))}
      </div>

      {/* Tablet: tabela simplificada sem coluna de progresso */}
      <div className="hidden sm:block md:hidden bg-white rounded-[12px] border border-[#bdd6d2] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="text-left text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-4 py-3 w-8">#</th>
              <th className="text-left text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide py-3">Jogador</th>
              <th className="text-right text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-3 py-3">Gols</th>
              <th className="text-right text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-3 py-3">J</th>
              <th className="text-right text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-4 py-3">Méd</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((a) => (
              <tr
                key={a.posicao}
                className={`border-b border-[#E5E7EB] last:border-0 hover:bg-[#FAFAFA] transition-colors ${
                  a.posicao === 1 ? "bg-[#FEF9C3]/40" : ""
                }`}
              >
                <td className="px-4 py-3">
                  {a.posicao <= 3 ? (
                    <Medal size={15} className={medalColor(a.posicao)} />
                  ) : (
                    <span className="text-[12px] text-[#94A3B8]">{a.posicao}</span>
                  )}
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#F1F3F7] flex items-center justify-center text-[13px]">{a.emoji}</div>
                    <div>
                      <p className="text-[12px] font-semibold text-[#1E293B] flex items-center gap-1">
                        {a.nome}
                        {a.posicao === 1 && <Flame size={11} className="text-[#F97316]" />}
                      </p>
                      <p className="text-[11px] text-[#94A3B8]">{a.time}</p>
                    </div>
                  </div>
                </td>
                <td className="text-right px-3 text-[13px] font-bold text-[#4F6BED]">{a.gols}</td>
                <td className="text-right px-3 text-[12px] text-[#475569]">{a.jogos}</td>
                <td className="text-right px-4 text-[12px] text-[#475569]">{a.media}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Desktop: tabela completa */}
      <div className="hidden md:block bg-white rounded-[12px] border border-[#bdd6d2] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="text-left text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-5 py-3 w-10">#</th>
              <th className="text-left text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide py-3">Jogador</th>
              <th className="text-right text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-4 py-3">Progresso</th>
              <th className="text-right text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-3 py-3">Gols</th>
              <th className="text-right text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-3 py-3">J</th>
              <th className="text-right text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-3 py-3">Ast</th>
              <th className="text-right text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide px-5 py-3">Média</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((a) => (
              <tr
                key={a.posicao}
                className={`border-b border-[#E5E7EB] last:border-0 hover:bg-[#FAFAFA] transition-colors ${
                  a.posicao === 1 ? "bg-[#FEF9C3]/40" : ""
                }`}
              >
                <td className="px-5 py-3.5">
                  {a.posicao <= 3 ? (
                    <Medal size={16} className={medalColor(a.posicao)} />
                  ) : (
                    <span className="text-[13px] text-[#94A3B8]">{a.posicao}</span>
                  )}
                </td>
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F1F3F7] flex items-center justify-center text-[14px]">{a.emoji}</div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#1E293B] flex items-center gap-1">
                        {a.nome}
                        {a.posicao === 1 && <Flame size={12} className="text-[#F97316]" />}
                      </p>
                      <p className="text-[11px] text-[#94A3B8]">{a.time}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 w-48">
                  <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4F6BED] rounded-full"
                      style={{ width: `${(a.gols / maxGols) * 100}%` }}
                    />
                  </div>
                </td>
                <td className="text-right px-3 text-[13px] font-bold text-[#4F6BED]">{a.gols}</td>
                <td className="text-right px-3 text-[13px] text-[#475569]">{a.jogos}</td>
                <td className="text-right px-3 text-[13px] text-[#475569]">{a.assistencias}</td>
                <td className="text-right px-5 text-[13px] text-[#475569]">{a.media}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}