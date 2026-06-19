import { Suspense } from "react";
import { FormularioJogadorContent } from "./_components/formulario-jogador-content";

export default function FormularioJogadorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F1F3F7] flex items-center justify-center">
          <p className="text-[#94A3B8] text-[13px]">Carregando...</p>
        </div>
      }
    >
      <FormularioJogadorContent />
    </Suspense>
  );
}