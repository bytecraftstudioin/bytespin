export default function Loading() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <section className="max-w-7xl mx-auto px-4 py-10 animate-pulse">

        {/* Hero */}
        <div className="h-12 w-96 max-w-full mx-auto rounded-xl bg-white/10" />

        <div className="h-5 w-[600px] max-w-full mx-auto mt-5 rounded bg-white/10" />

        {/* Search */}
        <div className="mt-12 max-w-3xl mx-auto flex gap-3">
          <div className="flex-1 h-16 rounded-2xl bg-white/10" />
          <div className="w-44 h-16 rounded-2xl bg-violet-500/30" />
        </div>

        {/* Preview Card */}
        <div className="mt-12 max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-6">

          <div className="aspect-video rounded-2xl bg-white/10" />

          <div className="mt-6 h-8 w-72 rounded bg-white/10" />

          <div className="mt-3 h-4 w-full rounded bg-white/10" />

          <div className="mt-2 h-4 w-3/4 rounded bg-white/10" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

            <div className="h-20 rounded-2xl bg-white/10" />

            <div className="h-20 rounded-2xl bg-white/10" />

            <div className="h-20 rounded-2xl bg-white/10" />

            <div className="h-20 rounded-2xl bg-white/10" />

          </div>

          <div className="flex gap-4 mt-8">

            <div className="flex-1 h-14 rounded-2xl bg-violet-500/30" />

            <div className="flex-1 h-14 rounded-2xl bg-pink-500/30" />

          </div>

        </div>

        {/* Feature Cards */}

        <div className="grid md:grid-cols-3 gap-6 mt-16">

          {[1,2,3,4,5,6].map((item)=>(
            <div
              key={item}
              className="rounded-2xl bg-white/5 border border-white/10 p-6"
            >
              <div className="h-10 w-10 rounded-xl bg-white/10" />

              <div className="h-6 w-40 mt-5 rounded bg-white/10" />

              <div className="h-4 w-full mt-4 rounded bg-white/10" />

              <div className="h-4 w-4/5 mt-2 rounded bg-white/10" />
            </div>
          ))}

        </div>

      </section>
    </main>
  );
}