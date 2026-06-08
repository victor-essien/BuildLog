import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { DraftPlatform } from "../types/workspace";
import { useWorkspace } from "../hooks/useWorkspace";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import WorkLogEditor from "../components/workspace/WorkLogEditor";
import SmartPrompts from "../components/workspace/SmartPrompts";
import DraftsSection from "../components/workspace/DraftsSection";
import QuickCapturePanel from "../components/workspace/QuickCapturePanel";
import RecentActivityPanel from "../components/workspace/RecentActivityPanel";
import ConsistencyWidget from "../components/workspace/ConsistencyWidget";
import StreakCard from "../components/workspace/StreakCard";

const promptOptions = [
  "Fixed a bug",
  "Built a feature",
  "Learned something",
  "Deployed something",
  "Completed a course",
  "Read documentation",
];

const progressMessages = [
  "Creating LinkedIn version...",
  "Creating X version...",
  "Creating Facebook version...",
];

const platformUrls = {
  LinkedIn: "https://www.linkedin.com/feed/",
  X: "https://x.com/compose/tweet",
  Facebook: "https://www.facebook.com/",
} as const;

const motivationalLines = [
  "Small progress compounds.",
  "Your work deserves to be seen.",
  "Ready to continue building?",
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good Morning";
  }
  if (hour < 18) {
    return "Good Afternoon";
  }
  return "Good Evening";
}

function generateDraftContent(
  platform: "LinkedIn" | "X" | "Facebook",
  workLog: string,
  note?: string,
) {
  const trimmed = workLog.trim();
  const summary = trimmed.length > 140 ? `${trimmed.slice(0, 137)}…` : trimmed;
  const context = note ? ` I also captured: ${note}.` : "";

  switch (platform) {
    case "LinkedIn":
      return `Today I worked on ${summary}.${context} Sharing this so I can keep the momentum going and document what I learned.`;
    case "X":
      return `Built ${summary}.${context} #BuildLog #Today`;
    case "Facebook":
      return `Completed work on ${summary}.${context} Feeling good about the progress made today.`;
    default:
      return summary;
  }
}

export default function WorkspacePage() {
  const {
    state,
    saveWorkLog,
    addQuickNote,
    todayLogged,
    streakInfo,
    recentActivity,
    setDrafts,
    updateDraft,
    toggleDraftEditing,
    logTodayProgress,
  } = useWorkspace();
  const [noteText, setNoteText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressIndex, setProgressIndex] = useState(-1);
  const timerRef = useRef<number | null>(null);

  const greeting = useMemo(() => getGreeting(), []);
  const phrase = useMemo(
    () => motivationalLines[new Date().getDate() % motivationalLines.length],
    [],
  );

  const workLogLength = state.workLog.length;
  const draftCount = state.drafts.length;
  const hasWorkLog = state.workLog.trim().length > 0;
  const showEmptyState = !hasWorkLog && recentActivity.length === 0;

  const handlePromptSelect = (prompt: string) => {
    const nextValue = state.workLog.trim()
      ? `${state.workLog.trim()}
- ${prompt}`
      : `${prompt}.`;

    saveWorkLog(nextValue);
  };

  const handleAddNote = () => {
    const trimmed = noteText.trim();
    if (!trimmed) {
      return;
    }

    addQuickNote(trimmed);
    setNoteText("");
  };

  const createDrafts = () => {
    const note = state.quickNotes[0]?.text;
    const platforms: DraftPlatform[] = ["LinkedIn", "X", "Facebook"];
    const drafts = platforms.map((platform) => ({
      id: `${platform}-${Date.now()}`,
      platform,
      content: generateDraftContent(platform, state.workLog, note),
      createdAt: new Date().toISOString(),
      isEditing: false,
    }));

    setDrafts(drafts);
    logTodayProgress(state.workLog, drafts.length, state.quickNotes.length);
  };

  const finishGeneration = () => {
    createDrafts();
    setIsGenerating(false);
    setProgressIndex(-1);
  };

  const startGeneration = () => {
    if (!hasWorkLog) {
      return;
    }

    setIsGenerating(true);
    setProgressIndex(0);

    const runStep = (index: number) => {
      if (index >= progressMessages.length) {
        finishGeneration();
        return;
      }

      setProgressIndex(index);
      timerRef.current = window.setTimeout(() => runStep(index + 1), 950);
    };

    runStep(0);
  };

  const copyDraft = async (id: string) => {
    const draft = state.drafts.find((item) => item.id === id);
    if (!draft || typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(draft.content);
  };

  const regenerateDraft = (id: string) => {
    const draft = state.drafts.find((item) => item.id === id);
    if (!draft) {
      return;
    }

    const note = state.quickNotes[0]?.text;
    const updatedContent = generateDraftContent(
      draft.platform,
      state.workLog,
      note,
    );
    updateDraft(id, updatedContent);
  };

  const openDraftPlatform = (id: string) => {
    const draft = state.drafts.find((item) => item.id === id);
    if (!draft) {
      return;
    }

    try {
      localStorage.setItem(
        "buildlog-selected-draft",
        JSON.stringify({
          platform: draft.platform,
          content: draft.content,
          createdAt: new Date().toISOString(),
        }),
      );
    } catch {
      // ignore storage failures
    }

    const url = platformUrls[draft.platform];
    window.open(url, "_blank");
  };

  const handleCreateFirstLog = () => {
    const element = document.getElementById(
      "daily-work-log",
    ) as HTMLTextAreaElement | null;
    element?.focus();
  };

  const handleUpdateDraftContent = (id: string, content: string) => {
    updateDraft(id, content);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleToggleEditDraft = (id: string) => {
    toggleDraftEditing(id);
  };

  const contentStatus =
    isGenerating && progressIndex >= 0 ? progressMessages[progressIndex] : null;

  return (
    <main className="min-h-screen bg-white text-[#0F172A] selection:bg-[#FFD166] selection:text-[#0F172A] font-sans">
      <div className="  px-6 py-8 lg:px-10 lg:py-10">
        <WorkspaceHeader />
        <div className="grid gap-10 lg:grid-cols-[1.8fr_1fr]">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 shadow-[0_4px_12px_rgba(15,23,42,0.06)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#64748B]">
                {greeting}
              </p>
              <p className="mt-3 text-3xl font-semibold text-[#0F172A]">
                {phrase}
              </p>
            </motion.div>

            <WorkLogEditor
              workLog={state.workLog}
              onChange={saveWorkLog}
              onFocusCreate={handleCreateFirstLog}
              isTodayLogged={todayLogged}
              showEmptyState={showEmptyState}
              charCount={workLogLength}
              maxChars={800}
            />

            <div className="space-y-6">
              <SmartPrompts
                prompts={promptOptions}
                onSelect={handlePromptSelect}
              />
              <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-[#0F172A]">
                      Generate Posts
                    </p>
                    <p className="mt-2 text-sm text-[#64748B]">
                      Use your daily log and quick notes to create
                      ready-to-share drafts.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={startGeneration}
                    disabled={!hasWorkLog || isGenerating}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl  bg-[#0F172A] px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-[#FFB49E] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
                  >
                    Generate Posts
                  </button>
                </div>
                <AnimatePresence>
                  {contentStatus ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-6 rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4 text-sm text-[#0F172A]"
                    >
                      {contentStatus}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            {draftCount > 0 ? (
              <DraftsSection
                drafts={state.drafts}
                onCopy={copyDraft}
                onRegenerate={regenerateDraft}
                onOpen={openDraftPlatform}
                onToggleEdit={handleToggleEditDraft}
                onUpdateContent={handleUpdateDraftContent}
              />
            ) : null}
          </div>

          <div className="space-y-6">
            <StreakCard
              current={streakInfo.current}
              longest={streakInfo.longest}
            />
            <QuickCapturePanel
              noteText={noteText}
              onNoteChange={setNoteText}
              onAddNote={handleAddNote}
              notes={state.quickNotes}
            />
            <RecentActivityPanel activity={recentActivity} />
            <ConsistencyWidget
              daysLogged={streakInfo.daysLogged}
              currentStreak={streakInfo.current}
              longestStreak={streakInfo.longest}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
