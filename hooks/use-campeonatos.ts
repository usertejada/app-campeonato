"use client";

import { useState, useMemo, useEffect } from "react";
import type { Campeonato } from "@/types/campeonato";
import { getCampeonatos, finalizarCampeonato, excluirCampeonato } from "@/services/campeonatos-service";

export function useCampeonatos() {
  const [campeonatos, setCampeonatos] = useState<Campeonato[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("Todos");

  useEffect(() => {
    getCampeonatos()
      .then(setCampeonatos)
      .finally(() => setLoading(false));
  }, []);

  const campeonatosFiltrados = useMemo(() => {
    return campeonatos.filter((c) => {
      const matchBusca = c.nome.toLowerCase().includes(busca.toLowerCase());
      const matchStatus = filtroStatus === "Todos" || c.status === filtroStatus;
      return matchBusca && matchStatus;
    });
  }, [campeonatos, busca, filtroStatus]);

  async function handleFinalizar(id: number, campeao: string) {
    await finalizarCampeonato(id, campeao);
    setCampeonatos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Finalizado" } : c))
    );
  }

  async function handleExcluir(id: number) {
    await excluirCampeonato(id);
    setCampeonatos((prev) => prev.filter((c) => c.id !== id));
  }

  return {
    loading,
    busca,
    setBusca,
    filtroStatus,
    setFiltroStatus,
    campeonatosFiltrados,
    handleFinalizar,
    handleExcluir,
  };
}