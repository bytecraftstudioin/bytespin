import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b1020] py-16 mt-20">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

        <div className="text-center mb-12">

          <h2 className="text-3xl font-black text-white">
            Explore More Free Tools
          </h2>

          <p className="text-gray-400 mt-3">
            Discover more productivity tools available on ByteSpin.
          </p>

        </div>

        {/* Tool Links */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          <Link href="/weather" className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-4 transition">
            🌤️ Weather
          </Link>

          <Link href="/currency-converter" className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-4 transition">
            💱 Currency Converter
          </Link>

          <Link href="/fd-calculator" className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-4 transition">
            🏦 FD Calculator
          </Link>

          <Link href="/sip-calculator" className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-4 transition">
            📈 SIP Calculator
          </Link>

          <Link href="/emi-calculator" className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-4 transition">
            🏠 EMI Calculator
          </Link>

          <Link href="/gst-calculator" className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-4 transition">
            🧾 GST Calculator
          </Link>

          <Link href="/percentage-calculator" className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-4 transition">
            📊 Percentage Calculator
          </Link>

          <Link href="/bmi-calculator" className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-4 transition">
            ❤️ BMI Calculator
          </Link>

          <Link href="/age-calculator" className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-4 transition">
            🎂 Age Calculator
          </Link>

          <Link href="/unit-converter" className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-4 transition">
            📏 Unit Converter
          </Link>

          <Link href="/password-generator" className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-4 transition">
            🔐 Password Generator
          </Link>

          <Link href="/qr-generator" className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-4 transition">
            📱 QR Generator
          </Link>

        </div>

        {/* Bottom Links */}

        <div className="flex flex-wrap justify-center gap-6 mt-16 text-sm text-gray-400">

          <Link href="/">
            Home
          </Link>

          <Link href="/about">
            About
          </Link>

          <Link href="/contact">
            Contact
          </Link>

          <Link href="/privacy">
            Privacy Policy
          </Link>

          <Link href="/terms">
            Terms of Service
          </Link>

        </div>

        {/* Copyright */}

        <div className="mt-10 text-center text-gray-500 text-sm border-t border-white/10 pt-6">

          © {new Date().getFullYear()} ByteSpin by Bytecraft Studio. All rights reserved.

        </div>

      </div>

    </footer>
  );
}