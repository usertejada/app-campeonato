import { campeonatosMock } from "@/lib/constants/campeonato";
import type { Campeonato } from "@/types/campeonato";

export async function getCampeonatos(): Promise<Campeonato[]> {
  return Promise.resolve(campeonatosMock);
}

export async function finalizarCampeonato(id: number, campeao: string): Promise<void> {
  console.log("Finalizar campeonato:", id, "| Campeão:", campeao);
  return Promise.resolve();
}

export async function excluirCampeonato(id: number): Promise<void> {
  console.log("Excluir campeonato:", id);
  return Promise.resolve();
}