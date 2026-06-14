import Navbar from "@/components/layout/Navbar";
import SpinWheel from "@/components/wheel/SpinWheel";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">

      <Navbar />

      <section className="flex flex-col items-center justify-center text-center px-4 py-10 md:py-20 overflow-hidden">
        <SpinWheel />
        <div className="max-w-4xl mt-40">

          <p className="text-violet-400 font-semibold tracking-widest uppercase mb-4">
            AI Powered Decision Platform
          </p>

<div className="w-full max-w-5xl h-px bg-white/10 my-20" />

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight">
            Spin Decisions
            <br />
            Instantly.
          </h2>

          <p className="text-gray-400 mt-6 text-base md:text-lg max-w-2xl mx-auto px-2">
            ByteSpin helps users make decisions with powerful customizable spin wheels.
          </p>
          <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">

  {/* What is ByteSpin */}
  <section>
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      What is ByteSpin?
    </h2>

    <p className="text-gray-400 leading-8 text-lg">
      ByteSpin is a free online spin wheel and random decision-making tool
      designed to help users make choices instantly. Whether you are deciding
      what to eat, choosing a winner, picking a team member, selecting a task,
      or making everyday decisions, ByteSpin provides a fast, fun, and
      customizable spinning wheel experience.
    </p>
  </section>

  {/* How It Works */}
  <section>
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      How ByteSpin Works
    </h2>

    <div className="grid md:grid-cols-5 gap-4">

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        <h3 className="font-bold mb-2">1</h3>
        <p className="text-gray-400">
          Enter your custom options.
        </p>
      </div>

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        <h3 className="font-bold mb-2">2</h3>
        <p className="text-gray-400">
          Customize wheel settings.
        </p>
      </div>

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        <h3 className="font-bold mb-2">3</h3>
        <p className="text-gray-400">
          Click the spin button.
        </p>
      </div>

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        <h3 className="font-bold mb-2">4</h3>
        <p className="text-gray-400">
          Watch the wheel spin.
        </p>
      </div>

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        <h3 className="font-bold mb-2">5</h3>
        <p className="text-gray-400">
          Get your random result instantly.
        </p>
      </div>

    </div>
  </section>

  {/* Popular Uses */}
  <section>
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      Popular Uses of ByteSpin
    </h2>

    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        🍕 Food Decision Wheel
      </div>

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        🎉 Giveaway Winner Picker
      </div>

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        👥 Team Selection Wheel
      </div>

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        🎮 Game Challenge Picker
      </div>

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        📚 Classroom Activities
      </div>

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        🎯 Daily Random Decisions
      </div>

    </div>
  </section>

  {/* About */}
  <section>
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      About ByteSpin
    </h2>

    <p className="text-gray-400 leading-8 text-lg">
      ByteSpin is an AI-powered decision platform built to simplify random
      decision-making. With customizable wheels, adjustable settings, result
      tracking, themes, and instant spinning functionality, ByteSpin helps
      users make decisions quickly and efficiently. Our goal is to provide
      the best free online spin wheel experience for everyone.
    </p>
  </section>

  <section>
  <h2 className="text-3xl md:text-4xl font-bold mb-6">
    Why Choose ByteSpin?
  </h2>

  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
      ⚡ Fast & Instant Results
    </div>

    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
      🎨 Custom Themes & Settings
    </div>

    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
      📱 Mobile Friendly Design
    </div>

    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
      🔊 Sound Effects & Animations
    </div>

    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
      🎯 Accurate Random Results
    </div>

    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
      💾 Saved Preferences
    </div>

  </div>
</section>

<section>

  <h2 className="text-3xl md:text-4xl font-bold mb-6">
    Frequently Asked Questions
  </h2>

  <div className="space-y-4">

    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="font-bold mb-2">
        What is ByteSpin?
      </h3>

      <p className="text-gray-400">
        ByteSpin is a free online spin wheel and random decision maker that helps users make choices instantly.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="font-bold mb-2">
        Is ByteSpin free to use?
      </h3>

      <p className="text-gray-400">
        Yes. ByteSpin is completely free to use and works directly in your browser.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="font-bold mb-2">
        Can I create my own custom wheel?
      </h3>

      <p className="text-gray-400">
        Yes. You can enter your own options, customize the wheel and spin instantly.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="font-bold mb-2">
        Does ByteSpin work on mobile devices?
      </h3>

      <p className="text-gray-400">
        Yes. ByteSpin is fully optimized for phones, tablets and desktop devices.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="font-bold mb-2">
        Are spin results random?
      </h3>

      <p className="text-gray-400">
        Yes. ByteSpin generates random wheel outcomes based on the wheel configuration selected by the user.
      </p>
    </div>

  </div>

</section>

</div>

        </div>

        

      </section>
      <footer className="border-t border-white/10 mt-\8">

  <div className="max-w-6xl mx-auto px-4 py-10">

    <h3 className="text-2xl font-bold">
      ByteSpin
    </h3>

    <p className="text-gray-400 mt-3 max-w-xl">
      Free online spin wheel, random picker and decision making platform.
    </p>

    <div className="flex flex-wrap gap-6 mt-6 text-gray-400">

      <a href="/about">About Us</a> 
  
      <a href="/privacy">Privacy Policy</a>

      <a href="/terms">Terms of Service</a>

      <a href="/contact">Contact</a>

    </div>

    <p className="text-gray-500 mt-8 text-sm">
      © 2026 ByteSpin. All rights reserved.
    </p>

  </div>

</footer>

    </main>
  );
}