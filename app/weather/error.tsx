"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">⚠️</h1>

        <h2 className="text-2xl font-bold mb-3">
          Something went wrong
        </h2>

        <p className="text-gray-400 mb-6">
          Unable to load the weather page.
        </p>

        <button
          onClick={() => reset()}
          className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}