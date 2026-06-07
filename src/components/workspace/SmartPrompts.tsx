interface SmartPromptsProps {
  prompts: string[];
  onSelect: (value: string) => void;
}

export default function SmartPrompts({ prompts, onSelect }: SmartPromptsProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#64748B]">
        Need a starting point?
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onSelect(prompt)}
            className="rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-[#0F172A] transition hover:border-[#FF6B35] hover:bg-[#FFF2E8] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
