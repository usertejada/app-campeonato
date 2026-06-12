export type Status = "Em Andamento" | "Pendente" | "Finalizado";
export type Formato = "Mata-mata" | "Pontos corridos" | "Eliminatório" | "Grupos + mata-mata";

export interface Campeonato {
  id: number;
  nome: string;
  descricao: string;
  status: Status;
  data: string;
  times: string;
  formato: Formato;
}