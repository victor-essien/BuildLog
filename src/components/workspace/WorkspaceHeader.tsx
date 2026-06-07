import { Bell, UserCircle2 } from "lucide-react";
import { Logo } from "../../assets/Logo";

export default function WorkspaceHeader() {
  return (
    <header className="flex items-center justify-between gap-6 pb-8 lg:pb-10">
      <div className="flex items-center gap-4">
        <Logo />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="View notifications"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white text-[#0F172A] transition hover:border-[#FF6B35] hover:text-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Open profile menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white text-[#0F172A] transition hover:border-[#FF6B35] hover:text-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
        >
          <UserCircle2 className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
