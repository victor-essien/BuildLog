import { motion } from "framer-motion";
import { ShieldCheck, BellRing, User, LogOut } from "lucide-react";

export default function SettingsPage() {
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
            <p className="text-3xl font-semibold text-[#0F172A]">Settings</p>
            <p className="mt-2 text-sm text-[#475569]">
              Keep your BuildLog tailored to how you work.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[#FEE2E2] p-3 text-[#B91C1C]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">Privacy</p>
              <p className="text-sm text-[#64748B]">
                Review data handling and storage settings for your work log.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[#EFF6FF] p-3 text-[#1D4ED8]">
              <BellRing className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">
                Notifications
              </p>
              <p className="text-sm text-[#64748B]">
                Control reminders and updates for your daily capture rhythm.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[#ECFDF5] p-3 text-[#15803D]">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">Profile</p>
              <p className="text-sm text-[#64748B]">
                Update your identity, name, and how BuildLog addresses you.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[#FEF3C7] p-3 text-[#D97706]">
              <LogOut className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">Logout</p>
              <p className="text-sm text-[#64748B]">
                Leave your workspace when you're done for the day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
