// app/jogador/carteirinha/page.tsx

"use client";

import { useState, useEffect, Suspense } from "react";
import { ArrowLeft, Printer, Trophy, Users, FileStack, CheckSquare } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { buscarTime } from "@/services/times-service";
import { buscarJogador } from "@/services/jogadores-service";
import { useTimes } from "@/hooks/use-times";
import { useJogadores } from "@/hooks/use-jogadores";
import type { Jogador } from "@/types/jogador";
import type { Time } from "@/types/time";
import { calcularIdade } from "@/lib/utils/jogadores";
import { PageHeader } from "@/components/shared/page-header";

// ─── Utilitários ──────────────────────────────────────────────────────────────

function formatarData(data: string | null): string {
  if (!data) return "—";
  const [y, m, d] = data.split("-");
  return `${d}/${m}/${y}`;
}

function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="w-8 h-8 rounded-full border-4 border-[#E5E7EB] border-t-[#4F6BED] animate-spin" />
    </div>
  );
}

const BANDEIRAS: Record<string, string> = {
  Brasileiro: "br", Colombiano: "co", Peruano: "pe",
  Argentino: "ar", Uruguaio: "uy", Chileno: "cl",
  Paraguaio: "py", Boliviano: "bo", Venezuelano: "ve", Equatoriano: "ec",
};

// ─── Dimensões do cartão duplo ────────────────────────────────────────────────
const W = 240;
const H = 160;

// ─── Padrão hexagonal SVG ─────────────────────────────────────────────────────
function HexBg({ id }: { id: string }) {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={id} x="0" y="0" width="20" height="23" patternUnits="userSpaceOnUse">
          <polygon points="10,1 19,6 19,17 10,22 1,17 1,6" fill="none" stroke="white" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// ─── Campo de dado (label + valor) ───────────────────────────────────────────
function Campo({
  label, value, flex = 1, fontSize = 9,
}: {
  label: string; value: string; flex?: number; fontSize?: number;
}) {
  return (
    <div style={{ flex, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 2, minWidth: 0 }}>
      <span style={{ color: "#7A9EC0", fontSize: 5.5, fontWeight: 300, letterSpacing: "0.2em", display: "block", textTransform: "uppercase" }}>
        {label}
      </span>
      <span style={{ color: "#F0F4FF", fontSize, fontWeight: 600, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textShadow: "0 1px 3px rgba(0,0,0,0.5)", lineHeight: 1.3 }}>
        {value}
      </span>
    </div>
  );
}

// ─── Cartão duplo (frente + verso unidos) ────────────────────────────────────
function CartaoDuplo({ jogador, time }: { jogador: Jogador; time: Time }) {
  const idade = calcularIdade(jogador.dataNascimento);
  const codBandeira = BANDEIRAS[jogador.nacionalidade ?? ""] ?? "br";
  const nomeCampeonato = time.campeonato ?? "Liga Tejada 2026";
  const nomeUpper = nomeCampeonato.toUpperCase();
  const logoCampeonato = null;
  const sigla = time.nome
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        width: W * 2 + 8,
        height: H,
        borderRadius: 12,
        overflow: "hidden",
        flexShrink: 0,
        boxShadow: "0 20px 56px rgba(0,0,0,0.55), 0 4px 16px rgba(0,194,184,0.18)",
      }}
    >
      {/* ══════════════ FRENTE ══════════════ */}
      <div
        style={{
          position: "relative",
          width: W,
          height: H,
          background: "linear-gradient(135deg, #0A1628 0%, #1B3A6B 48%, #0D4D6E 100%)",
          flexShrink: 0,
        }}
      >
        <HexBg id={`hf-${jogador.id}`} />

        {/* Faixa dourada diagonal */}
        <div style={{ position: "absolute", bottom: -12, left: -12, width: 70, height: 70, background: "linear-gradient(135deg,#C9A84C,#E8C96A,#C9A84C)", transform: "rotate(45deg)", opacity: 0.18, borderRadius: 3 }} />

        {/* Linha topo */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: "linear-gradient(90deg,#00C2B8,#4F6BED,#00C2B8)" }} />

        {/* CABEÇALHO */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 10px 4px" }}>
          {/* Escudo time */}
          <div style={{ width: 22, height: 22, borderRadius: 5, background: "rgba(0,194,184,0.15)", border: "1px solid rgba(0,194,184,0.4)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
            {time.logoUrl
              ? <img src={time.logoUrl} alt={time.nome} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 1 }} />
              : <span style={{ color: "#00C2B8", fontSize: 6, fontWeight: 900 }}>{sigla}</span>}
          </div>

          {/* Título */}
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#00C2B8", fontSize: 5, fontWeight: 300, letterSpacing: "0.32em", textTransform: "uppercase", margin: 0, textShadow: "0 0 8px rgba(0,194,184,0.6)" }}>CARTEIRA DO ATLETA</p>
            <p style={{ color: "#F0F4FF", fontSize: 10.5, fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase", margin: 0, textShadow: "0 2px 6px rgba(0,0,0,0.5)", lineHeight: 1.15 }}>
              {nomeUpper}
            </p>
          </div>

          {/* Logo campeonato */}
          <div style={{ width: 22, height: 22, borderRadius: 5, background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
            {logoCampeonato
              ? <img src={logoCampeonato} alt={nomeCampeonato} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 1 }} />
              : <span style={{ color: "#C9A84C", fontSize: 10 }}>⚽</span>}
          </div>
        </div>

        {/* Separador */}
        <div style={{ position: "relative", zIndex: 2, margin: "0 10px 5px", height: 1, background: "linear-gradient(90deg,transparent,rgba(0,194,184,0.5),transparent)" }} />

        {/* CORPO */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", gap: 8, padding: "0 10px" }}>
          {/* Foto */}
          <div style={{ width: 48, height: 64, borderRadius: 7, border: "1.5px solid rgba(0,194,184,0.5)", background: "rgba(0,194,184,0.08)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "0 3px 10px rgba(0,0,0,0.4)" }}>
            {jogador.foto
              ? <img src={jogador.foto} alt={jogador.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span style={{ fontSize: 22, opacity: 0.35 }}>👤</span>}
          </div>

          {/* Campos */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <Campo label="Time" value={time.nome} flex={3} />
              <Campo label="Nac." value={jogador.nacionalidade ?? "—"} flex={2} />
            </div>
            <Campo label="Nome" value={jogador.nome} />
            <div style={{ display: "flex", gap: 6 }}>
              <Campo label="Doc." value={jogador.cpf ?? "—"} flex={3} />
              <Campo label="Nasc." value={formatarData(jogador.dataNascimento)} flex={2} />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════ VERSO ══════════════ */}
      <div
        style={{
          position: "relative",
          width: W,
          height: H,
          background: "linear-gradient(135deg, #0A1628 0%, #1B3A6B 48%, #0D4D6E 100%)",
          flexShrink: 0,
        }}
      >
        <HexBg id={`hv-${jogador.id}`} />

        {/* CABEÇALHO VERSO */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 10px 3px" }}>
          <div>
            <p style={{ color: "#7A9EC0", fontSize: 5.5, letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Nº Camisa</p>
            <p style={{ color: "#00C2B8", fontSize: 18, fontWeight: 900, lineHeight: 1, margin: 0, textShadow: "0 0 12px rgba(0,194,184,0.5)" }}>
              {jogador.numeroCamisa}
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#7A9EC0", fontSize: 5.5, letterSpacing: "0.22em", textTransform: "uppercase", margin: 0 }}>VERSO</p>
            <p style={{ color: "#F0F4FF", fontSize: 10, fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase", margin: 0, textShadow: "0 2px 6px rgba(0,0,0,0.5)", lineHeight: 1.2 }}>
              {nomeUpper}
            </p>
          </div>
          <div style={{ width: 22, height: 22, borderRadius: 5, background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.4)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
            {logoCampeonato
              ? <img src={logoCampeonato} alt={nomeCampeonato} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 2 }} />
              : <span style={{ color: "#C9A84C", fontSize: 11 }}>⚽</span>}
          </div>
        </div>

        {/* Separador */}
        <div style={{ position: "relative", zIndex: 2, margin: "0 10px 5px", height: 1, background: "linear-gradient(90deg,transparent,rgba(0,194,184,0.4),transparent)" }} />

        {/* REGRAS */}
        <div style={{ position: "relative", zIndex: 2, padding: "0 10px" }}>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 7, padding: "5px 8px" }}>
            <p style={{ color: "#8FA8C8", fontSize: 6, lineHeight: 1.65, margin: 0 }}>
              {"• Este cartão é "}
              <span style={{ color: "#F0F4FF", fontWeight: 600 }}>pessoal e intransferível</span>
              {", devendo ser apresentado quando solicitado. • O portador se compromete a seguir todas as regras da liga durante o período de vigência. • Em caso de perda, a 2ª via terá custo definido pela organização."}
            </p>
          </div>
        </div>

        {/* ASSINATURA */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", marginTop: 7 }}>
          <svg viewBox="0 0 140 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 140, height: 24 }}>
            <path d="M6 16 C15 5, 26 3, 35 12 C40 17, 44 21, 53 14 C60 9, 65 4, 74 11 C81 17, 86 21, 95 13 C102 7, 107 3, 118 10 C126 15, 132 20, 137 13" stroke="rgba(255,255,255,0.8)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 20 C24 17, 40 19, 54 17 C68 15, 80 20, 96 17 C110 14, 122 19, 133 16" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" strokeLinecap="round" />
          </svg>
          <div style={{ height: 1, width: 140, background: "rgba(255,255,255,0.2)", marginTop: 1 }} />
          <p style={{ color: "#7A9EC0", fontSize: 5.5, letterSpacing: "0.25em", textTransform: "uppercase", margin: "2px 0 0" }}>ORGANIZA</p>
        </div>

        {/* RODAPÉ */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "center", marginTop: 5 }}>
          <p style={{ color: "#00C2B8", fontSize: 7.5, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", margin: 0, textShadow: "0 0 8px rgba(0,194,184,0.5)" }}>{`@${nomeCampeonato.replace(/\s+/g, "").toUpperCase()}`}</p>
        </div>

        {/* Linha base */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#00C2B8,transparent)" }} />
      </div>
    </div>
  );
}

// ─── ETAPA 1: Selecionar time + marcar jogadores ──────────────────────────────
function SelecaoTimeEJogadores({
  onGerar,
}: {
  onGerar: (timeId: number, jogadorIds: number[]) => void;
}) {
  const { loading: loadingTimes, timesFiltrados } = useTimes();
  const [timeId, setTimeId] = useState<number | null>(null);
  const [marcados, setMarcados] = useState<Set<number>>(new Set());

  const { jogadores, loading: loadingJogadores } = useJogadores(timeId ?? 0);

  function handleTrocarTime(novoTimeId: number) {
    setTimeId(novoTimeId);
    setMarcados(new Set());
  }

  function toggleJogador(id: number) {
    setMarcados((prev) => {
      const novo = new Set(prev);
      novo.has(id) ? novo.delete(id) : novo.add(id);
      return novo;
    });
  }

  return (
    <div className="space-y-5">
      {/* Select de time */}
      <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-4 md:p-5">
        <label className="block text-[12px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2">
          Time
        </label>
        {loadingTimes ? (
          <Spinner />
        ) : (
          <select
            value={timeId ?? ""}
            onChange={(e) => handleTrocarTime(Number(e.target.value))}
            className="w-full h-[42px] rounded-[8px] border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#1E293B] outline-none focus:border-[#4F6BED] focus:ring-2 focus:ring-[rgba(79,107,237,0.2)] transition-all"
          >
            <option value="">Selecione um time</option>
            {timesFiltrados.map((t) => (
              <option key={t.id} value={t.id}>{t.nome}</option>
            ))}
          </select>
        )}
      </div>

      {/* Botões de ação + lista de jogadores */}
      {timeId && (
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden">
          {/* Sub-header com botões */}
          <div className="flex flex-col gap-2 px-4 py-3.5 border-b border-[#F1F5F9] md:flex-row md:items-center md:justify-between md:px-5">
            <div className="flex items-center gap-2">
              <Users size={15} className="text-[#64748B]" />
              <span className="text-[13px] font-semibold text-[#1E293B]">Jogadores</span>
              <span className="bg-[#EEF2FF] text-[#4F6BED] text-[11px] font-bold px-2 py-0.5 rounded-full">
                {jogadores.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onGerar(timeId, jogadores.map((j) => j.id))}
                disabled={jogadores.length === 0}
                className="flex items-center gap-1.5 h-[34px] px-3.5 rounded-[8px] border border-[#4F6BED] text-[#4F6BED] hover:bg-[#EEF2FF] disabled:opacity-40 disabled:cursor-not-allowed text-[12px] font-medium transition-colors"
              >
                <FileStack size={13} />
                Gerar Geral (time todo)
              </button>
              <button
                onClick={() => onGerar(timeId, Array.from(marcados))}
                disabled={marcados.size === 0}
                className="flex items-center gap-1.5 h-[34px] px-3.5 rounded-[8px] bg-[#4F6BED] hover:bg-[#3D5BD9] text-white disabled:opacity-40 disabled:cursor-not-allowed text-[12px] font-medium transition-colors"
              >
                <CheckSquare size={13} />
                Gerar Selecionados ({marcados.size})
              </button>
            </div>
          </div>

          {/* Lista com checkbox */}
          {loadingJogadores ? (
            <Spinner />
          ) : jogadores.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12">
              <Users size={22} className="text-[#94A3B8]" />
              <p className="text-[13px] text-[#94A3B8]">Nenhum jogador cadastrado neste time.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#F1F5F9]">
              {jogadores.map((j) => (
                <label
                  key={j.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#F8FAFC] transition-colors cursor-pointer md:px-5"
                >
                  <input
                    type="checkbox"
                    checked={marcados.has(j.id)}
                    onChange={() => toggleJogador(j.id)}
                    className="w-4 h-4 rounded border-[#CBD5E1] text-[#4F6BED] focus:ring-[#4F6BED] cursor-pointer"
                  />
                  <div className="w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0 overflow-hidden border border-[#E5E7EB]">
                    {j.foto ? (
                      <img src={j.foto} alt={j.nome} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[#4F6BED] text-[13px] font-bold">{j.nome.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#1E293B] truncate">{j.nome}</p>
                    <p className="text-[11px] text-[#94A3B8]">#{j.numeroCamisa} · {j.posicao}</p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── ETAPA 2: Visualização das carteirinhas geradas ───────────────────────────
function VisualizacaoCarteirinhas({
  timeId,
  jogadorIds,
  onVoltar,
}: {
  timeId: number;
  jogadorIds: number[];
  onVoltar: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState<Time | null>(null);
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    setLoading(true);
    Promise.all([
      buscarTime(String(timeId)),
      Promise.all(jogadorIds.map((id) => buscarJogador(String(id)))),
    ])
      .then(([t, js]) => {
        if (!ativo) return;
        if (!t) throw new Error("Time não encontrado.");
        const validos = js.filter((j): j is Jogador => j !== null);
        if (validos.length === 0) throw new Error("Nenhum jogador encontrado.");
        setTime(t);
        setJogadores(validos);
      })
      .catch((e) => ativo && setErro(e instanceof Error ? e.message : "Erro ao carregar."))
      .finally(() => ativo && setLoading(false));
    return () => { ativo = false; };
  }, [timeId, jogadorIds]);

  if (loading) return <Spinner />;

  if (erro || !time) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-[#94A3B8] text-[15px]">{erro ?? "Dados não encontrados."}</p>
        <button onClick={onVoltar} className="flex items-center gap-2 text-[#4F6BED] text-[14px] hover:underline">
          <ArrowLeft size={15} /> Voltar
        </button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @media print {
          @page { margin: 12mm; }
          body * { visibility: hidden !important; }
          #area-impressao, #area-impressao * { visibility: visible !important; }
          #area-impressao {
            position: fixed !important;
            inset: 0 !important;
            background: white !important;
          }
        }
      `}</style>

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onVoltar}
          className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors"
        >
          <ArrowLeft size={15} />
          Voltar
        </button>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 h-[38px] px-5 rounded-[8px] bg-[#4F6BED] hover:bg-[#3D5BD9] text-white text-[14px] font-semibold transition-colors shrink-0"
        >
          <Printer size={15} />
          Imprimir Tudo
        </button>
      </div>

      <div id="area-impressao" className="flex flex-col items-center gap-6">
        {jogadores.map((j) => (
          <div
            key={j.id}
            className="bg-white rounded-[16px] border border-[#C4C9D4] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 overflow-x-auto"
            style={{ breakInside: "avoid", breakAfter: "page" }}
          >
            <CartaoDuplo jogador={j} time={time} />
          </div>
        ))}
      </div>

      <p className="text-center text-[#94A3B8] text-[12px] mt-4">
        Clique em <span className="font-semibold text-[#64748B]">Imprimir Tudo</span> → selecione{" "}
        <span className="font-semibold text-[#64748B]">Salvar como PDF</span>.
        Cada carteirinha sai em uma página separada, em <span className="font-semibold text-[#64748B]">paisagem</span>.
      </p>
    </>
  );
}

// ─── PÁGINA INTERNA (usa useSearchParams) ─────────────────────────────────────
function CarteirinhaContent() {
  const [gerado, setGerado] = useState<{ timeId: number; jogadorIds: number[] } | null>(null);

  return (
    <div className="min-h-screen bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Carteirinha"
        description={gerado ? "Visualize e imprima as carteirinhas" : "Selecione o time e os jogadores"}
      />

      {!gerado ? (
        <SelecaoTimeEJogadores
          onGerar={(timeId, jogadorIds) => setGerado({ timeId, jogadorIds })}
        />
      ) : (
        <VisualizacaoCarteirinhas
          timeId={gerado.timeId}
          jogadorIds={gerado.jogadorIds}
          onVoltar={() => setGerado(null)}
        />
      )}
    </div>
  );
}

// ─── PÁGINA EXPORTADA (Suspense obrigatório pro useSearchParams) ──────────────
export default function CarteirinhaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F1F3F7] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-[#E5E7EB] border-t-[#4F6BED] animate-spin" /></div>}>
      <CarteirinhaContent />
    </Suspense>
  );
}