import { Bell } from "lucide-react";
import type { NotificationPermissionStatus } from "../../types/onboarding";

interface NotificationPreviewCardProps {
  permission: NotificationPermissionStatus;
}

const notificationLabel: Record<NotificationPermissionStatus, string> = {
  granted: "Notifications enabled",
  denied: "Notifications blocked",
  default: "Permission pending",
  unsupported: "Notifications not supported",
};

export default function NotificationPreviewCard({
  permission,
}: NotificationPreviewCardProps) {
  return (
    <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#FF6B35] text-white">
          <Bell className="h-6 w-6" />
        </div>
        <div>
          <p className="text-base font-semibold text-[#0F172A]">BuildLog</p>
          <p className="text-sm text-[#64748B]">
            {notificationLabel[permission]}
          </p>
        </div>
      </div>
      <div className="mt-6 rounded-3xl bg-[#F8FAFC] p-5">
        <p className="text-sm font-semibold text-[#0F172A]">
          You haven't logged your progress today.
        </p>
        <p className="mt-2 text-sm text-[#475569]">What did you build?</p>
      </div>
    </div>
  );
}
