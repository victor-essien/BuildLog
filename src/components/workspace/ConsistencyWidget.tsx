interface ConsistencyWidgetProps {
  daysLogged: number;
  currentStreak: number;
  longestStreak: number;
}

export default function ConsistencyWidget({
  daysLogged,
  currentStreak,
  longestStreak,
}: ConsistencyWidgetProps) {
  const cells = Array.from({ length: 28 }, (_, index) => index + 1);

  return (
    <section className="space-y-5 rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div>
        <p className="text-lg font-semibold text-[#0F172A]">This Month</p>
        <p className="mt-2 text-sm text-[#64748B]">
          A simple view of your recent consistency.
        </p>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {cells.map((cell) => (
          <div
            key={cell}
            className={`h-8 w-8 rounded-xl ${cell <= Math.min(daysLogged, 28) ? "bg-[#FF6B35]" : "bg-[#E2E8F0]"}`}
          />
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-center">
          <p className="text-sm text-[#64748B]">Days Logged</p>
          <p className="mt-2 text-xl font-semibold text-[#0F172A]">
            {daysLogged}
          </p>
        </div>
        <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-center">
          <p className="text-sm text-[#64748B]">Current Streak</p>
          <p className="mt-2 text-xl font-semibold text-[#0F172A]">
            {currentStreak}
          </p>
        </div>
        <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-center">
          <p className="text-sm text-[#64748B]">Longest Streak</p>
          <p className="mt-2 text-xl font-semibold text-[#0F172A]">
            {longestStreak}
          </p>
        </div>
      </div>
    </section>
  );
}
