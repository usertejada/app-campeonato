"use client";

import { useState } from "react";
import { Clock, CheckCircle, Flame, Calendar, MapPin, Trophy } from "lucide-react";
import type { Partida, Status, Filtro } from "@/types/partidas";

type Props = {
  partidas: Partida[];
};

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  agendado: {
    label: "Agendada",
    color: "#4F6BED",
    bg: "#EEF1FD",
    icon: <Clock size={11} />,
  },
  em_andamento: {
    label: "Em andamento",
    color: "#F59E0B",
    bg: "#FEF3C7",
    icon: <Flame size={11} />,
  },
  finalizada: {
    label: "Finalizada",
    color: "#10B981",
    bg: "#D1FAE5",
    icon: <CheckCircle size={11} />,
  },
};

const FILTROS: { key: Filtro; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "agendado", label: "Agendadas" },
  { key: "em_andamento", label: "Em andamento" },
  { key: "finalizada", label: "Finalizadas" },
];

function formatarDataGrupo(data: string) {
  const d = new Date(data + "T00:00:00");
  return d
    .toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function PartidaLista({ partidas }: Props) {
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const filtradas =
    filtro === "todas" ? partidas : partidas.filter((p) => p.status === filtro);

  const grupos = filtradas.reduce<Record<string, Partida[]>>((acc, p) => {
    if (!acc[p.data]) acc[p.data] = [];
    acc[p.data].push(p);
    return acc;
  }, {});
  const datasOrdenadas = Object.keys(grupos).sort();

  return (
    <div>
      {/* Filtros */}
      <div className="flex gap-2 mb-6">
        {FILTROS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFiltro(f.key)}
            className={`text-[13px] font-medium px-4 py-1.5 rounded-full border transition-colors ${
              filtro === f.key
                ? "bg-[#4F6BED] border-[#4F6BED] text-white"
                : "bg-white border-[#E5E7EB] text-[#64748B] hover:border-[#4F6BED]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lista */}
      {filtradas.length === 0 ? (
        <div className="bg-white border border-[#bdd6d2] rounded-[12px] p-10 flex flex-col items-center justify-center text-center">
          <Trophy size={32} className="text-[#CBD5E1] mb-3" />
          <p className="text-[14px] font-medium text-[#94A3B8]">Nenhuma partida encontrada</p>
          <p className="text-[12px] text-[#CBD5E1] mt-1">
            Use os botões acima para criar confrontos
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {datasOrdenadas.map((data) => {
            const jogos = grupos[data];
            return (
              <div key={data}>
                {/* Label da data */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 bg-white border border-[#bdd6d2] rounded-full px-3 py-1.5">
                    <Calendar size={13} className="text-[#4F6BED]" />
                    <span className="text-[12px] font-semibold text-[#1E293B]">
                      {formatarDataGrupo(data)}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#94A3B8]">
                    {jogos.length} {jogos.length === 1 ? "jogo" : "jogos"}
                  </span>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {jogos.map((p) => {
                    const cfg = STATUS_CONFIG[p.status];
                    return (
                      <div
                        key={p.id}
                        className="bg-white border border-[#bdd6d2] rounded-[12px] overflow-hidden"
                      >
                        {/* Topo */}
                        <div className="flex items-center justify-between px-4 py-2.5">
                          <span
                            className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                            style={{ color: cfg.color, backgroundColor: cfg.bg }}
                          >
                            {cfg.icon}
                            {cfg.label}
                          </span>
                          <span className="flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
                            <Clock size={11} />
                            {p.horario} · {p.duracao}
                          </span>
                        </div>

                        {/* Placar */}
                        <div className="grid grid-cols-3 items-center px-5 py-3 gap-2">
                          <div className="flex flex-col items-center gap-1.5">
                            <div className="w-12 h-12 rounded-full bg-[#F1F3F7] flex items-center justify-center text-[22px]">
                              {p.timeCasa.escudo}
                            </div>
                            <span className="text-[12px] font-semibold text-[#1E293B] text-center leading-tight">
                              {p.timeCasa.nome}
                            </span>
                            {p.status === "finalizada" && (
                              <span
                                className="text-[22px] font-bold"
                                style={{
                                  color:
                                    (p.golsCasa ?? 0) > (p.golsVisitante ?? 0)
                                      ? "#10B981"
                                      : "#EF4444",
                                }}
                              >
                                {p.golsCasa}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-center">
                            <span className="text-[14px] font-bold text-[#CBD5E1]">
                              {p.status === "finalizada" ? "×" : "VS"}
                            </span>
                          </div>

                          <div className="flex flex-col items-center gap-1.5">
                            <div className="w-12 h-12 rounded-full bg-[#F1F3F7] flex items-center justify-center text-[22px]">
                              {p.timeVisitante.escudo}
                            </div>
                            <span className="text-[12px] font-semibold text-[#1E293B] text-center leading-tight">
                              {p.timeVisitante.nome}
                            </span>
                            {p.status === "finalizada" && (
                              <span
                                className="text-[22px] font-bold"
                                style={{
                                  color:
                                    (p.golsVisitante ?? 0) > (p.golsCasa ?? 0)
                                      ? "#10B981"
                                      : "#EF4444",
                                }}
                              >
                                {p.golsVisitante}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-2.5 border-t border-[#F1F3F7] flex items-center gap-4">
                          <span className="flex items-center gap-1 text-[11px] text-[#94A3B8]">
                            <Trophy size={11} />
                            {p.campeonato}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-[#94A3B8]">
                            <MapPin size={11} />
                            {p.local}
                          </span>
                        </div>

                        {/* Botão finalizar */}
                        {p.status === "em_andamento" && (
                          <div className="px-4 pb-3">
                            <button className="w-full flex items-center justify-center gap-2 border border-[#4F6BED] text-[#4F6BED] hover:bg-[#EEF1FD] text-[13px] font-semibold py-2 rounded-[8px] transition-colors">
                              <CheckCircle size={14} />
                              Finalizar Partida
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}