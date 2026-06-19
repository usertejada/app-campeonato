"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Users, ArrowLeft, Upload, X, ImagePlus, MapPin, User } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { PhoneInput } from "@/components/shared/phone-input";

const CAMPEONATOS = [
  { value: "liga-tejada-2026", label: "Liga Tejada 2026" },
  { value: "copa-verao-2025", label: "Copa Verão 2025" },
  { value: "liga-empresarial", label: "Liga Empresarial" },
  { value: "torneio-relampago", label: "Torneio Relâmpago" },
];

const ANOS = Array.from({ length: 50 }, (_, i) => {
  const ano = new Date().getFullYear() - i;
  return { value: String(ano), label: String(ano) };
});

interface FormState {
  nome: string;
  tecnico: string;
  cidade: string;
  campeonato: string;
  anoFundacao: string;
  telefone: string;
}

const INITIAL: FormState = {
  nome: "",
  tecnico: "",
  cidade: "",
  campeonato: "",
  anoFundacao: "",
  telefone: "",
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
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

const inputClass =
  "w-full h-[38px] px-3 rounded-[8px] border border-[#D1D5DB] bg-white text-[#1E293B] text-[13px] placeholder:text-[#94A3B8] outline-none focus:border-[#4F6BED] focus:ring-2 focus:ring-[rgba(79,107,237,0.2)] transition-all";

const inputErrorClass = "border-red-400 focus:border-red-400 focus:ring-red-100";

const selectClass =
  "w-full h-[38px] px-3 rounded-[8px] border border-[#D1D5DB] bg-white text-[#1E293B] text-[13px] outline-none focus:border-[#4F6BED] focus:ring-2 focus:ring-[rgba(79,107,237,0.2)] transition-all cursor-pointer";

export default function FormularioTimePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function applyFile(file: File) {
    setPreview(URL.createObjectURL(file));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) applyFile(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) applyFile(file);
  }

  function handleRemoveFile() {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function validate() {
    const e: Partial<FormState> = {};
    if (!form.nome.trim())     e.nome        = "Nome obrigatório.";
    if (!form.tecnico.trim())  e.tecnico     = "Técnico obrigatório.";
    if (!form.cidade.trim())   e.cidade      = "Cidade obrigatória.";
    if (!form.campeonato)      e.campeonato  = "Selecione um campeonato.";
    if (!form.anoFundacao)     e.anoFundacao = "Selecione o ano.";
    if (!form.telefone.trim()) e.telefone    = "Telefone obrigatório.";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    console.log("Novo time:", { ...form, preview });
    router.push("/times");
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">

      <PageHeader
        title="Novo Time"
        description="Preencha os dados para cadastrar um novo time"
      />

      {/* Botão voltar */}
      <button
        onClick={() => router.push("/times")}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Voltar para times
      </button>

      {/* Formulário centralizado */}
      <div className="w-full max-w-[700px] mx-auto">
        <div className="bg-white rounded-[12px] border border-[#bdd6d2] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">

          {/* Header do card */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F1F5F9]">
            <div className="w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
              <Users size={16} color="#4F6BED" />
            </div>
            <div>
              <h2 className="text-[#1E293B] font-semibold text-[14px]">Informações do Time</h2>
              <p className="text-[#94A3B8] text-[12px]">Campos marcados com * são obrigatórios</p>
            </div>
          </div>

          {/* Campos */}
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Logotipo */}
            <div className="md:col-span-2">
              <Field label="Logotipo do Time">
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
                    <>
                      <img src={preview} alt="Logo" className="h-full w-full object-contain p-3" />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                      >
                        <X size={12} color="white" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                        <ImagePlus size={18} color="#4F6BED" />
                      </div>
                      <div className="text-center">
                        <p className="text-[#1E293B] text-[13px] font-medium">Clique ou arraste a imagem aqui</p>
                        <p className="text-[#94A3B8] text-[11px] mt-0.5">PNG, JPG ou SVG — máx. 2MB</p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 h-[30px] px-4 rounded-[6px] bg-white border border-[#D1D5DB] text-[#1E293B] text-[12px] font-medium">
                        <Upload size={12} color="#94A3B8" />
                        Selecionar arquivo
                      </div>
                    </div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/png, image/jpeg, image/svg+xml" onChange={handleFileChange} className="hidden" />
              </Field>
            </div>

            {/* Nome do time */}
            <div className="md:col-span-2">
              <Field label="Nome do Time" required>
                <div className="relative">
                  <Users size={14} color="#94A3B8" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Ex: Astro Rey FC"
                    className={`${inputClass} pl-9 ${errors.nome ? inputErrorClass : ""}`}
                  />
                </div>
                {errors.nome && <p className="text-red-500 text-[11px] mt-1">{errors.nome}</p>}
              </Field>
            </div>

            {/* Técnico */}
            <Field label="Nome do Técnico" required>
              <div className="relative">
                <User size={14} color="#94A3B8" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  name="tecnico"
                  value={form.tecnico}
                  onChange={handleChange}
                  placeholder="Ex: Carlos Mendes"
                  className={`${inputClass} pl-9 ${errors.tecnico ? inputErrorClass : ""}`}
                />
              </div>
              {errors.tecnico && <p className="text-red-500 text-[11px] mt-1">{errors.tecnico}</p>}
            </Field>

            {/* Cidade */}
            <Field label="Cidade" required>
              <div className="relative">
                <MapPin size={14} color="#94A3B8" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  name="cidade"
                  value={form.cidade}
                  onChange={handleChange}
                  placeholder="Ex: Tabatinga-AM"
                  className={`${inputClass} pl-9 ${errors.cidade ? inputErrorClass : ""}`}
                />
              </div>
              {errors.cidade && <p className="text-red-500 text-[11px] mt-1">{errors.cidade}</p>}
            </Field>

            {/* Campeonato */}
            <Field label="Campeonato" required>
              <select
                name="campeonato"
                value={form.campeonato}
                onChange={handleChange}
                className={`${selectClass} ${errors.campeonato ? inputErrorClass : ""}`}
              >
                <option value="" disabled>Selecione...</option>
                {CAMPEONATOS.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              {errors.campeonato && <p className="text-red-500 text-[11px] mt-1">{errors.campeonato}</p>}
            </Field>

            {/* Ano de fundação */}
            <Field label="Ano de Fundação" required>
              <select
                name="anoFundacao"
                value={form.anoFundacao}
                onChange={handleChange}
                className={`${selectClass} ${errors.anoFundacao ? inputErrorClass : ""}`}
              >
                <option value="" disabled>Selecione...</option>
                {ANOS.map((a) => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
              {errors.anoFundacao && <p className="text-red-500 text-[11px] mt-1">{errors.anoFundacao}</p>}
            </Field>

            {/* Telefone */}
            <div className="md:col-span-2">
              <PhoneInput
                label="Telefone"
                value={form.telefone}
                onChange={(v) => { setForm((p) => ({ ...p, telefone: v })); setErrors((p) => ({ ...p, telefone: "" })); }}
                error={errors.telefone}
              />
            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-[#F1F5F9] bg-[#FAFAFA]">
            <button
              onClick={() => router.push("/times")}
              className="h-[38px] px-5 rounded-[8px] border border-[#D1D5DB] text-[#1E293B] text-[13px] font-medium hover:bg-[#F1F5F9] transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="h-[38px] px-5 rounded-[8px] bg-[#4F6BED] hover:bg-[#3D5BD9] text-white text-[13px] font-medium transition-colors flex items-center gap-2"
            >
              <Users size={14} />
              Cadastrar Time
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}