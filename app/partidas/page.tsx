"use client";

import { PartidaHeader } from "./components/PartidaHeader";
import { PartidaResumo } from "./components/PartidaResumo";
import { PartidaLista } from "./components/PartidaLista";
import type { Partida } from "@/types/partidas";

const PARTIDAS_MOCK: Partida[] = [
  {
    id: "1",
    timeCasa: { nome: "Águias SC", escudo: "🦅" },
    timeVisitante: { nome: "Leões FC", escudo: "🦁" },
    horario: "08:00",
    duracao: "45min/45min",
    campeonato: "Copa Verão 2025",
    local: "Campo Principal",
    status: "finalizada",
    golsCasa: 2,
    golsVisitante: 1,
    data: "2025-06-01",
  },
  {
    id: "2",
    timeCasa: { nome: "Panteras FC", escudo: "🐆" },
    timeVisitante: { nome: "Trovões EC", escudo: "⚡" },
    horario: "10:00",
    duracao: "45min/45min",
    campeonato: "Copa Verão 2025",
    local: "Campo Principal",
    status: "finalizada",
    golsCasa: 1,
    golsVisitante: 1,
    data: "2025-06-01",
  },
  {
    id: "3",
    timeCasa: { nome: "Atl. Amazonas FC", escudo: "🌿" },
    timeVisitante: { nome: "Amigos Cabelinho", escudo: "🦝" },
    horario: "09:00",
    duracao: "20min/20min",
    campeonato: "Liga Empresarial",
    local: "Quadra Coberta",
    status: "em_andamento",
    data: "2025-06-08",
  },
  {
    id: "4",
    timeCasa: { nome: "Tubarões FC", escudo: "🦈" },
    timeVisitante: { nome: "Falcões EC", escudo: "🦅" },
    horario: "08:00",
    duracao: "20min/20min",
    campeonato: "Copa Verão 2025",
    local: "Campo Principal",
    status: "agendado",
    data: "2025-06-15",
  },
  {
    id: "5",
    timeCasa: { nome: "Dragões SC", escudo: "🐉" },
    timeVisitante: { nome: "Lobos FC", escudo: "🐺" },
    horario: "09:30",
    duracao: "20min/20min",
    campeonato: "Copa Verão 2025",
    local: "Campo Principal",
    status: "agendado",
    data: "2025-06-15",
  },
];

export default function PartidasPage() {
  const agendadas = PARTIDAS_MOCK.filter((p) => p.status === "agendado").length;
  const emAndamento = PARTIDAS_MOCK.filter((p) => p.status === "em_andamento").length;
  const finalizadas = PARTIDAS_MOCK.filter((p) => p.status === "finalizada").length;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PartidaHeader />
      <PartidaResumo
        agendadas={agendadas}
        emAndamento={emAndamento}
        finalizadas={finalizadas}
      />
      <PartidaLista partidas={PARTIDAS_MOCK} />
    </div>
  );
}