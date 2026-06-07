import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Sparkles,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOnboardingState } from "../../hooks/useOnboardingState";
import type {
  OnboardingStep,
  PrimaryGoalOption,
  UserTypeOption,
} from "../../types/onboarding";
import ChoiceCard from "../../components/onboarding/ChoiceCard";
import NotificationPreviewCard from "../../components/onboarding/NotificationPreviewCard";
import ProgressIndicator from "../../components/onboarding/ProgressIndicator";
import SummaryCard from "../../components/onboarding/SummaryCard";

const userTypeOptions: Array<{
  key: UserTypeOption;
  label: string;
  description: string;
  icon: ReactNode;
}> = [
  {
    key: "Developer",
    label: "Developer",
    description: "Building software, APIs, products, and side projects.",
    icon: <User className="h-6 w-6" />,
  },
  {
    key: "Founder",
    label: "Founder",
    description: "Leading a product, team, or early company story.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    key: "Cybersecurity Learner",
    label: "Cybersecurity Learner",
    description: "Growing skills through labs, research, and exercises.",
    icon: <CheckCircle2 className="h-6 w-6" />,
  },
  {
    key: "Student",
    label: "Student",
    description: "Learning, building projects, and sharing progress.",
    icon: <ClipboardCheck className="h-6 w-6" />,
  },
  {
    key: "Designer",
    label: "Designer",
    description: "Creating interfaces, visuals, and product experiences.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    key: "Creator",
    label: "Creator",
    description: "Sharing ideas, processes, and meaningful work.",
    icon: <CalendarDays className="h-6 w-6" />,
  },
  {
    key: "Other",
    label: "Other",
    description: "A builder with a unique story to tell.",
    icon: <User className="h-6 w-6" />,
  },
];

const primaryGoalOptions: Array<{
  key: PrimaryGoalOption;
  label: string;
  description: string;
  icon: ReactNode;
}> = [
  {
    key: "Build In Public",
    label: "Build In Public",
    description: "Share the progress and thinking behind your work.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    key: "Grow LinkedIn Presence",
    label: "Grow LinkedIn Presence",
    description: "Keep your network updated with consistent progress.",
    icon: <ArrowRight className="h-6 w-6" />,
  },
  {
    key: "Stay Consistent",
    label: "Stay Consistent",
    description: "Create a rhythm for logging progress every day.",
    icon: <CheckCircle2 className="h-6 w-6" />,
  },
  {
    key: "Create Content Faster",
    label: "Create Content Faster",
    description: "Turn work updates into ready-to-share drafts.",
    icon: <ClipboardCheck className="h-6 w-6" />,
  },
  {
    key: "Document My Journey",
    label: "Document My Journey",
    description: "Keep a clear record of what you build and learn.",
    icon: <CalendarDays className="h-6 w-6" />,
  },
  {
    key: "Build A Personal Brand",
    label: "Build A Personal Brand",
    description: "Shape a thoughtful creator story from your work.",
    icon: <User className="h-6 w-6" />,
  },
];

const stepMap: Record<OnboardingStep, { title: string; subtitle: string }> = {
  welcome: {
    title: "Welcome to BuildLog",
    subtitle: "You already do the work. Let's help people see it.",
  },
  userType: {
    title: "What best describes you?",
    subtitle: "This helps us generate more relevant content.",
  },
  primaryGoal: {
    title: "What are you hoping to achieve?",
    subtitle: "Choose the goal that matters most right now.",
  },
  reminder: {
    title: "When should we remind you?",
    subtitle: "We'll only remind you if you haven't logged progress.",
  },
  notifications: {
    title: "Stay on track.",
    subtitle:
      "Enable notifications so BuildLog can remind you when you have not shared your progress.",
  },
  complete: {
    title: "You're all set.",
    subtitle: "Let's capture your first win.",
  },
};

const timezones = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Tokyo",
];

function formatStepLabel(step: OnboardingStep, index: number, total: number) {
  if (step === "welcome") {
    return `Step 1 of ${total}`;
  }

  if (step === "complete") {
    return "All set";
  }

  return `Step ${index + 1} of ${total}`;
}

export default function OnboardingPage() {
  const {
    state,
    stepCount,
    saveUserType,
    savePrimaryGoal,
    saveReminder,
    setNotificationPermission,
    advanceToNext,
    goToStep,
    finishOnboarding,
  } = useOnboardingState();
  const navigate = useNavigate();
  const [timezoneInput, setTimezoneInput] = useState(state.timezone);
  const [notificationError, setNotificationError] = useState("");

  useEffect(() => {
    setTimezoneInput(state.timezone);
  }, [state.timezone]);

  const stepTitle = stepMap[state.step].title;
  const stepSubtitle = stepMap[state.step].subtitle;

  const activePrimaryGoal = state.primaryGoal;
  const activeUserType = state.userType;

  const currentStepNumber = useMemo(() => {
    const order: OnboardingStep[] = [
      "welcome",
      "userType",
      "primaryGoal",
      "reminder",
      "notifications",
    ];
    return order.indexOf(state.step) + 1;
  }, [state.step]);

  const currentSection = useMemo(() => state.step, [state.step]);

  const handleNotificationRequest = async () => {
    setNotificationError("");

    if (
      typeof Notification === "undefined" ||
      !("requestPermission" in Notification)
    ) {
      setNotificationError("Notifications are not supported in this browser.");
      setNotificationPermission("unsupported");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setNotificationPermission("granted");
        finishOnboarding();
        return;
      }

      setNotificationPermission(permission === "denied" ? "denied" : "default");
      if (permission === "denied") {
        setNotificationError(
          "You can still log progress without notifications. We will keep your setup ready.",
        );
      }
    } catch {
      setNotificationPermission("default");
      setNotificationError(
        "Something went wrong while requesting permission. You can still continue.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#0F172A] selection:bg-[#FFD166] selection:text-[#0F172A] font-sans flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-175 space-y-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <ProgressIndicator
            currentIndex={
              currentSection === "complete" ? stepCount : currentStepNumber
            }
            total={stepCount}
            label={formatStepLabel(
              state.step,
              currentStepNumber - 1,
              stepCount,
            )}
          />
          <div className="space-y-3">
            <p className="text-4xl font-semibold tracking-tight">{stepTitle}</p>
            <p className="text-[#475569] text-base leading-7">{stepSubtitle}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-8"
        >
          {state.step === "welcome" && (
            <section className="space-y-8 rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 shadow-[0_4px_12px_rgba(15,23,42,0.06)]">
              <div className="space-y-4">
                <p className="text-[#475569] text-lg leading-relaxed max-w-xl mx-auto">
                  BuildLog turns your daily progress into content worth sharing.
                  We'll personalize your experience in less than a minute.
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.24em] text-[#64748B]">
                      Work Log
                    </p>
                    <p className="mt-4 font-semibold text-[#0F172A]">
                      Record your progress
                    </p>
                  </div>
                  <div className="rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.24em] text-[#64748B]">
                      Content Draft
                    </p>
                    <p className="mt-4 font-semibold text-[#0F172A]">
                      Save a ready-to-share post
                    </p>
                  </div>
                  <div className="rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.24em] text-[#64748B]">
                      Published
                    </p>
                    <p className="mt-4 font-semibold text-[#0F172A]">
                      Share your work with confidence
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={() => {
                    goToStep("userType");
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FF6B35] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
                >
                  Let&apos;s Get Started
                </button>
                <button
                  type="button"
                  onClick={() => {
                    finishOnboarding();
                  }}
                  className="inline-flex items-center justify-center rounded-2xl border border-[#0F172A]/10 bg-white px-6 py-3.5 text-sm font-semibold text-[#0F172A] transition hover:bg-[#0F172A]/5 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
                >
                  Skip Setup
                </button>
              </div>
            </section>
          )}

          {state.step === "userType" && (
            <section className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {userTypeOptions.map((option) => (
                  <ChoiceCard
                    key={option.key}
                    title={option.label}
                    description={option.description}
                    icon={option.icon}
                    active={activeUserType === option.key}
                    onSelect={() => saveUserType(option.key)}
                  />
                ))}
              </div>
            </section>
          )}

          {state.step === "primaryGoal" && (
            <section className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {primaryGoalOptions.map((option) => (
                  <ChoiceCard
                    key={option.key}
                    title={option.label}
                    description={option.description}
                    icon={option.icon}
                    active={activePrimaryGoal === option.key}
                    onSelect={() => savePrimaryGoal(option.key)}
                  />
                ))}
              </div>
            </section>
          )}

          {state.step === "reminder" && (
            <section className="space-y-8 rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 shadow-[0_4px_12px_rgba(15,23,42,0.06)]">
              <div className="grid gap-6 sm:grid-cols-[1.15fr_0.85fr]">
                <label className="space-y-3">
                  <span className="block text-sm font-semibold text-[#0F172A]">
                    Reminder time
                  </span>
                  <input
                    type="time"
                    value={state.reminderTime}
                    onChange={(event) =>
                      saveReminder(event.target.value, timezoneInput)
                    }
                    className="w-full rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0F172A] focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
                  />
                </label>

                <label className="space-y-3">
                  <span className="block text-sm font-semibold text-[#0F172A]">
                    Timezone
                  </span>
                  <div className="grid gap-2">
                    <select
                      value={timezoneInput}
                      onChange={(event) => {
                        const value = event.target.value;
                        setTimezoneInput(value);
                        saveReminder(state.reminderTime, value);
                      }}
                      className="w-full rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0F172A] focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
                    >
                      <option value={state.timezone}>
                        {state.timezone} (auto)
                      </option>
                      {timezones.map((timezone) => (
                        <option key={timezone} value={timezone}>
                          {timezone}
                        </option>
                      ))}
                    </select>
                    <span className="text-sm text-[#64748B]">
                      We will respect this schedule only when you haven&apos;t
                      logged progress.
                    </span>
                  </div>
                </label>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[#475569] text-sm leading-relaxed max-w-2xl">
                  We&apos;re here to keep momentum going, not to spam you.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    saveReminder(state.reminderTime, timezoneInput);
                    advanceToNext();
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FF6B35] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
                >
                  Continue
                </button>
              </div>
            </section>
          )}

          {state.step === "notifications" && (
            <section className="space-y-6 rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 shadow-[0_4px_12px_rgba(15,23,42,0.06)]">
              <NotificationPreviewCard
                permission={state.notificationPermission}
              />
              {notificationError ? (
                <div className="rounded-2xl border border-[#FEE2E2] bg-[#FEE2E2] px-4 py-3 text-sm text-[#B91C1C]">
                  {notificationError}
                </div>
              ) : null}
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <button
                  type="button"
                  onClick={handleNotificationRequest}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FF6B35] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
                >
                  Enable Notifications
                </button>
                <button
                  type="button"
                  onClick={() => finishOnboarding()}
                  className="inline-flex items-center justify-center rounded-2xl border border-[#0F172A]/10 bg-white px-6 py-3.5 text-sm font-semibold text-[#0F172A] transition hover:bg-[#0F172A]/5 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
                >
                  Skip for now
                </button>
              </div>
            </section>
          )}

          {state.step === "complete" && (
            <section className="space-y-8 rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 shadow-[0_4px_12px_rgba(15,23,42,0.06)]">
              <SummaryCard
                userType={state.userType ?? "Developer"}
                primaryGoal={state.primaryGoal ?? "Document My Journey"}
                reminderTime={state.reminderTime}
                timezone={state.timezone}
                notificationsEnabled={state.notificationsEnabled}
              />
              <button
                type="button"
                onClick={() => navigate("/today")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FF6B35] px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
              >
                Log Today's Progress
              </button>
            </section>
          )}
        </motion.div>
      </div>
    </main>
  );
}
