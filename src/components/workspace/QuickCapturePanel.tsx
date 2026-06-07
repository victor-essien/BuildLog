import { Plus } from "lucide-react";

interface QuickCapturePanelProps {
  noteText: string;
  onNoteChange: (value: string) => void;
  onAddNote: () => void;
  notes: Array<{ id: string; text: string }>;
}

export default function QuickCapturePanel({
  noteText,
  onNoteChange,
  onAddNote,
  notes,
}: QuickCapturePanelProps) {
  return (
    <section className="space-y-5 rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div>
        <p className="text-lg font-semibold text-[#0F172A]">Quick Capture</p>
        <p className="mt-2 text-sm text-[#64748B]">
          Store short thoughts and ideas as you build.
        </p>
      </div>
      <div className="space-y-3">
        <input
          type="text"
          value={noteText}
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder="Fixed login bug. Learned Wireshark filter. Finished API endpoint."
          className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20"
          aria-label="Quick capture note"
        />
        <button
          type="button"
          onClick={onAddNote}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FF6B35] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
        >
          <Plus className="h-4 w-4" />
          Add Note
        </button>
      </div>
      <div className="space-y-3">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A]"
            >
              {note.text}
            </div>
          ))
        ) : (
          <p className="text-sm text-[#64748B]">
            Your notes will appear here after you add them.
          </p>
        )}
      </div>
    </section>
  );
}
