import { Link } from "react-router-dom";

export const Logo = () => (
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
     <Link
            to="/"
            className="md:block hover:text-[#FF6B35] transition-colors"
          >
    <span className="font-bold text-xl tracking-tight text-[#0F172A]">
      BuildLog
    </span>
    </Link>
  </div>
);