"use client";

import { Users, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { TimeCard } from "@/stat-card/times/time-card";
import { useTimes } from "@/hooks/use-times";

export default function TimesPage() {
  const router = useRouter();
  const { loading, busca, setBusca, timesFiltrados, handleExcluir } = useTimes();

  if (loading) return <div className="p-6 text-[#94A3B8] text-[13px]">Carregando...</div>;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Times"
        description="Gerencie todos os times cadastrados"
        buttonLabel="+ Novo Time"
        buttonIcon={Users}
        onButtonClick={() => router.push("/formularios/times")}
      />

      {/* Busca */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
          />
          <input
            type="text"
            placeholder="Buscar time..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full h-[36px] pl-9 pr-3 rounded-[8px] border border-[#E5E7EB] bg-white text-[#1E293B] text-[13px] placeholder:text-[#94A3B8] outline-none focus:border-[#4F6BED] focus:ring-2 focus:ring-[rgba(79,107,237,0.2)] transition-all"
          />
        </div>
      </div>

      {/* Contagem */}
      <p className="text-[#94A3B8] text-[12px] mb-4">
        {timesFiltrados.length}{" "}
        {timesFiltrados.length === 1 ? "time encontrado" : "times encontrados"}
      </p>

      {/* Grid ou empty state */}
      {timesFiltrados.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Nenhum time encontrado"
          description="Tente ajustar a busca ou cadastre um novo time."
        />
      ) : (
        <div className="grid grid-cols-1 min-[640px]:grid-cols-2 lg:grid-cols-4 gap-3">
          {timesFiltrados.map((t) => (
            <TimeCard
              key={t.id}
              time={t}
              onVer={() => router.push(`/times/${t.id}`)}
              onEditar={() => router.push(`/editar/times/${t.id}`)}
              onExcluir={() => handleExcluir(t.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}