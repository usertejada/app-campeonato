interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  iconBg?: string;
}

export function StatCard({ label, value, sub, icon: Icon, iconBg = "#4F6BED" }: StatCardProps) {
  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-4 lg:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)] transition-shadow">
      <div
        className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-3"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={18} color="#FFFFFF" />
      </div>
      <p className="text-[#94A3B8] font-semibold text-[10px] uppercase tracking-[0.08em] mb-1">
        {label}
      </p>
      <p className="text-[#1E293B] font-bold text-[30px] leading-none mb-1">
        {value}
      </p>
      {sub && (
        <p className="text-[#94A3B8] text-[11px] font-normal flex items-center gap-1">
          <span className="text-[#10B981]">↗</span>{sub}
        </p>
      )}
    </div>
  );
}
