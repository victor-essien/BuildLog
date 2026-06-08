import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Menu, X } from "lucide-react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Logo } from "../../assets/Logo";

export default function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <div className="lg:hidden border-b border-[#E2E8F0] bg-white px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-3 rounded-3xl bg-[#F8FAFC] px-3 py-2 shadow-sm">
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
              <p className="text-sm font-semibold text-[#0F172A]">BuildLog</p>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#64748B]">
                Daily workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="View notifications"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white text-[#0F172A] transition hover:border-[#FF6B35] hover:text-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
            >
              <Bell className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white text-[#0F172A] transition hover:border-[#FF6B35] hover:text-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="lg:flex">
        <aside className="hidden lg:block lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[240px] lg:border-r lg:border-[#E2E8F0] lg:bg-white lg:px-6 lg:py-8">
          <Sidebar />
        </aside>

        <main className="flex-1 lg:ml-[240px] px-4 pb-10 pt-6 lg:px-8 lg:pb-12">
          <div className="mx-auto w-full max-w-300">
            <Outlet />
          </div>
        </main>
      </div>

      <AnimatePresence>
        {drawerOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed inset-y-0 left-0 z-50 w-[260px] border-r border-[#E2E8F0] bg-white p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setDrawerOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white text-[#0F172A] transition hover:border-[#FF6B35] hover:text-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <Sidebar onNavigate={() => setDrawerOpen(false)} />
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
