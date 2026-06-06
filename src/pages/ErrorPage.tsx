import { useNavigate, useRouteError } from "react-router-dom";
import { ArrowLeft, Home, Wifi, AlertTriangle } from "lucide-react";

export const ErrorPage = () => {
  const error = useRouteError() as {
    status?: number;
    statusText?: string;
    message?: string;
  } | null;
  const navigate = useNavigate();

  const is404 = !error || error?.status === 404;

  return (
    <div className="min-h-screen  bg-white flex selection:bg-[#FFD166] selection:text-[#0F172A] font-sans flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center gap-8">
        {/* Icon */}
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-[#FF6B35] flex items-center justify-center">
            {is404 ? (
              <Wifi size={40} className="text-white" />
            ) : (
              <AlertTriangle size={40} className="text-orange-400" />
            )}
          </div>
          {/* Status badge */}
          <div className="absolute -top-3 -right-3 bg-white border border-neutral-700 rounded-xl px-2.5 py-1">
            <span className="text-sm font-black ">{error?.status ?? 404}</span>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight">
            {is404 ? "Page not found" : "Something broke"}
          </h1>
          <p className="text-neutral-400 text-lg leading-relaxed">
            {is404
              ? "Looks like this page got lost in the study hall. It might have been moved, deleted, or never existed."
              : error?.message ||
                error?.statusText ||
                "An unexpected error occurred. Try going back or refreshing the page."}
          </p>
        </div>

        {/* Quick links */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0F172A] border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 text-white rounded-xl font-bold transition-all"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-neutral-200 text-black rounded-xl font-bold transition-all"
          >
            <Home size={18} /> Go to Dashboard
          </button>
        </div>

        {/* Helpful links
        <div className="border-t border-neutral-800 pt-6 w-full flex flex-col items-center gap-2">
          <p className="text-sm font-bold text-neutral-500 mb-2">Or jump to</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: 'Flashcards', path: '/flashcards' },
              { label: 'Quizzes', path: '/quizzes' },
              { label: 'Study Boards', path: '/study-boards' },
              { label: 'Analytics', path: '/analytics' },
            ].map(({ label, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="px-4 py-2 text-sm font-bold text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-all"
              >
                {label}
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};
