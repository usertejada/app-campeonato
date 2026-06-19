export type Status = "agendado" | "em_andamento" | "finalizada";

export type Partida = {
  id: string;
  timeCasa: { nome: string; escudo: string };
  timeVisitante: { nome: string; escudo: string };
  horario: string;
  duracao: string;
  campeonato: string;
  local: string;
  status: Status;
  golsCasa?: number;
  golsVisitante?: number;
  data: string;
};

export type Filtro = "todas" | Status;