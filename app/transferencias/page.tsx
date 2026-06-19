import { Suspense } from "react";
import TransferenciaContent from "./components/transferencia-content";

export default function TransferenciaPage() {
  return (
    <Suspense fallback={null}>
      <TransferenciaContent />
    </Suspense>
  );
}