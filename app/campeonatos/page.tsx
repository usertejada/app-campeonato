"use client";

import { Trophy, Search, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { CampeonatoCard } from "@/stat-card/campeonatos/campeonato-card";
import { FinalizarModal } from "@/stat-card/campeonatos/finalizar-modal";
import { FilterDropdown } from "@/stat-card/campeonatos/filter-dropdown";
import { STATUS_FILTERS } from "@/lib/constants/campeonato";
import { useCampeonatos } from "@/hooks/use-campeonatos";
import { useState } from "react";
import type { Campeonato } from "@/types/campeonato";

export default function CampeonatosPage() {
  const router = useRouter();
  const {
    loading, busca, setBusca, filtroStatus, setFiltroStatus,
    campeonatosFiltrados, handleFinalizar, handleExcluir,
  } = useCampeonatos();

  const [paraFinalizar, setParaFinalizar] = useState<Campeonato | null>(null);

  if (loading) return <div className="p-6">Carregando...</div>;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Campeonatos"
        description="Gerencie todos os seus campeonatos"
        buttonLabel="+ Novo Campeonato"
        buttonIcon={Trophy}
        onButtonClick={() => router.push("/formularios/campeonato")}
      />

      {/* busca + filtro */}
      {/* ... mesmo JSX, usando busca/filtroStatus do hook ... */}

      <p className="text-[#94A3B8] text-[12px] mb-4">
        {campeonatosFiltrados.length}{" "}
        {campeonatosFiltrados.length === 1 ? "campeonato encontrado" : "campeonatos encontrados"}
      </p>

      {campeonatosFiltrados.length === 0 ? (
        <EmptyState icon={Trophy} title="Nenhum campeonato encontrado" description="Tente ajustar os filtros ou crie um novo campeonato." />
      ) : (
        <div className="grid grid-cols-1 min-[640px]:grid-cols-2 lg:grid-cols-4 gap-3">
          {campeonatosFiltrados.map((c) => (
            <CampeonatoCard
              key={c.id}
              campeonato={c}
              onEditar={() => router.push(`/editar/campeonato/${c.id}`)}
              onFinalizar={() => setParaFinalizar(c)}
              onExcluir={() => handleExcluir(c.id)}
            />
          ))}
        </div>
      )}

      {paraFinalizar && (
        <FinalizarModal
          campeonato={paraFinalizar}
          onConfirmar={(campeao) => {
            handleFinalizar(paraFinalizar.id, campeao);
            setParaFinalizar(null);
          }}
          onCancelar={() => setParaFinalizar(null)}
        />
      )}
    </div>
  );
}