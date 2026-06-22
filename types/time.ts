// types/time.ts
export interface Time {
  id: number;
  nome: string;
  logoUrl?: string;
  cidade: string;
  tecnico: string;
  campeonato: string;
  anoFundacao: number;
  telefone?: string;
  vitorias: number;
  empates: number;
  derrotas: number;
}