import type { DraftItem } from "../../types/workspace";
import DraftCard from "./DraftCard";

interface DraftsSectionProps {
  drafts: DraftItem[];
  onCopy: (id: string) => void;
  onRegenerate: (id: string) => void;
  onOpen: (id: string) => void;
  onToggleEdit: (id: string) => void;
  onUpdateContent: (id: string, content: string) => void;
}

export default function DraftsSection({
  drafts,
  onCopy,
  onRegenerate,
  onOpen,
  onToggleEdit,
  onUpdateContent,
}: DraftsSectionProps) {
  return (
    <section className="space-y-6 rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-[#0F172A]">
            Generated Drafts
          </p>
          <p className="mt-2 text-sm text-[#64748B]">
            Review the versions and open the platform when they feel ready.
          </p>
        </div>
      </div>
      <div className="space-y-5">
        {drafts.map((draft) => (
          <DraftCard
            key={draft.id}
            draft={draft}
            onCopy={() => onCopy(draft.id)}
            onRegenerate={() => onRegenerate(draft.id)}
            onOpen={() => onOpen(draft.id)}
            onToggleEdit={() => onToggleEdit(draft.id)}
            onUpdateContent={(content) => onUpdateContent(draft.id, content)}
          />
        ))}
      </div>
    </section>
  );
}
