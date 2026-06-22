import Image from "next/image";
export default function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 backdrop-blur-xl">

        <div className="flex items-center gap-3">

  <Image
    src="/logo.png"
    alt="ByteSpin Logo"
    width={52}
    height={52}
    className="
      rounded-xl
      shadow-[0_0_20px_rgba(139,92,246,0.4)]
    "
  />

  <div>

    <h1 className="text-2xl font-black">
      ByteSpin
    </h1>

    <p className="text-xs text-gray-400">
      Spin Wheel Platform
    </p>

  </div>

</div>

    </nav>
  );
}