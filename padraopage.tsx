"use client";

import { ArrowLeft, ArrowLeftRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";

export default function TransferenciaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jogadorId = searchParams.get("jogadorId");
  const timeId = searchParams.get("timeId");

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Transferência"
        description="Transfira o jogador entre times"
        buttonLabel="+ Nova Transferência"
        buttonIcon={ArrowLeftRight}
        onButtonClick={() => router.push("/formularios/transferencias")}
      />

      <button
        onClick={() => router.push("/times")}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mb-6"
      >
        < ArrowLeft size={15} />
        Voltar para Times
      </button>
    </div>
  );
}