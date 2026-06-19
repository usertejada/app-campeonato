import { Suspense } from "react";
import { FichaJogadorContent } from "./_components/ficha-jogador-content";

export default function FichaJogadorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F1F3F7] flex items-center justify-center">
          <p className="text-[#94A3B8] text-[13px]">Carregando...</p>
        </div>
      }
    >
      <FichaJogadorContent />
    </Suspense>
  );
}