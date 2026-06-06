// pages/SignUp.jsx
import AuthLayout from "../../layouts/AuthLayout";
export default function SignUp() {
  return (
    <AuthLayout>
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-2">
          Start documenting your progress.
        </h1>
        <p className="text-[#0F172A]/60 text-lg">
          Turn today's work into tomorrow's post.
        </p>
      </div>

      <button className="w-full flex items-center justify-center gap-3 bg-white border border-[#0F172A]/10 text-[#0F172A] font-medium py-3.5 rounded-xl hover:bg-[#0F172A]/[0.02] transition-colors focus:ring-2 focus:ring-[#FF6B35]/50 outline-none mb-6">
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-[#0F172A]/5"></div>
        <span className="text-sm font-medium text-[#0F172A]/40">
          or use email
        </span>
        <div className="flex-1 h-px bg-[#0F172A]/5"></div>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#0F172A]">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Jane Doe"
            className="w-full px-4 py-3.5 rounded-xl border border-[#0F172A]/10 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] transition-all bg-white text-[#0F172A] placeholder:text-[#0F172A]/30"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#0F172A]">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3.5 rounded-xl border border-[#0F172A]/10 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] transition-all bg-white text-[#0F172A] placeholder:text-[#0F172A]/30"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#0F172A]">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-xl border border-[#0F172A]/10 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] transition-all bg-white text-[#0F172A] placeholder:text-[#0F172A]/30"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#0F172A]">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-xl border border-[#0F172A]/10 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] transition-all bg-white text-[#0F172A] placeholder:text-[#0F172A]/30"
            />
          </div>
        </div>

        <button className="w-full bg-[#FF6B35] text-white font-medium py-3.5 rounded-xl hover:bg-[#e85a25] transition-all hover:-translate-y-0.5 shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35] outline-none mt-2">
          Create Account
        </button>
      </form>

      <p className="mt-8 text-center text-[#0F172A]/60">
        Already have an account?{" "}
        <a
          href="/signin"
          className="font-medium text-[#0F172A] hover:text-[#FF6B35] transition-colors border-b border-transparent hover:border-[#FF6B35]"
        >
          Sign In
        </a>
      </p>
    </AuthLayout>
  );
}
