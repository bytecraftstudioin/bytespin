import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">

      {/* Background Blur */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-pink-600/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20 text-center">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-sm font-semibold mb-6">
          📥 Free Instagram Downloader
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-tight">
          Download
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 bg-clip-text text-transparent">
            {" "}Instagram{" "}
          </span>
          Reels, Photos & Videos
        </h1>

        <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-400 leading-8">
          Download public Instagram Reels, Photos, Videos and Carousel posts
          in high quality. Fast, secure and mobile friendly.
        </p>

        {/* Feature Pills */}

        <div className="flex flex-wrap justify-center gap-3 mt-10">

          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            🎥 Reels
          </span>

          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            📷 Photos
          </span>

          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            🎬 Videos
          </span>

          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            📑 Carousel
          </span>

          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            ⚡ Fast Download
          </span>

        </div>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">

          <Link
            href="#downloader"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-violet-600 hover:opacity-90 transition font-bold text-lg"
          >
            🚀 Start Downloading
          </Link>

          <Link
            href="#faq"
            className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition font-bold text-lg"
          >
            ❓ Learn More
          </Link>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h2 className="text-3xl font-black text-pink-400">
              Free
            </h2>
            <p className="text-gray-400 mt-2">
              No Cost
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h2 className="text-3xl font-black text-violet-400">
              HD
            </h2>
            <p className="text-gray-400 mt-2">
              Quality
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h2 className="text-3xl font-black text-emerald-400">
              Fast
            </h2>
            <p className="text-gray-400 mt-2">
              Processing
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h2 className="text-3xl font-black text-orange-400">
              Secure
            </h2>
            <p className="text-gray-400 mt-2">
              Privacy First
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}