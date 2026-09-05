"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white flex items-center justify-center px-4">

      <div className="max-w-lg w-full text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

        <div className="text-6xl mb-5">
          ⚠️
        </div>

        <h1 className="text-3xl font-black mb-3">
          Something went wrong
        </h1>

        <p className="text-gray-400 leading-relaxed">
          We couldn't process your request right now.
          Please try again in a few moments.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 rounded-xl bg-black/30 border border-white/10 p-4 text-left overflow-auto">
            <p className="text-xs text-red-400 break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition-colors font-bold"
          >
            🔄 Try Again
          </button>

          <a
            href="/"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-bold"
          >
            🏠 Back to Home
          </a>

        </div>

      </div>

    </main>
  );
}