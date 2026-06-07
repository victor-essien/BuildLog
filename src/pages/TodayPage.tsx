import { Link } from "react-router-dom";

export default function TodayPage() {
  return (
    <main className="min-h-screen bg-white text-[#0F172A] selection:bg-[#FFD166] selection:text-[#0F172A] font-sans flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl rounded-[24px] border border-[#E2E8F0] bg-white p-10 shadow-[0_4px_12px_rgba(15,23,42,0.06)]">
        <h1 className="text-4xl font-bold tracking-tight">Today</h1>
        <p className="mt-4 text-[#475569] text-lg leading-relaxed">
          This is where your first work log begins. Capture your progress, keep
          momentum, and share what you built today.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-xl border border-[#0F172A]/10 px-5 py-3 text-sm font-semibold text-[#0F172A] hover:bg-[#0F172A]/5 transition"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
