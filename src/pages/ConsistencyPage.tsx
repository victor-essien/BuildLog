import { motion } from "framer-motion";
import { useWorkspace } from "../hooks/useWorkspace";
import StreakCard from "../components/workspace/StreakCard";
import ConsistencyWidget from "../components/workspace/ConsistencyWidget";

export default function ConsistencyPage() {
  const { state } = useWorkspace();

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-[0_4px_12px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-3xl font-semibold text-[#0F172A]">Consistency</p>
            <p className="mt-2 text-sm text-[#475569]">
              Track streaks, progress, and the habits that keep your work moving
              forward.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <ConsistencyWidget
            daysLogged={state.activityLog.length}
            currentStreak={streakInfo.current}
            longestStreak={streakInfo.longest}
          />
          <section className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-[#0F172A]">
                  Recent milestones
                </p>
                <p className="mt-2 text-sm text-[#64748B]">
                  See the habits that are shaping your work rhythm.
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {state.activityLog.slice(0, 4).map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-4"
                >
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {entry.date}
                  </p>
                  <p className="mt-2 text-sm text-[#475569]">{entry.summary}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <StreakCard activeDays={state.activityLog.length} />
      </div>
    </div>
  );
}
