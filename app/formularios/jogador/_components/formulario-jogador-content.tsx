"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, User, ImagePlus, Upload, X, Shield, Hash, Calendar } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { PhoneInput } from "@/components/shared/phone-input";

const POSICOES = [
  { value: "Goleiro", label: "Goleiro" },
  { value: "Zagueiro", label: "Zagueiro" },
  { value: "Lateral", label: "Lateral" },
  { value: "Volante", label: "Volante" },
  { value: "Meia", label: "Meia" },
  { value: "Atacante", label: "Atacante" },
];

const NACIONALIDADES = [
  { value: "Brasileiro", label: "Brasileiro", flag: "🇧🇷" },
  { value: "Peruano", label: "Peruano", flag: "🇵🇪" },
  { value: "Colombiano", label: "Colombiano", flag: "🇨🇴" },
];

interface FormState {
  nome: string;
  nacionalidade: string;
  posicao: string;
  numeroCamisa: string;
  dataNascimento: string;
  telefone: string;
  gols: string;
  assistencias: string;
  cartoesAmarelos: string;
  cartoesVermelhos: string;
}

const INITIAL: FormState = {
  nome: "",
  nacionalidade: "",
  posicao: "",
  numeroCamisa: "",
  dataNascimento: "",
  telefone: "",
  gols: "0",
  assistencias: "0",
  cartoesAmarelos: "0",
  cartoesVermelhos: "0",
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

export function FormularioJogadorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeId = searchParams.get("timeId");

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
    if (!form.nome.trim())        e.nome           = "Nome obrigatório.";
    if (!form.nacionalidade)      e.nacionalidade  = "Selecione uma nacionalidade.";
    if (!form.posicao)            e.posicao        = "Selecione uma posição.";
    if (!form.numeroCamisa)       e.numeroCamisa   = "Número obrigatório.";
    if (!form.dataNascimento)     e.dataNascimento = "Data obrigatória.";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    console.log("Novo jogador:", { ...form, preview, timeId });
    router.push(`/times/${timeId}`);
  }

  const selectedFlag = NACIONALIDADES.find((n) => n.value === form.nacionalidade)?.flag;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">

      <PageHeader
        title="Novo Jogador"
        description="Preencha os dados para cadastrar um novo jogador"
      />

      <button
        onClick={() => router.push(`/times/${timeId}`)}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Voltar para o time
      </button>

      <div className="w-full max-w-[700px] mx-auto">
        <div className="bg-white rounded-[12px] border border-[#bdd6d2] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">

          {/* Header do card */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F1F5F9]">
            <div className="w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
              <User size={16} color="#4F6BED" />
            </div>
            <div>
              <h2 className="text-[#1E293B] font-semibold text-[14px]">Informações do Jogador</h2>
              <p className="text-[#94A3B8] text-[12px]">Campos marcados com * são obrigatórios</p>
            </div>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Foto */}
            <div className="md:col-span-2">
              <Field label="Foto do Jogador">
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
                      <img src={preview} alt="Foto" className="h-full w-full object-contain p-3" />
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
                        <p className="text-[#1E293B] text-[13px] font-medium">Clique ou arraste a foto aqui</p>
                        <p className="text-[#94A3B8] text-[11px] mt-0.5">PNG ou JPG — máx. 2MB</p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 h-[30px] px-4 rounded-[6px] bg-white border border-[#D1D5DB] text-[#1E293B] text-[12px] font-medium">
                        <Upload size={12} color="#94A3B8" />
                        Selecionar arquivo
                      </div>
                    </div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/png, image/jpeg" onChange={handleFileChange} className="hidden" />
              </Field>
            </div>

            {/* Nome */}
            <Field label="Nome do Jogador" required>
              <div className="relative">
                <User size={14} color="#94A3B8" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Ex: Lucas Andrade"
                  className={`${inputClass} pl-9 ${errors.nome ? inputErrorClass : ""}`}
                />
              </div>
              {errors.nome && <p className="text-red-500 text-[11px] mt-1">{errors.nome}</p>}
            </Field>

            {/* Nacionalidade */}
            <Field label="Nacionalidade" required>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[15px] leading-none z-10">
                  {selectedFlag ?? "🌐"}
                </span>
                <select
                  name="nacionalidade"
                  value={form.nacionalidade}
                  onChange={handleChange}
                  className={`${selectClass} pl-9 ${errors.nacionalidade ? inputErrorClass : ""}`}
                >
                  <option value="" disabled>Selecione...</option>
                  {NACIONALIDADES.map((n) => (
                    <option key={n.value} value={n.value}>
                      {n.flag} {n.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.nacionalidade && <p className="text-red-500 text-[11px] mt-1">{errors.nacionalidade}</p>}
            </Field>

            {/* Data de nascimento */}
            <Field label="Data de Nascimento" required>
              <div className="relative">
                <Calendar size={14} color="#94A3B8" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  name="dataNascimento"
                  type="date"
                  value={form.dataNascimento}
                  onChange={handleChange}
                  className={`${inputClass} pl-9 ${errors.dataNascimento ? inputErrorClass : ""}`}
                />
              </div>
              {errors.dataNascimento && <p className="text-red-500 text-[11px] mt-1">{errors.dataNascimento}</p>}
            </Field>

            {/* Telefone */}
            <PhoneInput
              label="Telefone"
              value={form.telefone}
              onChange={(v) => { setForm((p) => ({ ...p, telefone: v })); setErrors((p) => ({ ...p, telefone: "" })); }}
              error={errors.telefone}
            />

            {/* Posição */}
            <Field label="Posição" required>
              <div className="relative">
                <Shield size={14} color="#94A3B8" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                <select
                  name="posicao"
                  value={form.posicao}
                  onChange={handleChange}
                  className={`${selectClass} pl-9 ${errors.posicao ? inputErrorClass : ""}`}
                >
                  <option value="" disabled>Selecione...</option>
                  {POSICOES.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
              {errors.posicao && <p className="text-red-500 text-[11px] mt-1">{errors.posicao}</p>}
            </Field>

            {/* Número da camisa */}
            <Field label="Número da Camisa" required>
              <div className="relative">
                <Hash size={14} color="#94A3B8" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  name="numeroCamisa"
                  type="number"
                  min={1}
                  max={99}
                  value={form.numeroCamisa}
                  onChange={handleChange}
                  placeholder="Ex: 9"
                  className={`${inputClass} pl-9 ${errors.numeroCamisa ? inputErrorClass : ""}`}
                />
              </div>
              {errors.numeroCamisa && <p className="text-red-500 text-[11px] mt-1">{errors.numeroCamisa}</p>}
            </Field>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-[#F1F5F9] bg-[#FAFAFA]">
            <button
              onClick={() => router.push(`/times/${timeId}`)}
              className="h-[38px] px-5 rounded-[8px] border border-[#D1D5DB] text-[#1E293B] text-[13px] font-medium hover:bg-[#F1F5F9] transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="h-[38px] px-5 rounded-[8px] bg-[#4F6BED] hover:bg-[#3D5BD9] text-white text-[13px] font-medium transition-colors flex items-center gap-2"
            >
              <User size={14} />
              Cadastrar Jogador
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}