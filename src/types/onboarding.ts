export type OnboardingStep =
  | "welcome"
  | "userType"
  | "primaryGoal"
  | "reminder"
  | "notifications"
  | "complete";

export type UserTypeOption =
  | "Developer"
  | "Founder"
  | "Cybersecurity Learner"
  | "Student"
  | "Designer"
  | "Creator"
  | "Other";

export type PrimaryGoalOption =
  | "Build In Public"
  | "Grow LinkedIn Presence"
  | "Stay Consistent"
  | "Create Content Faster"
  | "Document My Journey"
  | "Build A Personal Brand";

export type NotificationPermissionStatus =
  | "granted"
  | "denied"
  | "default"
  | "unsupported";

export interface OnboardingState {
  step: OnboardingStep;
  userType?: UserTypeOption;
  primaryGoal?: PrimaryGoalOption;
  reminderTime: string;
  timezone: string;
  notificationsEnabled: boolean;
  notificationPermission: NotificationPermissionStatus;
}
