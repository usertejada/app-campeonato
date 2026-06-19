// /app/pendencias/cartoes/page.tsx
"use client";

import { useState } from "react";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";

const mockCartoes = [
  { id: 1, nome: "Rafael Souza", time: "Tubarões FC", rodada: "Rodada 8", campeonato: "Copa Verão 2025", tipo: "Amarelo", acumulados: 3, avatar: "RS" },
  { id: 2, nome: "Diego Martins", time: "Trovões EC", rodada: "Rodada 7", campeonato: "Liga Empresarial", tipo: "Vermelho", acumulados: 0, suspenso: "2j", avatar: "DM" },
  { id: 3, nome: "Lucas Ferreira", time: "Panteras FC", rodada: "Rodada 8", campeonato: "Copa Verão 2025", tipo: "Amarelo", acumulados: 2, avatar: "LF" },
  { id: 4, nome: "André Lima", time: "Leões FC", rodada: "Rodada 6", campeonato: "Liga Empresarial", tipo: "Amarelo", acumulados: 3, avatar: "AL" },
  { id: 5, nome: "Marcos Oliveira", time: "Dragões SC", rodada: "Rodada 5", campeonato: "Torneio Relâmpago", tipo: "Vermelho", acumulados: 0, suspenso: "1j", avatar: "MO" },
  { id: 6, nome: "Bruno Santos", time: "Falcões EC", rodada: "Rodada 9", campeonato: "Copa da Cidade", tipo: "Amarelo", acumulados: 2, avatar: "BS" },
  { id: 7, nome: "Thiago Alves", time: "Lobos SC", rodada: "Rodada 8", campeonato: "Copa Verão 2025", tipo: "Amarelo", acumulados: 1, avatar: "TA" },
  { id: 8, nome: "Felipe Costa", time: "Águias SC", rodada: "Rodada 7", campeonato: "Copa da Cidade", tipo: "Vermelho", acumulados: 0, suspenso: "3j", avatar: "FC" },
  { id: 9, nome: "Rodrigo Nunes", time: "Tubarões FC", rodada: "Rodada 8", campeonato: "Liga Empresarial", tipo: "Amarelo", acumulados: 3, avatar: "RN" },
  { id: 10, nome: "Gustavo Pinto", time: "Trovões EC", rodada: "Rodada 6", campeonato: "Torneio Relâmpago", tipo: "Amarelo", acumulados: 2, avatar: "GP" },
];

const stats = {
  amarelos: mockCartoes.filter(c => c.tipo === "Amarelo").length,
  vermelhos: mockCartoes.filter(c => c.tipo === "Vermelho").length,
  suspensos: mockCartoes.filter(c => c.suspenso).length,
  acumulo: mockCartoes.filter(c => c.acumulados >= 3).length,
};

type Filtro = "Todos" | "Amarelos" | "Vermelhos" | "Suspensões";

export default function CartoesPage() {
  const router = useRouter();
  const [filtro, setFiltro] = useState<Filtro>("Todos");

  const filtrados = mockCartoes.filter(c => {
    if (filtro === "Todos") return true;
    if (filtro === "Amarelos") return c.tipo === "Amarelo";
    if (filtro === "Vermelhos") return c.tipo === "Vermelho";
    if (filtro === "Suspensões") return !!c.suspenso;
    return true;
  });

  const dotColors = (tipo: string, acumulados: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <span
        key={i}
        className={`inline-block w-2.5 h-2.5 rounded-full ${
          i < acumulados
            ? tipo === "Amarelo" ? "bg-[#F59E0B]" : "bg-[#EF4444]"
            : "bg-[#E5E7EB]"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Pendências"
        description="Cartões, suspensões e pagamentos em aberto"
        buttonLabel="+ Registrar Cartão"
        buttonIcon={AlertTriangle}
        onButtonClick={() => {}}
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => router.push("/pendencias/cartoes")}
          className="px-4 py-2 rounded-[8px] text-[13px] font-medium bg-[#4F6BED] text-white"
        >
          Cartões
        </button>
        <button
          onClick={() => router.push("/pendencias/pagamentos")}
          className="px-4 py-2 rounded-[8px] text-[13px] font-medium bg-white border border-[#E5E7EB] text-[#64748B] hover:text-[#1E293B] transition-colors"
        >
          Pagamentos
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Amarelos", value: stats.amarelos, color: "text-[#D97706]", bg: "bg-[#FEF3C7]", icon: "🟡" },
          { label: "Vermelhos", value: stats.vermelhos, color: "text-[#DC2626]", bg: "bg-[#FEE2E2]", icon: "🔴" },
          { label: "Suspensos", value: stats.suspensos, color: "text-[#3B82F6]", bg: "bg-[#EFF6FF]", icon: "🚫" },
          { label: "Em acúmulo", value: stats.acumulo, color: "text-[#F59E0B]", bg: "bg-[#FFFBEB]", icon: "⚠️" },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-[#E5E7EB] rounded-[12px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[12px] px-2 py-0.5 rounded-full ${stat.bg} ${stat.color} font-medium`}>
                {stat.label}
              </span>
            </div>
            <p className={`text-[24px] font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 mb-4 bg-white border border-[#E5E7EB] rounded-[10px] p-1 w-fit">
        {(["Todos", "Amarelos", "Vermelhos", "Suspensões"] as Filtro[]).map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-3 py-1.5 rounded-[7px] text-[13px] font-medium transition-colors ${
              filtro === f ? "bg-[#4F6BED] text-white" : "text-[#64748B] hover:text-[#1E293B]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_200px_100px_80px] gap-4 px-4 py-3 border-b border-[#E5E7EB]">
          <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide">Jogador</span>
          <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide">Campeonato</span>
          <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide">Tipo</span>
          <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide">Acum.</span>
        </div>
        {filtrados.map((c, i) => (
          <div
            key={c.id}
            className={`flex flex-col md:grid md:grid-cols-[1fr_200px_100px_80px] gap-2 md:gap-4 px-4 py-3 items-start md:items-center ${
              i < filtrados.length - 1 ? "border-b border-[#E5E7EB]" : ""
            }`}
          >
            {/* Jogador */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#4F6BED]/10 flex items-center justify-center text-[11px] font-bold text-[#4F6BED] shrink-0">
                {c.avatar}
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#1E293B]">{c.nome}</p>
                <p className="text-[12px] text-[#94A3B8]">{c.time} · {c.rodada}</p>
              </div>
            </div>

            {/* Campeonato */}
            <span className="text-[13px] text-[#64748B] md:block">{c.campeonato}</span>

            {/* Tipo */}
            <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full w-fit ${
              c.tipo === "Amarelo"
                ? "bg-[#FEF3C7] text-[#D97706]"
                : "bg-[#FEE2E2] text-[#DC2626]"
            }`}>
              ■ {c.tipo}
            </span>

            {/* Acumulados / Suspenso */}
            <div className="flex items-center gap-1">
              {c.suspenso ? (
                <span className="text-[13px] font-bold text-[#DC2626]">{c.suspenso}</span>
              ) : (
                <div className="flex gap-1">{dotColors(c.tipo, c.acumulados)}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push("/pendencias")}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mt-6"
      >
        <ArrowLeft size={15} />
        Voltar para Pendências
      </button>
    </div>
  );
}