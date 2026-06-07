interface StreakCardProps {
  current: number;
  longest: number;
}

export default function StreakCard({ current, longest }: StreakCardProps) {
  return (
    <section className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-3xl bg-[#FFD166]/30 flex items-center justify-center text-[#0F172A]">
          <span className="text-lg font-semibold">{current}</span>
        </div>
        <div>
          <p className="text-sm text-[#64748B]">Current Streak</p>
          <p className="mt-1 text-xl font-semibold text-[#0F172A]">
            {current} Days
          </p>
        </div>
      </div>
      <div className="mt-6 rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm text-[#475569]">
        Longest streak:{" "}
        <span className="font-semibold text-[#0F172A]">{longest} Days</span>
      </div>
    </section>
  );
}
