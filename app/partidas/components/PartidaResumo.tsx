type Props = {
  agendadas: number;
  emAndamento: number;
  finalizadas: number;
};

export function PartidaResumo({ agendadas, emAndamento, finalizadas }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white border border-[#E5E7EB] rounded-[12px] px-5 py-4">
        <p className="text-[28px] font-bold text-[#4F6BED]">{agendadas}</p>
        <p className="text-[12px] text-[#94A3B8] mt-0.5">Agendadas</p>
      </div>
      <div className="bg-white border border-[#E5E7EB] rounded-[12px] px-5 py-4">
        <p className="text-[28px] font-bold text-[#F59E0B]">{emAndamento}</p>
        <p className="text-[12px] text-[#94A3B8] mt-0.5">Em Curso</p>
      </div>
      <div className="bg-white border border-[#E5E7EB] rounded-[12px] px-5 py-4">
        <p className="text-[28px] font-bold text-[#10B981]">{finalizadas}</p>
        <p className="text-[12px] text-[#94A3B8] mt-0.5">Finalizadas</p>
      </div>
    </div>
  );
}