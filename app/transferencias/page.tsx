"use client";

import { useState } from "react";
import { ArrowLeftRight, ArrowLeft, Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { timesMock } from "@/lib/constants/time";

export default function TransferenciaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jogadorId = searchParams.get("jogadorId");
  const timeIdAtual = searchParams.get("timeId");

  const [timeDestinoId, setTimeDestinoId] = useState<string>("");
  const [motivo, setMotivo] = useState("");
  const [confirmando, setConfirmando] = useState(false);

  // Mock temporário — depois troca por busca real no Supabase usando jogadorId
  const jogador = {
    id: jogadorId,
    nome: "João Pedro Silva",
    numeroCamisa: 10,
    posicao: "Atacante",
    foto: "",
  };

  const timeAtual = timesMock.find((t) => t.id === Number(timeIdAtual));
  const timesDisponiveis = timesMock.filter((t) => t.id !== Number(timeIdAtual));
  const timeDestino = timesMock.find((t) => t.id === Number(timeDestinoId));

  function handleConfirmar() {
    if (!timeDestinoId) return;
    setConfirmando(true);
  }

  function handleFinalizarTransferencia() {
    // TODO: integrar com Supabase
    console.log("Transferência confirmada:", {
      jogadorId,
      timeOrigemId: timeIdAtual,
      timeDestinoId,
      motivo,
    });
    router.push(`/times/${timeIdAtual}`);
  }

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
        <ArrowLeft size={15} />
        Voltar para times
      </button>

      <div className="max-w-[600px] mx-auto space-y-5">

        {/* Card do jogador */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-4 md:p-5">
          <p className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-3">
            Jogador
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0 overflow-hidden border border-[#E5E7EB]">
              {jogador.foto ? (
                <img src={jogador.foto} alt={jogador.nome} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#4F6BED] text-[15px] font-bold">
                  {jogador.nome.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-[#1E293B] truncate">{jogador.nome}</p>
              <p className="text-[12px] text-[#94A3B8]">
                #{jogador.numeroCamisa} · {jogador.posicao}
              </p>
            </div>
          </div>
        </div>

        {/* Card de transferência */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-4 md:p-5 space-y-5">
          <p className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-wide">
            Transferência
          </p>

          {/* Time atual -> Time destino */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-[12px] text-[#94A3B8] mb-1.5">Time atual</label>
              <div className="h-[42px] rounded-[8px] border border-[#E5E7EB] bg-[#F8FAFC] px-3 flex items-center text-[13px] text-[#1E293B] font-medium">
                {timeAtual?.nome ?? "—"}
              </div>
            </div>

            <div className="pt-5 shrink-0">
              <ArrowLeftRight size={16} className="text-[#94A3B8]" />
            </div>

            <div className="flex-1">
              <label className="block text-[12px] text-[#94A3B8] mb-1.5">Novo time</label>
              <select
                value={timeDestinoId}
                onChange={(e) => setTimeDestinoId(e.target.value)}
                className="w-full h-[42px] rounded-[8px] border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#1E293B] outline-none focus:border-[#4F6BED] focus:ring-2 focus:ring-[rgba(79,107,237,0.2)] transition-all"
              >
                <option value="">Selecione um time</option>
                {timesDisponiveis.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Motivo */}
          <div>
            <label className="block text-[12px] text-[#94A3B8] mb-1.5">
              Motivo / Observação <span className="text-[#94A3B8]">(opcional)</span>
            </label>
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={3}
              placeholder="Ex: Empréstimo, fim de contrato, troca..."
              className="w-full rounded-[8px] border border-[#E5E7EB] bg-white px-3 py-2.5 text-[13px] text-[#1E293B] placeholder:text-[#94A3B8] outline-none focus:border-[#4F6BED] focus:ring-2 focus:ring-[rgba(79,107,237,0.2)] transition-all resize-none"
            />
          </div>

          {/* Botão confirmar */}
          <button
            onClick={handleConfirmar}
            disabled={!timeDestinoId}
            className="w-full flex items-center justify-center gap-1.5 bg-[#4F6BED] hover:bg-[#3D5BD9] disabled:bg-[#CBD5E1] disabled:cursor-not-allowed text-white rounded-[8px] h-[42px] text-[13px] font-medium transition-colors"
          >
            <Check size={15} />
            Confirmar Transferência
          </button>
        </div>
      </div>

      {/* Modal de confirmação */}
      {confirmando && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-[12px] p-5 max-w-[400px] w-full space-y-4">
            <p className="text-[15px] font-extrabold text-[#1E293B]">Confirmar transferência</p>
            <p className="text-[13px] text-[#64748B] leading-relaxed">
              Você está transferindo{" "}
              <span className="font-semibold text-[#1E293B]">{jogador.nome}</span>{" "}
              de <span className="font-semibold text-[#1E293B]">{timeAtual?.nome}</span>{" "}
              para <span className="font-semibold text-[#1E293B]">{timeDestino?.nome}</span>.
              Essa ação não pode ser desfeita.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setConfirmando(false)}
                className="flex-1 h-[40px] rounded-[8px] border border-[#E5E7EB] text-[#1E293B] text-[13px] font-medium hover:bg-[#F8FAFC] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleFinalizarTransferencia}
                className="flex-1 h-[40px] rounded-[8px] bg-[#4F6BED] hover:bg-[#3D5BD9] text-white text-[13px] font-medium transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}