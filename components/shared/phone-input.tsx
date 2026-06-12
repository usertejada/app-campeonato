
// /app/components/shared/phone-input.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Country = "BR" | "PE" | "CO";

interface CountryOption {
  code: Country;
  flag: string;
  label: string;
  prefix: string;
  placeholder: string;
  mask: (value: string) => string;
}

const COUNTRIES: CountryOption[] = [
  {
    code: "BR",
    flag: "🇧🇷",
    label: "+55",
    prefix: "+55",
    placeholder: "(00) 0 0000-0000",
    mask: (v) => {
      const d = v.replace(/\D/g, "").slice(0, 11);
      if (d.length <= 2) return `(${d}`;
      if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
      if (d.length <= 11) return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`;
      return v;
    },
  },
  {
    code: "PE",
    flag: "🇵🇪",
    label: "+51",
    prefix: "+51",
    placeholder: "000 000 000",
    mask: (v) => {
      const d = v.replace(/\D/g, "").slice(0, 9);
      if (d.length <= 3) return d;
      if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
      return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
    },
  },
  {
    code: "CO",
    flag: "🇨🇴",
    label: "+57",
    prefix: "+57",
    placeholder: "000 000 000",
    mask: (v) => {
      const d = v.replace(/\D/g, "").slice(0, 9);
      if (d.length <= 3) return d;
      if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
      return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
    },
  },
];

interface PhoneInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function PhoneInput({ label, value, onChange, error }: PhoneInputProps) {
  const [country, setCountry] = useState<Country>("BR");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selected = COUNTRIES.find((c) => c.code === country)!;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const masked = selected.mask(e.target.value);
    onChange(masked);
  }

  function handleCountrySelect(c: CountryOption) {
    setCountry(c.code);
    onChange("");
    setDropdownOpen(false);
  }

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-[#1E293B] text-[13px] font-medium">{label}</label>
      )}

      <div className="flex gap-2">
        {/* Seletor de país */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((v) => !v)}
            className={[
              "h-[38px] px-2.5 flex items-center gap-1.5 rounded-[8px] border bg-white text-[13px] font-medium transition-all whitespace-nowrap",
              error
                ? "border-red-400"
                : dropdownOpen
                ? "border-[#4F6BED] ring-2 ring-[rgba(79,107,237,0.2)]"
                : "border-[#D1D5DB] hover:border-[#94A3B8]",
            ].join(" ")}
          >
            <span>{selected.flag}</span>
            <span className="text-[#1E293B]">{selected.label}</span>
            <ChevronDown
              size={12}
              className={`text-[#94A3B8] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 top-[calc(100%+4px)] z-20 bg-white border border-[#E5E7EB] rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.10)] overflow-hidden min-w-[130px]">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleCountrySelect(c)}
                  className={[
                    "w-full flex items-center gap-2.5 px-3 py-2 text-[13px] transition-colors",
                    country === c.code
                      ? "bg-[#EEF2FF] text-[#4F6BED] font-medium"
                      : "text-[#1E293B] hover:bg-[#F8FAFC]",
                  ].join(" ")}
                >
                  <span>{c.flag}</span>
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <input
          type="tel"
          value={value}
          onChange={handleChange}
          placeholder={selected.placeholder}
          className={[
            "flex-1 h-[38px] px-3 rounded-[8px] border bg-white text-[#1E293B] text-[13px] placeholder:text-[#94A3B8] outline-none transition-all",
            error
              ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200"
              : "border-[#D1D5DB] focus:border-[#4F6BED] focus:ring-2 focus:ring-[rgba(79,107,237,0.2)]",
          ].join(" ")}
        />
      </div>

      {error && <p className="text-red-500 text-[11px]">{error}</p>}
    </div>
  );
}