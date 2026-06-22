"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";


const themes = {
  Neon: [
    "#ec4899",
    "#8b5cf6",
    "#06b6d4",
    "#22c55e",
  ],

  Ocean: [
    "#3b82f6",
    "#06b6d4",
    "#14b8a6",
    "#6366f1",
  ],

  Sunset: [
    "#f97316",
    "#ec4899",
    "#ef4444",
    "#8b5cf6",
  ],

  Forest: [
    "#22c55e",
    "#84cc16",
    "#10b981",
    "#14b8a6",
  ],

  Cyber: [
    "#facc15",
    "#06b6d4",
    "#8b5cf6",
    "#ec4899",
  ],
};

export default function SpinWheel() {
  const [showSettings, setShowSettings] = useState(false);
  const [textSize, setTextSize] = useState(20);
  const [theme, setTheme] =
  useState<keyof typeof themes>("Neon");
  const [values, setValues] = useState([
  "Yes",
  "No",
  "May be",
]);

const [inputValues, setInputValues] = useState(
  "Yes\nNO\nMay be"
);
const [sliceRepeat, setSliceRepeat] = useState(1);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spinAudioRef = useRef<HTMLAudioElement | null>(null);

const winAudioRef = useRef<HTMLAudioElement | null>(null);

  const [rotation, setRotation] = useState(0);

  const [result, setResult] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const [isSpinning, setIsSpinning] = useState(false);
const [history, setHistory] = useState<string[]>([]);

const [totalSpins, setTotalSpins] = useState(0);
const repeatedValues: string[] = [];

for (let i = 0; i < sliceRepeat; i++) {
  repeatedValues.push(...values);
}

useEffect(() => {

  const savedValues =
    localStorage.getItem("wheelValues");

  const savedHistory =
    localStorage.getItem("history");

  const savedSpins =
    localStorage.getItem("totalSpins");

  const savedRepeat =
    localStorage.getItem("sliceRepeat");

  const savedTextSize =
    localStorage.getItem("textSize");

  if (savedValues) {
    const parsedValues = JSON.parse(savedValues);

    setValues(parsedValues);

    setInputValues(
      parsedValues.join("\n")
    );
  }

  if (savedHistory) {
    setHistory(JSON.parse(savedHistory));
  }

  if (savedSpins) {
    setTotalSpins(Number(savedSpins));
  }

  if (savedRepeat) {
    setSliceRepeat(Number(savedRepeat));
  }

  if (savedTextSize) {
    setTextSize(Number(savedTextSize));
  }

}, []);
 useEffect(() => {
  drawWheel();
}, [
  rotation,
  values,
  sliceRepeat,
  textSize,
  theme
]);

useEffect(() => {

  localStorage.setItem(
    "wheelValues",
    JSON.stringify(values)
  );

  localStorage.setItem(
    "history",
    JSON.stringify(history)
  );

  localStorage.setItem(
    "totalSpins",
    totalSpins.toString()
  );

  localStorage.setItem(
    "sliceRepeat",
    sliceRepeat.toString()
  );

  localStorage.setItem(
    "textSize",
    textSize.toString()
  );

}, [
  values,
  history,
  totalSpins,
  sliceRepeat,
  textSize
]);

  function drawWheel() {

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const size = canvas.width;

    const center = size / 2;

    const radius = size / 2;

    const angle = (2 * Math.PI) / repeatedValues.length;
   
    ctx.clearRect(0, 0, size, size);

    for (let i = 0; i < repeatedValues.length; i++) {

      const start = i * angle;

      const end = start + angle;

      ctx.beginPath();

      ctx.moveTo(center, center);

      ctx.arc(center, center, radius, start, end);

      ctx.fillStyle =
  themes[theme][
    i % themes[theme].length
  ];

      ctx.fill();

      ctx.strokeStyle = "#111";

      ctx.lineWidth = 3;

      ctx.stroke();

      ctx.save();

      ctx.translate(center, center);

      ctx.rotate(start + angle / 2);

      ctx.fillStyle = "white";

     ctx.font = `bold ${textSize}px Arial`;

      ctx.fillText(repeatedValues[i], radius - 100, 10);

      ctx.restore();
    }
  }

  function updateWheel() {

  const newValues = inputValues
    .split("\n")
    .map(item => item.trim())
    .filter(item => item !== "");

  if (newValues.length < 2) {
    alert("Minimum 2 values required");
    return;
  }

  setValues(newValues);

  setRotation(0);

  setHistory([]);

  setTotalSpins(0);
}

  function spinWheel() {

    if (isSpinning) return;

    setIsSpinning(true);
    spinAudioRef.current?.play();   

    const randomDegree =
      Math.floor(3600 + Math.random() * 2000);

    const finalRotation =
      rotation + randomDegree;

    setRotation(finalRotation);

    const segmentAngle =
  360 / repeatedValues.length;

    const normalized =
      finalRotation % 360;

    const pointerAngle =
  (360 - normalized + 270) % 360;

    const index =
      Math.floor(pointerAngle / segmentAngle);

    const selectedValue =
  repeatedValues[index];

    setTimeout(() => {

      setResult(selectedValue);
setHistory((prev) => [
  selectedValue,
  ...prev,
]);

setTotalSpins((prev) => prev + 1);
      winAudioRef.current?.play();

confetti({
  particleCount: 150,
  spread: 100,
  origin: { y: 0.6 },
});
      setShowPopup(true);

      setIsSpinning(false);

    }, 5000);
  }

  return (

    <div className="flex flex-col items-center justify-center mt-16">
     

      {/* Pointer */}
      <div
  className="
  w-0 h-0
  border-l-[20px]
  border-r-[20px]
  border-t-[35px]
  border-l-transparent
  border-r-transparent
  border-t-pink-500
  z-20
  mb-[-5px]
"
/>
      {/* Wheel */}
      <div className="relative mt-[-5px]">

        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition:
              "transform 5s cubic-bezier(0.17,0.67,0.12,0.99)",
          }}
          className="
          w-[280px] h-[280px]
          sm:w-[340px] sm:h-[340px]
          md:w-[400px] md:h-[400px]
          rounded-full
          border-[10px]
          border-white/10
          shadow-[0_0_60px_rgba(139,92,246,0.5)]
        "
        />

        {/* Spin Button */}
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="
          absolute top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-20 h-20 md:w-28 md:h-28
          rounded-full
          bg-black
          border-4 border-white/20
          text-white
          font-bold
          text-sm md:text-xl
          hover:scale-105
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
        >
          {isSpinning ? "..." : "SPIN"}
        </button>

      </div>

 <div className="w-full max-w-md flex justify-end mb-4">

  <button
    onClick={() => setShowSettings(!showSettings)}
    className="
      w-12 h-12
      rounded-full
      bg-white/10
      border border-white/10
      text-xl
      hover:scale-110
      transition
    "
  >
    ⚙️
  </button>

</div>
      <div className="w-full max-w-md mb-8">

  <textarea
  value={inputValues}
  onChange={(e) => setInputValues(e.target.value)}
  rows={4}
  placeholder={`Add your wheel options...

Example:
Pizza
Burger
Shawarma
Fried Rice`}
  className="
    w-full
    bg-white/5
    border border-white/10
    rounded-2xl
    p-4
    text-white
    placeholder:text-gray-500
    resize-none
    outline-none
  "
/>

  <button
    onClick={updateWheel}
    className="
      mt-4
      w-full
      py-3
      rounded-2xl
      bg-gradient-to-r
      from-pink-500
      to-violet-500
      font-semibold
    "
  >
    Update Wheel
  </button>

</div>
{showSettings && (
<div className="w-full max-w-md mb-6 bg-white/5 border border-white/10 rounded-3xl p-5">

<h3 className="text-lg font-bold mb-3">
  Theme
</h3>

<div className="grid grid-cols-2 gap-2 mb-6">

  {Object.keys(themes).map((themeName) => (

    <button
      key={themeName}
      onClick={() =>
        setTheme(themeName as keyof typeof themes)
      }
      className={`
        py-2 rounded-xl border
        transition
        ${
          theme === themeName
            ? "bg-pink-500 border-pink-500"
            : "bg-white/5 border-white/10"
        }
      `}
    >
      {themeName}
    </button>

  ))}

</div>

  <h3 className="text-lg font-bold mb-4">
    Slice Repeat
  </h3>

  <input
    type="range"
    min="1"
    max="5"
    value={sliceRepeat}
    onChange={(e) =>
      setSliceRepeat(Number(e.target.value))
    }
    className="w-full"
  />

  <p className="mt-2 text-pink-400 font-semibold">
    Repeat: {sliceRepeat}
  </p>
  
  <div className="mt-6">

  <h4 className="mb-2 font-semibold">
    Text Size
  </h4>

  <input
    type="range"
    min="10"
    max="30"
    value={textSize}
    onChange={(e) =>
      setTextSize(Number(e.target.value))
    }
    className="w-full"
  />

  <p className="mt-2 text-cyan-400">
    Size: {textSize}px
  </p>

</div>

</div>
)}

      

      {/* Popup */}
      <div className="mt-10 w-full max-w-md">

  {/* Spin Counter */}
  <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-5">

    <h3 className="text-xl font-bold mb-2">
      Total Spins
    </h3>

    <p className="text-4xl font-black text-pink-500">
      {totalSpins}
    </p>

  </div>

  {/* History */}
  <div className="bg-white/5 border border-white/10 rounded-3xl p-5">

    <h3 className="text-xl font-bold mb-4">
      Recent Results
    </h3>

    <div className="space-y-3 max-h-[250px] overflow-y-auto">

      {
        history.length === 0 ? (

          <p className="text-gray-400">
            No spins yet
          </p>

        ) : (

          history.map((item, index) => (

            <div
              key={index}
              className="bg-white/5 rounded-2xl px-4 py-3 flex items-center justify-between"
            >

              <span className="text-gray-400">
                #{history.length - index}
              </span>

              <span className="font-semibold">
                {item}
              </span>

            </div>

          ))

        )
      }

    </div>

  </div>

</div>
      {
        showPopup && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

            <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 text-center max-w-sm w-full shadow-2xl">

              <h2 className="text-3xl font-bold mb-4">
                Result
              </h2>

              <p className="text-5xl font-black bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent mb-8">
                {result}
              </p>

              <div className="flex gap-3 justify-center">

  <button
    onClick={() => setShowPopup(false)}
    className="
      px-6 py-3
      rounded-2xl
      bg-gradient-to-r
      from-pink-500
      to-violet-500
      font-semibold
      hover:scale-105
      transition
    "
  >
    Close
  </button>

  <button
    onClick={async () => {

      const shareText =
        `I got "${result}" on ByteSpin 🎯`;

      if (navigator.share) {

        try {

          await navigator.share({
            title: "ByteSpin",
            text: shareText,
            url: window.location.href,
          });

        } catch {}

      } else {

        await navigator.clipboard.writeText(
          shareText
        );

        alert("Copied to clipboard!");
      }

    }}
    className="
      px-6 py-3
      rounded-2xl
      bg-cyan-500
      font-semibold
      hover:scale-105
      transition
    "
  >
    Share
  </button>

</div>

            </div>

          </div>

        )
      }

      <audio
  ref={spinAudioRef}
  src="/sounds/spin.mp3"
/>

<audio
  ref={winAudioRef}
  src="/sounds/win.mp3"
/>

    </div>
  );
}