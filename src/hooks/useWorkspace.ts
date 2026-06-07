import { useEffect, useMemo, useState } from "react";
import type {
  ActivityEntry,
  DraftItem,
  QuickNote,
  WorkspaceState,
} from "../types/workspace";

const STORAGE_KEY = "buildlog-workspace-state";

const EMPTY_STATE: WorkspaceState = {
  workLog: "",
  quickNotes: [],
  drafts: [],
  activityLog: [],
  lastSavedAt: undefined,
};

function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function parseState(value: string | null): WorkspaceState {
  if (!value) {
    return EMPTY_STATE;
  }

  try {
    const parsed = JSON.parse(value) as Partial<WorkspaceState>;
    return {
      ...EMPTY_STATE,
      ...parsed,
      workLog: parsed.workLog ?? EMPTY_STATE.workLog,
      quickNotes: parsed.quickNotes ?? EMPTY_STATE.quickNotes,
      drafts: parsed.drafts ?? EMPTY_STATE.drafts,
      activityLog: parsed.activityLog ?? EMPTY_STATE.activityLog,
      lastSavedAt: parsed.lastSavedAt ?? EMPTY_STATE.lastSavedAt,
    };
  } catch {
    return EMPTY_STATE;
  }
}

function normalizeDate(dateString: string) {
  return new Date(dateString).toISOString().slice(0, 10);
}

function computeStreaks(entries: ActivityEntry[]) {
  const uniqueDates = Array.from(
    new Set(entries.map((entry) => normalizeDate(entry.date))),
  ).sort((a, b) => a.localeCompare(b));

  if (uniqueDates.length === 0) {
    return {
      current: 0,
      longest: 0,
      daysLogged: 0,
    };
  }

  const today = new Date().toISOString().slice(0, 10);
  let longest = 0;
  let currentStreak = 0;
  let runningStreak = 0;
  let previousDate: string | null = null;

  for (const dateString of uniqueDates) {
    const date = new Date(`${dateString}T00:00:00.000Z`);

    if (!previousDate) {
      runningStreak = 1;
    } else {
      const previous = new Date(`${previousDate}T00:00:00.000Z`);
      const diff = Math.round((date.getTime() - previous.getTime()) / 86400000);
      runningStreak = diff === 1 ? runningStreak + 1 : 1;
    }

    longest = Math.max(longest, runningStreak);
    previousDate = dateString;
  }

  let targetDate = today;
  for (let index = uniqueDates.length - 1; index >= 0; index -= 1) {
    const dateString = uniqueDates[index];
    const date = new Date(`${dateString}T00:00:00.000Z`);
    const target = new Date(`${targetDate}T00:00:00.000Z`);
    const diff = Math.round((target.getTime() - date.getTime()) / 86400000);

    if (diff === 0 || diff === 1) {
      currentStreak += 1;
      targetDate = new Date(target.setDate(target.getDate() - 1))
        .toISOString()
        .slice(0, 10);
    } else {
      break;
    }
  }

  return {
    current: currentStreak,
    longest,
    daysLogged: uniqueDates.length,
  };
}

export function useWorkspace() {
  const [state, setState] = useState<WorkspaceState>(() => {
    if (typeof window === "undefined") {
      return EMPTY_STATE;
    }

    return parseState(window.localStorage.getItem(STORAGE_KEY));
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const saveWorkLog = (workLog: string) => {
    setState((previous) => ({
      ...previous,
      workLog,
      lastSavedAt: new Date().toISOString(),
    }));
  };

  const addQuickNote = (text: string) => {
    const note: QuickNote = {
      id: createId(),
      text,
      createdAt: new Date().toISOString(),
    };

    setState((previous) => ({
      ...previous,
      quickNotes: [note, ...previous.quickNotes],
    }));
  };

  const removeQuickNote = (id: string) => {
    setState((previous) => ({
      ...previous,
      quickNotes: previous.quickNotes.filter((note) => note.id !== id),
    }));
  };

  const setDrafts = (drafts: DraftItem[]) => {
    setState((previous) => ({
      ...previous,
      drafts,
    }));
  };

  const updateDraft = (id: string, content: string) => {
    setState((previous) => ({
      ...previous,
      drafts: previous.drafts.map((draft) =>
        draft.id === id ? { ...draft, content } : draft,
      ),
    }));
  };

  const toggleDraftEditing = (id: string) => {
    setState((previous) => ({
      ...previous,
      drafts: previous.drafts.map((draft) =>
        draft.id === id ? { ...draft, isEditing: !draft.isEditing } : draft,
      ),
    }));
  };

  const logTodayProgress = (summary: string) => {
    const today = new Date().toISOString().slice(0, 10);
    setState((previous) => {
      const alreadyLogged = previous.activityLog.some(
        (entry) => normalizeDate(entry.date) === today,
      );

      if (alreadyLogged) {
        return previous;
      }

      const entry: ActivityEntry = {
        id: createId(),
        date: today,
        summary: summary.slice(0, 120),
        createdAt: new Date().toISOString(),
      };

      return {
        ...previous,
        activityLog: [entry, ...previous.activityLog],
      };
    });
  };

  const hasActivity = state.activityLog.length > 0;

  const todayDate = new Date().toISOString().slice(0, 10);
  const todayLogged = Boolean(
    state.workLog.trim().length > 0 && state.lastSavedAt?.startsWith(todayDate),
  );

  const streakInfo = useMemo(
    () => computeStreaks(state.activityLog),
    [state.activityLog],
  );

  const recentActivity = useMemo(
    () => state.activityLog.slice(0, 4),
    [state.activityLog],
  );

  return {
    state,
    saveWorkLog,
    addQuickNote,
    removeQuickNote,
    setDrafts,
    updateDraft,
    toggleDraftEditing,
    logTodayProgress,
    hasActivity,
    todayLogged,
    streakInfo,
    recentActivity,
  };
}
