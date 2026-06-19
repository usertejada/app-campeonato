"use client";

import { useState, useMemo, useEffect } from "react";
import type { Time } from "@/types/time";
import { getTimes, excluirTime } from "@/services/times-service";

export function useTimes() {
  const [times, setTimes] = useState<Time[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    getTimes()
      .then(setTimes)
      .finally(() => setLoading(false));
  }, []);

  const timesFiltrados = useMemo(() => {
    return times.filter((t) =>
      t.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }, [times, busca]);

  async function handleExcluir(id: number) {
    await excluirTime(id);
    setTimes((prev) => prev.filter((t) => t.id !== id));
  }

  return {
    loading,
    busca,
    setBusca,
    timesFiltrados,
    handleExcluir,
  };
}