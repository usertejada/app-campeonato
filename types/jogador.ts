export interface Jogador {
  id: number;
  timeId: number;
  nome: string;
  posicao: "Goleiro" | "Zagueiro" | "Lateral" | "Volante" | "Meia" | "Atacante";
  numeroCamisa: number;
  foto?: string;
  dataNascimento: string; // ISO: "YYYY-MM-DD"
  cpf?: string;
  telefone?: string;
  nacionalidade?: string;
  gols: number;
  assistencias: number;
  cartoesAmarelos: number;
  cartoesVermelhos: number;
}