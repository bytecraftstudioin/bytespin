export default function Loading() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">

        <div className="h-14 w-80 bg-white/10 rounded-xl mx-auto mb-6" />

        <div className="h-6 w-[500px] max-w-full bg-white/10 rounded mx-auto mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="h-96 rounded-3xl bg-white/5 border border-white/10" />

          <div className="space-y-6">

            <div className="h-44 rounded-3xl bg-white/5 border border-white/10" />

            <div className="h-44 rounded-3xl bg-white/5 border border-white/10" />

          </div>

        </div>

        <div className="mt-8 h-72 rounded-3xl bg-white/5 border border-white/10" />

        <div className="mt-8 h-80 rounded-3xl bg-white/5 border border-white/10" />

      </div>
    </main>
  );
}