// components/AuthLayout.jsx
import React from "react";
import { motion } from "framer-motion";

const Logo = () => (
  <div className="flex items-center gap-2">
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
    <span className="font-bold text-xl tracking-tight text-[#0F172A]">
      BuildLog
    </span>
  </div>
);

const VisualPanel = () => {
  return (
    <div className="hidden lg:flex w-[40%] bg-[#0F172A]/[0.02] border-r border-[#0F172A]/5 relative flex-col justify-between p-12 overflow-hidden">
      <Logo />

      <div className="relative z-10 my-auto w-full max-w-sm mx-auto">
        <div className="space-y-6">
          {/* Step 1: Work Log */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-[#0F172A]/10 rounded-xl p-4 shadow-sm relative z-20"
          >
            <div className="text-[10px] font-bold text-[#0F172A]/40 mb-1 uppercase tracking-wider">
              Raw Work Log
            </div>
            <div className="font-mono text-sm text-[#0F172A]">
              Built JWT authentication and structured protected routes.
            </div>
          </motion.div>

          {/* Animated Connectors */}
          <div className="absolute left-1/2 -translate-x-1/2 top-16 bottom-16 w-px bg-gradient-to-b from-[#0F172A]/10 via-[#FF6B35]/50 to-[#0F172A]/10 z-0">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] absolute -left-[2.5px]"
              animate={{ top: ["0%", "100%"] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Step 2: Social Outputs */}
          <div className="grid gap-3 relative z-10 pl-6 border-l border-transparent">
            {[
              { name: "LinkedIn Post", color: "bg-[#0A66C2]" },
              { name: "X Post", color: "bg-black" },
              { name: "Facebook Post", color: "bg-[#1877F2]" },
            ].map((platform, i) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                className="bg-white border border-[#0F172A]/10 rounded-lg p-3 shadow-sm flex items-center gap-3"
              >
                <div className={`w-2 h-2 rounded-full ${platform.color}`}></div>
                <div className="flex-1 space-y-1.5">
                  <div className="text-[10px] font-bold text-[#0F172A]/60 uppercase tracking-wide">
                    {platform.name}
                  </div>
                  <div className="w-3/4 h-1.5 bg-[#0F172A]/5 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Step 3: Published */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="bg-[#FFD166]/20 border border-[#FFD166]/50 rounded-xl p-3 flex items-center justify-center gap-2 text-sm font-medium text-[#0F172A]"
          >
            <span className="w-2 h-2 rounded-full bg-[#22c55e]"></span>
            Published & Documented
          </motion.div>
        </div>
      </div>

      <div className="text-sm font-medium text-[#0F172A]/40">
        Your work deserves to be seen.
      </div>
    </div>
  );
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex selection:bg-[#FFD166] selection:text-[#0F172A] font-sans">
      <VisualPanel />

      {/* Right Side: Form Content (60%) */}
      <div className="flex-1 lg:w-[60%] flex flex-col px-6 py-8 relative overflow-y-auto">
        <div className="lg:hidden mb-12">
          <Logo />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[420px]"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
