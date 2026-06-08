import { NavLink } from "react-router-dom";
import {
  FileText,
  Grid,
  Home,
  Settings,
  Sparkles,
  Clock3,
  User,
} from "lucide-react";
import { Logo } from "../../assets/Logo";

const navItems = [
  { label: "Workspace", to: "/workspace", icon: <Home className="h-5 w-5" /> },
  {
    label: "Quick Capture",
    to: "/quick-capture",
    icon: <Sparkles className="h-5 w-5" />,
  },
  { label: "Drafts", to: "/drafts", icon: <FileText className="h-5 w-5" /> },
  {
    label: "History",
    to: "/history",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    label: "Consistency",
    to: "/consistency",
    icon: <Grid className="h-5 w-5" />,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="space-y-2">
        <div className="md:inline-flex hidden items-center gap-3 rounded-3xl bg-[#F8FAFC] px-4 py-3 shadow-sm">
          <div className="w-7 h-7 bg-[#FF6B35] rounded-md flex items-center justify-center shadow-sm">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M4 18l6-6 4 4 6-6"
              />
            </svg>
          </div>
          <div>
            <p className="text-base font-semibold text-[#0F172A]">BuildLog</p>
            <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">
              Daily workspace
            </p>
          </div>
        </div>
      </div>

      <nav className="mt-10 space-y-1 text-sm font-semibold text-[#475569]">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            onClick={onNavigate}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-3xl px-4 py-3 transition ${
                isActive
                  ? "bg-[#FF6B35]/10 text-[#0F172A] shadow-sm"
                  : "hover:bg-[#FF6B35]/10 hover:text-[#0F172A]"
              }`
            }
          >
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl transition ${
                item.to === "/workspace" ? "bg-[#FF6B35]/10" : "bg-[#F8FAFC]"
              }`}
            >
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-36 md:mt-auto rounded-3xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF6B35]/10 text-[#FF6B35]">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0F172A]">
              BuildLog User
            </p>
            <p className="text-xs text-[#64748B]">Manage your profile</p>
          </div>
        </div>
        <button
          type="button"
          className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold text-[#0F172A] transition hover:border-[#FF6B35] hover:text-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
        >
          Account menu
        </button>
      </div>
    </div>
  );
}
