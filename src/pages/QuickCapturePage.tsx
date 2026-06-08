import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { useWorkspace } from "../hooks/useWorkspace";

function formatCaptureDate(createdAt: string) {
  const date = new Date(createdAt);
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function getAgeLabel(createdAt: string) {
  const noteDate = new Date(createdAt);
  const now = new Date();
  const diffDays = Math.floor(
    (now.setHours(0, 0, 0, 0) - noteDate.setHours(0, 0, 0, 0)) / 86400000,
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return "Earlier";
}

export default function QuickCapturePage() {
  const { state, addQuickNote, saveWorkLog } = useWorkspace();
  const [noteText, setNoteText] = useState("");

  const groupedCaptures = useMemo(() => {
    return state.quickNotes.reduce(
      (groups, note) => {
        const label = getAgeLabel(note.createdAt);
        groups[label] = groups[label] ?? [];
        groups[label].push(note);
        return groups;
      },
      {
        Today: [] as typeof state.quickNotes,
        Yesterday: [] as typeof state.quickNotes,
        Earlier: [] as typeof state.quickNotes,
      },
    );
  }, [state.quickNotes]);

  const handleAddCapture = () => {
    const trimmed = noteText.trim();
    if (!trimmed) return;

    addQuickNote(trimmed);
    setNoteText("");
  };

  const summaryText = useMemo(() => {
    if (state.quickNotes.length === 0) {
      return "";
    }

    return state.quickNotes
      .map((note, index) => `${index + 1}. ${note.text}`)
      .join(" ");
  }, [state.quickNotes]);

  const handleGenerateSummary = () => {
    if (!summaryText) return;
    saveWorkLog(summaryText);
  };

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
            <p className="text-3xl font-semibold text-[#0F172A]">
              Quick Capture
            </p>
            <p className="mt-2 text-sm text-[#475569]">
              Store ideas, wins, learnings, and progress throughout the day.
            </p>
          </div>
          <button
            type="button"
            onClick={handleGenerateSummary}
            disabled={!summaryText}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FF6B35] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-[#FFB49E] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
          >
            <Sparkles className="h-4 w-4" />
            Generate Daily Summary
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-[#0F172A]">
            Quick capture note
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={noteText}
              onChange={(event) => setNoteText(event.target.value)}
              placeholder="Fixed logout bug. Learned SQL injection basics."
              className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20"
              aria-label="Quick capture note"
            />
            <button
              type="button"
              onClick={handleAddCapture}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FF6B35] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
            >
              <Plus className="h-4 w-4" />
              Add Capture
            </button>
          </div>
        </div>
      </motion.div>

      <section className="space-y-5 rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <p className="text-lg font-semibold text-[#0F172A]">Captured Notes</p>
        {state.quickNotes.length === 0 ? (
          <p className="text-sm text-[#64748B]">
            Add your first capture to keep a running record of today's work.
          </p>
        ) : (
          <div className="space-y-6">
            {(["Today", "Yesterday", "Earlier"] as const).map((section) => (
              <div key={section} className="space-y-3">
                <p className="text-sm font-semibold text-[#0F172A]">
                  {section}
                </p>
                <div className="space-y-3">
                  {groupedCaptures[section].length > 0 ? (
                    groupedCaptures[section].map((note) => (
                      <div
                        key={note.id}
                        className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm text-[#0F172A]">{note.text}</p>
                          <p className="text-xs text-[#64748B]">
                            {formatCaptureDate(note.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[#64748B]">
                      No notes in this section.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
