// app/campeonatos/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Trophy, Calendar, Users, Search, Filter, Check, MoreVertical, Pencil, CheckCircle, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";

type Status = "Em Andamento" | "Pendente" | "Finalizado";
type Formato = "Mata-mata" | "Pontos corridos" | "Eliminatório" | "Grupos + mata-mata";

interface Campeonato {
  id: number;
  nome: string;
  descricao: string;
  status: Status;
  data: string;
  times: string;
  formato: Formato;
}

const campeonatosMock: Campeonato[] = [
  {
    id: 1,
    nome: "Copa Verão 2025",
    descricao: "Torneio de futebol society com 16 times participantes",
    status: "Em Andamento",
    data: "Jan–Mar 2025",
    times: "16 times",
    formato: "Mata-mata",
  },
  {
    id: 2,
    nome: "Liga Empresarial",
    descricao: "Campeonato interno entre departamentos da empresa",
    status: "Em Andamento",
    data: "Fev–Abr 2025",
    times: "8 times",
    formato: "Pontos corridos",
  },
  {
    id: 3,
    nome: "Torneio Relâmpago",
    descricao: "Competição rápida de fim de semana, formato eliminatório",
    status: "Pendente",
    data: "Mar 2025",
    times: "12 times",
    formato: "Eliminatório",
  },
  {
    id: 4,
    nome: "Champions Interno",
    descricao: "Edição especial anual de futebol entre colaboradores",
    status: "Finalizado",
    data: "Dez 2024",
    times: "20 times",
    formato: "Grupos + mata-mata",
  },
  {
    id: 5,
    nome: "Copa Inverno 2024",
    descricao: "Campeonato de futebol 7 realizado no segundo semestre",
    status: "Finalizado",
    data: "Jul–Set 2024",
    times: "10 times",
    formato: "Pontos corridos",
  },
];

const STATUS_FILTERS = ["Todos", "Em Andamento", "Pendente", "Finalizado"] as const;

// ── Dropdown de filtro (mobile) ─────────────────────────────────────────
function FilterDropdown({
  filtroStatus,
  setFiltroStatus,
}: {
  filtroStatus: string;
  setFiltroStatus: (s: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={[
          "flex items-center justify-center w-[38px] h-[38px] rounded-[8px] border transition-colors",
          open
            ? "bg-[#4F6BED] border-[#4F6BED] text-white"
            : "bg-white border-[#E5E7EB] text-[#94A3B8] hover:border-[#4F6BED] hover:text-[#4F6BED]",
        ].join(" ")}
      >
        <Filter size={16} />
      </button>

      {filtroStatus !== "Todos" && (
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#4F6BED] rounded-full border-2 border-[#F1F3F7]" />
      )}

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 bg-white border border-[#E5E7EB] rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] min-w-[170px] py-1 overflow-hidden">
          <p className="text-[#94A3B8] text-[11px] font-medium uppercase tracking-wide px-3 pt-2 pb-1">
            Status
          </p>
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setFiltroStatus(s);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 text-[13px] text-left transition-colors hover:bg-[#F8FAFC]"
            >
              <span className={filtroStatus === s ? "text-[#4F6BED] font-medium" : "text-[#1E293B]"}>
                {s}
              </span>
              {filtroStatus === s && <Check size={13} color="#4F6BED" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Card de campeonato ──────────────────────────────────────────────────
function CampeonatoCard({ campeonato }: { campeonato: Campeonato }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)] transition-all hover:-translate-y-[1px] cursor-pointer overflow-hidden flex flex-col gap-3">

      {/* Topo: ícone + badge + menu */}
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
          <Trophy size={17} color="#4F6BED" />
        </div>

        <div className="flex items-center gap-2">
          <Badge label={campeonato.status} />

          {/* Botão dropdown */}
          <div ref={menuRef} className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((v) => !v);
              }}
              className="w-7 h-7 flex items-center justify-center rounded-[6px] text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors"
            >
              <MoreVertical size={15} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-[calc(100%+4px)] z-50 bg-white border border-[#E5E7EB] rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] min-w-[150px] py-1 overflow-hidden">
                <button
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
                >
                  <Pencil size={13} color="#94A3B8" />
                  Editar
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
                >
                  <CheckCircle size={13} color="#94A3B8" />
                  Finalizar
                </button>

                <div className="border-t border-[#F1F5F9] my-1" />

                <button
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={13} color="#EF4444" />
                  Excluir
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nome + descrição */}
      <div className="flex flex-col gap-1">
        <h3 className="text-[#1E293B] font-semibold text-[14px] leading-snug line-clamp-2">
          {campeonato.nome}
        </h3>
        <p className="text-[#94A3B8] text-[12px] line-clamp-2 leading-relaxed">
          {campeonato.descricao}
        </p>
      </div>

      {/* Divisor */}
      <div className="border-t border-[#F1F5F9]" />

      {/* Metadados */}
      <div className="flex flex-col gap-1.5">
        <span className="flex items-center gap-1.5 text-[#94A3B8] text-[12px]">
          <Calendar size={12} color="#94A3B8" />
          {campeonato.data}
        </span>
        <span className="flex items-center gap-1.5 text-[#94A3B8] text-[12px]">
          <Users size={12} color="#94A3B8" />
          {campeonato.times}
        </span>
        <span className="flex items-center gap-1.5 text-[#94A3B8] text-[12px]">
          <Trophy size={12} color="#94A3B8" />
          {campeonato.formato}
        </span>
      </div>

    </div>
  );
}
// ── Página ──────────────────────────────────────────────────────────────
export default function CampeonatosPage() {
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("Todos");

  const campeonatosFiltrados = campeonatosMock.filter((c) => {
    const matchBusca = c.nome.toLowerCase().includes(busca.toLowerCase());
    const matchStatus = filtroStatus === "Todos" || c.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">

      <PageHeader
        title="Campeonatos"
        description="Gerencie todos os seus campeonatos"
        buttonLabel="+ Novo Campeonato"
        buttonIcon={Trophy}
        onButtonClick={() => {}}
      />

      {/* ── Busca + Filtro ── */}
      <div className="flex gap-3 mb-5">

        {/* Campo de busca */}
        {/* mobile/tablet: flex-1 | desktop: largura fixa */}
        <div className="relative flex-1 min-w-0 lg:flex-none lg:w-[350px]">
          <Search
            size={15}
            color="#94A3B8"
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Buscar campeonato..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full h-[38px] pl-9 pr-4 rounded-[8px] border border-[#D1D5DB] bg-white text-[#1E293B] text-[13px] placeholder:text-[#94A3B8] outline-none focus:border-[#4F6BED] focus:ring-2 focus:ring-[rgba(79,107,237,0.2)] transition-all"
          />
        </div>

        {/* MOBILE (< 640px): ícone + dropdown */}
        <div className="flex min-[640px]:hidden">
          <FilterDropdown filtroStatus={filtroStatus} setFiltroStatus={setFiltroStatus} />
        </div>

        {/* TABLET (640px – 1023px): botões ocupando toda a largura restante */}
        <div className="hidden min-[640px]:flex lg:hidden items-center gap-1 bg-white border border-[#E5E7EB] rounded-[8px] px-2 h-[38px] flex-1">
          <Filter size={14} color="#94A3B8" className="shrink-0" />
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setFiltroStatus(s)}
              className={[
                "flex-1 py-1 rounded-[6px] text-[12px] font-medium transition-colors whitespace-nowrap text-center",
                filtroStatus === s
                  ? "bg-[#4F6BED] text-white"
                  : "text-[#94A3B8] hover:text-[#1E293B] hover:bg-[#F1F5F9]",
              ].join(" ")}
            >
              {s}
            </button>
          ))}
        </div>

        {/* DESKTOP (≥ 1024px): largura natural, compacto, alinhado à esquerda após a busca */}
        <div className="hidden lg:flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-[8px] px-2 h-[38px] shrink-0">
          <Filter size={14} color="#94A3B8" className="shrink-0" />
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setFiltroStatus(s)}
              className={[
                "px-2.5 py-1 rounded-[6px] text-[12px] font-medium transition-colors whitespace-nowrap",
                filtroStatus === s
                  ? "bg-[#4F6BED] text-white"
                  : "text-[#94A3B8] hover:text-[#1E293B] hover:bg-[#F1F5F9]",
              ].join(" ")}
            >
              {s}
            </button>
          ))}
        </div>

      </div>

      {/* Contagem */}
      <p className="text-[#94A3B8] text-[12px] mb-4">
        {campeonatosFiltrados.length}{" "}
        {campeonatosFiltrados.length === 1 ? "campeonato encontrado" : "campeonatos encontrados"}
      </p>

      {/* Lista */}
        {campeonatosFiltrados.length === 0 ? (
        <EmptyState
            icon={Trophy}
            title="Nenhum campeonato encontrado"
            description="Tente ajustar os filtros ou crie um novo campeonato."
        />
        ) : (
        <div className="grid grid-cols-1 min-[640px]:grid-cols-2 lg:grid-cols-4 gap-3">
            {campeonatosFiltrados.map((c) => (
            <CampeonatoCard key={c.id} campeonato={c} />
            ))}
        </div>
        )}
    </div>
  );
}