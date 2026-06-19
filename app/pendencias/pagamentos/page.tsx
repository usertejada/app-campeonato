// /app/pendencias/pagamentos/page.tsx
"use client";

import { useState } from "react";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";

const mockPagamentos = [
  { id: 1, nome: "Águias SC", descricao: "Inscrição Copa Verão 2025", vencimento: "15/05/2025", valor: 350, status: "Atrasado", avatar: "AS" },
  { id: 2, nome: "Tubarões FC", descricao: "Taxa de arbitragem — R7", vencimento: "28/05/2025", valor: 80, status: "Pendente", avatar: "TF" },
  { id: 3, nome: "Trovões EC", descricao: "Multa cartão vermelho", vencimento: "01/06/2025", valor: 120, status: "Pendente", avatar: "TE" },
  { id: 4, nome: "Panteras FC", descricao: "Inscrição Liga Empresarial", vencimento: "10/05/2025", valor: 350, status: "Atrasado", avatar: "PF" },
  { id: 5, nome: "Leões FC", descricao: "Taxa de arbitragem — R8", vencimento: "02/06/2025", valor: 80, status: "Pendente", avatar: "LF" },
  { id: 6, nome: "Dragões SC", descricao: "Multa suspensão", vencimento: "30/05/2025", valor: 60, status: "Pago", avatar: "DS" },
  { id: 7, nome: "Falcões EC", descricao: "Inscrição Copa da Cidade", vencimento: "05/05/2025", valor: 350, status: "Atrasado", avatar: "FE" },
  { id: 8, nome: "Lobos SC", descricao: "Taxa de arbitragem — R9", vencimento: "03/06/2025", valor: 80, status: "Pendente", avatar: "LS" },
  { id: 9, nome: "Rafael Souza", descricao: "Taxa doc. pendente", vencimento: "25/05/2025", valor: 40, status: "Atrasado", avatar: "RS" },
  { id: 10, nome: "Diego Martins", descricao: "Multa cartão vermelho", vencimento: "29/05/2025", valor: 120, status: "Pago", avatar: "DM" },
];

const totalEmAberto = mockPagamentos.filter(p => p.status !== "Pago").reduce((s, p) => s + p.valor, 0);
const totalAtrasado = mockPagamentos.filter(p => p.status === "Atrasado").reduce((s, p) => s + p.valor, 0);
const totalPendentes = mockPagamentos.filter(p => p.status === "Pendente").length;
const totalPago = mockPagamentos.filter(p => p.status === "Pago").reduce((s, p) => s + p.valor, 0);

type Filtro = "Todos" | "Pendente" | "Atrasado" | "Pago";

const statusStyle: Record<string, string> = {
  Atrasado: "bg-[#FEE2E2] text-[#DC2626]",
  Pendente: "bg-[#FEF9C3] text-[#CA8A04]",
  Pago: "bg-[#DCFCE7] text-[#16A34A]",
};

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function PagamentosPage() {
  const router = useRouter();
  const [filtro, setFiltro] = useState<Filtro>("Todos");

  const filtrados = mockPagamentos.filter(p =>
    filtro === "Todos" ? true : p.status === filtro
  );

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Pendências"
        description="Cartões, suspensões e pagamentos em aberto"
        buttonLabel="+ Registrar Pagamento"
        buttonIcon={CreditCard}
        onButtonClick={() => {}}
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => router.push("/pendencias/cartoes")}
          className="px-4 py-2 rounded-[8px] text-[13px] font-medium bg-white border border-[#E5E7EB] text-[#64748B] hover:text-[#1E293B] transition-colors"
        >
          Cartões
        </button>
        <button
          onClick={() => router.push("/pendencias/pagamentos")}
          className="px-4 py-2 rounded-[8px] text-[13px] font-medium bg-[#4F6BED] text-white"
        >
          Pagamentos
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total em aberto", value: formatBRL(totalEmAberto), color: "text-[#1E293B]", icon: "💰" },
          { label: "Atrasados", value: formatBRL(totalAtrasado), color: "text-[#DC2626]", icon: "🔴" },
          { label: "Pendentes", value: String(totalPendentes), color: "text-[#CA8A04]", icon: "⏳" },
          { label: "Pagos", value: formatBRL(totalPago), color: "text-[#16A34A]", icon: "✅" },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-[#E5E7EB] rounded-[12px] p-4">
            <p className="text-[12px] text-[#94A3B8] font-medium mb-2">{stat.label}</p>
            <p className={`text-[20px] font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 mb-4 bg-white border border-[#E5E7EB] rounded-[10px] p-1 w-fit">
        {(["Todos", "Pendente", "Atrasado", "Pago"] as Filtro[]).map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-3 py-1.5 rounded-[7px] text-[13px] font-medium transition-colors ${
              filtro === f ? "bg-[#4F6BED] text-white" : "text-[#64748B] hover:text-[#1E293B]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_160px_120px_100px] gap-4 px-4 py-3 border-b border-[#E5E7EB]">
          <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide">Responsável / Descrição</span>
          <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide">Vencimento</span>
          <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide">Valor</span>
          <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide">Status</span>
        </div>
        {filtrados.map((p, i) => (
          <div
            key={p.id}
            className={`flex flex-col md:grid md:grid-cols-[1fr_160px_120px_100px] gap-2 md:gap-4 px-4 py-3 items-start md:items-center ${
              p.status === "Atrasado" ? "bg-[#FFF5F5]" : ""
            } ${i < filtrados.length - 1 ? "border-b border-[#E5E7EB]" : ""}`}
          >
            {/* Responsável */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#4F6BED]/10 flex items-center justify-center text-[11px] font-bold text-[#4F6BED] shrink-0">
                {p.avatar}
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#1E293B]">{p.nome}</p>
                <p className="text-[12px] text-[#94A3B8]">{p.descricao}</p>
              </div>
            </div>

            {/* Vencimento */}
            <span className={`text-[13px] ${p.status === "Atrasado" ? "text-[#DC2626] font-medium" : "text-[#64748B]"}`}>
              {p.vencimento}
            </span>

            {/* Valor */}
            <span className={`text-[13px] font-semibold ${p.status === "Atrasado" ? "text-[#DC2626]" : "text-[#1E293B]"}`}>
              {formatBRL(p.valor)}
            </span>

            {/* Status */}
            <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full w-fit ${statusStyle[p.status]}`}>
              {p.status === "Atrasado" && "⊘ "}
              {p.status === "Pendente" && "⏳ "}
              {p.status === "Pago" && "✓ "}
              {p.status}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push("/pendencias")}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mt-6"
      >
        <ArrowLeft size={15} />
        Voltar para Pendências
      </button>
    </div>
  );
}