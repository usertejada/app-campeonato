// /app/pendencias/page.tsx
"use client";

import { AlertTriangle, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";

export default function PendenciasPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Pendências"
        description="Cartões, suspensões e pagamentos em aberto"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {/* Card Cartões */}
        <button
          onClick={() => router.push("/pendencias/cartoes")}
          className="bg-white border border-[#E5E7EB] rounded-[12px] p-6 flex items-start gap-4 hover:shadow-md transition-shadow text-left"
        >
          <div className="bg-[#FEF3C7] p-3 rounded-[10px]">
            <AlertTriangle size={24} className="text-[#D97706]" />
          </div>
          <div>
            <h2 className="text-[#1E293B] font-semibold text-[16px]">Cartões e Suspensões</h2>
            <p className="text-[#94A3B8] text-[13px] mt-1">
              Amarelos, vermelhos e jogadores suspensos
            </p>
            <div className="flex gap-3 mt-4">
              <span className="bg-[#FEF3C7] text-[#D97706] text-[12px] font-medium px-2.5 py-1 rounded-full">7 Amarelos</span>
              <span className="bg-[#FEE2E2] text-[#DC2626] text-[12px] font-medium px-2.5 py-1 rounded-full">3 Vermelhos</span>
              <span className="bg-[#EFF6FF] text-[#3B82F6] text-[12px] font-medium px-2.5 py-1 rounded-full">4 Suspensos</span>
            </div>
          </div>
        </button>

        {/* Card Pagamentos */}
        <button
          onClick={() => router.push("/pendencias/pagamentos")}
          className="bg-white border border-[#E5E7EB] rounded-[12px] p-6 flex items-start gap-4 hover:shadow-md transition-shadow text-left"
        >
          <div className="bg-[#DCFCE7] p-3 rounded-[10px]">
            <CreditCard size={24} className="text-[#16A34A]" />
          </div>
          <div>
            <h2 className="text-[#1E293B] font-semibold text-[16px]">Pagamentos</h2>
            <p className="text-[#94A3B8] text-[13px] mt-1">
              Inscrições, taxas e multas em aberto
            </p>
            <div className="flex gap-3 mt-4">
              <span className="bg-[#FEE2E2] text-[#DC2626] text-[12px] font-medium px-2.5 py-1 rounded-full">R$ 1.090 Atrasados</span>
              <span className="bg-[#FEF9C3] text-[#CA8A04] text-[12px] font-medium px-2.5 py-1 rounded-full">4 Pendentes</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}