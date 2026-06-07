export type DraftPlatform = "LinkedIn" | "X" | "Facebook";

export interface DraftItem {
  id: string;
  platform: DraftPlatform;
  content: string;
  isEditing?: boolean;
}

export interface QuickNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface ActivityEntry {
  id: string;
  date: string;
  summary: string;
  createdAt: string;
}

export interface WorkspaceState {
  workLog: string;
  quickNotes: QuickNote[];
  drafts: DraftItem[];
  activityLog: ActivityEntry[];
  lastSavedAt?: string;
}
