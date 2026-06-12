// app/formularios/campeonato/page.tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Trophy, ArrowLeft, Calendar, Users, FileText, Tag, MapPin, Upload, X, ImagePlus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";

type Formato = "Mata-mata" | "Pontos corridos" | "Eliminatório" | "Grupos + mata-mata";
type Status = "Em Andamento" | "Pendente" | "Finalizado";

interface CampeonatoForm {
  nome: string;
  descricao: string;
  status: Status;
  dataInicio: string;
  dataFim: string;
  formato: Formato;
  quantidadeTimes: string;
  local: string;
  logotipo: File | null;
}

const FORMATOS: Formato[] = ["Mata-mata", "Pontos corridos", "Eliminatório", "Grupos + mata-mata"];
const STATUS_OPTIONS: Status[] = ["Pendente", "Em Andamento", "Finalizado"];

// ── Campo reutilizável ──────────────────────────────────────────────────
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#1E293B] text-[13px] font-medium">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

// ── Estilos base ────────────────────────────────────────────────────────
const inputClass =
  "w-full h-[38px] px-3 rounded-[8px] border border-[#D1D5DB] bg-white text-[#1E293B] text-[13px] placeholder:text-[#94A3B8] outline-none focus:border-[#4F6BED] focus:ring-2 focus:ring-[rgba(79,107,237,0.2)] transition-all";

const inputErrorClass =
  "border-red-400 focus:border-red-400 focus:ring-red-100";

const selectClass =
  "w-full h-[38px] px-3 rounded-[8px] border border-[#D1D5DB] bg-white text-[#1E293B] text-[13px] outline-none focus:border-[#4F6BED] focus:ring-2 focus:ring-[rgba(79,107,237,0.2)] transition-all cursor-pointer";

// ── Página ──────────────────────────────────────────────────────────────
export default function NovoCampeonatoPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const [form, setForm] = useState<CampeonatoForm>({
    nome: "",
    descricao: "",
    status: "Pendente",
    dataInicio: "",
    dataFim: "",
    formato: "Mata-mata",
    quantidadeTimes: "",
    local: "",
    logotipo: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CampeonatoForm, string>>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function applyFile(file: File) {
    setForm((prev) => ({ ...prev, logotipo: file }));
    setPreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, logotipo: "" }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file) applyFile(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file && file.type.startsWith("image/")) applyFile(file);
  }

  function handleRemoveFile() {
    setForm((prev) => ({ ...prev, logotipo: null }));
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function validate() {
    const newErrors: Partial<Record<keyof CampeonatoForm, string>> = {};
    if (!form.nome.trim()) newErrors.nome = "Nome é obrigatório.";
    if (!form.dataInicio) newErrors.dataInicio = "Data de início é obrigatória.";
    if (!form.quantidadeTimes) newErrors.quantidadeTimes = "Informe a quantidade de times.";
    else if (Number(form.quantidadeTimes) < 2) newErrors.quantidadeTimes = "Mínimo de 2 times.";
    return newErrors;
  }

  function handleSubmit() {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // TODO: integrar com Supabase
    console.log("Campeonato:", form);
    router.push("/campeonatos");
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">

      <PageHeader
        title="Novo Campeonato"
        description="Preencha as informações para criar um campeonato"
      />

      {/* Botão voltar */}
      <button
        onClick={() => router.push("/campeonatos")}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Voltar para campeonatos
      </button>

      {/* Formulário centralizado com largura máxima */}
      <div className="w-full max-w-[700px] mx-auto">
        <div className="bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">

          {/* Header do card */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F1F5F9]">
            <div className="w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
              <Trophy size={16} color="#4F6BED" />
            </div>
            <div>
              <h2 className="text-[#1E293B] font-semibold text-[14px]">
                Informações do Campeonato
              </h2>
              <p className="text-[#94A3B8] text-[12px]">
                Campos marcados com * são obrigatórios
              </p>
            </div>
          </div>

          {/* Campos */}
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Logotipo */}
            <div className="md:col-span-2">
              <Field label="Logotipo do Campeonato">

                {/* Área de drop */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={[
                    "relative w-full h-[140px] rounded-[10px] border-2 border-dashed transition-all cursor-pointer flex items-center justify-center overflow-hidden",
                    dragOver
                      ? "border-[#4F6BED] bg-[#EEF2FF]"
                      : "border-[#D1D5DB] bg-[#F8FAFC] hover:border-[#4F6BED] hover:bg-[#F5F7FF]",
                  ].join(" ")}
                >
                  {preview ? (
                    /* Preview da imagem */
                    <>
                      <img
                        src={preview}
                        alt="Logotipo"
                        className="h-full w-full object-contain p-3"
                      />
                      {/* Botão remover em cima da imagem */}
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                      >
                        <X size={12} color="white" />
                      </button>
                    </>
                  ) : (
                    /* Placeholder */
                    <div className="flex flex-col items-center gap-2 pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                        <ImagePlus size={18} color="#4F6BED" />
                      </div>
                      <div className="text-center">
                        <p className="text-[#1E293B] text-[13px] font-medium">
                          Clique ou arraste a imagem aqui
                        </p>
                        <p className="text-[#94A3B8] text-[11px] mt-0.5">
                          PNG, JPG ou SVG — máx. 2MB
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 h-[30px] px-4 rounded-[6px] bg-white border border-[#D1D5DB] text-[#1E293B] text-[12px] font-medium">
                        <Upload size={12} color="#94A3B8" />
                        Selecionar arquivo
                      </div>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/svg+xml"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </Field>
            </div>

            {/* Nome */}
            <div className="md:col-span-2">
              <Field label="Nome do Campeonato" required>
                <div className="relative">
                  <Tag size={14} color="#94A3B8" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Ex: Copa Verão 2025"
                    className={`${inputClass} pl-9 ${errors.nome ? inputErrorClass : ""}`}
                  />
                </div>
                {errors.nome && (
                  <p className="text-red-500 text-[11px] mt-1">{errors.nome}</p>
                )}
              </Field>
            </div>

            {/* Descrição */}
            <div className="md:col-span-2">
              <Field label="Descrição">
                <div className="relative">
                  <FileText size={14} color="#94A3B8" className="absolute left-3 top-3 pointer-events-none" />
                  <textarea
                    name="descricao"
                    value={form.descricao}
                    onChange={handleChange}
                    placeholder="Descreva o campeonato..."
                    rows={3}
                    className="w-full px-3 pl-9 py-2.5 rounded-[8px] border border-[#D1D5DB] bg-white text-[#1E293B] text-[13px] placeholder:text-[#94A3B8] outline-none focus:border-[#4F6BED] focus:ring-2 focus:ring-[rgba(79,107,237,0.2)] transition-all resize-none"
                  />
                </div>
              </Field>
            </div>

            {/* Local */}
            <div className="md:col-span-2">
              <Field label="Local do Jogo">
                <div className="relative">
                  <MapPin size={14} color="#94A3B8" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    name="local"
                    value={form.local}
                    onChange={handleChange}
                    placeholder="Ex: Estádio Municipal, São Paulo - SP"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </Field>
            </div>

            {/* Formato */}
            <Field label="Formato">
              <select
                name="formato"
                value={form.formato}
                onChange={handleChange}
                className={selectClass}
              >
                {FORMATOS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </Field>

            {/* Status */}
            <Field label="Status">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={selectClass}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>

            {/* Data início */}
            <Field label="Data de Início" required>
              <div className="relative">
                <Calendar size={14} color="#94A3B8" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  name="dataInicio"
                  value={form.dataInicio}
                  onChange={handleChange}
                  className={`${inputClass} pl-9 ${errors.dataInicio ? inputErrorClass : ""}`}
                />
              </div>
              {errors.dataInicio && (
                <p className="text-red-500 text-[11px] mt-1">{errors.dataInicio}</p>
              )}
            </Field>

            {/* Data fim */}
            <Field label="Data de Término">
              <div className="relative">
                <Calendar size={14} color="#94A3B8" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  name="dataFim"
                  value={form.dataFim}
                  onChange={handleChange}
                  className={`${inputClass} pl-9`}
                />
              </div>
            </Field>

            {/* Quantidade de times */}
            <Field label="Quantidade de Times" required>
              <div className="relative">
                <Users size={14} color="#94A3B8" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="number"
                  name="quantidadeTimes"
                  value={form.quantidadeTimes}
                  onChange={handleChange}
                  placeholder="Ex: 16"
                  min={2}
                  className={`${inputClass} pl-9 ${errors.quantidadeTimes ? inputErrorClass : ""}`}
                />
              </div>
              {errors.quantidadeTimes && (
                <p className="text-red-500 text-[11px] mt-1">{errors.quantidadeTimes}</p>
              )}
            </Field>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-[#F1F5F9] bg-[#FAFAFA]">
            <button
              onClick={() => router.push("/campeonatos")}
              className="h-[38px] px-5 rounded-[8px] border border-[#D1D5DB] text-[#1E293B] text-[13px] font-medium hover:bg-[#F1F5F9] transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="h-[38px] px-5 rounded-[8px] bg-[#4F6BED] hover:bg-[#3D5BD9] text-white text-[13px] font-medium transition-colors flex items-center gap-2"
            >
              <Trophy size={14} />
              Criar Campeonato
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}