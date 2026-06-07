import { useEffect, useRef } from "react";

interface WorkLogEditorProps {
  workLog: string;
  onChange: (value: string) => void;
  onFocusCreate: () => void;
  isTodayLogged: boolean;
  showEmptyState: boolean;
  charCount: number;
  maxChars: number;
}

const AUTOSAVE_NOTE = "Autosaves as you write. Markdown supported.";

export default function WorkLogEditor({
  workLog,
  onChange,
  onFocusCreate,
  isTodayLogged,
  showEmptyState,
  charCount,
  maxChars,
}: WorkLogEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const element = textareaRef.current;
    if (!element) {
      return;
    }

    element.style.height = "0px";
    element.style.height = `${element.scrollHeight}px`;
  }, [workLog]);

  return (
    <div className="space-y-6 rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 shadow-[0_4px_12px_rgba(15,23,42,0.06)]">
      {showEmptyState ? (
        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 text-center">
          <p className="text-lg font-semibold text-[#0F172A]">
            You built something today.
          </p>
          <p className="mt-3 text-sm leading-6 text-[#475569]">
            The easiest content you'll ever create starts with work you've
            already done.
          </p>
          <button
            type="button"
            onClick={onFocusCreate}
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#FF6B35] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
          >
            Create First Log
          </button>
        </div>
      ) : null}

      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-2xl font-semibold text-[#0F172A]">
              What did you build today?
            </p>
            <p className="mt-2 text-sm text-[#475569]">
              Capture what you worked on, learned, fixed, or shipped.
            </p>
          </div>
          {isTodayLogged ? (
            <span className="inline-flex items-center rounded-full border border-[#FFD166] bg-[#FFD166]/15 px-4 py-2 text-sm font-semibold text-[#0F172A]">
              Today's Progress Logged ✓
            </span>
          ) : null}
        </div>
        <textarea
          id="daily-work-log"
          ref={textareaRef}
          value={workLog}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Built JWT authentication. Fixed Redis caching issue. Learned SQL injection testing. Completed networking lab. Deployed API changes."
          className="min-h-[240px] w-full resize-none rounded-3xl border border-[#E2E8F0] bg-white p-6 text-base leading-7 text-[#0F172A] outline-none transition focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20"
          aria-label="Daily work log"
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#64748B]">{AUTOSAVE_NOTE}</p>
          <p className="text-sm text-[#64748B]">
            {charCount} / {maxChars} characters
          </p>
        </div>
      </div>
    </div>
  );
}
