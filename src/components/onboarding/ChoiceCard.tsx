import type { ReactNode } from "react";

interface ChoiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  active: boolean;
  onSelect: () => void;
}

export default function ChoiceCard({
  title,
  description,
  icon,
  active,
  onSelect,
}: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`group flex flex-col items-start gap-4 rounded-[24px] border p-6 text-left transition-all focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40 ${
        active
          ? "border-[#FF6B35] bg-[#FF6B35]/[0.08] shadow-[0_8px_24px_rgba(255,107,53,0.12)]"
          : "border-[#E2E8F0] bg-white hover:border-[#FF6B35] hover:bg-[#FFF2E8]"
      }`}
    >
      <div
        className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl ${active ? "bg-[#FF6B35] text-white" : "bg-[#F8FAFC] text-[#0F172A]"}`}
      >
        {icon}
      </div>
      <div className="space-y-2">
        <p className="text-lg font-semibold text-[#0F172A]">{title}</p>
        <p className="text-sm leading-6 text-[#64748B]">{description}</p>
      </div>
    </button>
  );
}
