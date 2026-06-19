// services/times-service.ts
import { timesMock } from "@/lib/constants/time";
import type { Time } from "@/types/time";

export async function getTimes(): Promise<Time[]> {
  return Promise.resolve(timesMock);
}

export async function buscarTime(id: string): Promise<Time | null> {
  const time = timesMock.find((t) => t.id === Number(id));
  return Promise.resolve(time ?? null);
}

export async function excluirTime(id: number): Promise<void> {
  console.log("Excluir time:", id);
  return Promise.resolve();
}