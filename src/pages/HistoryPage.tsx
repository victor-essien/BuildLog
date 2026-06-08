import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useWorkspace } from "../hooks/useWorkspace";

function formatMonth(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString([], { month: "long", year: "numeric" });
}

function formatDay(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function HistoryPage() {
  const { state } = useWorkspace();
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  const groupedHistory = useMemo(() => {
    return state.activityLog.reduce(
      (groups, entry) => {
        const month = formatMonth(entry.createdAt);
        groups[month] = groups[month] ?? [];
        groups[month].push(entry);
        return groups;
      },
      {} as Record<string, typeof state.activityLog>,
    );
  }, [state.activityLog]);

  const selectedEntry = state.activityLog.find(
    (entry) => entry.id === selectedEntryId,
  );

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
            <p className="text-3xl font-semibold text-[#0F172A]">History</p>
            <p className="mt-2 text-sm text-[#475569]">
              Review past logs, drafts, and the moments you captured.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A]">
            <span>{state.activityLog.length}</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </motion.div>

      <div className="space-y-8">
        {Object.entries(groupedHistory).length === 0 ? (
          <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
            <p className="text-lg font-semibold text-[#0F172A]">
              No history yet
            </p>
            <p className="mt-3 text-sm text-[#64748B]">
              Your daily logs will appear here after you generate your first
              draft.
            </p>
          </div>
        ) : (
          Object.entries(groupedHistory).map(([month, entries]) => (
            <section key={month} className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#64748B]">
                {month}
              </p>
              <div className="space-y-4">
                {entries.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setSelectedEntryId(entry.id)}
                    className="w-full rounded-3xl border border-[#E2E8F0] bg-white p-6 text-left shadow-sm transition hover:border-[#FF6B35]/40"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">
                          {formatDay(entry.date)}
                        </p>
                        <p className="mt-2 text-sm text-[#64748B]">
                          {entry.summary}
                        </p>
                      </div>
                      <div className="rounded-3xl bg-[#FF6B35]/10 px-4 py-2 text-sm font-semibold text-[#FF6B35]">
                        {entry.draftCount} drafts
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      {selectedEntry ? (
        <section className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
          <p className="text-lg font-semibold text-[#0F172A]">Entry details</p>
          <p className="mt-3 text-sm text-[#64748B]">
            {formatDay(selectedEntry.createdAt)} • {selectedEntry.captureCount}{" "}
            capture(s) • {selectedEntry.draftCount} draft(s)
          </p>
          <div className="mt-6 space-y-6">
            <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <p className="text-sm font-semibold text-[#0F172A]">
                Original work log
              </p>
              <p className="mt-3 text-sm leading-7 text-[#475569]">
                {selectedEntry.workLog}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <p className="text-sm text-[#64748B]">Drafts generated</p>
                <p className="mt-2 text-xl font-semibold text-[#0F172A]">
                  {selectedEntry.draftCount}
                </p>
              </div>
              <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <p className="text-sm text-[#64748B]">Captures used</p>
                <p className="mt-2 text-xl font-semibold text-[#0F172A]">
                  {selectedEntry.captureCount}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
