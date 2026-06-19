"use client";

import { useState, useEffect } from "react";
import type { Jogador } from "@/types/jogador";
import { getJogadoresByTime, excluirJogador } from "@/services/jogadores-service";

export function useJogadores(timeId: number) {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJogadoresByTime(timeId)
      .then(setJogadores)
      .finally(() => setLoading(false));
  }, [timeId]);

  async function handleExcluir(id: number) {
    await excluirJogador(id);
    setJogadores((prev) => prev.filter((j) => j.id !== id));
  }

  return {
    jogadores,
    loading,
    handleExcluir,
  };
}