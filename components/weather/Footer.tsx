
import Link from "next/link";

export default function Footer() {
  return (
<div className="mt-12 border-t border-white/10 pt-8">
  <h3 className="text-lg font-semibold text-white mb-5">
    Explore More Free Tools
  </h3>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

    <Link href="/weather">🌤️ Weather</Link>
    <Link href="/currency-converter">💱 Currency Converter</Link>
    <Link href="/fd-calculator">🏦 FD Calculator</Link>
    <Link href="/sip-calculator">📈 SIP Calculator</Link>

    <Link href="/emi-calculator">🏠 EMI Calculator</Link>
    <Link href="/gst-calculator">🧾 GST Calculator</Link>
    <Link href="/percentage-calculator">📊 Percentage Calculator</Link>
    <Link href="/bmi-calculator">❤️ BMI Calculator</Link>

    <Link href="/age-calculator">🎂 Age Calculator</Link>
    <Link href="/unit-converter">📐 Unit Converter</Link>
    <Link href="/random-number-generator">🎲 Random Number Generator</Link>
    <Link href="/coin-flip">🪙 Coin Flip</Link>

    <Link href="/dice-roller">🎲 Dice Roller</Link>
    <Link href="/yes-or-no">✅ Yes or No</Link>
    <Link href="/name-picker">👥 Name Picker</Link>
    <Link href="/password-generator">🔐 Password Generator</Link>

    <Link href="/qr-generator">📱 QR Generator</Link>

  </div>
</div>
  )
}