import { useEffect, useMemo, useState } from "react";
import type {
  OnboardingState,
  OnboardingStep,
  PrimaryGoalOption,
  UserTypeOption,
  NotificationPermissionStatus,
} from "../types/onboarding";

const STORAGE_KEY = "buildlog-onboarding-state";

const DEFAULT_STATE: OnboardingState = {
  step: "welcome",
  reminderTime: "18:00",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
  notificationsEnabled: false,
  notificationPermission:
    typeof Notification === "undefined"
      ? "unsupported"
      : Notification.permission,
};

function parseState(value: string | null): OnboardingState {
  if (!value) {
    return DEFAULT_STATE;
  }

  try {
    const parsed = JSON.parse(value) as Partial<OnboardingState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      notificationPermission:
        parsed.notificationPermission ?? DEFAULT_STATE.notificationPermission,
      step: parsed.step ?? DEFAULT_STATE.step,
      reminderTime: parsed.reminderTime ?? DEFAULT_STATE.reminderTime,
      timezone: parsed.timezone ?? DEFAULT_STATE.timezone,
      notificationsEnabled:
        parsed.notificationsEnabled ?? DEFAULT_STATE.notificationsEnabled,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function useOnboardingState() {
  const [state, setState] = useState<OnboardingState>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_STATE;
    }

    return parseState(window.localStorage.getItem(STORAGE_KEY));
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const currentStepIndex = useMemo(() => {
    const order: OnboardingStep[] = [
      "welcome",
      "userType",
      "primaryGoal",
      "reminder",
      "notifications",
      "complete",
    ];
    return order.indexOf(state.step);
  }, [state.step]);

  const stepCount = 5;

  const goToStep = (step: OnboardingStep) =>
    setState((previous) => ({ ...previous, step }));

  const advanceToNext = () => {
    setState((previous) => {
      const order: OnboardingStep[] = [
        "welcome",
        "userType",
        "primaryGoal",
        "reminder",
        "notifications",
        "complete",
      ];
      const nextIndex = Math.min(
        order.indexOf(previous.step) + 1,
        order.length - 1,
      );
      return { ...previous, step: order[nextIndex] };
    });
  };

  const saveUserType = (userType: UserTypeOption) => {
    setState((previous) => ({ ...previous, userType, step: "primaryGoal" }));
  };

  const savePrimaryGoal = (primaryGoal: PrimaryGoalOption) => {
    setState((previous) => ({ ...previous, primaryGoal, step: "reminder" }));
  };

  const saveReminder = (reminderTime: string, timezone: string) => {
    setState((previous) => ({ ...previous, reminderTime, timezone }));
  };

  const setNotificationPermission = (
    permission: NotificationPermissionStatus,
  ) => {
    setState((previous) => ({
      ...previous,
      notificationPermission: permission,
      notificationsEnabled: permission === "granted",
    }));
  };

  const setNotificationsEnabled = (enabled: boolean) => {
    setState((previous) => ({ ...previous, notificationsEnabled: enabled }));
  };

  const finishOnboarding = () =>
    setState((previous) => ({ ...previous, step: "complete" }));

  return {
    state,
    currentStepIndex,
    stepCount,
    goToStep,
    advanceToNext,
    saveUserType,
    savePrimaryGoal,
    saveReminder,
    setNotificationPermission,
    setNotificationsEnabled,
    finishOnboarding,
  };
}
