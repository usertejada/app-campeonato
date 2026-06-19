import { jogadoresMock } from "@/lib/constants/jogador";
import type { Jogador } from "@/types/jogador";

export async function getJogadoresByTime(timeId: number): Promise<Jogador[]> {
  return Promise.resolve(jogadoresMock.filter((j) => j.timeId === timeId));
}

export async function getJogadorById(id: number): Promise<Jogador | undefined> {
  return Promise.resolve(jogadoresMock.find((j) => j.id === id));
}

export async function excluirJogador(id: number): Promise<void> {
  console.log("Excluir jogador:", id);
  return Promise.resolve();
}

// services/jogadores-service.ts (adicionar esta função)
export async function buscarJogador(id: string): Promise<Jogador | null> {
  const jogador = jogadoresMock.find((j) => j.id === Number(id));
  return Promise.resolve(jogador ?? null);
}