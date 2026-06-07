interface SummaryCardProps {
  userType: string;
  primaryGoal: string;
  reminderTime: string;
  timezone: string;
  notificationsEnabled: boolean;
}

export default function SummaryCard({
  userType,
  primaryGoal,
  reminderTime,
  timezone,
  notificationsEnabled,
}: SummaryCardProps) {
  return (
    <div className="space-y-6 rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
      <div className="rounded-3xl bg-[#F8FAFC] p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-[#64748B]">
          Summary
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-[#E2E8F0] bg-white p-4">
            <p className="text-sm text-[#64748B]">Role</p>
            <p className="mt-2 font-semibold text-[#0F172A]">{userType}</p>
          </div>
          <div className="rounded-3xl border border-[#E2E8F0] bg-white p-4">
            <p className="text-sm text-[#64748B]">Goal</p>
            <p className="mt-2 font-semibold text-[#0F172A]">{primaryGoal}</p>
          </div>
          <div className="rounded-3xl border border-[#E2E8F0] bg-white p-4">
            <p className="text-sm text-[#64748B]">Reminder</p>
            <p className="mt-2 font-semibold text-[#0F172A]">
              {reminderTime} • {timezone}
            </p>
          </div>
          <div className="rounded-3xl border border-[#E2E8F0] bg-white p-4">
            <p className="text-sm text-[#64748B]">Notifications</p>
            <p className="mt-2 font-semibold text-[#0F172A]">
              {notificationsEnabled ? "Enabled" : "Disabled"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
