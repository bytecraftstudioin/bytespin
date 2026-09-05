const features = [
  {
    icon: "🎥",
    title: "Download Reels",
    description:
      "Download public Instagram Reels in high quality with a clean and responsive interface.",
  },
  {
    icon: "📷",
    title: "Download Photos",
    description:
      "Save Instagram photos quickly without losing image quality.",
  },
  {
    icon: "🎬",
    title: "Download Videos",
    description:
      "Download Instagram videos from public posts in just a few clicks.",
  },
  {
    icon: "📑",
    title: "Carousel Support",
    description:
      "Access multiple images and videos from public carousel posts.",
  },
  {
    icon: "⚡",
    title: "Fast Processing",
    description:
      "Optimized workflow for quick media retrieval and downloads.",
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    description:
      "No registration required. Process only publicly accessible content.",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-black mb-4">
            Why Choose ByteSpin?
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Fast, reliable and easy-to-use tools designed to help you work with
            publicly available Instagram content efficiently.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-pink-500/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-5xl mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}