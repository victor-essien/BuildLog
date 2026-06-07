interface RecentActivityPanelProps {
  activity: Array<{ id: string; date: string; summary: string }>;
}

function formatLabel(dateString: string) {
  const date = new Date(`${dateString}T00:00:00.000Z`);
  const now = new Date();
  const diff = Math.round((now.getTime() - date.getTime()) / 86400000);

  if (diff === 0) {
    return "Today";
  }
  if (diff === 1) {
    return "Yesterday";
  }
  return `${diff} Days Ago`;
}

export default function RecentActivityPanel({
  activity,
}: RecentActivityPanelProps) {
  return (
    <section className="space-y-5 rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div>
        <p className="text-lg font-semibold text-[#0F172A]">Recent Progress</p>
        <p className="mt-2 text-sm text-[#64748B]">
          A quick view of the work you logged recently.
        </p>
      </div>
      <div className="space-y-4">
        {activity.length > 0 ? (
          activity.map((entry) => (
            <div
              key={entry.id}
              className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-4"
            >
              <p className="text-sm font-semibold text-[#0F172A]">
                {formatLabel(entry.date)}
              </p>
              <p className="mt-2 text-sm text-[#475569]">{entry.summary}</p>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm text-[#64748B]">
            No recent progress yet. Your daily log appears here after creation.
          </div>
        )}
      </div>
    </section>
  );
}
