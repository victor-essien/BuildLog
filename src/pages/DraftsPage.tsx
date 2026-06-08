import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Trash2 } from "lucide-react";
import { useWorkspace } from "../hooks/useWorkspace";
import DraftCard from "../components/workspace/DraftCard";
import type { DraftItem, DraftPlatform } from "../types/workspace";

const platformLinks: Record<DraftPlatform, string> = {
  LinkedIn: "https://www.linkedin.com/feed/",
  X: "https://twitter.com/home",
  Facebook: "https://www.facebook.com/",
};

function formatCaptureDate(createdAt: string) {
  const date = new Date(createdAt);
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function getDateSection(createdAt: string) {
  const noteDate = new Date(createdAt);
  const now = new Date();
  const diffDays = Math.floor(
    (now.setHours(0, 0, 0, 0) - noteDate.setHours(0, 0, 0, 0)) / 86400000,
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return "Older";
}

export default function DraftsPage() {
  const { state, updateDraft, toggleDraftEditing, removeDraft } =
    useWorkspace();
  const [query, setQuery] = useState("");

  const drafts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return state.drafts.filter((draft) =>
      normalized === ""
        ? true
        : draft.content.toLowerCase().includes(normalized) ||
          draft.platform.toLowerCase().includes(normalized),
    );
  }, [query, state.drafts]);

  const groupedDrafts = useMemo(() => {
    return drafts.reduce(
      (groups, draft) => {
        const section = getDateSection(draft.createdAt);
        groups[section] = groups[section] ?? [];
        groups[section].push(draft);
        return groups;
      },
      {
        Today: [] as DraftItem[],
        Yesterday: [] as DraftItem[],
        Older: [] as DraftItem[],
      },
    );
  }, [drafts]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-[0_4px_12px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-3xl font-semibold text-[#0F172A]">Drafts</p>
            <p className="mt-2 text-sm text-[#475569]">
              Manage the posts you generated from your daily work.
            </p>
          </div>
          <div className="relative w-full sm:w-[320px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search drafts"
              className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] py-3 pl-11 pr-4 text-sm text-[#0F172A] outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20"
              aria-label="Search drafts"
            />
          </div>
        </div>
      </motion.div>

      {drafts.length === 0 ? (
        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
          <p className="text-lg font-semibold text-[#0F172A]">
            No drafts found
          </p>
          <p className="mt-3 text-sm text-[#64748B]">
            Generate posts from Today or refine your work log to create the
            first draft.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {(["Today", "Yesterday", "Older"] as const).map((section) => (
            <section key={section} className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#64748B]">
                  {section}
                </p>
                <p className="text-sm text-[#64748B]">
                  {groupedDrafts[section].length} draft(s)
                </p>
              </div>
              <div className="space-y-5">
                {groupedDrafts[section].map((draft) => (
                  <div
                    key={draft.id}
                    className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">
                          {draft.platform}
                        </p>
                        <p className="text-xs text-[#64748B]">
                          {formatCaptureDate(draft.createdAt)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDraft(draft.id)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-[#0F172A] transition hover:border-[#FF6B35] hover:text-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                    <DraftCard
                      draft={draft}
                      onCopy={() => {
                        if (
                          typeof navigator !== "undefined" &&
                          navigator.clipboard
                        ) {
                          navigator.clipboard.writeText(draft.content);
                        }
                      }}
                      onRegenerate={() => updateDraft(draft.id, draft.content)}
                      onOpen={() =>
                        window.open(platformLinks[draft.platform], "_blank")
                      }
                      onToggleEdit={() => toggleDraftEditing(draft.id)}
                      onUpdateContent={(content) =>
                        updateDraft(draft.id, content)
                      }
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
