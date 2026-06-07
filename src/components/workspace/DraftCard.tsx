import { ExternalLink, RefreshCcw, Copy, Edit3, X } from "lucide-react";
import type { DraftItem, DraftPlatform } from "../../types/workspace";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import type { ReactNode } from "react";
interface DraftCardProps {
  draft: DraftItem;
  onCopy: () => void;
  onRegenerate: () => void;
  onOpen: () => void;
  onToggleEdit: () => void;
  onUpdateContent: (content: string) => void;
}

const platformIcons: Record<DraftPlatform, ReactNode> = {
  LinkedIn: <FaLinkedin className="h-9 w-9" />,
  X: <FaSquareXTwitter className="h-9 w-9" />,
  Facebook: <FaFacebook className="h-9 w-9" />,
};

export default function DraftCard({
  draft,
  onCopy,
  onRegenerate,
  onOpen,
  onToggleEdit,
  onUpdateContent,
}: DraftCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition hover:-translate-y-0.5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl">
            {platformIcons[draft.platform]}
          </div>
          <div>
            <p className="text-lg font-semibold text-[#0F172A]">
              {draft.platform}
            </p>
            <p className="text-sm text-[#64748B]">
              Draft ready to open and refine.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onToggleEdit}
            className="inline-flex items-center gap-2 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#0F172A] transition hover:border-[#FF6B35] hover:text-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
          >
            <Edit3 className="h-4 w-4" />
            Edit
          </button>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-2 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#0F172A] transition hover:border-[#FF6B35] hover:text-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
          >
            <Copy className="h-4 w-4" />
            Copy
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm text-[#0F172A]">
        {draft.isEditing ? (
          <textarea
            rows={5}
            value={draft.content}
            onChange={(event) => onUpdateContent(event.target.value)}
            className="min-h-37.5 w-full resize-none rounded-2xl border border-[#E2E8F0] bg-white p-4 text-sm text-[#0F172A] outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20"
          />
        ) : (
          <p className="whitespace-pre-wrap leading-7">{draft.content}</p>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onRegenerate}
          className="inline-flex items-center gap-2 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold text-[#0F172A] transition hover:border-[#FF6B35] hover:text-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
        >
          <RefreshCcw className="h-4 w-4" />
          Regenerate
        </button>
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#FF6B35] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
        >
          <ExternalLink className="h-4 w-4" />
          Open Platform
        </button>
      </div>

      <p className="mt-4 text-sm leading-6 text-[#64748B]">
        Open {draft.platform} and insert this draft using the BuildLog
        extension.
      </p>
    </div>
  );
}
