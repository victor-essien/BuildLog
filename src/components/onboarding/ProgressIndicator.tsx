interface ProgressIndicatorProps {
  currentIndex: number;
  total: number;
  label: string;
}

export default function ProgressIndicator({
  currentIndex,
  total,
  label,
}: ProgressIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#64748B]">
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${index < currentIndex ? "bg-[#FF6B35]" : "bg-[#E2E8F0]"}`}
          />
        ))}
      </div>
    </div>
  );
}
